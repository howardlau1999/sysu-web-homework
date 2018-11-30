$(document).ready(function () {
    var waiting = false;
    var numbers = {};

    const getRandomNumber = function () {
        if (waiting) return;
        $(this).off('click');
        $("li.ring-button").addClass("disabled");
        $(this).removeClass("disabled");
        var button = $(this);
        var id = $(this).attr("id");
        var unread = $(this).find(".unread");
        waiting = true;
        unread.html("...").show();
        $.get("http://localhost:3000/", function (data) {
            if (!waiting) return;
            waiting = false;
            unread.html(data);
            numbers[id] = parseInt(data);
            button.addClass("disabled");
            $("li.ring-button").each(function () {
                if (numbers[$(this).attr("id")] === undefined) {
                    $(this).removeClass("disabled");
                }
            });

            if (Object.keys(numbers).length >= 5) {
                $("#info-bar").addClass("enabled");
            }
        })
    }

    const reset = function () {
        $("li.ring-button").off("click").removeClass("disabled");
        $("li.ring-button").click(getRandomNumber);
        $(".unread").hide();
        $("#info-bar").removeClass("enabled");
        $("#info-bar #sum").html("");
        numbers = {};
        waiting = false;
    }
    $("#button").mouseleave(reset);
    $("#info-bar").click(function () {
        if (Object.keys(numbers).length < 5) return;
        $("#info-bar").removeClass("enabled");
        let sum = 0;
        for (const key of Object.keys(numbers)) {
            sum += numbers[key];
        }
        $(this).find("#sum").html(sum);
    });
    reset();
});