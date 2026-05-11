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
          background: "linear-gradient(135deg, #F3EEE7 0%, #EFE7DD 58%, #DDD0C1 100%)",
          color: "#2B211B"
        }}
      >
        <div style={{ color: "#A67C52", fontSize: 24, letterSpacing: 8, textTransform: "uppercase" }}>
          Almancil - Algarve - Since 1986
        </div>
        <div style={{ marginTop: 32, maxWidth: 900, fontSize: 86, lineHeight: 0.94, fontWeight: 600 }}>
          Restaurante Figueiral
        </div>
        <div style={{ marginTop: 34, maxWidth: 820, fontSize: 34, lineHeight: 1.25, color: "rgba(110, 98, 87, 0.92)" }}>
          Premium picanha, wine and Mediterranean hospitality.
        </div>
      </div>
    ),
    size
  );
}
