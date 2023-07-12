jQuery(function($){
    let State = {
        WEBURL: 'http://127.0.0.1:8000'
    }

    let Login = {}

    Login.activate = function() {
        Login.Event.activate()
    }

    Login.API = {
        login: function(data) {
            $.ajax({
                url: APIURL + '/admin/login',
                method: 'POST',
                data: data,
                success: function(resp) {
                    // return console.log(resp);
                    if (resp.meta.code == '200') {
                        setTimeout(() => {
                            window.location.href = State.WEBURL + '/absen'
                            localStorage.setItem("token_login", resp.token);
                        }, 300);
                    } else {
                        alert(resp.meta.message)
                    }
                }
            })
        }
    }

    Login.Event = {
        activate: function() {
            $('#btn-login').on('click', function(e) {
                e.preventDefault()

                let params = {
                    email: $('#input-email').val(),
                    password: $('#input-password').val()
                }

                Login.API.login(params)
            })
        }
    }

    Login.activate()

})
