$(document).ready(function () {
	
	$('#left').click((e)=>{

		$("<div>",{
			class: 'lewe',
			html: `${e.pageX}<br>${e.pageY}`
		}).css({
			left: e.pageX-30,
			top: e.pageY-30
		}).appendTo('#left')

		console.log(e.pageX, e.pageY)
		$.ajax({
			url: "../server05.js",
			data: { x: e.pageX, y: e.pageY, time: performance.now()},
			type: "POST",
			success: function (data) {
				var obj = JSON.parse(data)
				console.log(obj)

				$("<div>",{
					class: 'prawe',
					html: `${(performance.now() - obj.time).toFixed(0)}`
				}).css({
					left: obj.x-30,
					top: obj.y-30
				}).appendTo('#right')

			},
			error: function (xhr, status, error) {
				console.log(xhr);
			},
		});

	})
})