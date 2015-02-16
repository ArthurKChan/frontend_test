var FADE_DURATION = 1000;
var ZOOM_DURATION = 4000;
var SWAP_INTERVAL = 6000;

(function loadScript(callback){
  // Load animations script then build search functionality
  var script = document.createElement("script");
  script.type = "text/javascript"
  script.src = "../js/libs/animations.js";
  script.onload = callback;
  document.head.appendChild(script);
})(function(){

  var rotatorDiv = document.getElementById("rotator");
  var katarinaPictures = document.getElementById("slidesToRotate").children;
  var katarinaPictureRotator = rotatorFactory(katarinaPictures);

  // Every SWAP_INTERVAL ms:
  //   1) fade out current slide
  //   2) then fadeIn next slide
  //   3) then apply Ken Burns effect to slide
  rotatorDiv.innerHTML = katarinaPictures[0].outerHTML;
  setInterval(function(){
    fadeOut(rotatorDiv, FADE_DURATION, function(){
      rotatorDiv.innerHTML = katarinaPictureRotator().outerHTML;
      fadeIn(rotatorDiv, FADE_DURATION, function(){
        var picture = rotatorDiv.getElementsByClassName("katarinaPicture")[0];
        kenBurnsEffect(picture, ZOOM_DURATION);
      });
    });
  },SWAP_INTERVAL);

  // Initiate Ken Burns effect on initial picture
  setTimeout(function(){
    kenBurnsEffect(rotatorDiv.getElementsByClassName("katarinaPicture")[0]);
  }, 1500);
});

/*
* input:  array
* output: looping iterator for given array
*/
function rotatorFactory(list){
  var index = 1;
  var length = list.length;
  return function(){
    if (index >= length) index = 0;
    return list[index++];
  };
};
