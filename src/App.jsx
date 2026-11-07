import { useEffect, useMemo, useState } from "react";
import { CITIES } from "./cities.js";
import { wx, SKY, forecastUrl, searchUrl } from "./weather.js";

const loadSaved = () => {
  try { return JSON.parse(localStorage.getItem("city")); } catch { return null; }
};

export default function App() {
  const [city, setCity] = useState(loadSaved() || CITIES.find((c) => c.name === "Pune"));
  const [unit, setUnit] = useState("C");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [remote, setRemote] = useState([]);
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);
  const [retry, setRetry] = useState(0);

  // Live forecast from Open-Meteo (free, no API key)
  useEffect(() => {
    setData(null);
    setErr(null);
    fetch(forecastUrl(city))
      .then((r) => { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then(setData)
      .catch((e) => setErr(e.message));
    try { localStorage.setItem("city", JSON.stringify(city)); } catch {}
  }, [city, retry]);

  // Find any other place in India
  useEffect(() => {
    if (q.trim().length < 3) { setRemote([]); return; }
    const id = setTimeout(() => {
      fetch(searchUrl(q.trim()))
        .then((r) => r.json())
        .then((j) => setRemote((j.results || []).map((r) => ({ name: r.name, state: r.admin1 || "India", lat: r.latitude, lon: r.longitude }))))
        .catch(() => setRemote([]));
    }, 350);
    return () => clearTimeout(id);
  }, [q]);

  const matches = useMemo(() => {
    const s = q.trim().toLowerCase();
    const local = s ? CITIES.filter((c) => (c.name + " " + c.state).toLowerCase().includes(s)) : CITIES;
    const seen = new Set(local.map((c) => c.name + c.state));
    return local.concat(remote.filter((c) => !seen.has(c.name + c.state)));
  }, [q, remote]);

  const kind = data ? wx(data.current.weather_code)[2] : "clear";
  useEffect(() => {
    document.documentElement.style.setProperty("--sky1", SKY[kind][0]);
    document.documentElement.style.setProperty("--sky2", SKY[kind][1]);
  }, [kind]);

  const t = (v) => Math.round(unit === "C" ? v : (v * 9) / 5 + 32) + "°";
  const pick = (c) => { setCity(c); setQ(""); setOpen(false); };

  return (
    <div className="wrap">
      <div className="bar">
        <input
          value={q}
          placeholder="Search any city in India"
          aria-label="Search city"
          onFocus={() => setOpen(true)}
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
        />
        <button onClick={() => setUnit(unit === "C" ? "F" : "C")} aria-label="Switch units">
          °{unit === "C" ? "F" : "C"}
        </button>
      </div>

      {open && (
        <div className="list">
          {matches.length ? matches.map((c, i) => (
            <button className="item" key={c.name + c.state + i} onClick={() => pick(c)}>
              <span>{c.name}</span><small>{c.state}</small>
            </button>
          )) : <div className="msg">No match. Try another spelling.</div>}
        </div>
      )}

      {err && (
        <div className="msg">
          <p>Couldn't load the forecast ({err}). Check your internet connection.</p>
          <button onClick={() => setRetry(retry + 1)}>Try again</button>
        </div>
      )}
      {!err && !data && <div className="msg">Loading weather for {city.name}…</div>}
      {data && <Forecast data={data} city={city} t={t} />}
    </div>
  );
}

function Forecast({ data, city, t }) {
  const { current: cur, hourly, daily: d } = data;
  const i0 = Math.max(0, hourly.time.findIndex((x) => x >= cur.time));
  const hours = hourly.time.slice(i0, i0 + 12).map((time, i) => ({
    time, temp: hourly.temperature_2m[i0 + i], code: hourly.weather_code[i0 + i],
  }));
  const [icon, label] = wx(cur.weather_code);

  return (
    <>
      <div className="hero">
        <div className="place">{city.name}, {city.state}</div>
        <div className="icon">{icon}</div>
        <div className="temp">{t(cur.temperature_2m)}</div>
        <div className="cond">{label}</div>
        <div>High {t(d.temperature_2m_max[0])} · Low {t(d.temperature_2m_min[0])}</div>
      </div>

      <div className="panel">
        <h2>Next 12 hours</h2>
        <div className="hours">
          {hours.map((x, i) => (
            <div className="hour" key={x.time}>
              <div>{i === 0 ? "Now" : new Date(x.time).toLocaleTimeString("en-IN", { hour: "numeric", hour12: true }).replace(" ", "")}</div>
              <div className="i">{wx(x.code)[0]}</div>
              <div>{t(x.temp)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="panel">
        <h2>6-day forecast</h2>
        {d.time.map((day, i) => (
          <div className="row" key={day}>
            <span>{i === 0 ? "Today" : new Date(day + "T12:00").toLocaleDateString("en-IN", { weekday: "short" })}</span>
            <span className="i">{wx(d.weather_code[i])[0]}</span>
            <span>{t(d.temperature_2m_min[i])} – {t(d.temperature_2m_max[i])}</span>
          </div>
        ))}
      </div>

      <div className="panel stats">
        <div><b>{cur.relative_humidity_2m}%</b>Humidity</div>
        <div><b>{Math.round(cur.wind_speed_10m)} km/h</b>Wind</div>
        <div><b>{t(cur.apparent_temperature)}</b>Feels like</div>
      </div>
      <p className="note">Live data from Open-Meteo</p>
    </>
  );
}
