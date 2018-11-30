
function shuffle(arra1) {
    var ctr = arra1.length, temp, index;
    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}
$(document).ready(function () {
    var waiting = false;
    var numbers = {};

    const getRandomNumber = function (next) {
        return function () {
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

                if (next) next.click();
            })
        }
    }

    const reset = function () {
        $("li.ring-button").off("click").removeClass("disabled");
        $(".unread").hide();
        $("#info-bar").removeClass("enabled");
        $("#info-bar #sum").html("");
        $("#order").html("");
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

    $(".apb").click(function () {
        reset();
        const keys = shuffle(["A", "B", "C", "D", "E"]);
        $("#order").html(keys.join(","));
        for (let i = 0; i < keys.length - 1; ++i) {
            $("li.ring-button#" + keys[i]).click(getRandomNumber($("li.ring-button#" + keys[i + 1])));
        }
        $("li.ring-button#" + keys[4]).click(getRandomNumber($("#info-bar")));
        $("li.ring-button#" + keys[0]).click();
    });

    reset();
});