var FADE_DURATION = 1000;
var ZOOM_DURATION = 4000;
var SWAP_INTERVAL = 6000;

document.addEventListener('DOMContentLoaded', function() {

  var rotatorDiv = document.getElementById("rotator");
  var katarinaPictures = document.getElementById("slidesToRotate").children;
  var katarinaPictureRotator = rotatorFactory(katarinaPictures);

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

  var pic = rotatorDiv.getElementsByClassName("katarinaPicture")[0];
  setTimeout(function(){
    kenBurnsEffect(pic, 4000);
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

/**
* input:  DOM element
          duration of animation (ms)
* output: applies Ken Burns effect to element for duration
*/
function kenBurnsEffect(element, duration){
  duration = duration || 1000;
  element.style["-webkit-transition"] = "all "+duration+"ms ease";
  element.style["-webkit-transform"] = "translate(-40px,20px) scale(1.2)";
};

/**
* input:  DOM element
          duration of animation (ms)
* output: applies fadeIn animation to element
*/
function fadeIn(element, duration, callback){
  duration = duration || 1000;
  var start = null;

  window.requestAnimationFrame(step);

  function step(timestamp) {
    if (!start) start = timestamp;
    var progress = timestamp - start;
    if (progress < duration) {
      element.style.opacity = progress/duration;
      window.requestAnimationFrame(step);
    } else {
      element.style.opacity = 1;
      if (callback) callback();
    }
  };
};

/**
* input:  DOM element
          duration of animation (ms)
* output: applies fadeOut animation to element
*/
function fadeOut(element, duration, callback){
  duration = duration || 1000;
  var start = null;

  window.requestAnimationFrame(step);

  function step(timestamp) {
    if (!start) start = timestamp;
    var progress = timestamp - start;
    if (progress < duration) {
      element.style.opacity = 1 - progress/duration;
      window.requestAnimationFrame(step);
    } else {
      element.style.opacity = 0;
      if (callback) callback();
    }
  };
};
