
// Live Date & Time
function updateDateTime() {
  const now = new Date();
  const dateOptions = { day: '2-digit', month: 'short', year: 'numeric' };
  const dateStr = now.toLocaleDateString('en-GB', dateOptions);
  const timeStr = now.toLocaleTimeString('en-US');
  document.getElementById('date-display').textContent = dateStr;
  document.getElementById('time-display').textContent = timeStr;
}
setInterval(updateDateTime, 1000);
updateDateTime();

// Mapbox
mapboxgl.accessToken = 'pk.eyJ1Ijoia2F1c3R1Ymhha2siLCJhIjoiY21jeHdpY3ZxMDRudzJqc2o4cDNhbm04YiJ9.CBL2BPIn2xIm1a3409oCUQ';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v10',
  center: [73.8567, 18.5204],
  zoom: 9
});

// Fetch alert data
fetch("https://disaster-map-kaustubha2025.s3.us-east-1.amazonaws.com/alert.json")
  .then(res => res.json())
  .then(data => {
    if (!Array.isArray(data)) data = [data];

    const alertBanner = document.getElementById('alert-banner');
    const alertContent = document.getElementById('alert-content');

    const validAlerts = data.filter(alert => alert.message && alert.lat && alert.lng);

    alertBanner.textContent = \`\${validAlerts.length} active alert\${validAlerts.length !== 1 ? 's' : ''}\`;
    alertContent.innerHTML = "";

    validAlerts.forEach(alert => {
      const el = document.createElement('div');
      el.className = "alert-entry";
      el.innerHTML = \`
        <p class="alert-message">🌧️ ⚠️ \${alert.message}</p>
        \${alert.time ? \`<p>🕒 \${alert.time}</p>\` : ''}
      \`;
      alertContent.appendChild(el);

      new mapboxgl.Marker({ color: "red" })
        .setLngLat([alert.lng, alert.lat])
        .addTo(map);
    });

    if (validAlerts.length === 0) {
      alertContent.textContent = "✅ No active alerts";
    }
  })
  .catch(err => {
    document.getElementById('alert-banner').textContent = '❌ Failed to load alert data';
    document.getElementById('alert-content').textContent = 'Could not load alerts.';
    console.error(err);
  });

// Theme toggle
function toggleTheme() {
  const currentStyle = map.getStyle().name;
  const nextStyle = currentStyle.includes('Dark') ? 'mapbox://styles/mapbox/streets-v11' : 'mapbox://styles/mapbox/dark-v10';
  map.setStyle(nextStyle);
}
