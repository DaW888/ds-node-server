$(document).ready(function() {
    $("#left").mousedown(() => {
        $("#left").mousemove(e => {
            $("<div>", {
                class: "lewe"
            })
                .css({
                    left: e.pageX - 10,
                    top: e.pageY - 10
                })
                .appendTo("#left");

            console.log(e.pageX, e.pageY);
            $.ajax({
                url: "../server05.js",
                data: { x: e.pageX, y: e.pageY },
                type: "POST",
                success: function(data) {
                    var obj = JSON.parse(data);
                    console.log(obj);

                    $("<div>", {
                        class: "prawe"
                    })
                        .css({
                            right: obj.x - 10,
                            top: obj.y - 10
                        })
                        .appendTo("#right");
                },
                error: function(xhr, status, error) {
                    console.log(xhr);
                }
            });
        });
	});
	$("#left").mouseup(() => {
		$("#left").off('mousemove');
	})
});