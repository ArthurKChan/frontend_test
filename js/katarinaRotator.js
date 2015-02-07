var SWAP_ANIMATION_DURATION = 1200;
var SWAP_INTERVAL = 3000;

var rotatorDiv = document.getElementById("rotator");

var katarinaPictures = document.getElementsByClassName("katarinaPicture");
var katarinaPictureRotator = rotatorFactory(katarinaPictures);

// render next Katarina picture every <SWAP_INTERVAL> milliseconds
// with a <SWAP_ANIMATION_DURATION> timed fade in and out animation
rotatorDiv.innerHTML = katarinaPictures[0].innerHTML;
setInterval(function(){
  var swapStep = fadeToNewPic(rotatorDiv, katarinaPictureRotator(), SWAP_ANIMATION_DURATION);
  window.requestAnimationFrame(swapStep);
},SWAP_INTERVAL);


/*
* input:  array
* output: function that returns an element in the array
          each consecutive call returns the next element (loops)
*/
function rotatorFactory(pictures){
  currentPicture = 1;
  return function(){
    currentPicture = (currentPicture + 1) % pictures.length;
    return pictures[currentPicture];
  };
};

/*
* input:  element        picture container
          nextPicture    next picture's html
          duration       duration of swap animation
* output: step animation function
*/
function fadeToNewPic(element, nextPicture, duration){
  var start = null;
  var swapped = false;

  return function step(timestamp) {
    if (!start) start = timestamp;
    var progress = timestamp - start;
    if (progress < duration/2) {
      element.style.opacity = 1 - progress/(duration/2);
    } else {
      if (!swapped) {
        element.innerHTML = nextPicture.innerHTML;
      }
      element.style.opacity = progress/(duration/2) - 1;
    }
    if (progress < duration) {
      window.requestAnimationFrame(step);
    }
  };
};
