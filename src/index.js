var $ = require("jquery");

function component() {
	const element = document.createElement('div');

	element.innerHTML = 'Hello webpack'

	return element;
}

$(document).ready(() => {
	ymaps.ready(() => {
		var multiRoute = new ymaps.multiRouter.MultiRoute({   
			referencePoints: [
				'Москва, метро Смоленская',
				'Москва, метро Арбатская',
				[55.734876, 37.59308], // улица Льва Толстого.
			],
			params: {
				routingMode: "masstransit"  
			}},
			{
				boundsAutoApply: true,
			});

		multiRoute.model.events.add('requestsuccess', () => {
			var activeRoute = multiRoute.getActiveRoute();

			console.log("Длина: " + activeRoute.properties.get("distance").text);
			console.log("Время прохождения: " + activeRoute.properties.get("duration").text);
		});

		var map = new ymaps.Map('map', {
			center: [55.76, 37.64],
			zoom: 10
		});

		map.geoObjects.add(multiRoute);
	});
});
