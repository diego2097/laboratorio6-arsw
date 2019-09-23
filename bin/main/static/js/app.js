function getName(funcion) {
	return funcion.map(function(f){
		return {name:f.name,points:Object.keys(f.points).length};
	});
	
}

function run() {
	var nameAutor = $('#autor').val();
	generarTable(nameAutor,apimock.getBlueprintsByAuthor(nameAutor,getName));
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
				<td>`+f.points+`</td>
				<td>`+f+`</td>
			  </tr>`
			);
			total+=f.points
	});
	$("#totalPoints").text(total)
}