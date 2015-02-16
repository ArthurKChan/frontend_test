var SWAP_INTERVAL = 8000;
var FADE_DURATION = 1500;

var tabContents = document.getElementsByClassName("tabContent");
var currentTab = 1;
var imagePaths = [
["../img/arena_art/gi-modes-sr-jungle.jpg", "../img/arena_art/gi-modes-sr-baron.jpg", "../img/arena_art/gi-modes-sr-dragon.jpg", "../img/arena_art/gi-modes-sr-battle.jpg"],
["../img/arena_art/gi-modes-tt-altars.jpg", "../img/arena_art/gi-modes-tt-battle.jpg", "../img/arena_art/gi-modes-tt-jungle.jpg", "../img/arena_art/gi-modes-tt-vilemaw.jpg"],
["../img/arena_art/gi-modes-ha-basereturn.jpg", "../img/arena_art/gi-modes-ha-battle.jpg", "../img/arena_art/gi-modes-ha-inhibitor.jpg", "../img/arena_art/gi-modes-ha-relics.jpg"],
["../img/arena_art/gi-modes-cs-capturing.jpg", "../img/arena_art/gi-modes-cs-choosing.jpg", "../img/arena_art/gi-modes-cs-health.jpg", "../img/arena_art/gi-modes-cs-quest.jpg", "../img/arena_art/gi-modes-cs-speed.jpg", "../img/arena_art/gi-modes-cs-storm.jpg"]
];
var imageRotator = [];
for(var i=0; i<imagePaths.length; i++){
  imageRotator[i] = rotatorFactory(imagePaths[i]);
}
var interval, swapTo;


(function loadScript(callback){

  // Load animations script then build search functionality
  var script = document.createElement("script");
  script.type = "text/javascript"
  script.src = "../js/libs/animations.js";
  script.onload = callback;
  document.head.appendChild(script);

})(function(){

  // initiate first picture & start slide show interval
  var picture = document.getElementById("picture");
  picture.src = imagePaths[0][0];
  interval = setInterval(function(){
    fadeOut(picture, FADE_DURATION, function(){
      picture.src = imageRotator[currentTab-1]();
      fadeIn(picture, FADE_DURATION);
    });
  }, SWAP_INTERVAL);

  /**
  * input: tab to swap to (by number)
  * output: swaps to specified tab & highlights button
  */
  swapTo = function(tabNum){
    // highlight button
    var buttons = document.getElementsByTagName("button");
    buttons[currentTab-1].classList.remove("selected");
    buttons[tabNum-1].classList.add("selected");
    // swap to tab
    tabContents[currentTab-1].style.display = "none";
    tabContents[tabNum-1].style.display = "";
    currentTab = tabNum;
    // swap picture
    // var picture = document.getElementById("picture");
    picture.src = imageRotator[currentTab-1]();
    clearInterval(interval);
    interval = setInterval(function(){
      fadeOut(picture, FADE_DURATION, function(){
        picture.src = imageRotator[currentTab-1]();
        fadeIn(picture, FADE_DURATION);
      });
    }, SWAP_INTERVAL);
  };
});

/**
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
