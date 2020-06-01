
//the users id (AKA cookie)
var userID = 0;



//===============
//Functions
//===============



function refreshIDs(){
  userID = window.sessionStorage.getItem("userID");
}

function clearTheCookies(){
  console.log("++Force Clear the cookies");
  userID = 0;
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

function getUserID(){

  console.log("Getting User ID");
  refreshIDs();
  //create the AJAX object
  var request = new XMLHttpRequest();
  //check to see if the user already has a cookie before requesting a new one
  console.log("userID = ", userID);
  /*if(userID == 0){
    //request the user ID from the server
    var reqURL = "/getCookie/"+name;
    request.open("POST", reqURL);

    request.addEventListener('load', function (event) {
      var message = event.target.response;
      if (event.target.status != 200) {
        alert("Error Retreiving Cookie: " + message);
      }
      else{
        //found a game!
        console.log("==New Cookie:", message);
        userID = message;
        window.sessionStorage.setItem("userID", userID);
        changePage("/init/"+userID+"/wait");
      }
    }
    );

    request.send();
  }
  else if(name != ""){
    changePage("/init/"+userID+"/wait");
  }
  else{
    changePage("/");
  }*/

  //perhaps here change the page to account?

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

  var waitPage = document.getElementById('wait');
  if(waitPage){
    //waitPage.addEventListener('load', searchForGame);
    searchForGame();
  }

});

window.onload = function () {
    if (window.sessionStorage.getItem("hasCodeRunBefore") == null) {
        console.log("++setting ID's for the first time");
        userID = 0;
        window.sessionStorage.setItem("userID", userID);
    }
}
