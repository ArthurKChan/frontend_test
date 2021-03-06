/**
* input:  DOM element
*         options
*           duration: duration of animation (ms)
*           x: horizontal translation (pixels)
*           y: vertical translation (pixeles)
*           scale: new size proportion
* output: applies Ken Burns effect to element for duration
*/
function kenBurnsEffect(element, options){
  options = options || {};
  duration = options.duration || 4000;
  x = options.x || -40;
  y = options.y || 20;
  scale = options.scale || 1.2;

  element.style["-webkit-transition"] = "all "+duration+"ms ease";
  element.style["-webkit-transform"] = "translate("+x+"px,"+y+"px) scale("+scale+")";
};

/**
* input:  DOM element
*         duration of animation (ms)
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
*         duration of animation (ms)
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
