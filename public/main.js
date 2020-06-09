//the users id (AKA cookie)
var userID = -1;



//===============
//Functions
//===============


function showModal(){
  console.log("++");
  var Modal = document.getElementById('playerNameInput');

  // Show the modal and its backdrop.
  Modal.classList.remove("hidden");
}

function hideModal(){
  console.log("--");
  var Modal = document.getElementById('playerNameInput');

  // Show the modal and its backdrop.
  Modal.classList.add("hidden");

  var inputElems = document.getElementsByClassName('input-element');
  for (var i = 0; i < inputElems.length; i++) {
    var input = inputElems[i].querySelector('input, textarea');
    input.value = '';
  }
}


function refreshIDs(){
  userID = window.sessionStorage.getItem("userID");
  console.log("REFRESHED ID " + userID);
  if (userID == null){
		console.log("Setting ID to -1");
	  	userID = -1;
  }
}

function clearTheCookies(){
  console.log("++Force Clear the cookies");
  userID = -1;
  window.sessionStorage.setItem("userID", userID);
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

function search_db(){
	var text_input_box = document.getElementById('bsearch');
	var reqURL = "/search/" + text_input_box.value;
	changePage(reqURL);
}


//===============
//Event Listners
//===============

/*
 * Wait until the DOM content is loaded, and then hook up UI interactions, etc.
 */
window.addEventListener('DOMContentLoaded', function () {

  var search = document.getElementById('searchButt');
  if(search){
	  search.addEventListener('click', search_db);
  }

  var popup = document.getElementById('edit');
  if(popup){
    popup.addEventListener('click', showModal);
  }

  var cancelBtn = document.getElementById('modal-cancel-button');
  if(cancelBtn){
 	 cancelBtn.addEventListener('click', hideModal);
  }

  var logoutBtn = document.getElementById('lgbtn');
  if(logoutBtn){
    logoutBtn.addEventListener('click', logout);
  }



  var goToAdmin = document.getElementById('goToAdmin');
  if(goToAdmin){
    function reDir(callback){
      refreshIDs();
      callback();
  }
  reDir(function(){
		  if(userID == -1){
        goToAdmin.addEventListener('click',function(){changePage("/login");});
	  }
	  else{
		  var reqURL = "/admin/load/";
		  goToAdmin.addEventListener('click',function(){changePage(reqURL);});
	  }
	});
  }


  var rel = document.getElementById('acntPops');
  if (rel){
    document.getElementById('admin_UID').value = userID;
    rel.submit();
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

  var acountPageR = document.getElementById('acnt_page_redir');
  if(acountPageR){
 	changePage("/account/load");
    }
  

  var acnt_bio = document.getElementById('acnt_page_bio');
  if (acnt_bio){
	  document.getElementById('acnt_page_bio').value = userID;
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

  var admins_id = document.getElementById('ad_page_UID');
  if(admins_id){
    document.getElementById('ad_page_UID').value = userID;
  }

 });



window.onload = function () {
	    refreshIDs();
}
