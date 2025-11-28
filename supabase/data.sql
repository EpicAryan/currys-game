SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict mn4aZp8La2JocxiOnVZGbJCZ7Z3mUWoqCkLsSu1VsOa5lbgwIF6wIOTO5p5WXbB

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: campaign_config; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."campaign_config" ("id", "campaign_start_date", "campaign_end_date", "is_active", "created_at") VALUES
	('abf52100-931c-49f8-a96c-5f3c7c828236', '2025-12-01 00:00:00+00', '2025-12-12 00:00:00+00', true, '2025-10-26 14:13:11.352369+00');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: coupons; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."coupons" ("id", "coupon_code", "coupon_title", "coupon_description", "day", "is_claimed", "claimed_at", "image_url", "created_at", "claimed_by_user") VALUES
	('c714f01a-345d-437e-98b4-9e0a5b52e3d2', 'TECHMAS10P-7P76-MZAU-FMPT-Z2UI', '10% Off', '10% discount coupon', 1, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('037d7abe-ea0f-4fe5-bf2e-c97d85ef17e5', 'TECHMAS10-HK99-NDQU-WT5U-XMOU', '€10 Off', '€10 discount coupon', 12, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('ea5a4e6e-03f4-4404-8a3c-e62b4a529bc2', 'TECHMAS10P-QFIC-VQVW-EZ2N-YFIW', '10% Off', '10% discount coupon', 12, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('61d32a08-e4b6-4e56-9a19-985a80b07a00', 'TECHMAS20P-5BPT-C76H-LSTD-7G9O', '20% Off', '20% discount coupon', 1, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('e41d253d-36b1-4445-9157-cacde1077e6b', 'TECHMAS50-Y2VM-D7OI-YB4S-PZQ6', '€50 Off', '€50 discount coupon', 1, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('615fc44d-8b42-429e-a2ab-25b93cb1828b', 'TECHMAS10-OAWT-WS24-L4YB-PUYK', '€10 Off', '€10 discount coupon', 2, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('29de635b-8b41-4bfd-9ca5-a81f4ef458c7', 'TECHMAS10P-EETG-2Y6M-EOH4-POQB', '10% Off', '10% discount coupon', 2, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('67adb635-fa4d-419d-bc8d-9ea73a0f86d7', 'TECHMAS20-MNIU-Q3FO-MEVU-GKPQ', '€20 Off', '€20 discount coupon', 2, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('897c5861-4f9e-4301-bf8c-4b7ef4ee53ec', 'TECHMAS20P-PG3O-VF9N-F4SO-5LK9', '20% Off', '20% discount coupon', 2, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('a0b1a484-90bc-4037-8fc7-51989e169fde', 'TECHMAS20P-K4IW-CRV4-3GG4-9O5E', '20% Off', '20% discount coupon', 2, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('411c4b3e-fb25-4b6f-9a82-167c7c338c20', 'TECHMAS10-CT2H-2DXW-NM6T-WITZ', '€10 Off', '€10 discount coupon', 2, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('875106e9-e698-4116-b9de-68fea0d95e4e', 'TECHMAS10P-ZUP2-QW2O-6T5R-UOCX', '10% Off', '10% discount coupon', 2, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('4371a6cb-4683-4c8c-8bab-668168dee8fe', 'TECHMAS10P-IDCH-7D44-EG5B-9XRU', '10% Off', '10% discount coupon', 4, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('6bb82365-2cd9-454f-9912-3b91e3e111aa', 'TECHMAS10P-AYVY-KLSR-I6MF-9TDT', '10% Off', '10% discount coupon', 4, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('5bad08e6-6eef-4afe-9ade-9db891722f0c', 'TECHMAS20-4L4H-M7UX-DO2Y-PN3X', '€20 Off', '€20 discount coupon', 4, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('777e4fd1-7261-462f-b8c3-30c8ee37830c', 'TECHMAS20P-H9VV-2NVX-HZUK-MFAD', '20% Off', '20% discount coupon', 4, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('c20c2326-f3b3-4d69-a9a3-77d1c212dce1', 'TECHMAS10-F4Y4-U2QC-XQCE-BXR4', '€10 Off', '€10 discount coupon', 4, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('c3e376e2-d28b-4fd7-9497-7a1ca80103bf', 'TECHMAS10P-5IEL-K7QO-XEWZ-7ERS', '10% Off', '10% discount coupon', 4, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('dc6a4d77-c939-43bc-b89f-535001a16e8f', 'TECHMAS10-3HS7-KUXY-KIMQ-CMPH', '€10 Off', '€10 discount coupon', 5, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('8f709056-4c16-404c-9671-aa9fd281ddc5', 'TECHMAS10P-KOAU-ECPH-QWP4-3WN3', '10% Off', '10% discount coupon', 5, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('fea0c9fd-7033-4800-a2be-fa0a5ae7e053', 'TECHMAS20-HZLM-3Q5F-CXZR-Z3M7', '€20 Off', '€20 discount coupon', 5, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('ca1b6e43-675a-4f3d-9427-8d21fba69f26', 'TECHMAS20P-QCE4-EQVI-MKZI-7Z9M', '20% Off', '20% discount coupon', 5, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('58a031f3-5636-4e32-9fd2-4a7f8ff0ed13', 'TECHMAS50-XC4X-D6E2-AMMA-ARFU', '€50 Off', '€50 discount coupon', 5, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('d61dd9d1-6417-45c0-bfdb-bd1476cb0027', 'TECHMAS10P-GXAI-VK9A-O4ZC-OQA2', '10% Off', '10% discount coupon', 5, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('5a518ee8-855c-4ef0-a0a7-9dcfec54a438', 'TECHMAS10-AZUA-RACH-5ZHS-NBZ6', '€10 Off', '€10 discount coupon', 6, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('a6c5b063-3909-4c7b-a769-cab00bb37023', 'TECHMAS10P-H4RF-6PSX-GA6F-L6CP', '10% Off', '10% discount coupon', 6, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('335a5fbf-3f54-4cc1-a8b4-61ae3cf170a7', 'TECHMAS10P-YEHT-PZ62-UTV9-OIH7', '10% Off', '10% discount coupon', 6, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('3c200650-bdf6-42ce-b760-6676a8457991', 'TECHMAS20P-HB9Z-9SZ2-9HIZ-E2CF', '20% Off', '20% discount coupon', 6, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('af244c6e-aa57-4895-9056-b0b7d8bf5f1f', 'TECHMAS20P-GG4Q-X6UU-NCG4-F37A', '20% Off', '20% discount coupon', 6, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('6bb3ce16-31d8-4b1a-a643-0789898ab2fe', 'TECHMAS10-22VV-K39H-9LK3-M7LR', '€10 Off', '€10 discount coupon', 7, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('42e4635f-e801-4656-af2a-5b27f7929999', 'TECHMAS10P-N4K7-W7BQ-X27H-K3QE', '10% Off', '10% discount coupon', 7, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('b6368e6d-ed0a-43ae-b443-a111c5783e74', 'TECHMAS10P-PN9Q-SIO5-RAAR-O9YQ', '10% Off', '10% discount coupon', 7, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('21295b32-2e34-4d2a-9e8d-f584922de1a3', 'TECHMAS20P-II2H-RRWS-PFNG-7TSU', '20% Off', '20% discount coupon', 7, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('77ec8c89-942f-4249-ba5f-18092c3a5ebe', 'TECHMAS20P-MFDB-42NA-HXHK-GXHV', '20% Off', '20% discount coupon', 8, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('c4a44111-75be-4944-a2ec-e11a9001fc3a', 'TECHMAS20P-UQKZ-9QGP-T2T9-C6TX', '20% Off', '20% discount coupon', 8, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('b4c6559f-50e1-44f9-9c44-3dab7b1ca784', 'TECHMAS50-OYGN-UVG9-GTLF-ALAT', '€50 Off', '€50 discount coupon', 8, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('e40ff8d6-73fd-4467-80e3-658b5206df52', 'TECHMAS20P-DGHO-PQ5P-4SLY-UFYG', '20% Off', '20% discount coupon', 8, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('3811d9a8-2315-4e2e-89b2-7f75c215a8bd', 'TECHMAS10-63O5-54OI-XHMW-ES26', '€10 Off', '€10 discount coupon', 9, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('40873a33-3ff8-445a-8aa2-02a9474569cb', 'TECHMAS10P-CM2T-P7GH-BAYM-Q4SK', '10% Off', '10% discount coupon', 9, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('fa8332cb-8e0f-4234-b4de-b0ed5b8ad9a3', 'TECHMAS10P-MHSQ-LBXU-PFDS-U2VZ', '10% Off', '10% discount coupon', 9, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('165768d5-215e-4ef5-a9af-624d85f967c8', 'TECHMAS20-GDIK-SGFE-52BT-4IFC', '€20 Off', '€20 discount coupon', 9, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('212bf163-479c-4184-becb-7be73fd3bc06', 'TECHMAS10P-SN4P-MHDG-MAL7-A9OB', '10% Off', '10% discount coupon', 12, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('9d1e5341-06df-4fb2-935f-24c14b71168c', 'TECHMAS20P-R74O-GDDB-FI5R-PM9D', '20% Off', '20% discount coupon', 12, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('d2de4c05-b2b9-42e7-9d88-be6326ef9bfb', 'TECHMAS10-DYMB-EGQG-SKEU-PGMM', '€10 Off', '€10 discount coupon', 1, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('2bf8ca24-c39c-41c2-8c82-cf779b8693a3', 'TECHMAS10P-3GLR-TKKB-P6PX-3W2G', '10% Off', '10% discount coupon', 2, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('1c26cec8-a7ad-4f05-a92e-bf9c601acc5e', 'TECHMAS10-4MQS-B5EG-LIMH-7XHD', '€10 Off', '€10 discount coupon', 3, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('3ef29350-54c5-4946-a28b-336ade79809c', 'TECHMAS20P-VMLD-AIMY-K5RY-NIU7', '20% Off', '20% discount coupon', 9, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('6300685c-80bf-4d78-9567-f8c927ab5e90', 'TECHMAS20P-RCOT-5RUW-VDD5-BPKB', '20% Off', '20% discount coupon', 9, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('820940cb-8b09-4ca0-92c1-3b840d65416a', 'TECHMAS10-R4T5-UTHV-O9I6-6ZZY', '€10 Off', '€10 discount coupon', 10, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('5dd00289-7063-4910-80a2-79db9119bf99', 'TECHMAS10-BYXP-PFYW-6BRM-SRAH', '€10 Off', '€10 discount coupon', 10, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('7e9cf95b-f497-4992-85d3-c01ac69afb95', 'TECHMAS10P-44EG-DORR-6MHO-IY7L', '10% Off', '10% discount coupon', 10, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('6df10005-6359-42d2-b148-16b560a16643', 'TECHMAS20-I934-GTPY-6FQU-BP7W', '€20 Off', '€20 discount coupon', 10, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('06648c1f-5e5c-4894-9098-1d230d327004', 'TECHMAS20P-CL5K-UOG5-DBFX-ZCNB', '20% Off', '20% discount coupon', 1, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('9d00c8b9-2459-4456-bdc0-194050be2d39', 'TECHMAS10P-ZCOG-4KA5-DMTI-LNMI', '10% Off', '10% discount coupon', 3, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('49662d62-50f3-4e12-821a-c89f5d37161d', 'TECHMAS10-KOT4-GWBB-IYBT-BGPY', '€10 Off', '€10 discount coupon', 8, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('23b67efa-1171-431c-a912-007dd30ddc9a', 'TECHMAS10P-74CD-GEX3-KIIY-OZE3', '10% Off', '10% discount coupon', 8, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('8666c5e8-aa79-4e05-9e30-ff145e5a3ca5', 'TECHMAS20P-A73G-MUK4-EV7L-NF4S', '20% Off', '20% discount coupon', 10, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('f5e8f3ab-406f-4368-a9ba-369fe5fc984c', 'TECHMAS20P-PW77-A3OG-WKPI-O93M', '20% Off', '20% discount coupon', 10, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('71376646-a034-4c55-ab1d-442e3f425127', 'TECHMAS10-RZ74-GK5Q-VUB3-5M6F', '€10 Off', '€10 discount coupon', 11, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('251f60c2-93f7-4646-af86-ff5632b35802', 'TECHMAS10P-RKAR-7P2Z-OGQU-BN2F', '10% Off', '10% discount coupon', 11, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('77117fb1-e97d-4b4d-8607-7d3a34d48ea1', 'TECHMAS20-WERG-LSQR-D6HZ-IPUU', '€20 Off', '€20 discount coupon', 11, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('0193adca-643f-4b12-a3cc-72a07ebc938d', 'TECHMAS20P-4NWZ-PLEV-AKH5-6IW4', '20% Off', '20% discount coupon', 11, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('5e8aa31f-bb32-49b9-97dd-f4fdaef209e7', 'TECHMAS20P-DWXU-ZK2B-25YD-YWFY', '20% Off', '20% discount coupon', 11, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('62096850-b1cb-428c-8cc6-6a3952fedbbb', 'TECHMAS50-F69Z-DL2M-BNMD-FHSW', '€50 Off', '€50 discount coupon', 11, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('f62e87fa-8e71-4792-a668-367f47272b2b', 'TECHMAS10P-IHKD-BQTQ-XUAY-RF6B', '10% Off', '10% discount coupon', 6, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('4a14ce95-4a94-4938-b60a-5496df2fd54c', 'TECHMAS20-SK3X-GC59-LKEN-YM3Q', '€20 Off', '€20 discount coupon', 7, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('96a0ac92-fcd5-45a0-a671-c46e426c1fc6', 'TECHMAS10P-7N5I-BDB4-H3AD-C6NS', '10% Off', '10% discount coupon', 7, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('00812403-ae3d-4a24-84f5-387aae3f4fdf', 'TECHMAS50-Q5GE-A73Y-7TKU-BYDD', '€50 Off', '€50 discount coupon', 3, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('fe45c8b5-94a2-405f-8f46-484959325aab', 'TECHMAS10P-DF4T-T6BL-76XE-NKLY', '10% Off', '10% discount coupon', 3, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('b7eb1592-5d52-4a3b-a9d3-3421cde174e3', 'TECHMAS10-4YC2-9G6P-7SCH-LSNG', '€10 Off', '€10 discount coupon', 4, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('4f162014-c5fb-4213-9023-73b3ea61f9ea', 'TECHMAS20-CTNB-G4UG-3KKB-VELM', '€20 Off', '€20 discount coupon', 1, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('ec8d8584-9ab6-4b04-bcc4-4d1382a7caf9', 'TECHMAS20-FSH3-UKT4-PTDG-MANF', '€20 Off', '€20 discount coupon', 3, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('f5c4fe2f-8a6d-49e6-b46e-ff322b793ca9', 'TECHMAS20-RBDZ-S3XO-TQHP-3S6E', '€20 Off', '€20 discount coupon', 12, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('bbb7a728-d0f0-4671-8219-1bff781e7f05', 'TECHMAS10P-GQ43-E7C9-KP75-Y2MH', '10% Off', '10% discount coupon', 12, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL),
	('e622e931-826b-4bf6-b9a8-8b4bcbc9c45b', 'TECHMAS20P-VPOH-CXW5-OMVU-EY3A', '20% Off', '20% discount coupon', 3, false, NULL, NULL, '2025-11-08 15:54:13.777395+00', NULL);


--
-- Data for Name: gifts; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."gifts" ("id", "day_number", "gift_name", "image_url", "buy_now_link") VALUES
	('298fd76a-a021-44e5-95dc-1bd121d75291', 8, 'Ninja Coffee Machine', 'https://zmcpuafumcwgueedzmrq.supabase.co/storage/v1/object/public/gifts_images/8.webp', 'https://www.currys.ie/products/ninja-luxe-cafe-premier-series-es601uk-bean-to-cup-coffee-machine-silver-and-black-10270794.html
'),
	('c9187772-6f4c-45c3-bc5c-e369ca773213', 9, 'Sony Headphones', 'https://zmcpuafumcwgueedzmrq.supabase.co/storage/v1/object/public/gifts_images/9.webp', 'https://www.currys.ie/products/sony-wh1000xm6-wireless-bluetooth-noisecancelling-headphones-black-10282441.html
'),
	('74d9def8-ef3d-4315-bd2b-5abcf8d0d2fb', 10, 'Shark FlexStyle', 'https://zmcpuafumcwgueedzmrq.supabase.co/storage/v1/object/public/gifts_images/10.webp', 'https://www.currys.ie/products/shark-flexstyle-hd446sluk-5in1-air-styler-and-hair-dryer-stone-10274775.html
'),
	('b444b7cc-b0ac-491d-9a7e-ca1f1c6de1d1', 11, 'Bartesian Cocktail Maker', 'https://zmcpuafumcwgueedzmrq.supabase.co/storage/v1/object/public/gifts_images/11.webp', 'https://www.currys.ie/products/bartesian-55300-cocktail-maker-grey-10269608.html
'),
	('9f35fc03-b35d-4edb-95ad-8a69bf7b1301', 12, 'Acer 514 Chromebook', 'https://zmcpuafumcwgueedzmrq.supabase.co/storage/v1/object/public/gifts_images/12.webp', 'https://www.currys.ie/products/acer-514-14-chromebook-plus-intel-core-3-128-gb-emmc-grey-10282165.html
'),
	('17518377-149a-479a-b21e-6b77a3f12b82', 1, 'HP Omnibook Laptop', 'https://zmcpuafumcwgueedzmrq.supabase.co/storage/v1/object/public/gifts_images/1.webp', 'https://www.currys.ie/products/hp-omnibook-5-16-laptop-intel-core-i3-512-gb-ssd-silver-10283297.html
'),
	('7e4ada37-bfb4-4f09-b0b5-f1c954bb1422', 2, 'PlayStation 5', 'https://zmcpuafumcwgueedzmrq.supabase.co/storage/v1/object/public/gifts_images/2.webp', 'https://www.currys.ie/products/sony-playstation-5-digital-edition-10291988.html
'),
	('8674cf47-9985-4db6-ad29-1a163ec7558b', 3, 'Nintendo Switch 2', 'https://zmcpuafumcwgueedzmrq.supabase.co/storage/v1/object/public/gifts_images/3.webp', 'https://www.currys.ie/products/nintendo-switch-2-and-mario-kart-world-bundle-10281816.html
'),
	('8e8475c2-f6a2-4238-a068-4f5e553ce84a', 4, 'Samsung Galaxy A26', 'https://zmcpuafumcwgueedzmrq.supabase.co/storage/v1/object/public/gifts_images/4.webp', 'https://www.currys.ie/products/samsung-galaxy-a26-5g-256-gb-black-10278402.html
'),
	('02e0b6a6-dc5e-423d-83bb-8ae7a9051275', 5, 'LG 55" OLED TV', 'https://zmcpuafumcwgueedzmrq.supabase.co/storage/v1/object/public/gifts_images/5.webp', 'https://www.currys.ie/products/lg-g5-55-oled-evo-ai-4k-hdr-smart-tv-2025-wall-mount-version-oled55g54lw-10284437.html
'),
	('27763b10-6796-4bec-8ef3-4e9a16bad4ed', 6, 'Eufy Robot Vacuum', 'https://zmcpuafumcwgueedzmrq.supabase.co/storage/v1/object/public/gifts_images/6.webp', 'https://www.currys.ie/products/eufy-l60-hybrid-ses-robot-vacuum-cleaner-black-10261492.html
'),
	('1504190b-c20c-4473-a13f-c7561fac1cb8', 7, 'Ninja Air Fryer', 'https://zmcpuafumcwgueedzmrq.supabase.co/storage/v1/object/public/gifts_images/7.webp', 'https://www.currys.ie/products/ninja-foodi-max-dual-zone-af400ukwh-air-fryer-white-10256363.html
');


--
-- Data for Name: user_day_participation; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: user_gift_enrollments; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- PostgreSQL database dump complete
--

-- \unrestrict mn4aZp8La2JocxiOnVZGbJCZ7Z3mUWoqCkLsSu1VsOa5lbgwIF6wIOTO5p5WXbB

RESET ALL;
