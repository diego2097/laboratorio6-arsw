var api=apiclient;
blueprintOpen = false

var BlueprintsModule = (function(){
	var plano="";
	var autor="";
	var point=[];
	var currentBlueprint; 

	var graficarPlano = function(nameAutor,namePlano){
		blueprintOpen = true;
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
		point.map(function(f){
			console.log("memoria puntos "+ f.x)
			ctx.lineTo(f.x,f.y);
			ctx.stroke();
		})
		ctx.closePath()
		console.log(getBlueprintsByNameAndAuthor(api.getBlueprintsByAuthor(nameAutor,getBlueprints),namePlano))
		$("#blueprintname").text(namePlano)
		plano=namePlano;
		autor=nameAutor;
	

	};
	
	var getBlueprints = function(funcion){
		return funcion;
	};

	var getBlueprintsByNameAndAuthor = function (funcion,name) {
		var points=[]
		funcion.map(function(f){
			if(f.name==name){
				points=f.points
				currentBlueprint = f
			}
		});
		return points;
	};

	var getByAuthor = function (funcion) {
		return funcion.map(function(f){
			return {name:f.name,points:Object.keys(f.points).length};
		});
	  };

	
	var generarTable = function (name,funcion) {
		$("#cuerpo").html("");
		var total=0
		$("#totalPoints").text(total)
		funcion.map(function(f) {
			$('#cuerpo')
				.append(
				  `<tr>
					<td>`+f.name+`</td>
					<td>`+f.points+`</td>`+
					"<td><form><button type='button' class='btn btn-primary' onclick='BlueprintsModule.init_canvas( \"" +
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
	  };

	  var initMouse = function(){
		console.info('initialized');
		var canvas = document.getElementById("myCanvas"), 
		context = canvas.getContext("2d");
		

		if (window.PointerEvent) { 
			canvas.addEventListener("pointerdown", draw, false);
		}
	};


	var draw = function () {
		if (blueprintOpen){
			var canvas = document.getElementById("myCanvas"),
			context = canvas.getContext("2d");
			var offsetleft =  parseInt(getOffset(canvas).left, 10);
			var offsettop =  parseInt(getOffset(canvas).top, 10);
			var x = event.pageX-offsetleft;
			var y = event.pageY-offsettop;
			var cordenadas={"x":x,"y":y}
			point.push(cordenadas)
			api.repaintPoints(autor,plano,graficarPlano)
			context.fillRect(event.pageX-offsetleft,event.pageY-offsettop,5,5);
		}	
	};

	var updateBlueprint=  function(){
		console.log("updating")
		point.map(function(f){
			currentBlueprint.points.push(f)
		});
		point=[]
		api.setBlueprint(autor,plano,JSON.stringify(currentBlueprint),run)
	}


	var init_canvas= function (nombre,nombrep) {
		$("#cuerpoSaveUpdate").css("visibility", "visible");		
		point=[];

		graficarPlano(nombre,nombrep)
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
	  } while(obj = obj.offsetParent );
	  return {left: offsetLeft, top: offsetTop};
	};


	var newBlueprint = function(){
		var c = document.getElementById("myCanvas");
		var ctx = c.getContext("2d");		
		ctx.clearRect(0, 0, c.width, c.height);
		graficarPlano("","");
	}
	
	var run = function() {
		var nameAutor = $('#autor').val();

		generarTable(nameAutor,api.getBlueprintsByAuthor(nameAutor,getByAuthor));
	}

	  return {
		run: run,
		initMouse: initMouse,
		graficarPlano: graficarPlano,
		init_canvas:init_canvas,
		updateBlueprint: updateBlueprint,
		newBlueprint: newBlueprint
	  };
})();

