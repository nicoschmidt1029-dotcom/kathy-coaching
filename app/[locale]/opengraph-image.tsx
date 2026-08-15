import { ImageResponse } from "next/og";
import { SITE_HOST } from "@/lib/site-url";

/**
 * TRANSLATION TODO: the same English card is generated for /en, /de and /sk.
 * The headline is hand-split across two lines (roman + italic accent), which
 * does not survive a naive translation — localizing this needs a per-locale
 * line break, not just a swapped string.
 */
export const alt =
  "Katey Coaching — Faith-rooted training, nutrition & Christian mentoring";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Old-browser UA forces Google Fonts to return TTF instead of WOFF2
// (Satori, the renderer behind next/og, does not decode WOFF2).
const LEGACY_UA =
  "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko";

async function fetchGoogleFont(family: string, params: string) {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${family}:${params}&display=swap`;
  const css = await fetch(cssUrl, {
    headers: { "User-Agent": LEGACY_UA },
  }).then((r) => r.text());
  const url = css.match(/src:\s*url\((https?:[^)]+)\)/)?.[1];
  if (!url) throw new Error(`Font URL not found for ${family} ${params}`);
  return fetch(url).then((r) => r.arrayBuffer());
}

export default async function Image() {
  const [regular, italic] = await Promise.all([
    fetchGoogleFont("Instrument+Serif", "wght@400"),
    fetchGoogleFont("Instrument+Serif", "ital,wght@1,400"),
  ]);

  // Matches app/globals.css :root — kept in hex here because Satori (the
  // renderer behind next/og) can't read CSS custom properties.
  const CREAM = "#FBF8F2";
  const CHARCOAL = "#2E2822";
  const PETROL = "#1B2E3D";
  const GOLD = "#C9973E";

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: CREAM,
          color: CHARCOAL,
          padding: "72px 88px",
          fontFamily: "Instrument Serif",
        }}
      >
        {/* Soft sand wash, bottom-left — kept off-canvas so it doesn't overlap the meta row */}
        <div
          style={{
            position: "absolute",
            bottom: -220,
            left: -220,
            width: 380,
            height: 380,
            borderRadius: 190,
            background:
              "radial-gradient(closest-side, rgba(212, 190, 158, 0.32), transparent 70%)",
            display: "flex",
          }}
        />

        {/* Top: brand mark */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span
            style={{
              fontSize: 24,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: PETROL,
              fontWeight: 400,
              fontStyle: "normal",
            }}
          >
            Katey Coaching
          </span>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              background: GOLD,
              display: "flex",
            }}
          />
        </div>

        {/* Center: headline over two lines */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            maxWidth: 1000,
          }}
        >
          <span
            style={{
              fontSize: 96,
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              fontWeight: 400,
              fontStyle: "normal",
              color: CHARCOAL,
            }}
          >
            Sometimes you just need
          </span>
          <span
            style={{
              fontSize: 96,
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              fontStyle: "italic",
              fontWeight: 400,
              color: CHARCOAL,
            }}
          >
            the right direction.
          </span>
          <span
            style={{
              marginTop: 36,
              fontSize: 30,
              lineHeight: 1.35,
              letterSpacing: "-0.01em",
              color: "rgba(55, 48, 42, 0.62)",
              fontWeight: 400,
              fontStyle: "normal",
              maxWidth: 820,
            }}
          >
            One-on-one training · meal plan based on your goals · spiritual
            health.
          </span>
        </div>

        {/* Bottom: meta row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: 20,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(55, 48, 42, 0.5)",
              fontWeight: 400,
              fontStyle: "normal",
            }}
          >
            Six-week program · 1:1
          </span>
          <span
            style={{
              fontSize: 22,
              color: PETROL,
              fontWeight: 400,
              fontStyle: "normal",
            }}
          >
            {SITE_HOST}
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Instrument Serif",
          data: regular,
          weight: 400,
          style: "normal",
        },
        {
          name: "Instrument Serif",
          data: italic,
          weight: 400,
          style: "italic",
        },
      ],
    }
  );
}
