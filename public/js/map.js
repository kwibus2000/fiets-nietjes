mapboxgl.accessToken =
  'pk.eyJ1Ijoia3dpYnVzIiwiYSI6ImNrbDE5bDE1cjBmbnMybm80enJ6bHBsY3YifQ.Oa3yca6X2Nd1NmclNUw0Bw'
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 13,
  center: [4.681351, 51.792405], // latitude, longitude !!
})

// Haal de nietjes op vanaf de API
async function getNietjes() {
  const res = await fetch('/api/v1/nietjes')
  const data = await res.json()

  const nietjes = data.data.map((nietje) => {
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          nietje.location.coordinates[0],
          nietje.location.coordinates[1],
        ],
      },
      properties: {
        nietjes_Id: nietje.nietjes_Id,
        icon: 'bicycle',
      },
    }
  })

  loadMap(nietjes)
}

// Laad kaart met nietjes
function loadMap(nietjes) {
  map.on('load', function () {
    map.addLayer({
      id: 'points',
      type: 'symbol',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: nietjes,
        },
      },
      layout: {
        'icon-image': '{icon}-15',
        'icon-size': 1.5,
        'text-field': '{nietjes_Id}',
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-offset': [0, 0.9],
        'text-anchor': 'top',
      },
    })
  })
}

getNietjes()
