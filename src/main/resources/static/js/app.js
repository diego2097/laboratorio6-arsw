var api=apiclient
function getByAuthor(funcion) {

	return funcion.map(function(f){
		return {name:f.name,points:Object.keys(f.points).length};
	});
	
}
function getBlueprints(funcion){
	return funcion;
}
function getBlueprintsByNameAndAuthor(funcion,name){
	var points=[]
	funcion.map(function(f){
		if(f.name==name){
			points=f.points
		}
	});
	return points;
}
function run() {
	var nameAutor = $('#autor').val();
	generarTable(nameAutor,api.getBlueprintsByAuthor(nameAutor,getByAuthor));
}


function graficarPlano(nameAutor, namePlano){
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	ctx.beginPath()
	ctx.clearRect(0, 0, c.width, c.height);
	console.log(c.width, c.height)
	funcion=getBlueprintsByNameAndAuthor(api.getBlueprintsByAuthor(nameAutor,getBlueprints),namePlano);
	funcion.map(function(f){
		console.log(f.x)
		ctx.lineTo(f.x,f.y);
		ctx.stroke();
	})
	ctx.closePath()
	console.log(getBlueprintsByNameAndAuthor(api.getBlueprintsByAuthor(nameAutor,getBlueprints),namePlano))
	$("#blueprintname").text(namePlano)
	
}

function generarTable(name,funcion) {
	$("#cuerpo").html("");
	var total=0
	$("#totalPoints").text(total)
	funcion.map(function(f) {
		$('#cuerpo')
			.append(
			  `<tr>
				<td>`+f.name+`</td>
				<td>`+f.points+`</td>`+
				"<td><form><button type='button' class='btn btn-primary' onclick='graficarPlano( \"" +
              name +
              '" , "' +
              f.name +
              "\")'>Open</button></form></td>"+
			  `</tr>`
			);
			total+=f.points
	});
	$("#totalPoints").text(total)
	$("#authorname").text(name+"'s")
	

}