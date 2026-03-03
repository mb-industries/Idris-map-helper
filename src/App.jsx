import React, { useMemo, useRef, useState, useEffect } from "react";

/**
 * Setup:
 * 1) Put your map image at: /public/idris_map.png
 * 2) Use <RoomPicker /> in your app.
 *
 * Coordinates:
 * - ROOMS use x/y as percentages of the image (0..100).
 * - Distance is computed in *rendered pixels* so the slider matches what the user sees.
 */

const ROOMS = [
  {
    "id": "escape_pods_left",
    "name": "Escape Pods (Left)",
    "x": 11.9453125,
    "y": 49.25095638867636,
    "rect": {
      "left": 9.1171875,
      "top": 46.85768936495792,
      "width": 5.65625,
      "height": 4.786534047436878
    }
  },
  {
    "id": "med_bay",
    "name": "Med Bay",
    "x": 21.30859375,
    "y": 49.03825554705432,
    "rect": {
      "left": 18.7734375,
      "top": 43.240244835501144,
      "width": 5.0703125,
      "height": 11.59602142310635
    }
  },
  {
    "id": "cargo_room",
    "name": "Cargo Room",
    "x": 27.87109375,
    "y": 49.34353481254782,
    "rect": {
      "left": 24.59375,
      "top": 42.81866870696251,
      "width": 6.554687499999999,
      "height": 13.049732211170621
    }
  },
  {
    "id": "xo",
    "name": "XO",
    "x": 38.66796875,
    "y": 45.38179035960215,
    "rect": {
      "left": 37.6171875,
      "top": 43.71537872991584,
      "width": 2.1015625,
      "height": 3.33282325937261
    }
  },
  {
    "id": "captain",
    "name": "Captain",
    "x": 38.734375,
    "y": 55.95026778882938,
    "rect": {
      "left": 37.5078125,
      "top": 51.03213465952563,
      "width": 2.453125,
      "height": 9.836266258607498
    }
  },
  {
    "id": "bathroom_center",
    "name": "Bathroom",
    "x": 43.90234375,
    "y": 49.38714613618975,
    "rect": {
      "left": 41.7578125,
      "top": 42.517980107115534,
      "width": 4.2890625,
      "height": 13.73833205814843
    }
  },
  {
    "id": "mess_hall",
    "name": "Mess Hall",
    "x": 49.1640625,
    "y": 49.234123947972456,
    "rect": {
      "left": 46.609375,
      "top": 42.517980107115534,
      "width": 5.109375,
      "height": 13.432287681713849
    }
  },
  {
    "id": "sleeping_quarters",
    "name": "Sleeping Quarters",
    "x": 54.296875,
    "y": 49.00459066564652,
    "rect": {
      "left": 52.5234375,
      "top": 40.68171384850803,
      "width": 3.546875,
      "height": 16.64575363427697
    }
  },
  {
    "id": "pilot_berthing_1",
    "name": "Pilot Berthing 1",
    "x": 57.39453125,
    "y": 40.88982402448355,
    "rect": {
      "left": 56.65625,
      "top": 36.50726855394032,
      "width": 1.4765625,
      "height": 8.765110941086458
    }
  },
  {
    "id": "cargo_bay",
    "name": "Cargo Bay",
    "x": 63.84375,
    "y": 49.03213465952563,
    "rect": {
      "left": 60.390625,
      "top": 40.1354246365723,
      "width": 6.906249999999998,
      "height": 17.793420045906657
    }
  },
  {
    "id": "lift_room",
    "name": "Lift Room",
    "x": 73.71484375,
    "y": 49.19051262433052,
    "rect": {
      "left": 71.8828125,
      "top": 45.72609028309105,
      "width": 3.6640625,
      "height": 6.9288446824789585
    }
  },
  {
    "id": "engine_room",
    "name": "Engine Room",
    "x": 80.12109375,
    "y": 47.35424636572303,
    "rect": {
      "left": 75.90625,
      "top": 41.977046671767404,
      "width": 8.4296875,
      "height": 10.75439938791125
    }
  },
  {
    "id": "briefing_room",
    "name": "Briefing Room",
    "x": 93.19531250089406,
    "y": 49.121652521296106,
    "rect": {
      "left": 25.39062500178814,
      "top": 44.57842387146136,
      "width": 15.60937499821186,
      "height": 9.086457299669494
    }
  },
  {
    "id": "shooting_range",
    "name": "Shooting Range",
    "x": 68.12109375,
    "y": 13.638867635807191,
    "rect": {
      "left": 63.9453125,
      "top": 11.781178270849272,
      "width": 8.3515625,
      "height": 3.7153787299158383
    }
  },
  {
    "id": "ready_room",
    "name": "Ready Room",
    "x": 73.984375,
    "y": 13.715378729915837,
    "rect": {
      "left": 72.40625,
      "top": 11.934200459066565,
      "width": 3.15625,
      "height": 3.562356541698546
    }
  },
  {
    "id": "armory",
    "name": "Armory",
    "x": 72.9453125,
    "y": 20.56235654169855,
    "rect": {
      "left": 70.5078125,
      "top": 19.852333588370314,
      "width": 4.875000000000002,
      "height": 1.4200459066564655
    }
  },
  {
    "id": "brig",
    "name": "Brig",
    "x": 69.83203125,
    "y": 82.04284621270084,
    "rect": {
      "left": 63.703125,
      "top": 79.11400153022188,
      "width": 12.2578125,
      "height": 5.857689364957919
    }
  },
  {
    "id": "guard_room",
    "name": "Guard Room",
    "x": 74.45703125,
    "y": 84.70390206579954,
    "rect": {
      "left": 73.40625,
      "top": 83.19051262433052,
      "width": 2.1015625,
      "height": 3.026778882938027
    }
  },
  {
    "id": "bridge_top",
    "name": "Bridge (Top)",
    "x": 66,
    "y": 22,
    "rect": {
      "left": 62,
      "top": 18,
      "width": 8,
      "height": 8
    }
  },
  {
    "id": "bridge_bottom",
    "name": "Bridge (Bottom)",
    "x": 67,
    "y": 91,
    "rect": {
      "left": 63,
      "top": 87,
      "width": 8,
      "height": 8
    }
  }
];


function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function dist(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.hypot(dx, dy);
}

export default function RoomPicker() {
  const imgRef = useRef(null);
  const [clickPx, setClickPx] = useState(null); // {x,y} in rendered pixels
  const [minDistance, setMinDistance] = useState(180); // pixels
  const [picked, setPicked] = useState(null); // room object
  const [lastError, setLastError] = useState("");

  const roomPx = useMemo(() => {
    const el = imgRef.current;
    if (!el) return [];

    const rect = el.getBoundingClientRect();
    return ROOMS.map((r) => ({
      ...r,
      px: {
        x: (r.x / 100) * rect.width,
        y: (r.y / 100) * rect.height,
      },
    }));
  }, [imgRef.current]); // eslint-disable-line react-hooks/exhaustive-deps

  // state for editable room rectangles (percentages)
  const DEFAULT_SIZE = 8;
  const [rects, setRects] = useState(() => {
    const saved = window.localStorage.getItem("idris-room-rects");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    const init = {};
    ROOMS.forEach((r) => {
      init[r.id] = {
        left: r.x - DEFAULT_SIZE / 2,
        top: r.y - DEFAULT_SIZE / 2,
        width: DEFAULT_SIZE,
        height: DEFAULT_SIZE,
      };
    });
    return init;
  });

  const draggingRef = useRef(null);

  function handleMouseMove(e) {
    if (!draggingRef.current) return;
    const { id, corner, startX, startY, origRect } = draggingRef.current;
    const el = imgRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = ((e.clientX - startX) / rect.width) * 100;
    const dy = ((e.clientY - startY) / rect.height) * 100;
    let { left, top, width, height } = origRect;
    switch (corner) {
      case "tl":
        left += dx;
        top += dy;
        width -= dx;
        height -= dy;
        break;
      case "tr":
        top += dy;
        width += dx;
        height -= dy;
        break;
      case "bl":
        left += dx;
        width -= dx;
        height += dy;
        break;
      case "br":
        width += dx;
        height += dy;
        break;
      default:
        break;
    }
    width = Math.max(width, 1);
    height = Math.max(height, 1);
    setRects((r) => ({ ...r, [id]: { left, top, width, height } }));
  }

  function handleMouseUp() {
    draggingRef.current = null;
  }

  function startDrag(id, corner, e) {
    e.stopPropagation();
    draggingRef.current = {
      id,
      corner,
      startX: e.clientX,
      startY: e.clientY,
      origRect: rects[id],
    };
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [rects]);

  // save rects to localStorage whenever they change
  useEffect(() => {
    try {
      window.localStorage.setItem("idris-room-rects", JSON.stringify(rects));
    } catch {}
  }, [rects]);

  function handleMapClick(e) {
    const el = imgRef.current;
    if (!el) return;

    const domRect = el.getBoundingClientRect();
    let x = clamp(e.clientX - domRect.left, 0, domRect.width);
    let y = clamp(e.clientY - domRect.top, 0, domRect.height);

    // convert to percentage coordinates
    const pctX = (x / domRect.width) * 100;
    const pctY = (y / domRect.height) * 100;

    // check if point is inside any room rectangle
    let hitRect = null;
    Object.entries(rects).forEach(([id, r]) => {
      if (
        pctX >= r.left &&
        pctX <= r.left + r.width &&
        pctY >= r.top &&
        pctY <= r.top + r.height
      ) {
        hitRect = r;
      }
    });

    if (!hitRect) {
      // find nearest rect and clamp into it
      let best = null;
      Object.entries(rects).forEach(([id, r]) => {
        // compute distance from point to rectangle (0 if inside)
        let dx = 0;
        if (pctX < r.left) dx = r.left - pctX;
        else if (pctX > r.left + r.width) dx = pctX - (r.left + r.width);
        let dy = 0;
        if (pctY < r.top) dy = r.top - pctY;
        else if (pctY > r.top + r.height) dy = pctY - (r.top + r.height);
        const dist = Math.hypot(dx, dy);
        if (best === null || dist < best.dist) {
          best = { dist, rect: r };
        }
      });
      if (best) {
        const r = best.rect;
        // clamp pctX/pctY into that rect
        const clampedPctX = clamp(pctX, r.left, r.left + r.width);
        const clampedPctY = clamp(pctY, r.top, r.top + r.height);
        x = (clampedPctX / 100) * domRect.width;
        y = (clampedPctY / 100) * domRect.height;
      }
    }

    setClickPx({ x, y });
    setPicked(null);
    setLastError("");
  }

  function pickRoom() {
    if (!clickPx) {
      setLastError("Click a spot on the map first.");
      return;
    }

    const eligible = roomPx.filter((r) => dist(r.px, clickPx) >= minDistance);

    if (eligible.length === 0) {
      setPicked(null);
      setLastError(
        "No rooms meet that minimum distance. Reduce the minimum distance or click a different spot."
      );
      return;
    }

    const choice = eligible[Math.floor(Math.random() * eligible.length)];
    setPicked(choice);
    setLastError("");
  }

  return (
    <div
      style={{
        fontFamily: "system-ui, Arial",
        padding: 0,
        margin: 0,
        height: "100vh",
        width: "100vw",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* title can float above the map to save space */}
      <h1
        style={{
          margin: "0",
          position: "absolute",
          top: 16,
          left: 16,
          color: "white",
          textShadow: "0 0 4px rgba(0,0,0,0.7)",
          zIndex: 2,
        }}
      >
        IDRIS-P Room Picker
      </h1>

      {/* map fills the entire viewport */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "black",
        }}
      >
        <img
          ref={imgRef}
          src={`${import.meta.env.BASE_URL}idris_map.png`}
          alt="IDRIS-P Main Deck map"
          style={{ width: "100%", height: "100%", objectFit: "contain", cursor: "crosshair" }}
          onClick={handleMapClick}
          draggable={false}
        />

        {/* editable room boundaries */}
        {/* {Object.entries(rects).map(([id, rect]) => {
          const room = ROOMS.find((r) => r.id === id);
          return (
            <div
              key={id}
              style={{
                position: "absolute",
                left: `${rect.left}%`,
                top: `${rect.top}%`,
                width: `${rect.width}%`,
                height: `${rect.height}%`,
                border: "2px dashed yellow",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "yellow",
                fontSize: "0.75rem",
                textAlign: "center",
                padding: "2px",
              }}
            >
              {room?.name}
              {[
                ["tl", { left: 0, top: 0, cursor: "nwse-resize" }],
                ["tr", { right: 0, top: 0, cursor: "nesw-resize" }],
                ["bl", { left: 0, bottom: 0, cursor: "nesw-resize" }],
                ["br", { right: 0, bottom: 0, cursor: "nwse-resize" }],
              ].map(([corner, pos]) => (
                <div
                  key={corner}
                  onMouseDown={(e) => startDrag(id, corner, e)}
                  style={{
                    position: "absolute",
                    width: 8,
                    height: 8,
                    background: "yellow",
                    ...pos,
                    margin: -4,
                    zIndex: 3,
                  }}
                />
              ))}
            </div>
          );
        })} */}

        {/* Click marker */}
        {clickPx && (
          <Marker
            x={clickPx.x}
            y={clickPx.y}
            label="You are here"
            ring
          />
        )}

        {/* Picked room marker */}
        {picked && (
          <Marker
            x={picked.px.x}
            y={picked.px.y}
            label={picked.name}
          />
        )}
      </div>

      {/* controls overlayed on top of map, moved to bottom-left */}
      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: 16,
          width: 200,            // reduced size ~40%
          borderRadius: 12,
          padding: 10,
          background: "rgba(0,0,0,0.65)",
          color: "#fff",
          boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
          zIndex: 2,
          fontSize: "0.85rem",   // slightly smaller text
        }}
      >
          <div style={{ display: "grid", gap: 10 }}>
            <div>
              <div style={{ fontWeight: 600, marginBottom: 6, color: "#fff" }}>Minimum distance</div>
              <input
                type="range"
                min={0}
                max={500}
                step={5}
                value={minDistance}
                onChange={(e) => setMinDistance(Number(e.target.value))}
                style={{ width: "100%" }}
              />
              <div style={{ opacity: 0.8, marginTop: 6, color: "#fff" }}>{minDistance}px</div>
              <div style={{ fontSize: 12, opacity: 0.75, marginTop: 6, color: "#fff" }}>
                Distance is measured in <b>on-screen pixels</b> (what you see), so resizing the map changes distances.
              </div>
            </div>

            <button
              onClick={pickRoom}
              style={{
                padding: "8px 10px",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.5)",
                background: "rgba(255,255,255,0.15)",
                color: "#fff",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: "0.9rem",
              }}
            >
              Pick a random room
            </button>
            {/* <button
              onClick={() => {
                const data = ROOMS.map((r) => {
                  const rc = rects[r.id];
                  return {
                    ...r,
                    x: rc.left + rc.width / 2,
                    y: rc.top + rc.height / 2,
                    rect: rc,
                  };
                });
                const str = JSON.stringify(data, null, 2);
                navigator.clipboard.writeText(str).then(() => {
                  alert("Coordinates copied to clipboard");
                });
              }}
              style={{
                padding: "8px 10px",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.5)",
                background: "rgba(255,255,255,0.15)",
                color: "#fff",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: "0.9rem",
                marginTop: 6,
              }}
            >
              Export coords
            </button> */}

            <div style={{ fontSize: 14, color: "#fff" }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>Result</div>
              {picked ? (
                <div>
                  <div style={{ fontSize: 16 }}>{picked.name}</div>
                  <div style={{ fontSize: 12, opacity: 0.75 }}>
                    ({picked.x.toFixed(1)}%, {picked.y.toFixed(1)}%)
                  </div>
                </div>
              ) : (
                <div style={{ opacity: 0.75 }}>No room selected yet.</div>
              )}
            </div>

            {lastError && (
              <div
                style={{
                  background: "rgba(255,0,0,0.08)",
                  border: "1px solid rgba(255,0,0,0.25)",
                  padding: 10,
                  borderRadius: 10,
                  color: "#7a0b0b",
                }}
              >
                {lastError}
              </div>
            )}

          </div>
        </div>
      </div>

  );
}

function Marker({ x, y, label, ring = false }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
      }}
    >
      {/* dot */}
      <div
        style={{
          width: 12,
          height: 12,
          borderRadius: 999,
          background: "red",
          boxShadow: "0 2px 10px rgba(0,0,0,0.35)",
          position: "relative",
        }}
      >
        {ring && (
          <div
            style={{
              position: "absolute",
              inset: -10,
              borderRadius: 999,
              border: "2px solid rgba(255,0,0,0.45)",
              background: "rgba(255,0,0,0.07)",
            }}
          />
        )}
      </div>

      {/* label */}
      <div
        style={{
          marginTop: 8,
          background: "rgba(0,0,0,0.75)",
          color: "white",
          padding: "4px 8px",
          borderRadius: 999,
          fontSize: 12,
          maxWidth: 220,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        title={label}
      >
        {label}
      </div>
    </div>
  );
}