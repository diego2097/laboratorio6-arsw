# Laboratorio 6 - ARSW
## Empezando
Se debe de clonar el proyecto, para esto utilizaremos el comando git clone. ubíquese la carpeta a guardar el proyecto y escriba el siguiente comando en la terminal:
 
 ### git clone https://github.com/diego2097/laboratorio6-arsw
Una vez clonado, ubicarse en la carpeta del proyecto. al ingresar podra ejecutarlo de forma inmediata mediante el comando. 
```
gradle bootRun
```
## Prerrequisitos
Se debe tener instalados los siguientes programas en nuestro sistema operativo: 
- Gradle 
- Git
- Java
## Contenido 
### Frontend Views

Agregamos un mouse listener al canvas para que detecte los clicks. 

```javascript
  var initMouse = function(){
		console.info('initialized');
		var canvas = document.getElementById("myCanvas"), 
		context = canvas.getContext("2d");
		

		if (window.PointerEvent) { 
			canvas.addEventListener("pointerdown", draw, false);
		}
	};	
```

Los puntos son agregados en memoria por el momento, solo son agregados al api hasta cuando se confirman 
los cambios con save/update

![alt text](https://github.com/luis572/ARSW-lab5/blob/master/img/puntos.PNG "puntos")

```javascript
	var updateBlueprint=  function(){
		point.map(function(f){
			currentBlueprint.points.push(f)
		});
		point=[]
		api.setBlueprint(autor,plano,JSON.stringify(currentBlueprint),run)
	}
```

Agregamos el boton crear que pide el nombre de un blueprint que se desee crear
 
```javascript
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
```
![alt text](https://github.com/luis572/ARSW-lab5/blob/master/img/agregarBlueprint.PNG "agregar")

![alt text](https://github.com/luis572/ARSW-lab5/blob/master/img/newBlueprint.PNG "newBlueprint")





## Construido en
- Gradle: Es una herramienta que permite la automatización de compilación de código abierto, no solo de java sino de otra gran variedad de lenguajes.

## Autor  
- Luis Fernando Pizza Gamba https://github.com/luis572
- Diego Alejandro Corredor Tolosa https://github.com/diego2097


## Licencia 
- GNU General Public License v3.0

