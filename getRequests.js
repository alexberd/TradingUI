function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}
// function getQueryVariable(variable){ 
//   var query = window.location.search.substring(1); 
//   var vars = query.split("&"); 
//   for (var i=0;i<vars.length;i++)
//   { 
//     var pair = vars[i].split("="); 
//     if (pair[0] == variable)
//     { 
//       return pair[1]; 
//     } 
//   }
//   return -1; //not found 
// }

function parseQuery(queryString) {
    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}