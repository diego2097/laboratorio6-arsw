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
        },
        setBlueprint: function(author, plano, bp,callback) {
            var promise = $.ajax({
              url: "/blueprints/" + author + "/" + plano + "/",
              type: "PUT",
              data: bp,
              contentType: "application/json"
            });

            promise.then(
                function() {
                  console.info("OK setBlueprint");
                  callback()
                },
                function() {
                  console.info("ERROR setBlueprint");
                }
              );
          },

          repaintPoints:function(nameAuthor,nameP,callback){
            callback(
                nameAuthor,
                nameP
            );
        }
    };
    
})();