import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #232D1F 0%, #121212 58%, #5A3825 100%)",
          color: "#F6EDDF"
        }}
      >
        <div style={{ color: "#B69054", fontSize: 24, letterSpacing: 8, textTransform: "uppercase" }}>
          Almancil - Algarve - Since 1986
        </div>
        <div style={{ marginTop: 32, maxWidth: 900, fontSize: 86, lineHeight: 0.94, fontWeight: 600 }}>
          Restaurante Figueiral
        </div>
        <div style={{ marginTop: 34, maxWidth: 820, fontSize: 34, lineHeight: 1.25, color: "rgba(246, 237, 223, 0.78)" }}>
          Premium picanha, wine and Mediterranean hospitality.
        </div>
      </div>
    ),
    size
  );
}
