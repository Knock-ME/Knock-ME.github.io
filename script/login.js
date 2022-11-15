
window.fbAsyncInit = function () {
    FB.init({
        appId: '660377585299971',
        cookie: true,
        xfbml: true,
        version: 'v15.0'
    });

    FB.AppEvents.logPageView();

};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));




function checkLoginState() {
    var fbLog = FB.getLoginStatus(function (response) {
        statusChangeCallback(response);

    });

    if (fbLog.status != "connected")
    {
        FB.login(function(response) {
            if (response.authResponse) {
             console.log('Welcome!  Fetching your information.... ');
             FB.api('/me', function(response) {
               console.log('Good to see you, ' + response.name + '.');
             });
            } else {
             console.log('User cancelled login or did not fully authorize.');
            }
        });
    }
}


