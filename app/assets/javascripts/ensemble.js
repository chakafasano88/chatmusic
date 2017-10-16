document.addEventListener("DOMContentLoaded", function(event) {
console.log("DOM fully loaded and parsed");


    // Setup Kandy to make and receive calls.
  kandy.setup({
      //  HTML elements for streaming containers.
     remoteVideoContainer: document.getElementById("remote-container"),
     localVideoContainer: document.getElementById("local-container"),

      // Register listeners to call events.
      listeners: {
        callInitiated: onCallInitiated,
        callIncoming: onCallIncoming,
        callEstablished: onCallEstablished
      }
  });

  const registration = document.querySelector("#registration");
  const login = document.querySelector("#login");
  // Output message for registration
  const output1 = document.querySelector("#output1");
  // Output message "login succesful" or "login failed"
  const output2 = document.querySelector("#output2");
  // Output message "processing"
  const output3 = document.querySelector("#output3");

  login.addEventListener("submit", function processLogin(){
    output3.innerHTML = "Proccessing...";
  });

//====================== REGISTER PEOPLE =================
if (registration) {
  registration.addEventListener("submit", function(e) {
     e.preventDefault();
     const user = {
       "user_id": e.target.user_id.value,
       "user_first_name": e.target.user_first_name.value, // Optional
       "user_last_name": e.target.user_last_name.value, // Optional
       "user_password": e.target.user_password.value // Optional, will be generated if ommitted.
     };
     // console.log(user)
     fetch("https://api.kandy.io/v1.2/domains/users/user_id?key=" + kandyDat, {
         headers: {
           "Accept": "application/json",
           "Content-Type": "application/json"
         },
         method: "POST",
         body: JSON.stringify(user)
       })
       .then(function(r){return r.json()})
      //  Turns Json into an object
       .then(function(response){
         console.log("Kandy says: ",response);
         output1.innerHTML = response.message;
       })
       .catch(function(error){
         console.log("error");
      });
    });
  }

//====================== LOGIN PEOPLE ====================
  login.addEventListener("submit", function (e) {
    e.preventDefault();
    kandy.login(
      kandyKey,
      e.target.user_name.value,
      e.target.user_password.value,
      function loginSuccess(){
        output2.innerHTML = "Login succesful";
        output3.innerHTML = "";
        var timer = function(){
          modal.setAttribute("style", "display: none");
        };
        // currentUser.innerHTML = obj.user.user_first_name;
      },
      function loginFailure(){
        output2.innerHTML = "Login failed"
      },
    )
  });

// ============= LOGIN END =================

    // Utility function for appending messages to the message div.
  function log(message) {
    document.getElementById("messages").innerHTML += "<div>" + message + "</div>";
  }

  // Variable to keep track of video display status.
  var showVideo = true;
// ================== MAKE A CALL ===================
  var makeCallButt = document.getElementById("makeCallButt");
    makeCallButt.addEventListener("click", startCall);

  //  Make a call to the callee
  function startCall() {
    var callee = document.getElementById("callee").value;

    // Tell Kandy to make a call to callee.
    kandy.call.makeCall(callee, showVideo);
  };
  // Variable to keep track of the call.
  var callId;


  // What to do when a call is initiated.
  function onCallInitiated(call, callee) {
      log("Call initiated with " + callee + ". Ringing...");
      // Store the call id, so the caller has access to it.
      callId = call.getId();

      // Handle UI changes. A call is in progress.
      document.getElementById("make-call").disabled = true;
      document.getElementById("end-call").disabled = false;
  };

  // What to do for an incoming call.
  function onCallIncoming(call) {
    log("Incoming call from " + call.callerNumber);
      // Store the call id, so the callee has access to it.
      callId = call.getId();

      // Handle UI changes. A call is incoming.
      document.getElementById("accept-call").disabled = false;
      document.getElementById("decline-call").disabled = false;
  };

  var acceptCallElement = document.getElementById("acceptCall")
    acceptCallElement.addEventListener("click", acceptCall);

    //  Accept an incoming call.
    function acceptCall() {
      // Tell Kandy to answer the call.
      kandy.call.answerCall(callId, showVideo);
      // Second parameter is false because we are only doing voice calls, no video.

      log("Call answered.");
      // Handle UI changes. Call no longer incoming.
    };

    // What to do when call is established.
  function onCallEstablished(call) {
      log("Call established.");

    // Handle UI changes. Call in progress.
    document.getElementById("make-call").disabled = true;
    document.getElementById("mute-call").disabled = false;
    document.getElementById("hold-call").disabled = false;
    document.getElementById("end-call").disabled = false;
  };

  var callEndElement = document.getElementById("callEnd")

    callEndElement.addEventListener("click", endCall)
    // End a call.
  function endCall() {
      // Tell Kandy to end the call.
      kandy.call.endCall(callId);
  };

  document.querySelector("#register-butt").onclick = function() {
    window.location = "/home/register";
  };


  const span = document.getElementsByClassName("close")[0];
  const loginForm = document.querySelector('#login')
  const loginButtElement = document.querySelector(".login-button-link")
  const loginModal = document.querySelector(".hidden-login-div")
  let loginRegisterButts =  document.querySelector(".login-button-link-div");

  loginButtElement.onclick = function() {
    loginModal.style.display = "flex";
  };
  // Closes modal, resets form
  span.onclick = function() {
    modal.style.display = "none";
    loginForm.reset();
  };

});
