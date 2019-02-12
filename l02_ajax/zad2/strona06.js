$(document).ready(function () {
		
	$("#in").on("input",  () => {
		$.ajax({
			url: "server04.js",
			data: { in: $('#in').val() },
			type: "POST",
			success: function (data) {
				var obj = JSON.parse(data)
				console.log(obj.in)
				$('#out').val(obj.in)
			},
			error: function (xhr, status, error) {
				console.log(xhr);
			},
		});
	})

})