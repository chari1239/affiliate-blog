import { ImageResponse } from "next/og";

export const alt = "Nihon Diaries by Hari — Learn Japanese and life in Japan, through an Indian lens";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";
export const runtime = "edge";

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
          padding: "72px",
          backgroundColor: "#fffbf2",
          color: "#1f1713",
          fontFamily: "Arial, sans-serif"
        }}
      >
        <div
          style={{
            width: "120px",
            height: "8px",
            marginBottom: "42px",
            borderRadius: "999px",
            backgroundColor: "#c63e36"
          }}
        />
        <div style={{ fontSize: "76px", fontWeight: 700, lineHeight: 1.05 }}>
          {"Nihon Diaries by Hari"}
        </div>
        <div style={{ marginTop: "28px", fontSize: "34px", lineHeight: 1.35, color: "#615349" }}>
          {"Learn Japanese & life in Japan — through an Indian lens"}
        </div>
      </div>
    ),
    { ...size }
  );
}
