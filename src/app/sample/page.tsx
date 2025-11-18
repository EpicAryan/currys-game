"use client";

import { useCurrentCampaign } from "@/hooks/useCurrentCampaign";

export default function SamplePage() {
  const { isLoading, gifts, currentDay, isActive, campaignConfig } =
    useCurrentCampaign();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-lg">Loading campaign...</p>
        </div>
      </div>
    );
  }

  if (!isActive || !campaignConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😴</div>
          <h1 className="text-2xl font-bold mb-2">No Active Campaign</h1>
          <p className="text-gray-600">Check back later!</p>
        </div>
      </div>
    );
  }

  const missedGifts = gifts.filter((g) => g.missed);
  const lockedGifts = gifts.filter((g) => g.locked);
  const availableGift = gifts.find((g) => g.available);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">
            🎁 12 Days of Currys Campaign
          </h1>
          <p className="text-xl text-gray-600">
            Current Day:{" "}
            <span className="font-bold text-purple-600">{currentDay}</span> / 12
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Campaign runs from{" "}
            {new Date(campaignConfig.campaign_start_date).toLocaleDateString()}{" "}
            to {new Date(campaignConfig.campaign_end_date).toLocaleDateString()}
          </p>
        </div>

        {/* Available Gift - Highlighted */}
        {availableGift && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-center">
              🎉 Today&apos;s Gift (Day {availableGift.dayNumber})
            </h2>
            <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-8 text-white shadow-2xl transform hover:scale-105 transition-transform">
              <div className="text-center">
                <div className="text-6xl mb-4">🎁</div>
                <h3 className="text-3xl font-bold mb-2">
                  Day {availableGift.dayNumber}
                </h3>
                <p className="text-xl mb-6">Available Now!</p>
                <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors">
                  Claim Your Gift
                </button>
              </div>
            </div>
          </div>
        )}

        {/* All Gifts Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            All Campaign Days
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {gifts.map((gift) => {
              let bgColor = "";
              let icon = "";
              let statusText = "";
              let textColor = "";

              if (gift.missed) {
                bgColor = "bg-gray-200";
                icon = "❌";
                statusText = "Missed";
                textColor = "text-gray-600";
              } else if (gift.locked) {
                bgColor = "bg-blue-100";
                icon = "🔒";
                statusText = "Locked";
                textColor = "text-blue-600";
              } else if (gift.available) {
                bgColor = "bg-green-200";
                icon = "✨";
                statusText = "Available";
                textColor = "text-green-700";
              }

              return (
                <div
                  key={gift.dayNumber}
                  className={`${bgColor} rounded-lg p-6 text-center transition-all hover:shadow-lg`}
                >
                  <div className="text-4xl mb-2">{icon}</div>
                  <h3 className="text-lg font-bold mb-1">
                    Day {gift.dayNumber}
                  </h3>
                  <p className={`text-sm font-semibold ${textColor}`}>
                    {statusText}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          <div className="bg-red-100 rounded-lg p-6 text-center">
            <div className="text-3xl mb-2">❌</div>
            <h3 className="text-2xl font-bold text-red-700">
              {missedGifts.length}
            </h3>
            <p className="text-sm text-red-600 font-semibold">Missed Gifts</p>
          </div>

          <div className="bg-green-100 rounded-lg p-6 text-center">
            <div className="text-3xl mb-2">✨</div>
            <h3 className="text-2xl font-bold text-green-700">
              {availableGift ? "1" : "0"}
            </h3>
            <p className="text-sm text-green-600 font-semibold">
              Available Today
            </p>
          </div>

          <div className="bg-blue-100 rounded-lg p-6 text-center">
            <div className="text-3xl mb-2">🔒</div>
            <h3 className="text-2xl font-bold text-blue-700">
              {lockedGifts.length}
            </h3>
            <p className="text-sm text-blue-600 font-semibold">
              Upcoming Gifts
            </p>
          </div>
        </div>

        {/* Debug Info */}
        <details className="mt-8 bg-white rounded-lg p-4">
          <summary className="cursor-pointer font-bold text-gray-700">
            🔍 Debug Information
          </summary>
          <pre className="mt-4 text-xs bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(
              {
                currentDay,
                isActive,
                campaignStart: campaignConfig.campaign_start_date,
                campaignEnd: campaignConfig.campaign_end_date,
                gifts: gifts.map((g) => ({
                  day: g.dayNumber,
                  missed: g.missed,
                  locked: g.locked,
                  available: g.available,
                  image_url: g.image_url,
                  gift_name: g.gift_name,
                })),
              },
              null,
              2
            )}
          </pre>
        </details>
      </div>
    </div>
  );
}
