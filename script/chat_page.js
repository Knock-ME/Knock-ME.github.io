import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js"
//import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js"

import { getDatabase, ref, onChildAdded, push, set, onValue, increment} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
//import { getStorage, uploadBytesResumable,ref as rff, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

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
  place: "null",
  link: ""
};
//console.log(currentConfig.id,currentConfig.pic,currentConfig.nm);

//sessionStorage.clear();
//sessionStorage.id="3305747356403806";
if(!sessionStorage.getItem("id"))
  location.replace("../");
else
{
  currentConfig.id=sessionStorage.getItem("id");
  currentConfig.pic=sessionStorage.getItem("pic");
  currentConfig.nm=sessionStorage.getItem("nm");
  currentConfig.link=sessionStorage.getItem("link");
  //console.log(currentConfig.id,currentConfig.pic,currentConfig.nm);
}


document.querySelector(".profilePic").src=currentConfig.pic;
document.querySelector(".userName").innerHTML=currentConfig.nm;


if(sessionStorage.getItem("place"))
{
  currentConfig.place=sessionStorage.getItem("place");
  document.querySelector(".startMsg").style.visibility = 'hidden';
}
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
//const analytics = getAnalytics(app);
const db = getDatabase();

//const storage = getStorage(app);

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
else if(sessionStorage.getItem("place")=="msgYk/"+currentConfig.id)
  clickYK("Yamin Mahdi", currentConfig.id);

 

function bonomaya()
{
  currentConfig.place="bonomaya";
  sessionStorage.setItem("place", "bonomaya");
  document.querySelector(".pPicInner").src="../image/bonomaya.jpg";
  document.querySelector("#bonomaya").setAttribute("class", "tab tabSelected placeNm");
  document.querySelector("#foodcourt").setAttribute("class", "tab placeNm");
  document.querySelector("#library").setAttribute("class", "tab placeNm");
  document.querySelector("#other").setAttribute("class", "tab placeNm");
  if(JSON.stringify(document.querySelector("#msgYk"))!= "null")
    document.querySelector("#msgYk").setAttribute("class", "tab placeNm");
  document.querySelector(".conversation").innerHTML="";
  document.querySelector(".pNameInner").innerHTML="Bonomaya";
  document.querySelector(".startMsg").style.visibility = 'hidden';
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
  if(JSON.stringify(document.querySelector("#msgYk"))!= "null")
    document.querySelector("#msgYk").setAttribute("class", "tab placeNm");
  document.querySelector(".conversation").innerHTML="";
  document.querySelector(".pNameInner").innerHTML="Food Court";
  document.querySelector(".startMsg").style.visibility = 'hidden';
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
  if(JSON.stringify(document.querySelector("#msgYk"))!= "null")
    document.querySelector("#msgYk").setAttribute("class", "tab placeNm");
  document.querySelector(".conversation").innerHTML="";
  document.querySelector(".pNameInner").innerHTML="Library";
  document.querySelector(".startMsg").style.visibility = 'hidden';
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
  if(JSON.stringify(document.querySelector("#msgYk"))!= "null")
    document.querySelector("#msgYk").setAttribute("class", "tab placeNm");
  document.querySelector(".conversation").innerHTML="";
  document.querySelector(".pNameInner").innerHTML="Globe Chat";
  document.querySelector(".startMsg").style.visibility = 'hidden';
  document.querySelector(".msgView").style.visibility = 'visible';
}

function msgYK(name, id)
{
  currentConfig.place="msgYk/"+id;
  sessionStorage.setItem("place", currentConfig.place);
  if(name=="Yamin Mahdi")
    document.querySelector(".pPicInner").src="../image/yk.jpg";
  else
    document.querySelector(".pPicInner").src="../image/dp.png";
  document.querySelector("#bonomaya").setAttribute("class", "tab placeNm");
  document.querySelector("#foodcourt").setAttribute("class", "tab placeNm");
  document.querySelector("#library").setAttribute("class", "tab placeNm");    
  document.querySelector("#other").setAttribute("class", "tab placeNm");
  //document.querySelector("#msgYk").setAttribute("class", "tab tabSelected placeNm");
  var x=document.querySelectorAll("#msgYk");
  x.forEach(i => i.setAttribute("class", "tab placeNm"));
  document.querySelector(".conversation").innerHTML="";
  document.querySelector(".pNameInner").innerHTML=name;
  document.querySelector(".startMsg").style.visibility = 'hidden';
  document.querySelector(".msgView").style.visibility = 'visible';
  refresh();
}
function clickYK(name, id)
{
  const fragment = document.createDocumentFragment();

  let ykPro = document.createElement("div");
  let proPic = document.createElement("img");
  let nm = document.createElement("p");

  ykPro.setAttribute("class", "tab placeNm");
  ykPro.setAttribute("id", "msgYk");
  ykPro.addEventListener("click", function(event) {
    console.log("yk clicked");
    msgYK(name, id);
    if(window.innerWidth<=786)
      tabToggle();
    this.setAttribute("class", "tab tabSelected placeNm");
  });
  proPic.setAttribute("class", "placePic");
  nm.setAttribute("class", "pName");
  
  if(name=="Yamin Mahdi")
    proPic.src = "../image/yk.jpg";
  else
    proPic.src = "../image/dp.png";

  nm.innerHTML = name;

  fragment.appendChild(ykPro);
  ykPro.appendChild(proPic);
  ykPro.appendChild(nm);

  var conNm = document.querySelector(".navInner");
  conNm.appendChild(ykPro);
  msgYK(name, id);
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
  sessionStorage.logout="0";
  location.replace("../");
})




// database work //


var lastMsgUserId=null, lastMsgKey=null;

function refresh()
{
  const db = getDatabase();
  const commentsRef = ref(db, currentConfig.place);
  onChildAdded(commentsRef, (data) => {
    // addCommentElement(postElement, data.key, data.val().text, data.val().author);
    if(data.key!=lastMsgKey)
    {
      loadData(data.val());
      lastMsgKey=data.key;
      document.querySelector(".editTxt").focus();
      //$("#.editTxt").focus();
    }
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
  proPic.addEventListener("error", function(event) {
    event.target.src = "../image/dp.png";
    event.onerror = null;
  });
  onValue(ref(db, "userInfo/profile/"+doc.id+"/link"), (snapshot) => {
    var link = snapshot.val();
    if(link!=null)
    {
      proPic.addEventListener("click", function(event) {
        window.open(link, '_blank');

      });
    }
  });
  
  nm.innerHTML = doc.nm;
  msg.innerHTML = doc.msg;
  if(doc.msg=="/last")
    msg.style.color = "steelblue";
  if(doc.id!="69"&&doc.id!=currentConfig.id)
    lastMsgUserId=doc.id;
  fragment.appendChild(newMsg);
  newMsg.appendChild(proPic);
  newMsg.appendChild(msgInfo);
  msgInfo.appendChild(nm);
  msgInfo.appendChild(msg);


  var conV = document.querySelector(".conversation");
  conV.appendChild(newMsg);
  conV.scrollTop = conV.scrollHeight;

  if(doc.msg.includes("@yamin")||doc.msg.includes("@Yamin")||doc.msg.includes("@mahdi")||doc.msg.includes("@Mahdi"))
  {
    console.log("yk has");
    msg.querySelector(".ykClick").addEventListener('click', function(event) {
      console.log("yk clicked");
      if(JSON.stringify(document.querySelector("#msgYk"))== "null")
        clickYK("Yamin Mahdi", currentConfig.id); 
      else
        msgYK("Yamin Mahdi", currentConfig.id);
  });
  }

};

const msg = {
  id: "null",
  msg: " ",
  nm: "unknown",
  pic: "../image/dp.png"
};
on('click', '.sendBtn', function (e) 
{
  // Create a new post reference with an auto-generated id
  msg.id=currentConfig.id;
  msg.pic=currentConfig.pic;
  msg.nm=currentConfig.nm;
  msg.msg=document.querySelector(".editTxt").value;
  if(msg.msg!="/load")
    sendMsg(msg, currentConfig.place);
  else
    loadYkMsg();
  if(msg.msg=="/last")
    getLastUserInfoBot();
});

function sendMsg(msg, place)
{
  var tmp=msg.msg;
  if(tmp.includes("@Yamin"))
  tmp=tmp.replace("@Yamin","<span class='ykClick'>@Yamin</span>");
  else if(tmp.includes("@yamin"))
  tmp=tmp.replace("@yamin","<span class='ykClick'>@yamin</span>");
  else if(tmp.includes("@mahdi"))
  tmp=tmp.replace("@mahdi","<span class='ykClick'>@mamin</span>");
  else if(tmp.includes("@Mahdi"))
  tmp=tmp.replace("@Mahdi","<span class='ykClick'>@Mahdi</span>");

  msg.msg=tmp;
  const postListRef = ref(db, place);
  const newPostRef = push(postListRef);
  set(newPostRef, msg);
  //storeOrUpdateUserId();
}

var input = document.querySelector(".editTxt")
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.querySelector(".sendBtn").click();
  }
});

var userCount =0,userExist=0,count=0;
const userCountRef = ref(db, "userInfo/count/users");
onValue(userCountRef, (snapshot) => {
  userCount = parseInt(snapshot.val());
  document.querySelector(".usrCnt").innerHTML=userCount;
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
    if(userExist==0&&count==userCount&&currentConfig.id!=null)
    {
      console.log("New User");
      storeOrUpdateUserId();
      giveGreetingsBot();
      set(ref(db, "userInfo/count"), {users: increment(1)});
    }
    else
      console.log("No New User");

  });

}
isUserExist();

function storeOrUpdateUserId()
{
  const newUserRef = ref(db, "userInfo/profile/"+currentConfig.id);
  const user = {
    id: currentConfig.id,
    ip: "",
    nm: currentConfig.nm,
    loc: "",
    link: currentConfig.link
  };

  var endpoint = 'https://api.db-ip.com/v2/free/self';
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () 
  {
    if (this.readyState == 4 && this.status == 200) 
    {
      var response = JSON.parse(this.responseText);
      //console.log('query failed: ' + response.message);
      user.ip=response.ipAddress;
      user.loc=response.city+", "+response.stateProv+", "+response.countryName;
      set(newUserRef, user);
      console.log("New User Added");
    }
  };
  xhr.open('GET', endpoint, true);
  xhr.send();
}

function getLastUserInfoBot()
{
  const profileRef = ref(db, "userInfo/profile");
  onChildAdded(profileRef, (data) => {
    // addCommentElement(postElement, data.key, data.val().text, data.val().author);
    if(data.key==lastMsgUserId)
    {
      console.log("User found");
      msg.id="69";
      msg.pic="../image/bot.png";
      msg.nm="Security Bot";
      msg.msg="User Name : "+data.val().nm+"<br>User ID&emsp;&emsp;: "+data.key+"<br>Location&emsp;&nbsp;: "+data.val().loc+"<br>User IP&emsp;&emsp;: "+data.val().ip+"<br>Social Link&nbsp;: <a class='fblink' target='_blank' href='"+data.val().link+"''>Facebook</a><br><br>For any query: <span class='ykClick'>@yamin</span>";
      //loadData(botMsg);
      sendMsg(msg,currentConfig.place);
    }

  });
}

function giveGreetingsBot()
{
  console.log("giveGreetingsBot");
  const greetMsg = 
    [
      "A wild <span class='greetingNm'>xxx</span> appeared.",
      "<span class='greetingNm'>xxx</span> just slid into the server.",
      "<span class='greetingNm'>xxx</span> joined the party.",
      "<span class='greetingNm'>xxx</span> just showed up!",
      "<span class='greetingNm'>xxx</span> is here.",
      "<span class='greetingNm'>xxx</span> hopped into the server.",
      "Good to see you, <span class='greetingNm'>xxx</span>.",
      "Welcome, <span class='greetingNm'>xxx</span>. Say hi!",
      "Welcome, <span class='greetingNm'>xxx</span>. We hope you brought pizza.",
      "Yay, you made it, <span class='greetingNm'>xxx</span>!",
      "Everyone welcome <span class='greetingNm'>xxx</span>!",
      "Glad you're here, <span class='greetingNm'>xxx</span>.",
      "Hello <span class='greetingNm'>xxx</span>, hope you get married soon.",
      "<span class='greetingNm'>xxx</span>, the king of the show has appeared."
    ];
  var rand= Math.floor(Math.random() * greetMsg.length-1);
  msg.msg = (greetMsg[rand].replace("xxx", currentConfig.nm))+"<br><br>For any query: <span class='ykClick'>@yamin</span>";

  msg.id="69";
  msg.pic="../image/bot2.png";
  msg.nm="Greetings Bot";
  //loadData(botMsg);
  sendMsg(msg,"other");
}


// function reply(text,id) {
//   msg.id="3305747356403806";
//   msg.pic="../image/yk.jpg";
//   msg.nm="Yamin Mahdi";
//   msg.msg=text;
//   //"msgYk/"+currentConfig.id
//   sendMsg(msg,"msgYk/"+id);  
// }

//reply("hi","null");


function loadYkMsg()
{
  if(currentConfig.id=="3305747356403806")
  {
    const profileRef = ref(db, "msgYk");
    onChildAdded(profileRef, (data) => {
      const userRef = ref(db, "userInfo/profile/"+data.key+"/nm");
      onValue(userRef, (snapshot) => {
        clickYK(snapshot.val(),data.key);
      });
    });
  }
}