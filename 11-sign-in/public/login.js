$(document).ready(function() {
    submit.onclick = function(e) {
        e.preventDefault();
        let user = {
            username: username.value,
            password: password.value
        };

        let errmsgs = {
            "username": "用户名不存在",
            "password": "密码不正确",

        };

        for (let key of Object.keys(errmsgs)) {
            $("#" + key + "+." + "errmsg").html("");
        };

        let url_params = new URLSearchParams(window.location.search);

        fetch('/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(res => {
            status = res.status;
            if (status == 200) {
                window.location.href = url_params.get('redirect') || '/user/detail';
            } else {
                return res.json();
            }
        }).then(data => {
            if (!data) return;
            if (status == 400) {
                $("#" + data.field + "+." + "errmsg").html(errmsgs[data.field]);
            } else {
                alert(data.msg);
            }
        }).catch(err => {
            alert(err);
        })
    }
})