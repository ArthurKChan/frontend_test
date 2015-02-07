var tabContents = document.getElementsByClassName("tabContent");
var currentTab = 1;

// hide all but tab 1 on initial page load
for(var i=1; i<tabContents.length; i++){
  tabContents[i].style.display = "none";
}

/**
* input: tab to swap to (by number)
* output: swaps to specified tab
*/
function swapTo(tabNum){
  tabContents[currentTab-1].style.display = "none";
  tabContents[tabNum-1].style.display = "";
  currentTab = tabNum;
}
