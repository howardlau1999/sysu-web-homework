$(document).ready(function () {
    var requests = {};
    var numbers = {};

    const getRandomNumber = function () {
        $(this).off('click');
        $("li.ring-button").addClass("disabled");
        var button = $(this);
        var id = $(this).attr("id");
        var unread = $(this).find(".unread");
        waiting = true;
        unread.html("...").show();
        requests[id] = $.get("http://localhost:3000/", function (data) {
            unread.html(data);
            numbers[id] = parseInt(data);
            button.addClass("disabled");

            if (Object.keys(numbers).length >= 5) {
                $("#info-bar").addClass("enabled");
                $("#info-bar").click();
            }
        })

    }

    const reset = function () {
        $("li.ring-button").off("click").removeClass("disabled");
        $("li.ring-button").click(getRandomNumber);
        $(".unread").hide();
        $("#info-bar").removeClass("enabled");
        $("#info-bar #sum").html("");
        for (const key of Object.keys(requests)) {
            requests[key].abort();
        }
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
    $(".apb").click(function() {
        $("li.ring-button").click();
    });

    reset();
});