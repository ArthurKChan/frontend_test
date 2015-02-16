/**
* input:  string
* output: escape special characters
*/
function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
};

/**
* input:  element (dom element to search through)
*         string  (query to match in element text)
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
*         string  (one word)
* output: highlights occurances or string in element's text
*/
function wordAndPhraseSearchFactory(element) {
  var originalSearchHTML = element.innerHTML;
  return function highlightOccurances(string){
    element.innerHTML = originalSearchHTML;
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
    for(var i=1; i<query.length; i++){
      regularExpressionString += "((?:\\s*<[^>]*>\\s*)+|\\s+)";
      regularExpressionString += "(" + query[i] + ")";
    }
    var regExp = new RegExp(regularExpressionString, "gi");
    // build replacement string
    var replacement = "$1<span class=\"highlight\">$2</span>";
    var counter = 2;
    for(var i=1; i<query.length; i++){
      replacement += "$" + ++counter;
      replacement += "<span class=\"highlight\">$"+ ++counter +"</span>";
    }

    // find matches and highlight matches
    var matches = element.innerHTML.match(regExp);

    element.innerHTML = element.innerHTML.replace(regExp, replacement);

    if (matches) return matches.length;
    else return 0;
  };
};
