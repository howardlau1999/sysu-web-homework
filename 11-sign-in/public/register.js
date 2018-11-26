$(document).ready(function() {
    submit.onclick = function(e) {
        e.preventDefault();
        let new_user = {
            username: username.value,
            stuid: stuid.value,
            email: email.value,
            phone: phone.value,
            password: password.value
        };

        if (password.value != passwordconfirm.value) {
            $("#passwordconfirm+.errmsg").html("两次输入的密码不一致");
            return;
        } else {
            $("#passwordconfirm+.errmsg").html("");
        }

        let validations = {
            "username": /^[a-zA-Z]\w{5,17}$/,
            "stuid": /^[1-9]\d{7}$/,
            "phone": /^[1-9]\d{10}$/,
            "email": /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
            "password": /^[0-9a-zA-Z\-_]{6,12}$/,
        };

        let errmsgs = {
            "username": "用户名不合法",
            "stuid": "学号不合法",
            "phone": "手机号码不合法",
            "email": "电子邮件不合法",
            "password": "密码不合法"
        };

        let conflict_msg = {
            "username": "用户名已存在",
            "stuid": "学号已存在",
            "phone": "手机号码已存在",
            "email": "电子邮件已存在",
            "password": "密码不合法"
        };

        for (let key of Object.keys(validations)) {
            $("#" + key + "+." + "errmsg").html("");
        };

        let invalid = false;

        for (let key of Object.keys(validations)) {
            if (!validations[key].test(new_user[key])) {
                $("#" + key + "+." + "errmsg").html(errmsgs[key]);
                invalid = true;
            }
        }

        if (invalid) return;

        fetch('/api/v1/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(new_user)
        }).then(res => {
            status = res.status;
            if (status == 200) {
                window.location.href = "/?username=" + new_user.username;
            } else {
                return res.json();
            }
        }).then(data => {
            if (!data) return;
            if (status == 400) {
                if (data.type == "conflict")
                    $("#" + data.field + "+." + "errmsg").html(conflict_msg[data.field]);
            } else {
                alert(data.msg);
            }
        }).catch(err => {
            alert(err);
        })
    }
})