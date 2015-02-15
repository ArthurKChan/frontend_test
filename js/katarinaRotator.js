var FADE_DURATION = 1000;
var ZOOM_DURATION = 4000;
var SWAP_INTERVAL = 6000;

// Import animation functions from animate.js
var imported = document.createElement('script');
imported.src = '../js/animate.js';
document.head.appendChild(imported);

document.addEventListener('DOMContentLoaded', function() {

  var rotatorDiv = document.getElementById("rotator");
  var katarinaPictures = document.getElementById("slidesToRotate").children;
  var katarinaPictureRotator = rotatorFactory(katarinaPictures);

  // Every SWAP_INTERVAL ms:
  //   fade out current slide
  //   then fadeIn next slide
  //   then apply Ken Burns effect to slide
  rotatorDiv.innerHTML = katarinaPictures[0].outerHTML;
  setInterval(function(){
    animate.fadeOut(rotatorDiv, FADE_DURATION, function(){
      rotatorDiv.innerHTML = katarinaPictureRotator().outerHTML;
      animate.fadeIn(rotatorDiv, FADE_DURATION, function(){
        var picture = rotatorDiv.getElementsByClassName("katarinaPicture")[0];
        animate.kenBurnsEffect(picture, ZOOM_DURATION);
      });
    });
  },SWAP_INTERVAL);

  // Initiate Ken Burns effect on first picture
  var pic = rotatorDiv.getElementsByClassName("katarinaPicture")[0];
  setTimeout(function(){
    animate.kenBurnsEffect(pic, 4000);
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
