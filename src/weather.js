// WMO weather code -> [icon, label, sky]
export function wx(code) {
  if (code === 0) return ["☀️", "Clear sky", "clear"];
  if (code <= 2) return ["🌤️", "Partly cloudy", "clear"];
  if (code === 3) return ["☁️", "Overcast", "cloud"];
  if (code <= 48) return ["🌫️", "Fog", "cloud"];
  if (code <= 57) return ["🌦️", "Drizzle", "rain"];
  if (code <= 67) return ["🌧️", "Rain", "rain"];
  if (code <= 77) return ["❄️", "Snow", "snow"];
  if (code <= 82) return ["🌧️", "Rain showers", "rain"];
  if (code <= 86) return ["🌨️", "Snow showers", "snow"];
  return ["⛈️", "Thunderstorm", "storm"];
}

export const SKY = {
  clear: ["#3d86e0", "#bfe0fa"], cloud: ["#6f819a", "#c3ccd8"],
  rain: ["#44566e", "#8a9db3"], snow: ["#8fa6c4", "#e6eef8"], storm: ["#2c3547", "#5b6680"],
};

export const forecastUrl = (c) =>
  `https://api.open-meteo.com/v1/forecast?latitude=${c.lat}&longitude=${c.lon}` +
  "&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m" +
  "&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min" +
  "&timezone=auto&forecast_days=6";

export const searchUrl = (q) =>
  "https://geocoding-api.open-meteo.com/v1/search?count=10&language=en&countryCode=IN&name=" + encodeURIComponent(q);
