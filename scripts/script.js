//get the map apikey
mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhcnZpbiIsImEiOiJjazhrMzNtZzYwMWtwM2xvb2gxaTBqdnN0In0.LtV5bjsqwKvoySMyYAjYOg';

//standaar map zoom/center etc
var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v11',
	center: [-101.762042, 40.215180],
	zoom: 4,
});

//de navigatie controls plaatsen linksboven
var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left')



map.on('load', function() {
	
		//open brewey ophalen
		fetch('https://api.openbrewerydb.org/breweries?by_state=ohio')

		//data in json
		.then(function(response) {
			return response.json();
		})

		//resultaat ophalen
		.then(function(response) {
			
			//response in nette var stoppen
			var getBreweryData = response;
			
			//loopen door de response dat in getBrewryData zit
			getBreweryData.forEach(breweryData => {
			console.log(breweryData);

			//de coordinaten van long en lat in array zetten
			var breweriesCoordinates = [breweryData.longitude, breweryData.latitude];

			//var brewerieInformation = [breweryData.name, breweryData.brewery_type, breweryData.street, breweryData.city, breweryData.state, breweryData.phone, breweryData.website_url];	
			
			//dit moest ik kopieren en plakken en natuurlijk aanpassen naar eigen (https://docs.mapbox.com/help/tutorials/custom-markers-gl-js/)
			var geojson = {
			  type: 'FeatureCollection',
			  features: [{
			    type: 'Feature',
			    geometry: {
			      type: 'Point',
		
			    },
			    properties: {
			      title: 'Mapbox',
			      description: 'Washington, D.C.'
			    }
			}]
			}

			geojson.features.forEach(function(marker) {

			 //een html div maken voor de achtergrond
			var el = document.createElement('div');
			el.className = 'marker';

			
			var popup = new mapboxgl.Popup()
				.setHTML("<h4>" + breweryData.name + "</h4>" + "Adress: " + breweryData.street + ", " + breweryData.city + "</br>" + "Tel: " + breweryData.phone + "</br>" + "<b>E-mail: </b>" + breweryData.website_url)
				
			//markers aanroepen met de coordinaten van Ohio breweries
			new mapboxgl.Marker(el)
				.setLngLat(breweriesCoordinates)
				.setPopup(popup)
				.addTo(map);	
			})

			})

			
		})
	})