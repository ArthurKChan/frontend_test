var tabContents = document.getElementsByClassName("tabContent");
var currentTab = 1;

// hide all but tab 1 on initial page load
// for(var i=1; i<tabContents.length; i++){
//   tabContents[i].style.display = "none";
// }

/**
* input: tab to swap to (by number)
* output: swaps to specified tab & highlights button
*/
function swapTo(tabNum){
  // highlight button
  var buttons = document.getElementsByTagName("button");
  buttons[currentTab-1].classList.remove("selected");
  buttons[tabNum-1].classList.add("selected");
  // swap to tab
  tabContents[currentTab-1].style.display = "none";
  tabContents[tabNum-1].style.display = "";
  currentTab = tabNum;
}
