var searchThis, search;

(function loadScript(callback){
  // Load search utilities script then build search functionality
  var script = document.createElement("script");
  script.type = "text/javascript"
  script.src = "../js/libs/searchUtils.js";
  script.onload = callback;
  document.head.appendChild(script);
})(function(){
  searchThis = wordAndPhraseSearchFactory(document.getElementById("search_text"));
  // called when a submit even is triggered
  // on form in text_search
  search = function(){
    var inputText = document.getElementById("search_input").value;
    if (inputText.length > 0) {
      var matches = searchThis(inputText);
      document.getElementById("wordCount").innerHTML = matches;
      document.getElementById("query").innerHTML = inputText;
    }
    return false;
  };
});
