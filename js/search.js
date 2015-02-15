// called when a submit even is triggered
// on form in text_search
function search(){
  var inputText = document.getElementById("search_input").value;
  var searchText = document.getElementById("search_text");
  if (inputText.length > 0) {
    document.getElementById("wordCount").innerHTML = getCountOccurances(searchText, inputText);
    document.getElementById("query").innerHTML = inputText;
    highlightOccurances(searchText, inputText);
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

  if (/\w/.test(query[query.length-1])) query += "\\b";
  if (/\w/.test(query[0])) query = "\\b" + query  ;

  var regExp = new RegExp(query, "gi");
  var matches = words.match(regExp);

  if (matches) return matches.length;
  else return 0;
};

/**
* input:  element
          string  (one word)
* output: highlights occurances or string in element's text
*/
var originalSearchHTML = document.getElementById("search_text").innerHTML;
function highlightOccurances(element, string){
  var words = element.innerHTML = originalSearchHTML;
  var query = escapeRegExp(string);

  // remove begining and ending white spaces
  query = query.replace(/^\s+/,"");
  query = query.replace(/\s+$/,"");
  // add word boundary restrictions
  if (/\w/.test(query[query.length-1])) query += "\\b";
  if (/\w/.test(query[0])) query = "\\b" + query  ;
  // split query by white spaces
  query = query.split(/\s+/);
  // build regular expression
  var regularExpressionString = "(>[^</]*)(" + query[0] + ")";
  var replacement = "$1<span class=\"highlight\">$2</span>";
  var counter = 2;
  for(var i=1; i<query.length; i++){
    regularExpressionString += "((?:\\s*<[^>]*>\\s*)+|\\s+)";
    regularExpressionString += "(" + query[i] + ")";
  }
  var regExp = new RegExp(regularExpressionString, "gi");
  for(var i=1; i<query.length; i++){
    replacement += "$" + ++counter;
    replacement += "<span class=\"highlight\">$"+ ++counter +"</span>";
  }
  // console.log(regExp);
  // console.log(replacement);
  var matches = element.innerHTML.match(regExp);
  element.innerHTML = element.innerHTML.replace(regExp, replacement);
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
