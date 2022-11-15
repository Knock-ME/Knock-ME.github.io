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
    checkLoginState();

};

function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function (response) {
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!';
            sessionStorage.id= response.id;
            sessionStorage.nm= response.nm;
    });
    FB.api(
        '/me/picture',
        'GET',
        { "fields": "url" },
        function (response) {
            // Insert your code here
            sessionStorage.pic= response.fields;
            console.log('img url, ' + response.fields + '.');

        }
    );
    // location.replace("https://yaminmahdi.github.io/KnockME/html/chat_page.htm");

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







