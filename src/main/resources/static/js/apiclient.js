const Url = 'http://localhost:8080/blueprints/';
apiclient = (function () {
    var f=[]
    return {
        getBlueprintsByAuthor: function (name, callback) {
                $.get(Url+name,function(data){
                    f=data;
                });
                console.log(f)
                return callback(f)
        }
    };
})();