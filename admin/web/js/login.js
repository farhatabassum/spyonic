document.addEventListener('contextmenu', event => event.preventDefault());
var reg = document.getElementById('register');
var login = document.getElementById('login')
function OpenRegister() {
    reg.style.display = 'block';
    login.style.display = 'none';

}
function Openlogin() {
    login.style.display = 'block';
    reg.style.display = 'none';
}
async function trylogin(){
    console.log('logging')
    var email = document.getElementById('lemail').value
    var passwd = document.getElementById('lpasswd').value
    eel.login(email,passwd)(function isreg(stats){
        if (stats == 1){
            console.log('logged in')
            setCookie("username", email);
            setCookie("login",1);

        }
        else{
            console.log(stats)
        }
    })
    
}
async function tryregistering(){
    console.log('registering')
    var email = document.getElementById('remail').value
    var passwd = document.getElementById('rpasswd').value
    console.log(email,passwd)
    eel.register(email,passwd)(function isreg(stats){
        if (stats == 1){
            console.log('registered')
            setCookie("username", email);
            setCookie("login",1);
        }
        else{
            console.log(stats)
        }
    })
    
}
async function cheklogin(){
    console.log('checking log');
    let x = await eel.checklogin()();
    console.log(x);
    if(x==1){
        window.location.href = '/html/index.html'
    }
    else{
        return 0
    }
    
}



function setCookie(cname, cvalue) {
  document.cookie = cname + "=" + cvalue + ";" ;
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  let user = getCookie("username");
  let status = getCookie("login")
  console.log('checking cookie')
  if (user != "" || status != 0) {
    // alert("Welcome again " + user);
    console.log('authenticating')
    let x = cheklogin()
    if (x==0){
        setCookie("login",0)
        checkCookie()
    }
  } else {
    // user = prompt("Please enter your name:", "");
    if (user != "" && user != null) {
      console.log('user login required')
      setCookie("username", user);
      setCookie("login",0);
      Openlogin()
    }
    else{
        console.log('user unknown')
        setCookie("username",'')
        OpenRegister()
    }
  }
}


window.onload = checkCookie()