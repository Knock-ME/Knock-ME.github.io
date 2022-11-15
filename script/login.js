
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




function checkLoginState() 
{
    FB.login(function (response) {
        if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            FB.api('/me', function (response) {
                console.log('id, ' + response.id + '.');
                console.log('Good to see you, ' + response.name + '.');
                sessionStorage.setItem("id",response.id);
                sessionStorage.setItem("nm",response.name);
            });
            FB.api(
                '/me/picture',
                'GET',
                {},
                function(response) {
                    // Insert your code here
                    sessionStorage.setItem("pic",response.data.url);
                    console.log('id, ' +response.data.url + '.');

                }
              );
        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    });
    FB.getLoginStatus(function (response) 
    {
        if (response.status === 'connected') 
        {
            var accessToken = response.authResponse.accessToken;

        }
    });
        
}





