function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
    console.log('statusChangeCallback');
    console.log(response);                   // The current login status of the person.
    if (response.status === 'connected') {   // Logged into your webpage and Facebook.
        testAPI();
    } else {                                 // Not logged into your webpage or we are unable to tell.
        document.getElementById('status').innerHTML = 'Please log ' +
            'into this webpage.';
    }
}
function checkLoginState() {               // Called when a person is finished with the Login Button.
    FB.getLoginStatus(function (response) {   // See the onlogin handler
        statusChangeCallback(response);
    });
}
window.fbAsyncInit = function () {
    FB.init({
        appId: '660377585299971',
        cookie: true,
        xfbml: true,
        version: 'v15.0'
    });

    FB.AppEvents.logPageView();
    //checkLoginState();

};

function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me?fields=id,name,link', function (response) {
        console.log('Successful login for: ' + response.link);
        document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!';
        sessionStorage.id = response.id;
        sessionStorage.nm = response.name;
        sessionStorage.link = response.link;

    });

    FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            var accessToken = response.authResponse.accessToken;
            FB.api('me/picture?width=100&height=100&redirect=false', function (response) {
                // Insert your code here
                console.log('img url, ' + response + '.');
                sessionStorage.pic = String(response.data.url);
                location.replace("html/chat_page.htm");
            });
        }
    });


}

// (function (d, s, id) {
//     var js, fjs = d.getElementsByTagName(s)[0];
//     if (d.getElementById(id)) { return; }
//     js = d.createElement(s); js.id = id;
//     js.src = "https://connect.facebook.net/en_US/sdk.js";
//     fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'facebook-jssdk'));




// function checkLoginState() {               // Called when a person is finished with the Login Button.
//     console.log("hi");
//     FB.getLoginStatus(function (response) {   // See the onlogin handler
//         if (response.status === 'connected') {   // Logged into your webpage and Facebook.
//             testAPI();
//         } else {                                 // Not logged into your webpage or we are unable to tell.
//             console.log('User cancelled login or did not fully authorize.');
//             FB.login(function (response) {
//                 if (response.authResponse) {
//                     testAPI();
//                 } else {
//                     console.log('User cancelled login or did not fully authorize.');
//                 }
//             });
//         }
//     });
// }

// function testAPI() {

//     console.log('Welcome!  Fetching your information.... ');
//     FB.api(
//         '/me',
//         'GET',
//         { "fields": "id,name" },
//         function (response) {
//             console.log('id, ' + response.id + '.');
//             console.log('Good to see you, ' + response.name + '.');
//             sessionStorage.setItem("id", response.id);
//             sessionStorage.setItem("nm", response.name);
//         });


// }







