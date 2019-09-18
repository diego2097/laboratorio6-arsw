const Url='http://localhost:8080/blueprints/';
$("#ingresar").click(function(){
    var l=Url+$("#autor").val()
    $.get(l,function(data,status){
        for (var key in data[0]) {
           console.log(key[0])
         }
    });
    
})

