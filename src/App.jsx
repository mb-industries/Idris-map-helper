import React, { useRef, useState, useEffect } from "react";
import "./App.css";

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
    ROOMS.forEach((room) => {
      const r = room.rect;
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
      ROOMS.forEach((room) => {
        const r = room.rect;
        let dx = 0;
        if (pctX < r.left) dx = r.left - pctX;
        else if (pctX > r.left + r.width) dx = pctX - (r.left + r.width);
        let dy = 0;
        if (pctY < r.top) dy = r.top - pctY;
        else if (pctY > r.top + r.height) dy = pctY - (r.top + r.height);
        const d = Math.hypot(dx, dy);
        if (best === null || d < best.dist) {
          best = { dist: d, rect: r };
        }
      });
      if (best) {
        const r = best.rect;
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

    const el = imgRef.current;
    if (!el) return;
    const domRect = el.getBoundingClientRect();

    const eligible = ROOMS.filter((r) => {
      const px = { x: (r.x / 100) * domRect.width, y: (r.y / 100) * domRect.height };
      return dist(px, clickPx) >= minDistance;
    });

    if (eligible.length === 0) {
      setPicked(null);
      setLastError(
        "No rooms meet that minimum distance. Reduce the minimum distance or click a different spot."
      );
      return;
    }

    const choice = eligible[Math.floor(Math.random() * eligible.length)];
    const choicePx = {
      x: (choice.x / 100) * domRect.width,
      y: (choice.y / 100) * domRect.height,
    };
    setPicked({ ...choice, px: choicePx });
    setLastError("");
  }

  return (
    <div className="app">
      <h1 className="app-title">IDRIS-P Room Picker</h1>

      <div className="map-container">
        <img
          ref={imgRef}
          src={`${import.meta.env.BASE_URL}idris_map.png`}
          alt="IDRIS-P Main Deck map"
          className="map-image"
          onClick={handleMapClick}
          draggable={false}
        />

        {clickPx && (
          <Marker x={clickPx.x} y={clickPx.y} label="You are here" ring />
        )}

        {picked && (
          <Marker x={picked.px.x} y={picked.px.y} label={picked.name} />
        )}
      </div>

      <div className="controls-panel">
        <div style={{ display: "grid", gap: 10 }}>
          <div>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>Minimum distance</div>
            <input
              type="range"
              min={0}
              max={500}
              step={5}
              value={minDistance}
              onChange={(e) => setMinDistance(Number(e.target.value))}
              style={{ width: "100%" }}
            />
            <div style={{ opacity: 0.8, marginTop: 6 }}>{minDistance}px</div>
            <div style={{ fontSize: 12, opacity: 0.75, marginTop: 6 }}>
              Distance is measured in <b>on-screen pixels</b> (what you see), so resizing the map changes distances.
            </div>
          </div>

          <button onClick={pickRoom} className="panel-btn">
            Pick a random room
          </button>

          <div style={{ fontSize: 14 }}>
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
            <div className="error-box">
              {lastError}
            </div>
          )}
        </div>
      </div>

      <Timer />
    </div>
  );
}

function playBeep() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const times = [0, 0.25, 0.5];
  times.forEach((t) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "square";
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.3, ctx.currentTime + t);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.2);
    osc.connect(gain).connect(ctx.destination);
    osc.start(ctx.currentTime + t);
    osc.stop(ctx.currentTime + t + 0.2);
  });
}

function Timer() {
  const [seconds, setSeconds] = useState(90);
  const [running, setRunning] = useState(false);
  const [remaining, setRemaining] = useState(90);
  const intervalRef = useRef(null);

  function start() {
    if (running) return;
    setRemaining(seconds);
    setRunning(true);
  }

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setRunning(false);
          playBeep();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const stop = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setRemaining(seconds);
  };

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const display = `${mins}:${secs.toString().padStart(2, "0")}`;
  const isAlarm = !running && remaining === 0;

  return (
    <div className="timer-panel">
      <div style={{ fontWeight: 700, marginBottom: 8 }}>Timer</div>

      <div className="timer-display" style={{ color: isAlarm ? "#ff4444" : "#fff" }}>
        {display}
      </div>

      {!running && (
        <div className="timer-adjust">
          <button
            onClick={() => { setSeconds((s) => Math.max(30, s - 30)); setRemaining((r) => running ? r : Math.max(30, seconds - 30)); }}
            className="panel-btn timer-adjust-btn"
          >-</button>
          <span style={{ fontSize: "0.8rem", opacity: 0.8 }}>{Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, "0")}</span>
          <button
            onClick={() => { setSeconds((s) => Math.min(600, s + 30)); setRemaining((r) => running ? r : Math.min(600, seconds + 30)); }}
            className="panel-btn timer-adjust-btn"
          >+</button>
        </div>
      )}

      <div className="timer-buttons" style={{ gridTemplateColumns: running ? "1fr 1fr" : "1fr" }}>
        {!running ? (
          <button onClick={start} className="panel-btn">Start</button>
        ) : (
          <>
            <button onClick={stop} className="panel-btn">Stop</button>
            <button onClick={reset} className="panel-btn">Reset</button>
          </>
        )}
      </div>
    </div>
  );
}

function Marker({ x, y, label, ring = false }) {
  return (
    <div className="marker" style={{ left: x, top: y }}>
      <div className="marker-dot">
        {ring && <div className="marker-ring" />}
      </div>
      <div className="marker-label" title={label}>
        {label}
      </div>
    </div>
  );
}
