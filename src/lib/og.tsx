import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { isValidElement, type ReactNode } from "react";
import { GarmentArtSvg } from "@/components/GarmentArt";
import type { Silhouette, Tone } from "@/data/types";

/**
 * Branded 1200×630 social sharing image (Open Graph / Twitter / WhatsApp),
 * generated at build time by the og.png routes in src/app.
 */
export const ogSize = { width: 1200, height: 630 };

const read = (...p: string[]) => readFileSync(join(process.cwd(), ...p));
/** Serialises a hook-free SVG element tree (like GarmentArtSvg) to markup. */
function toSvg(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  if (Array.isArray(node)) return node.map(toSvg).join("");
  if (!isValidElement(node)) return "";
  const { type, props } = node as { type: unknown; props: Record<string, unknown> & { children?: ReactNode } };
  if (typeof type === "function") return toSvg((type as (p: unknown) => ReactNode)(props));
  if (typeof type !== "string") return toSvg(props.children);
  const attrs = Object.entries(props)
    .filter(([k, v]) => k !== "children" && k !== "className" && v !== undefined && v !== null && v !== false && typeof v !== "function")
    .map(([k, v]) => {
      const name = /^(viewBox|preserveAspectRatio|patternUnits|gradientUnits)$/.test(k) || k.startsWith("aria-")
        ? k
        : k.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase());
      return ` ${name}="${String(v).replace(/"/g, "&quot;")}"`;
    })
    .join("");
  return `<${type}${attrs}>${toSvg(props.children)}</${type}>`;
}

const svgData = (svg: string | Buffer) => `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

export function ogImage({
  eyebrow,
  title,
  subtitle,
  silhouette = "patiala",
  tone = "mustard",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  silhouette?: Silhouette;
  tone?: Tone;
}) {
  const logo = svgData(read("public", "brand", "ruhaniat-logo-horizontal.svg"));
  const art = svgData(
    toSvg(<GarmentArtSvg silhouette={silhouette} tone={tone} uid="og" />).replace(
      "<svg ",
      '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" ',
    ),
  );
  const long = title.length > 46;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#fbf7f0", position: "relative" }}>
        <div style={{ position: "absolute", top: 22, left: 22, right: 22, bottom: 22, border: "1.5px solid #d3bb8c", display: "flex" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 760, padding: "64px 40px 60px 72px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- rendered by next/og, not the browser */}
          <img src={logo} width={310} height={70} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "Jost", fontSize: 19, letterSpacing: 5, color: "#a9854a", textTransform: "uppercase" }}>
              {eyebrow}
            </div>
            <div
              style={{
                fontFamily: "Cormorant",
                fontSize: long ? 58 : 70,
                lineHeight: 1.04,
                color: "#4a1320",
                marginTop: 16,
              }}
            >
              {title}
            </div>
            {subtitle && (
              <div style={{ fontFamily: "Jost", fontSize: 24, lineHeight: 1.45, color: "#6f5d58", marginTop: 18 }}>{subtitle}</div>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", fontFamily: "Jost", fontSize: 18, letterSpacing: 3, color: "#6e1e2f" }}>
            <div style={{ width: 34, height: 1.5, background: "#a9854a", marginRight: 14 }} />
            CUSTOM STITCHING · WORLDWIDE SHIPPING
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", width: 440, paddingBottom: 22 }}>
          <div
            style={{
              display: "flex",
              width: 336,
              height: 470,
              borderTopLeftRadius: 168,
              borderTopRightRadius: 168,
              overflow: "hidden",
              border: "2px solid #d3bb8c",
              borderBottom: "none",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- rendered by next/og */}
            <img src={art} width={353} height={470} alt="" style={{ objectFit: "cover" }} />
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Cormorant", data: read("src", "assets", "fonts", "CormorantGaramond-Medium.ttf"), weight: 500, style: "normal" },
        { name: "Jost", data: read("src", "assets", "fonts", "Jost-Regular.ttf"), weight: 400, style: "normal" },
      ],
    },
  );
}
