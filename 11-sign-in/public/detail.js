$(document).ready(function() {
    logout.onclick = function(e) {
        e.preventDefault();
        
        fetch('/api/v1/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            status = res.status;
            if (status == 200) {
                window.location.href = '/';
            } else {
                return res.json();
            }
        })
    }
})