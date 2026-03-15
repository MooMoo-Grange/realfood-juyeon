import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "리얼푸드 주연 — 진짜 음식이 진짜 건강입니다";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1A2E1A 0%, #3D7A4A 50%, #2D5A35 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(196, 154, 60, 0.15)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -40,
            left: -40,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.08)",
            display: "flex",
          }}
        />

        {/* Icon */}
        <div
          style={{
            fontSize: 72,
            marginBottom: 20,
            display: "flex",
          }}
        >
          🥬
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: -2,
            marginBottom: 12,
            display: "flex",
          }}
        >
          리얼푸드 주연
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            color: "rgba(255, 255, 255, 0.85)",
            fontWeight: 500,
            marginBottom: 32,
            display: "flex",
          }}
        >
          진짜 음식이 진짜 건강입니다
        </div>

        {/* Divider */}
        <div
          style={{
            width: 80,
            height: 3,
            background: "#C49A3C",
            borderRadius: 2,
            marginBottom: 32,
            display: "flex",
          }}
        />

        {/* Description */}
        <div
          style={{
            fontSize: 22,
            color: "rgba(255, 255, 255, 0.7)",
            fontWeight: 400,
            display: "flex",
          }}
        >
          보건소 영양사가 해발 1,000m 목장에서 전하는 진짜 음식 이야기
        </div>

        {/* Bottom tags */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            gap: 16,
          }}
        >
          {["초가공식품 OUT", "리얼푸드 IN", "A2 우유", "무무목장"].map(
            (tag) => (
              <div
                key={tag}
                style={{
                  background: "rgba(255, 255, 255, 0.15)",
                  color: "rgba(255, 255, 255, 0.9)",
                  padding: "8px 20px",
                  borderRadius: 100,
                  fontSize: 16,
                  fontWeight: 600,
                  display: "flex",
                }}
              >
                {tag}
              </div>
            )
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
