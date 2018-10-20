var tables = $("table");

function sort_table(e) {
    var $this = $(this);
    var headers = $("th", $this);
    var col = headers.index(e.target);
    if (col < 0) return;
    headers[col].order = headers[col].order == "asc" ? "desc" : "asc";
    var rows = $("tbody tr", $this);
    var sorted = _.sortByOrder(rows, [(elem) => {
        return $("td", elem)[col].innerHTML;
    }], headers[col].order);
    $("tbody", $this).empty();
    $("tbody", $this).append(sorted);
}

$(function() {
    var tables = $("table")
    var headers = $("th", tables);
    tables.click(sort_table);
})