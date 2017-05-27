// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
document.addEventListener("DOMContentLoaded", function(event) {
console.log("DOM fully loaded and parsed");
    console.log(acceptCall)

  kandy.setup();

  var registration = document.querySelector('#registration')
  var login = document.querySelector('#login')
  var output1 = document.querySelector('#output1')
  var output2 = document.querySelector('#output2')


//====================== REGISTER PEOPLE =================
  registration.addEventListener('submit', function(e) {
    e.preventDefault()
    var user = {
      "user_id": e.target.user_id.value,
      "user_first_name": e.target.user_first_name.value, // Optional
      "user_last_name": e.target.user_last_name.value, // Optional
      "user_password": e.target.user_password.value // Optional, will be generated if ommitted.
  }
    // console.log(user)
    fetch('https://api.kandy.io/v1.2/domains/users/user_id?key=DAT1fd84286cf3649978264b5131b137ced', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(user)
    })
    .then(r => r.json())
    .then(response=>{
      console.log('Kandy says: ',response)
      output1.innerHTML = response.message
    })
    .catch(error=>{
      console.log('u fuked up')
    })
  })

//====================== LOGIN PEOPLE ====================

//GET https://api.kandy.io/v1.2/domains/users/accesstokens?key=DATfa8a1a2cf85448228810d29a77632335

  login.addEventListener('submit', function (e) {
    e.preventDefault()
    kandy.login(
      'DAK05485860814b4b349096b7013f7ba900',
      e.target.user_name.value,
      e.target.user_password.value,
      function(){
        output2.innerHTML = "Login succesful"
      },
      ()=>output2.innerHTML = "Login failed",
    )
  })



// // ============= LOGIN END =================

  // Setup Kandy to make and receive calls.
  kandy.setup({
      //  HTML elements for streaming containers.
     remoteVideoContainer: document.getElementById("remote-container"),
     localVideoContainer: document.getElementById("local-container"),

      // Register listeners to call events.
      listeners: {
          callInitiated: onCallInitiated,
          callIncoming: onCallIncoming,
          callEstablished: onCallEstablished,
      }
  });

    // Utility function for appending messages to the message div.
  function log(message) {
      document.getElementById("messages").innerHTML += "<div>" + message + "</div>";
  }

  // Variable to keep track of video display status.
  var showVideo = true;
// ================== MAKE A CALL ===================
  var makeCallButt = document.getElementById('makeCallButt')
    makeCallButt.addEventListener("click", startCall)

  //  Make a call to the callee
  function startCall() {
      var callee = document.getElementById("callee").value;

      // Tell Kandy to make a call to callee.
      kandy.call.makeCall(callee, showVideo);
  }

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

  var acceptCall = document.getElementById("acceptCall")
    acceptCall.addEventListener("click", acceptCall);

  // What to do for an incoming call.
  function onCallIncoming(call) {
      log("Incoming call from " + call.callerNumber);

      // Store the call id, so the callee has access to it.
      callId = call.getId();

      // Handle UI changes. A call is incoming.
      document.getElementById("accept-call").disabled = false;
      document.getElementById("decline-call").disabled = false;
  };

    //  Accept an incoming call.
    function acceptCall() {
      // Tell Kandy to answer the call.
      kandy.call.answerCall(callId, showVideo);
      // Second parameter is false because we are only doing voice calls, no video.

      log("Call answered.");
      // Handle UI changes. Call no longer incoming.
      document.getElementById("accept-call").disabled = true;
      document.getElementById("decline-call").disabled = true;
    };

  var videoShow = document.getElementById("showVideo")
    videoShow.addEventListener("click", toggleVideo)
    // Show or hide video, depending on current status.
  function toggleVideo() {
      if(showVideo) {
          kandy.call.stopCallVideo(callId);
          log("Stopping send of video.");
          showVideo = false;
      } else {
          kandy.call.startCallVideo(callId);
          log("Starting send of video.");
          showVideo = true;
      };
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

});
