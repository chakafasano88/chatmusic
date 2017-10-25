$(window).ready(function(){
    soundOn();
});

function soundOn(){
  $("#bar1").animate({height:'100px'}, 100, soundOn);
  $("#bar2").animate({height:'100px'}, 150);
  $("#bar3").animate({height:'100px'}, 150);
  $("#bar1").animate({height:'70px'}, 150);
  $("#bar2").animate({height:'100px'}, 150);
  $("#bar3").animate({height:'40px'}, 150);
  $("#bar1").animate({height:'30px'}, 150);
  $("#bar2").animate({height:'60px'}, 150);
  $("#bar3").animate({height:'90px'}, 150);
  $("#bar1").animate({height:'100px'}, 150);
  $("#bar2").animate({height:'20px'}, 150);
  $("#bar3").animate({height:'60px'}, 150);
  $("#bar1").animate({height:'50px'}, 150);
  $("#bar2").animate({height:'20px'}, 150);
  $("#bar3").animate({height:'10px'}, 150);
  $("#bar1").animate({height:'70px'}, 150);
  $("#bar2").animate({height:'40px'}, 150);
  $("#bar3").animate({height:'90px'}, 150);
}
