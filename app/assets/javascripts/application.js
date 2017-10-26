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
//= require_tree .

$(window).ready(function(){
    soundOn();
});

function soundOn(){
  $("#bar1").animate({height:'170px'}, 100, soundOn);
  $("#bar2").animate({height:'170px'}, 150);
  $("#bar3").animate({height:'170px'}, 150);
  $("#bar4").animate({height:'170px'}, 150);
  $("#bar1").animate({height:'70px'}, 150);
  $("#bar2").animate({height:'100px'}, 150);
  $("#bar3").animate({height:'40px'}, 150);
  $("#bar4").animate({height:'40px'}, 150);
  $("#bar1").animate({height:'30px'}, 150);
  $("#bar2").animate({height:'60px'}, 150);
  $("#bar3").animate({height:'90px'}, 150);
  $("#bar4").animate({height:'200px'}, 150);
  $("#bar1").animate({height:'100px'}, 150);
  $("#bar2").animate({height:'20px'}, 150);
  $("#bar3").animate({height:'60px'}, 150);
  $("#bar4").animate({height:'0px'}, 150);
  $("#bar1").animate({height:'50px'}, 150);
  $("#bar2").animate({height:'20px'}, 150);
  $("#bar3").animate({height:'10px'}, 150);
  $("#bar4").animate({height:'60px'}, 150);
  $("#bar1").animate({height:'70px'}, 150);
  $("#bar2").animate({height:'40px'}, 150);
  $("#bar3").animate({height:'90px'}, 150);
  $("#bar4").animate({height:'140px'}, 150);

}
