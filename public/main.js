
//the users id (AKA cookie)
var userID = -1;



//===============
//Functions
//===============



function refreshIDs(){
  userID = window.sessionStorage.getItem("userID");
}

function clearTheCookies(){
  console.log("++Force Clear the cookies");
  userID = -1;
  window.sessionStorage.setItem("userID", userID);
}

function getContentFromURL(index) {
  var path = window.location.pathname;
  var pathParts = path.split('/');
  // console.log("== pathParts:", pathParts);
  if (pathParts.length > index) {
    return pathParts[index];
  } else {
    return null;
  }
}

function getUserID_acnt(){

  console.log("Getting User ID");
  refreshIDs();
  //check to see if the user already has a cookie before requesting a new one
  console.log("userID = ", userID);
  if(userID == -1){
    //transfer the user to the login page
    var reqURL = "/login"
    changePage(reqURL);
  }
  else{
	  var reqURL = "/account/" + userID;
    changePage(reqURL);
  }


}

function changePage(URL){
  window.location.href = /*window.location.hostname + */ URL;
}

function getName(){
    // get the user's text inputElems
    var text_input_box = document.getElementById('text-input');

      name = text_input_box.value;
      window.sessionStorage.setItem("name", name);
      if(name == ""){
        alert("Please Enter a name, human.");
        return;
      }
      else{
        getUserID();
      }
}


//===============
//Event Listners
//===============

/*
 * Wait until the DOM content is loaded, and then hook up UI interactions, etc.
 */
window.addEventListener('DOMContentLoaded', function () {

  var potato = document.getElementById('exit-game');
  if(potato){
    potato.addEventListener('click', exitGame);
  }

  var acceptBtn = document.getElementById('modal-accept-button');
  if(acceptBtn){
    acceptBtn.addEventListener('click', getName);
  }

  var cancelBtn = document.getElementById('modal-cancel-button');
  if(cancelBtn){
    cancelBtn.addEventListener('click', hideModal);
  }

  var exitBtn = document.getElementById('modal-close-button');
  if(exitBtn){
    exitBtn.addEventListener('click', hideModal);
  }

  var clearCookies = document.getElementById('clear-cookie-button');
  if(clearCookies){
    clearCookies.addEventListener('click', clearTheCookies);
  }

  var acountPage = document.getElementById('acnt_page');
  if(acountPage){
	  console.log("ACNT PAGE");
    getUserID_acnt();
  }

});

window.onload = function () {
    if (window.sessionStorage.getItem("hasCodeRunBefore") == null) {
        console.log("++setting ID's for the first time");
        userID = -1;
        window.sessionStorage.setItem("userID", userID);
    }
}
