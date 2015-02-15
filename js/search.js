// called when a submit even is triggered
// on form in text_search
function search(){
  var inputText = document.getElementById("search_input").value;
  var searchText = document.getElementById("search_text");
  if (inputText.length > 0) {
    document.getElementById("wordCount").innerHTML = getCountOccurances(searchText, inputText);
    document.getElementById("query").innerHTML = inputText;
    highlightSingleWordOccurances(searchText, inputText);
  }
  return false;
};

/**
* input:  element (dom element to search through)
          string  (query to match in element text)
* output: count   (occurances of string in element text)
*/
function getCountOccurances(element, string){
  var words = element.textContent;
  var query = escapeRegExp(string);
  if (/\w/.test(query[query.length-1])) {
    query += "\\b";
  }
  var regExp = new RegExp(query, "gi");
  var matches = words.match(regExp);
  if (matches) return matches.length;
  else return 0;
};

/**
* input:  element
          string  (one word)
* output: highlights occurances
*/
var originalSearchText = document.getElementById("search_text").innerHTML;
function highlightSingleWordOccurances(element, string){
  var words = element.innerHTML = originalSearchText;
  var query = escapeRegExp(string);

  var regExp = new RegExp(query, "gi");
  if ((/^\s*\b\w+\b\s*$/).test(query)) {
    words = words.replace(regExp, "<span class=\"highlight\">$&</span>");
    element.innerHTML = words;
  }
};

/**
* input:  string
* output: escape special characters
*/
function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
};
