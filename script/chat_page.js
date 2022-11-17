// import { getDatabase, ref, onChildAdded, push, set ,initializeApp, getAnalytics} from "./firebase_module.js"
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js"
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js"

import { getDatabase, ref, onChildAdded, push, set, onValue, increment} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

/**
 * Easy selector helper function
 */
 const select = (el, all = false) => {
  el = el.trim()
  if (all) {
    return [...document.querySelectorAll(el)]
  } else {
    return document.querySelector(el)
  }
}
/**
 * Easy event listener function
 */
const on = (type, el, listener, all = false) => {
  let selectEl = select(el, all)
  if (selectEl) {
    if (all) {
      selectEl.forEach(e => e.addEventListener(type, listener))
    } else {
      selectEl.addEventListener(type, listener)
    }
  }
}


const firebaseConfig = {
  apiKey: "AIzaSyDUNlPtR8BjUNmfLSReG7VL4PwZI8LfUmo",
  authDomain: "knockme-web.firebaseapp.com",
  projectId: "knockme-web",
  databaseURL: "https://knockme-web-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "knockme-web.appspot.com",
  messagingSenderId: "378856926888",
  appId: "1:378856926888:web:07ec35caa0f0b125471c9d",
  measurementId: "G-HLBF8KKRCM"
};



(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "https://connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));


const currentConfig = {
  id: "",
  pic: "../image/dp.png",
  nm: "",
  place: "null"
};
//console.log(currentConfig.id,currentConfig.pic,currentConfig.nm);

//sessionStorage.clear();
if(!sessionStorage.getItem("id"))
  location.replace("../");
else
{
  currentConfig.id=sessionStorage.getItem("id");
  currentConfig.pic=sessionStorage.getItem("pic");
  currentConfig.nm=sessionStorage.getItem("nm");
  //console.log(currentConfig.id,currentConfig.pic,currentConfig.nm);
}


document.querySelector(".profilePic").src=currentConfig.pic;
document.querySelector(".userName").innerHTML=currentConfig.nm;


if(sessionStorage.getItem("place"))
  currentConfig.place=sessionStorage.getItem("place");
else if(window.innerWidth<=786)
  tabToggle(); 

function tabToggle()
{
  select('body').classList.toggle('mobile-nav-active')
  document.querySelector(".mobile-nav-toggle").classList.toggle('bi-x')
}
/**
 * Mobile nav toggle
 */
on('click', '.mobile-nav-toggle', function (e) {
  //tabToggle();
  tabToggle();
})



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

if(!sessionStorage.getItem("place"))
  document.querySelector(".msgView").style.visibility = 'hidden';

if(sessionStorage.getItem("place")=="bonomaya")
  bonomaya();
else if(sessionStorage.getItem("place")=="foodcourt")
  foodcourt();
else if(sessionStorage.getItem("place")=="library")
  library();
else if(sessionStorage.getItem("place")=="other")
  other();
 

function bonomaya()
{
  currentConfig.place="bonomaya";
  sessionStorage.setItem("place", "bonomaya");
  document.querySelector(".pPicInner").src="../image/bonomaya.jpg";
  document.querySelector("#bonomaya").setAttribute("class", "tab tabSelected placeNm");
  document.querySelector("#foodcourt").setAttribute("class", "tab placeNm");
  document.querySelector("#library").setAttribute("class", "tab placeNm");
  document.querySelector("#other").setAttribute("class", "tab placeNm");
  document.querySelector(".conversation").innerHTML="";
  document.querySelector(".pNameInner").innerHTML="Bonomaya";
  document.querySelector(".msgView").style.visibility = 'visible';
}
function foodcourt()
{
  currentConfig.place="foodcourt";
  sessionStorage.setItem("place", "foodcourt");
  document.querySelector(".pPicInner").src="../image/food_court.jpg";
  document.querySelector("#bonomaya").setAttribute("class", "tab placeNm");
  document.querySelector("#foodcourt").setAttribute("class", "tab tabSelected placeNm");
  document.querySelector("#library").setAttribute("class", "tab placeNm"); 
  document.querySelector("#other").setAttribute("class", "tab placeNm"); 
  document.querySelector(".conversation").innerHTML="";
  document.querySelector(".pNameInner").innerHTML="Food Court";
  document.querySelector(".msgView").style.visibility = 'visible';
}

function library()
{
  currentConfig.place="library";
  sessionStorage.setItem("place", "library");
  document.querySelector(".pPicInner").src="../image/library.jpg";
  document.querySelector("#bonomaya").setAttribute("class", "tab placeNm");
  document.querySelector("#foodcourt").setAttribute("class", "tab placeNm");
  document.querySelector("#library").setAttribute("class", "tab tabSelected placeNm");
  document.querySelector("#other").setAttribute("class", "tab placeNm");
  document.querySelector(".conversation").innerHTML="";
  document.querySelector(".pNameInner").innerHTML="Library";
  document.querySelector(".msgView").style.visibility = 'visible';
}

function other()
{
  currentConfig.place="other";
  sessionStorage.setItem("place", "other");
  document.querySelector(".pPicInner").src="../image/other.jpg";
  document.querySelector("#bonomaya").setAttribute("class", "tab placeNm");
  document.querySelector("#foodcourt").setAttribute("class", "tab placeNm");
  document.querySelector("#library").setAttribute("class", "tab placeNm");    
  document.querySelector("#other").setAttribute("class", "tab tabSelected placeNm");
  document.querySelector(".conversation").innerHTML="";
  document.querySelector(".pNameInner").innerHTML="Random Peoples from Random Places";
  document.querySelector(".msgView").style.visibility = 'visible';
}

on('click', '#bonomaya', function (e) {
  //if(e.id=="bonomaya")
  bonomaya();
  if(window.innerWidth<=786)
    tabToggle();
  refresh();
})

on('click', '#foodcourt', function (e) {
  foodcourt();
  if(window.innerWidth<=786)
    tabToggle();
  refresh();
})

on('click', '#library', function (e) {
  library();
  if(window.innerWidth<=786)
    tabToggle();
  refresh();
})

on('click', '#other', function (e) {
  other();
  if(window.innerWidth<=786)
    tabToggle();
  refresh();
})

on('click', '.KnockME', function (e) {
  location.replace("chat_page.htm");
})

on('click', '.logoutBtn', function (e) {
  sessionStorage.clear();
  location.replace("../");
})



//database 
const db = getDatabase();

function refresh()
{
  const commentsRef = ref(db, currentConfig.place);
  onChildAdded(commentsRef, (data) => {
    // addCommentElement(postElement, data.key, data.val().text, data.val().author);
    loadData(data.val());
  });
}
refresh();


function loadData(doc) {
  const fragment = document.createDocumentFragment();
  // const loader = document.querySelector(".loader");

  // loader.style.display = "none";

  let newMsg = document.createElement("div");
  let proPic = document.createElement("img");
  let msgInfo = document.createElement("div");
  let nm = document.createElement("p");
  let msg = document.createElement("p");


  if(doc.id==currentConfig.id)
    newMsg.setAttribute("class", "myMsg");
  else
    newMsg.setAttribute("class", "otherMsg");
  proPic.setAttribute("class", "proPic");
  msgInfo.setAttribute("class", "msgInfo");
  nm.setAttribute("class", "nm");
  msg.setAttribute("class", "msg");


  proPic.src = doc.pic;
  nm.innerHTML = doc.nm;
  msg.innerHTML = doc.msg;


  fragment.appendChild(newMsg);
  newMsg.appendChild(proPic);
  newMsg.appendChild(msgInfo);
  msgInfo.appendChild(nm);
  msgInfo.appendChild(msg);


  var conV = document.querySelector(".conversation");
  conV.appendChild(newMsg);
  conV.scrollTop = conV.scrollHeight;
};


on('click', '.sendBtn', function (e) {

  // Create a new post reference with an auto-generated id
  const postListRef = ref(db, currentConfig.place);
  const newPostRef = push(postListRef);
  set(newPostRef, {
    "id": currentConfig.id,
    "pic": currentConfig.pic,
    "nm": currentConfig.nm,
    "msg": document.querySelector(".editTxt").value 
  });

});

var input = document.querySelector(".editTxt")
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.querySelector(".sendBtn").click();
  }
});
var userCount =0,userExist=0,count=0;
const userCountRef = ref(db, "userInfo/userCount");
onValue(userCountRef, (snapshot) => {
  userCount = parseInt(snapshot.val());
});
function isUserExist()
{
  const profileRef = ref(db, "userInfo/profile");
  // const userExist= async () => {
  //   await 
  // } 
  onChildAdded(profileRef, (data) => {
    // addCommentElement(postElement, data.key, data.val().text, data.val().author);
    count++;
    if(data.key==currentConfig.id)
      userExist=1;
    if(userExist==0&&count==userCount)
    {
      console.log("New User");
      storeNewUserId();
    }
    else
      console.log("No New User");

  });

}
isUserExist();

function storeNewUserId()
{
  const newUserRef = ref(db, "userInfo/profile/"+currentConfig.id);

  const user = {
    id: currentConfig.id,
    ip: "",
    nm: currentConfig.nm,
    loc: ""
  };

  var endpoint = 'https://api.db-ip.com/v2/free/self';
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () 
  {
    if (this.readyState == 4 && this.status == 200) 
    {
      var response = JSON.parse(this.responseText);
      console.log('query failed: ' + response.message);
      user.ip=response.ipAddress;
      user.loc=response.city+", "+response.stateProv+", "+response.countryName;
      set(newUserRef, user);
      set(ref(db, "userInfo"), {userCount: increment(1)});
      console.log("New User Added");
    }
  };
  xhr.open('GET', endpoint, true);
  xhr.send();

  


}

