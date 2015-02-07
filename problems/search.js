function search(){
  var inputText = document.getElementById("search_input").value;
  var searchText = document.getElementById("search_text");
  if (inputText.length > 0) {
    document.getElementById("wordCount").innerHTML = getCountOccurances(searchText, inputText);
    document.getElementById("query").innerHTML = inputText;
  }
  return false;
};

/**
* input:  element (dom element to search through)
          string  (query to match in element text)
* output: count   (occurances of string in element text)
*/
function getCountOccurances(element, string){
  var words = element.textContent.toLowerCase();
  var regExp = new RegExp(escapeRegExp(string).toLowerCase(), "g");
  var matches = words.match(regExp);
  if (matches) return matches.length;
  else return 0;
};

/**
* input:  string
* output: escape special characters
*/
function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
};
