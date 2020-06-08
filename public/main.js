//the users id (AKA cookie)
var userID = -1;



//===============
//Functions
//===============



function refreshIDs(){
  userID = window.sessionStorage.getItem("userID");
  console.log("REFRESHED ID " + userID);
  if (userID == null){
	  	userID = -1;
  }
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
  function checkForID(callback){
	  refreshIDs();
	  callback(null);
  }
  checkForID(function(foo){
  //check to see if the user already has a cookie before requesting a new one
	  console.log("userID = ", userID);
	  if(userID == -1){
	    //transfer the user to the login page
	    var reqURL = "/login"
//	    changePage(reqURL);
	  }
	  else{
		  var reqURL = "/account/view/" + userID;
		  var load = document.getElementById('acntPop');
		  if (load){

			  load.submit();
		  }
//	    changePage(reqURL);
	  }
  });


}

function logout(){
	function lgo(callback){
		window.sessionStorage.setItem("userID", -1);
		callback();
	}
	lgo(function(){changePage("/");});
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

  var logoutBtn = document.getElementById('lgbtn');
  if(logoutBtn){
    logoutBtn.addEventListener('click', logout);
  }

  var goToAcnt = document.getElementById('goToAcnt');
  if(goToAcnt){
	  function reDir(callback){
		  refreshIDs();
		  callback();
	}
	reDir(function(){
		  if(userID == -1){
		  goToAcnt.addEventListener('click',function(){changePage("/login");});
	  }
	  else{
		  var reqURL = "/account/load/";
		  goToAcnt.addEventListener('click',function(){changePage(reqURL);});
	  }
	});

  }

  var login = document.getElementById('userIdGetter');
  if(login){
	  function login_time(callback){
		  console.log(document.getElementById('userIdGetter').getAttribute('data-value'));
	  	  userID = document.getElementById('userIdGetter').getAttribute('data-value');
	          window.sessionStorage.setItem("userID", userID);
		  callback(null);
	  }
	  if ( document.getElementById('userIdGetter').getAttribute('data-value') != -1){
		  function saveID(callback){
			var UID = document.getElementById('userIdGetter').getAttribute('data-value');
		  	window.sessionStorage.setItem("userID", UID);
			callback(UID)
		  }
		  saveID(function(UID){
			var reqURL = "/account/view/";
		  	login_time(function(foo){changePage(reqURL);});
		  });
	  }

  }

  var acountPageL = document.getElementById('acnt_page_l');
  if(acountPageL){
	  console.log("ACNT PAGE LOAD");
	  function updatePageID(callback){
		  document.getElementById('acnt_page_l').value = userID;
		  callback();
	   }
      updatePageID(function(){
    	getUserID_acnt();
    });
  }

  var battle_display = document.getElementById('battle_display_usr');
  if(battle_display){
  //  alert("HI");
    console.log("BATTLE DISPLAY");
    document.getElementById('battle_display_usr').value = userID;

  }

  var battle_create = document.getElementById('battle_create_usr');
  if(battle_create){
    document.getElementById('battle_create_usr').value = userID;

  }




});

window.onload = function () {
	    refreshIDs();
}
