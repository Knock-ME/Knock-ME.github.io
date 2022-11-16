// import { getDatabase, ref, onChildAdded, push, set ,initializeApp, getAnalytics} from "./firebase_module.js"
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js"
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js"

import { getDatabase, ref, onChildAdded, push, set } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

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
console.log(currentConfig.id,currentConfig.pic,currentConfig.nm);

//sessionStorage.clear();
if(!sessionStorage.getItem("id"))
  location.replace("https://yaminmahdi.github.io/KnockME");
else
{
  currentConfig.id=sessionStorage.getItem("id");
  currentConfig.pic=sessionStorage.getItem("pic");
  currentConfig.nm=sessionStorage.getItem("nm");
  console.log(currentConfig.id,currentConfig.pic,currentConfig.nm);
}
//sessionStorage.setItem("id", "420");
// sessionStorage.setItem("nm", "Khan");
// sessionStorage.setItem("place", "null");

document.querySelector(".profilePic").src=currentConfig.pic;
document.querySelector(".userName").innerHTML=currentConfig.nm;


if(sessionStorage.getItem("place"))
  currentConfig.place=sessionStorage.getItem("place");


if(window.innerWidth<=786)
  select('body').classList.toggle('mobile-nav-active');
// function tabToggle()
// {
//   select('body').classList.toggle('mobile-nav-active')
//   document.querySelector(".mobile-nav-toggle").classList.toggle('bi-x')
// }
// tabToggle();
/**
 * Mobile nav toggle
 */
on('click', '.mobile-nav-toggle', function (e) {
  //tabToggle();
  select('body').classList.toggle('mobile-nav-active');
  this.classList.toggle('bi-x');
})



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

if(!sessionStorage.getItem("place"))
  document.querySelector(".msgView").style.visibility = 'hidden';

if(sessionStorage.getItem("place")=="bonomaya")
  bonomaya();
 
 

function bonomaya()
{
  currentConfig.place="bonomaya";
  sessionStorage.setItem("place", "bonomaya");
  document.querySelector(".pPicInner").src="../image/bonomaya.jpg";
  document.querySelector("#bonomaya").setAttribute("class", "tab tabSelected placeNm");
  document.querySelector("#foodcourt").setAttribute("class", "tab placeNm");
  document.querySelector("#library").setAttribute("class", "tab placeNm");
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
  document.querySelector("#library").setAttribute("class", "tab tabSelected placeNm");    document.querySelector(".conversation").innerHTML="";
  document.querySelector(".pNameInner").innerHTML="Library";
  document.querySelector(".msgView").style.visibility = 'visible';
}

on('click', '#bonomaya', function (e) {
  //if(e.id=="bonomaya")
  bonomaya();
  select('body').classList.toggle('mobile-nav-active');
  refresh();
})

on('click', '#foodcourt', function (e) {
  //if(e.id=="bonomaya")
  foodcourt();
  select('body').classList.toggle('mobile-nav-active');
  refresh();
})

on('click', '#library', function (e) {
  //if(e.id=="bonomaya")
  library();
  select('body').classList.toggle('mobile-nav-active');
  refresh();
})





function refresh()
{
  const db = getDatabase();
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
}

on('click', '.sendBtn', function (e) {

  // Create a new post reference with an auto-generated id
  const db = getDatabase();
  const postListRef = ref(db, currentConfig.place);
  const newPostRef = push(postListRef);
  set(newPostRef, {
    "id": currentConfig.id,
    "pic": currentConfig.pic,
    "nm": currentConfig.nm,
    "msg": document.querySelector(".editTxt").value 
  });

})
