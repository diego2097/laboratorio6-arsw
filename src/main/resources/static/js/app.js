var api = apiclient;
blueprintOpen = false;

var BlueprintsModule = (function () {
	var plano = "";
	var autor = "";
	var point = [];
	var currentBlueprint;
	var points = [];
	var nuevo = false;
	var graficarPlano = function (funcion) {
		$("#crearBlueprint").css("visibility", "visible");
		blueprintOpen = true;
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		ctx.beginPath()
		ctx.clearRect(0, 0, c.width, c.height);
		console.log(c.width, c.height);
		currentBlueprint = funcion
		if (!nuevo) {
			funcion['points'].map(function (f) {
				console.log(f.x)
				ctx.lineTo(f.x, f.y);
				ctx.stroke();
			})
		}

		point.map(function (f) {
			console.log("memoria puntos " + f.x)
			ctx.lineTo(f.x, f.y);
			ctx.stroke();
		})
		ctx.closePath()
		plano = funcion['name'];
		$("#blueprintname").text(plano)
		autor = funcion['author'];


	};
	var graficarPlano2 = function () {

		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		ctx.beginPath()
		console.log(c.width, c.height)

		ctx.closePath()

	};
	var getBlueprints = function (funcion) {
		return funcion;
	};

	var getBlueprintsByNameAndAuthor = function (funcion, name) {
		var points = []
		funcion.map(function (f) {
			if (f.name == name) {
				points = f.points
				currentBlueprint = f
			}
		});
		return points;
	};

	var getByAuthor = function (funcion) {

		return funcion.map(function (f) {
			return { name: f.name, points: Object.keys(f.points).length };
		});
	};


	var generarTable = function (name, funcion) {
		nuevo = false;
		console.log(funcion)
		var fun = getByAuthor(funcion);
		console.log("esta fue");
		$("#cuerpo").html("");
		var total = 0
		$("#totalPoints").text(total)
		fun.map(function (f) {
			$('#cuerpo')
				.append(
					`<tr>
					<td>`+ f.name + `</td>
					<td>`+ f.points + `</td>` +
					"<td><form><button type='button' class='btn btn-primary' onclick='BlueprintsModule.init_canvas( \"" +
					name +
					'" , "' +
					f.name +
					"\")'>Open</button></form></td>" +
					`</tr>`
				);
			total += f.points
		});
		$("#totalPoints").text(total)
		$("#authorname").text(name + "'s")
		autor=name;
	};

	var initMouse = function () {
		console.info('initialized');
		var canvas = document.getElementById("myCanvas"),
			context = canvas.getContext("2d");


		if (window.PointerEvent) {
			canvas.addEventListener("pointerdown", draw, false);
		}
	};


	var draw = function () {
		if (blueprintOpen) {
			var canvas = document.getElementById("myCanvas"),
				context = canvas.getContext("2d");
			var offsetleft = parseInt(getOffset(canvas).left, 10);
			var offsettop = parseInt(getOffset(canvas).top, 10);
			var x = event.pageX - offsetleft;
			var y = event.pageY - offsettop;
			var cordenadas = { "x": x, "y": y };
			point.push(cordenadas)
			if (!nuevo) {
				console.log(".....")
				api.getBlueprintsByNameAndAuthor(autor, plano, graficarPlano);
			} else {
				graficarPlano("")
			}



			//api.repaintPoints(autor,plano,graficarPlano2)

		}
	};

	var updateBlueprint = function () {
		if (!nuevo) {
			nuevo = false;
			point.map(function (f) {
				currentBlueprint.points.push(f)
			});
			point = []
			api.setBlueprint(autor, plano, JSON.stringify(currentBlueprint), run)

		}else{
			autor=$('#autor').val();
			plano=$("#blueprintname").text();

			var data={
				"author":autor,
				"points":point,
				"name":plano
			}
			
			api.addBlueprint( JSON.stringify(data))
		}

	}


	var init_canvas = function (nombre, nombrep) {
		$("#cuerpoSaveUpdate").css("visibility", "visible");
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		ctx.clearRect(0, 0, c.width, c.height);
		nuevo = false;

		point = [];
		api.getBlueprintsByNameAndAuthor(nombre, nombrep, graficarPlano)

	};

	var getOffset = function (obj) {
		var offsetLeft = 0;
		var offsetTop = 0;
		do {
			if (!isNaN(obj.offsetLeft)) {
				offsetLeft += obj.offsetLeft;
			}
			if (!isNaN(obj.offsetTop)) {
				offsetTop += obj.offsetTop;
			}
		} while (obj = obj.offsetParent);
		return { left: offsetLeft, top: offsetTop };
	};
	var refrescar=function(nameAutor){
		$("#blueprintname").text("")
		plano=$("#blueprintname").text();
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		ctx.clearRect(0, 0, c.width, c.height);
		api.getBlueprintsByAuthor(nameAutor, generarTable);
	}
	var deleteBluprint=function(){
		autor=$('#autor').val();
		plano=$("#blueprintname").text();
		console.log(autor,plano)
		api.deleteBlueprint(autor,plano,refrescar)
	}
	var newBlueprint = function () {
		$("#cuerpoSaveUpdate").css("visibility", "visible");
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");
		ctx.clearRect(0, 0, c.width, c.height);
		plano = "";
		point = [];
		currentBlueprint;
		points = [];
		var nombre = prompt("Ingrese Nombre del Blueprints");
		$("#blueprintname").text(nombre)
		plano=nombre;
		autor= $('#autor').val();
		console.log(autor)
		blueprintOpen = true;
		nuevo = true;
	}

	var run = function () {
		nuevo = false;
		var nameAutor = $('#autor').val();
		api.getBlueprintsByAuthor(nameAutor, generarTable);
	}

	return {
		run: run,
		initMouse: initMouse,
		graficarPlano: graficarPlano,
		init_canvas: init_canvas,
		updateBlueprint: updateBlueprint,
		newBlueprint: newBlueprint,
		deleteBluprint:deleteBluprint
	};
})();

