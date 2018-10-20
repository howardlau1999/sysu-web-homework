var buttons = [
    '7',
    '8',
    '9',
    '/',
    '4',
    '5',
    '6',
    '*',
    '1',
    '2',
    '3',
    '-',
    '0',
    '.',
    '←',
    '+',
    '(',
    ')',
    'CE',
    '='
]

var exp_box = document.getElementById("expression");

var special_function = {
    'CE': (e) => {
        exp_box.value = '';
    },
    '=': (e) => {
        if (!exp_box.value) return;
        try {
            exp_box.value = eval(exp_box.value);
        } catch (e) {
            alert("Illegal expression");
        }
    },
    '←': (e) => {
        exp_box.value = exp_box.value.slice(0, exp_box.value.length - 1);
    }
}

var buttons_dom = document.getElementById("buttons");

buttons.forEach(element => {
    var button = document.createElement("button");
    button.id = element;
    button.innerHTML = element;
    var f = special_function[element] || ((e) => {
        exp_box.value += e.target.innerHTML;
    });
    button.addEventListener('click', f)
    buttons_dom.appendChild(button);
});