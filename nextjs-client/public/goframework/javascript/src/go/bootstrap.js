GO_BOOTSTRAPPED = false;

GO_BOOTSTRAP_LOAD_PATH = function(paths, query){

    for(var i = 0; i < paths.length; i++){
        var src = paths[i];
        var delim = '?';
        for(var name in query){
            src += delim + name + '=' + query[name];
            delim = '&';
        }
        document.write('<script type="text/javascript" src="' + src + '"></' + 'script>');
    }
};

(function(){
    GO_BOOTSTRAP_LOAD_PATH(['javascript/src/go/VERSION.js'], {'cacheBust':Math.floor( Math.random()*1000 )});
})();
