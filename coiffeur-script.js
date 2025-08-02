const salons = [
  {
    id: 1,
    name: "Salon Beauté Zen",
    rating: 4.8,
    lat: 36.75,
    lng: 3.06,
    address: "123 Rue de la Paix, Alger",
    mapX: 25,
    mapY: 40,
  },
  {
    id: 2,
    name: "Coiffure Émeraude",
    rating: 4.5,
    lat: 36.76,
    lng: 3.05,
    address: "456 Boulevard Mohamed V, Alger",
    mapX: 60,
    mapY: 25,
  },
  {
    id: 3,
    name: "Hair Style Pro",
    rating: 4.2,
    lat: 36.74,
    lng: 3.08,
    address: "789 Avenue de l'Indépendance, Alger",
    mapX: 75,
    mapY: 65,
  },
  {
    id: 4,
    name: "Salon Élégance",
    rating: 4.7,
    lat: 36.77,
    lng: 3.04,
    address: "321 Rue Didouche Mourad, Alger",
    mapX: 40,
    mapY: 20,
  },
  {
    id: 5,
    name: "Coiffure Moderne",
    rating: 4.3,
    lat: 36.73,
    lng: 3.09,
    address: "654 Rue Larbi Ben M'hidi, Alger",
    mapX: 80,
    mapY: 80,
  },
]

let selectedSalonId = null
let currentSalons = [...salons]

function renderSalons(data) {
  const salonList = document.getElementById("salonList")
  salonList.innerHTML = ""

  currentSalons = data
  updateMap(data)

  if (data.length === 0) {
    salonList.innerHTML = `
      <div style="text-align: center; color: #999; padding: 20px; font-family: 'Poppins', sans-serif;">
        <p>Aucun salon trouvé pour votre recherche.</p>
      </div>
    `
    return
  }

  data.forEach((salon, index) => {
    const card = document.createElement("div")
    card.className = "salon-card"
    if (selectedSalonId === salon.id) {
      card.style.background = "#444"
      card.style.borderLeft = "4px solid #e76f51"
    }

    card.innerHTML = `
      <div class="salon-name">${salon.name}</div>
      <div class="salon-rating">⭐ ${salon.rating} / 5</div>
      <div class="salon-address">${salon.address}</div>
    `
    card.onclick = () => selectSalon(salon)
    salonList.appendChild(card)
  })
}

function selectSalon(salon) {
  selectedSalonId = salon.id
  renderSalons(currentSalons)
  highlightMarker(salon.id)
}

function createMap() {
  const mapBox = document.getElementById("mapBox")
  mapBox.innerHTML = `
    <div class="map-container" id="mapContainer">
      <div class="map-grid"></div>
      <div class="map-controls">
        <button class="map-control-btn" onclick="zoomIn()">+</button>
        <button class="map-control-btn" onclick="zoomOut()">−</button>
        <button class="map-control-btn" onclick="resetView()">⌂</button>
      </div>
      <div class="map-info">
        <div><span id="markerCount">${salons.length}</span> salons trouvés</div>
        <div style="font-size: 10px; margin-top: 2px;">Cliquez sur un marqueur pour plus d'infos</div>
      </div>
    </div>
  `
}

function updateMap(salonsToShow) {
  const mapContainer = document.getElementById("mapContainer")
  if (!mapContainer) return

  const existingMarkers = mapContainer.querySelectorAll(".salon-marker")
  existingMarkers.forEach((marker) => marker.remove())

  const markerCount = document.getElementById("markerCount")
  if (markerCount) {
    markerCount.textContent = salonsToShow.length
  }

  salonsToShow.forEach((salon) => {
    const marker = document.createElement("div")
    marker.className = "salon-marker"
    marker.id = `marker-${salon.id}`
    marker.style.left = `${salon.mapX}%`
    marker.style.top = `${salon.mapY}%`

    marker.innerHTML = `
      <div class="marker-tooltip">${salon.name}<br/>⭐ ${salon.rating}/5</div>
    `

    marker.onclick = (e) => {
      e.stopPropagation()
      selectSalon(salon)
    }

    mapContainer.appendChild(marker)
  })
}

function highlightMarker(salonId) {
  document.querySelectorAll(".salon-marker").forEach((marker) => {
    marker.classList.remove("selected-marker")
  })

  const selectedMarker = document.getElementById(`marker-${salonId}`)
  if (selectedMarker) {
    selectedMarker.classList.add("selected-marker")
  }
}

function zoomIn() {
  console.log("Zoom in - Fonctionnalité simulée")
}

function zoomOut() {
  console.log("Zoom out - Fonctionnalité simulée")
}

function resetView() {
  document.getElementById("searchInput").value = ""
  renderSalons(salons)
}

document.getElementById("searchInput").addEventListener("input", function () {
  const query = this.value.toLowerCase()
  const filtered = salons.filter(
    (salon) => salon.name.toLowerCase().includes(query) || salon.address.toLowerCase().includes(query),
  )
  renderSalons(filtered)
})

document.addEventListener("DOMContentLoaded", () => {
  createMap()
  renderSalons(salons)
})
