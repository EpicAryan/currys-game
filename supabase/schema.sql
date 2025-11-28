


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE SCHEMA IF NOT EXISTS "public";


ALTER SCHEMA "public" OWNER TO "pg_database_owner";


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE TYPE "public"."gift_status" AS ENUM (
    'locked',
    'claimed',
    'missed'
);


ALTER TYPE "public"."gift_status" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."check_mega_prize"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
declare
  played_count int;
begin
  -- Count all days the user has participated
  select count(*) into played_count
  from user_day_participation
  where user_id = NEW.user_id;

  -- If the user has exactly 12 entries, they qualify
  if played_count = 12 then
    update users
    set won_mega_prize = true
    where id = NEW.user_id;
  end if;

  return NEW;
end;
$$;


ALTER FUNCTION "public"."check_mega_prize"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."claim_coupon"("user_id" "uuid", "day_number" integer) RETURNS TABLE("id" "uuid", "coupon_code" "text", "coupon_title" "text", "coupon_description" "text", "day" integer, "claimed_at" timestamp with time zone)
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
  -- 1️⃣ Check if this user already claimed for this day
  if exists (
    select 1
    from coupons c
    where c.day = day_number
      and c.claimed_by_user = user_id
  ) then
    raise exception 'User has already claimed a coupon for this day';
  end if;

  -- 2️⃣ Randomly pick an available coupon and claim it
  return query
  update coupons c
  set 
    is_claimed = true,
    claimed_at = now(),
    claimed_by_user = user_id
  where c.id = (
    select c2.id
    from coupons c2
    where c2.day = day_number
      and c2.is_claimed = false
    order by random()
    limit 1
    for update skip locked
  )
  returning 
    c.id,
    c.coupon_code,
    c.coupon_title,
    c.coupon_description,
    c.day,
    c.claimed_at;

  -- 3️⃣ No coupon left
  if not found then
    raise exception 'No coupons left for this day';
  end if;
end;
$$;


ALTER FUNCTION "public"."claim_coupon"("user_id" "uuid", "day_number" integer) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_or_create_user"("user_email" "text") RETURNS "uuid"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
declare
  existing_id uuid;
begin
  -- Try to find an existing user
  select id into existing_id 
  from public.users 
  where email = user_email;

  -- If user already exists, return their ID
  if existing_id is not null then
    return existing_id;
  end if;

  -- Otherwise insert a new one and return its ID
  insert into public.users (email)
  values (user_email)
  returning id into existing_id;

  return existing_id;
end;
$$;


ALTER FUNCTION "public"."get_or_create_user"("user_email" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."get_user_campaign_data"("user_email" "text") RETURNS json
    LANGUAGE "sql" SECURITY DEFINER
    AS $$
  select row_to_json(t)
  from (
    select
      u.id as user_id,
      u.email,

      -- Coupons
      (
        select json_agg(c)
        from coupons c
        where c.claimed_by_user = u.id
      ) as coupons_claimed,

      -- Gifts
      (
        select json_agg(
          json_build_object(
            'gift_id', e.gift_id,
            'day_number', e.day_number,
            'enrolled_at', e.enrolled_at
          )
        )
        from user_gift_enrollments e
        where e.user_id = u.id
      ) as gifts_enrolled,

      -- Days Participated
      (
        select json_agg(
          json_build_object(
            'day_number', p.day_number,
            'played_at', p.played_at
          )
        )
        from user_day_participation p
        where p.user_id = u.id
      ) as days_participated

    from users u
    where u.email = user_email
    limit 1
  ) t;
$$;


ALTER FUNCTION "public"."get_user_campaign_data"("user_email" "text") OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."campaign_config" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "campaign_start_date" timestamp with time zone NOT NULL,
    "campaign_end_date" timestamp with time zone NOT NULL,
    "is_active" boolean DEFAULT false NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "campaign_dates_check" CHECK (("campaign_end_date" > "campaign_start_date"))
);


ALTER TABLE "public"."campaign_config" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."coupons" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "coupon_code" "text" NOT NULL,
    "coupon_title" "text" NOT NULL,
    "coupon_description" "text",
    "day" integer NOT NULL,
    "is_claimed" boolean DEFAULT false NOT NULL,
    "claimed_at" timestamp with time zone,
    "image_url" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "claimed_by_user" "uuid",
    CONSTRAINT "coupons_day_check" CHECK ((("day" >= 1) AND ("day" <= 12)))
);


ALTER TABLE "public"."coupons" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."gifts" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "day_number" integer NOT NULL,
    "gift_name" "text",
    "image_url" "text",
    "buy_now_link" "text",
    CONSTRAINT "gifts_day_number_check" CHECK ((("day_number" >= 1) AND ("day_number" <= 12)))
);


ALTER TABLE "public"."gifts" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_day_participation" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "day_number" integer NOT NULL,
    "played_at" timestamp with time zone DEFAULT "now"() NOT NULL
);


ALTER TABLE "public"."user_day_participation" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_gift_enrollments" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid",
    "gift_id" "uuid",
    "day_number" integer NOT NULL,
    "enrolled_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."user_gift_enrollments" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text",
    "email" "text" NOT NULL,
    "won_mega_prize" boolean DEFAULT false NOT NULL
);


ALTER TABLE "public"."users" OWNER TO "postgres";


ALTER TABLE ONLY "public"."campaign_config"
    ADD CONSTRAINT "campaign_config_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."coupons"
    ADD CONSTRAINT "coupons_coupon_code_key" UNIQUE ("coupon_code");



ALTER TABLE ONLY "public"."coupons"
    ADD CONSTRAINT "coupons_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."gifts"
    ADD CONSTRAINT "gifts_day_number_key" UNIQUE ("day_number");



ALTER TABLE ONLY "public"."gifts"
    ADD CONSTRAINT "gifts_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_day_participation"
    ADD CONSTRAINT "user_day_participation_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_day_participation"
    ADD CONSTRAINT "user_day_participation_user_id_day_number_key" UNIQUE ("user_id", "day_number");



ALTER TABLE ONLY "public"."user_gift_enrollments"
    ADD CONSTRAINT "user_gift_enrollments_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_gift_enrollments"
    ADD CONSTRAINT "user_gift_enrollments_user_id_day_number_key" UNIQUE ("user_id", "day_number");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_email_key" UNIQUE ("email");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");



CREATE INDEX "idx_coupons_day" ON "public"."coupons" USING "btree" ("day");



CREATE INDEX "idx_coupons_day_claimed" ON "public"."coupons" USING "btree" ("day", "is_claimed");



CREATE INDEX "idx_coupons_is_claimed" ON "public"."coupons" USING "btree" ("is_claimed");



CREATE UNIQUE INDEX "single_active_campaign" ON "public"."campaign_config" USING "btree" ("is_active") WHERE ("is_active" = true);



CREATE OR REPLACE TRIGGER "trigger_check_mega_prize" AFTER INSERT ON "public"."user_day_participation" FOR EACH ROW WHEN (("new"."day_number" = 12)) EXECUTE FUNCTION "public"."check_mega_prize"();



ALTER TABLE ONLY "public"."coupons"
    ADD CONSTRAINT "coupons_claimed_by_user_fkey" FOREIGN KEY ("claimed_by_user") REFERENCES "public"."users"("id");



ALTER TABLE ONLY "public"."user_day_participation"
    ADD CONSTRAINT "user_day_participation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");



ALTER TABLE ONLY "public"."user_gift_enrollments"
    ADD CONSTRAINT "user_gift_enrollments_gift_id_fkey" FOREIGN KEY ("gift_id") REFERENCES "public"."gifts"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_gift_enrollments"
    ADD CONSTRAINT "user_gift_enrollments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE;



CREATE POLICY "Allow read access to campaign_config" ON "public"."campaign_config" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."gifts" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."user_gift_enrollments" USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."users" FOR SELECT USING (true);



CREATE POLICY "Policy with security definer functions" ON "public"."user_day_participation" USING (true);



ALTER TABLE "public"."campaign_config" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."coupons" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."gifts" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_day_participation" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."user_gift_enrollments" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";



GRANT ALL ON FUNCTION "public"."check_mega_prize"() TO "anon";
GRANT ALL ON FUNCTION "public"."check_mega_prize"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."check_mega_prize"() TO "service_role";



GRANT ALL ON FUNCTION "public"."claim_coupon"("user_id" "uuid", "day_number" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."claim_coupon"("user_id" "uuid", "day_number" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."claim_coupon"("user_id" "uuid", "day_number" integer) TO "service_role";



GRANT ALL ON FUNCTION "public"."get_or_create_user"("user_email" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_or_create_user"("user_email" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_or_create_user"("user_email" "text") TO "service_role";



GRANT ALL ON FUNCTION "public"."get_user_campaign_data"("user_email" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."get_user_campaign_data"("user_email" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_user_campaign_data"("user_email" "text") TO "service_role";



GRANT ALL ON TABLE "public"."campaign_config" TO "anon";
GRANT ALL ON TABLE "public"."campaign_config" TO "authenticated";
GRANT ALL ON TABLE "public"."campaign_config" TO "service_role";



GRANT ALL ON TABLE "public"."coupons" TO "anon";
GRANT ALL ON TABLE "public"."coupons" TO "authenticated";
GRANT ALL ON TABLE "public"."coupons" TO "service_role";



GRANT ALL ON TABLE "public"."gifts" TO "anon";
GRANT ALL ON TABLE "public"."gifts" TO "authenticated";
GRANT ALL ON TABLE "public"."gifts" TO "service_role";



GRANT ALL ON TABLE "public"."user_day_participation" TO "anon";
GRANT ALL ON TABLE "public"."user_day_participation" TO "authenticated";
GRANT ALL ON TABLE "public"."user_day_participation" TO "service_role";



GRANT ALL ON TABLE "public"."user_gift_enrollments" TO "anon";
GRANT ALL ON TABLE "public"."user_gift_enrollments" TO "authenticated";
GRANT ALL ON TABLE "public"."user_gift_enrollments" TO "service_role";



GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";







