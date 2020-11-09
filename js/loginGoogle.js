function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  localStorage.setItem('user', profile.getName());
  localStorage.setItem('statusGoogle', 'loggedIn'); 
  window.location.href="cover.html";
}

function signOut() {
  if(localStorage.getItem('statusGoogle') != null){
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    localStorage.clear();
    location.href="index.html";
  }
    else{
      localStorage.clear();
      location.href="index.html";
  }
}
function onLoad() {
gapi.load ('auth2', function() {
    gapi.auth2.init();
});
}