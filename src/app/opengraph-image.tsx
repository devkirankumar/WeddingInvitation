import { ImageResponse } from "next/og";
import { wedding } from "@/config/wedding";
import { formatLongDate } from "@/lib/utils";

export const runtime = "nodejs";
export const alt = wedding.site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const { groom, bride } = wedding.couple;
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
          background: "radial-gradient(70% 62% at 50% 50%, #fdf4e3 35%, #f1d29a 80%, #e7bd72 100%)",
          color: "#4A3E20",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: 28, left: 28, right: 28, bottom: 28, display: "flex", border: "1px solid rgba(176,144,96,0.6)" }} />
        <div style={{ fontSize: 22, letterSpacing: 4, color: "#7A6840" }}>{`|| ${wedding.blessing} ||`}</div>
        <div style={{ fontSize: 30, marginTop: 26, color: "#7A6840", fontStyle: "italic" }}>Save the Date</div>
        <div style={{ fontSize: 92, marginTop: 8, letterSpacing: 8, textTransform: "uppercase" }}>{groom.short}</div>
        <div style={{ fontSize: 36, fontStyle: "italic", color: "#B09060" }}>and</div>
        <div style={{ fontSize: 92, letterSpacing: 8, textTransform: "uppercase" }}>{bride.short}</div>
        <div style={{ display: "flex", width: 140, height: 1, background: "#B09060", margin: "26px 0 20px" }} />
        <div style={{ fontSize: 26, letterSpacing: 4, textTransform: "uppercase" }}>{formatLongDate(wedding.weddingDate)}</div>
        <div style={{ fontSize: 22, marginTop: 8, color: "#7A6840" }}>{`${wedding.venue.name}, Cuttack`}</div>
      </div>
    ),
    size,
  );
}
