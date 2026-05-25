import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "#1a1008",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
          fontSize: 100,
          color: "#c9a96e",
          fontWeight: 700,
          letterSpacing: "-2px"
        }}
      >
        F
      </div>
    ),
    { ...size }
  );
}
