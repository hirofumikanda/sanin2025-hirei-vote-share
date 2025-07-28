import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const initialCenter = [138.07, 35.18];
const initailZoom = 3.5;
const map = new maplibregl.Map({
  container: "map",
  zoom: initailZoom,
  hash: true,
  center: initialCenter,
  maxZoom: 21,
  style: "styles/style.json",
});

window.map = map;

map.on("load", async () => {
  map.addControl(new maplibregl.NavigationControl());

  map.on("move", () => {
    const center = map.getCenter();
    document.getElementById("fly").value =
      center.lat.toFixed(6) +
      ", " +
      center.lng.toFixed(6) +
      ", " +
      map.getZoom().toFixed(2);
  });

  const styleLayers = map.getStyle().layers;
  const controlsContainer = document.getElementById("layer-controls");
  const radioGroupName = "layer-radio-group";
  const fixedLayerId = "gsi-white-layer";

  const toggleLayers = styleLayers.filter(layer => layer.id !== fixedLayerId);

  for (const [i, layer] of toggleLayers.entries()) {
    const layerId = layer.id;

    const label = document.createElement("label");
    label.style.display = "block";
    label.style.marginBottom = "5px";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = radioGroupName;
    radio.value = layerId;
    radio.dataset.layerId = layerId;
    radio.id = `radio-${layerId}`;
    if (i === 0) radio.checked = true;

    const span = document.createElement("span");
    span.textContent = layerId;

    label.appendChild(radio);
    label.appendChild(span);
    controlsContainer.appendChild(label);
  }

  const initialVisibleLayerId = toggleLayers[0].id;
  for (const layer of styleLayers) {
    if (layer.id === fixedLayerId || layer.id === initialVisibleLayerId) {
      map.setLayoutProperty(layer.id, "visibility", "visible");
    } else {
      map.setLayoutProperty(layer.id, "visibility", "none");
    }
  }

  controlsContainer.addEventListener("change", (e) => {
    if (e.target.matches("input[type='radio']")) {
      const selectedLayerId = e.target.dataset.layerId;

      for (const layer of toggleLayers) {
        const visibility = (layer.id === selectedLayerId) ? "visible" : "none";
        map.setLayoutProperty(layer.id, "visibility", visibility);
      }

      if (map.getLayer(fixedLayerId)) {
        map.setLayoutProperty(fixedLayerId, "visibility", "visible");
      }
    }
  });
});

map.on("click", (e) => {
  const features = map.queryRenderedFeatures(e.point);

  if (!features.length) {
    return;
  }

  const popup = new maplibregl.Popup({ closeOnClick: true })
    .setLngLat(e.lngLat)
    .setHTML(buildPopupContent(features))
    .addTo(map);
});

function buildPopupContent(features) {
  const f = features[0];
  const props = f.properties;
  const layerId = f.layer.id;

  let html = `<table>`;
  for (const key in props) {
    let name = key;
    let value = props[key] + "%";
    if (key === "code") continue;
    if (key === "name") {
      html += `<tr><td><strong>${props[key]}</strong></td><td></td></tr>`;
      continue;
    }
    if (key === "jimin") name = "自民";
    if (key === "ritsumin") name = "立民";
    if (key === "kokumin") name = "国民";
    if (key === "sansei") name = "参政";
    if (key === "koumei") name = "公明";
    if (key === "reiwa") name = "れいわ";
    if (key === "kyosan") name = "共産";
    if (key === "hoshu") name = "保守";
    if (key === "ishin") name = "維新";
    if (key === "shamin") name = "社民";
    if (key === "mirai") name = "みらい";
    if (key === "ntou") continue;
    if (key === "saisei") continue;
    if (key === "muren") continue;
    if (key === "kaikaku") continue;
    if (key === "seishin") continue;
    if (key === "aging_rate") name = "高齢化率";
    html += `<tr><td>${name}</td><td>${value}</td></tr>`;
  }
  html += "</table>";
  return html;
}

document.getElementById("fly").value =
  initialCenter[1] + ", " + initialCenter[0] + ", " + initailZoom;

document.getElementById("fly").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    var coords = document.getElementById("fly").value;
    var pattern = /^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?,\s\d+(\.\d+)?$/;
    if (pattern.test(coords)) {
      var splittedCoods = coords.split(",");
      map.jumpTo({
        center: [parseFloat(splittedCoods[1]), parseFloat(splittedCoods[0])],
        zoom: parseFloat(splittedCoods[2]),
      });
    }
  }
});
