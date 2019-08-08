var $ = require("jquery");

function component() {
	const element = document.createElement('div');

	element.innerHTML = 'Hello webpack'

	return element;
}

$(document).ready(() => {
	var src = $("#src");
	var dest = $("#dest");
	var dist = $("#dist");
	var dur = $("#dur");

	ymaps.ready(() => {
		var map = new ymaps.Map('map', {
			center: [55.76, 37.64],
			zoom: 10
		});

		$("#do_route").click(() => {
			var src_coord = src.val().split(" ").map(parseFloat);
			var dest_coord = dest.val().split(" ").map(parseFloat);

			var multiRoute = new ymaps.multiRouter.MultiRoute({   
				referencePoints: [src_coord, dest_coord],
				params: {
					routingMode: "masstransit"  
				}},
				{
					boundsAutoApply: true,
				});

			multiRoute.model.events.add('requestsuccess', () => {
				var activeRoute = multiRoute.getActiveRoute();

				if (activeRoute) {
					dist.val(activeRoute.properties.get("distance").value);
					dur.val(activeRoute.properties.get("duration").value);
				}
			});

			dist.val('');
			dur.val('');

			map.geoObjects.removeAll();
			map.geoObjects.add(multiRoute);	
		});
	});
});
