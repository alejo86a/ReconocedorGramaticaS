/**
*  Module
*
* Description
*/
angular.module('gramaticaS', []).
controller('controladorP', ['$scope', '$http', function ($scope,$http) {
	/**
	*DeclaraciÃ³n de atributos
	*/
	$scope.estadoGramatica ='';						//Forma de las "Producciones",tienen un lado derecho(Produccion) y un izquierdo(NoTerminales)
	$scope.mostrarproducciones = false;	
	$scope.producciones =[{						
		izq : '',
		der :''
	}];
	$scope.gramaticaS = new gramaticaS($scope.producciones);
	/**
	*DeclaraciÃ³n de funciones
	*/
	$scope.addFila = function(){			//Añade una nueva fila a la gramatica
		$scope.producciones.push({		
			izq : '',
			der :''
		});
	}
	$scope.reiniciar = function(){  		//Reinica la gramatica a su estado inicial.
		$scope.estadoGramatica ='';
		$scope.producciones =[{
			izq : '',
			der :''
		}];
		$scope.gramaticaS = new gramaticaS($scope.producciones);
	}
	$scope.validar = function(){						//Se valida si la gramatica es S, de no serlo, se envia un error
		$scope.resul = $scope.gramaticaS.validar();
		$scope.mensajesDeError = ['','Una gramatica S, no debe tener producciones anulables',
		'En una gramatica S, todas las producciones deben iniciar al menos con un terminal',
		'En una gramatica S, no deben haber producciones repetidas'];
		if($scope.resul!=0){
			alert('Error: '+$scope.mensajesDeError[$scope.resul]+'\n Revise su gramatica');
			$scope.estadoGramatica = 'Rechazado';
		}else{
			$scope.escribir();
			$scope.estadoGramatica = 'Aceptado';
		}		
		$scope.gramaticaS.imprimeGramatica();		
	}
	/**
	*cambiar el metodo porque simplemente no esta mostrando
	*lo que no tienen izq toca mirar si producciones 
	*esta vacio
	*/
	$scope.esVacio = function(texto){ // Se valida si el texto ingresado esta vacio.
		if(texto==''){
			return false;
		}else{
			return true;
		}
	}
	$scope.addLambda = function(produccion){
		produccion.der = produccion.der+'Î»';
	}
	$scope.escribir = function(){												//Este metodo realiza la funcion de escribir un documento nuevo por medio de php
		var codigoResultante = $scope.gramaticaS.reconocimientoDecendente();	//Por eso se hace la peticion y se manda por parametros el codigo resultante.
		
		var peticionJS = $http.post("http://camaalu.me/sgramatica/php/sgramaticaApi.php",{peticion:'crearEjecutable', codigo: codigoResultante});
		peticionJS.success(function (response) {
			$scope.carreras = response.records;
			console.log("Success"+response);

		});
		peticionJS.error(function(response){
			console.log("Error"+ response);
		});
	}
	$scope.irAValidacion = function(){  //De ser aceptada la gramatica , se da acceso al link de validacion.
		if($scope.estadoGramatica == "Aceptado"){
			return 'validacion.html';
		}else{
			return '';
		}
	}
	$scope.borrarproduccion = function(produccion){
		/**
		*Tener en cuenta que si es la ultima produccion
		*la que se quiere borrar toca eliminarla y
		*quitar la ultima produccion de producciones y convertir
		*esa en la ultima produccion
		*/
		if(produccion==$scope.ultimaproduccion){
			$scope.ultimaproduccion =$scope.producciones[$scope.producciones.length-1];
			$scope.producciones.splice($scope.producciones.length-1,1);
		}
		if(produccion==$scope.producciones[$scope.producciones.length-1]){
			console.log("lol");
		}

		for(var i =0; i<$scope.producciones.length;i++){
			if(i==$scope.producciones.length-1 && i==0){
				$scope.producciones[$scope.producciones.length-1] = {
					izq : '',
					der :''
				};
			}else if($scope.producciones[i]==produccion){
				$scope.producciones.splice(i,1);
			}
		}
	}
}])
.controller('validacionCtrl', ['$scope', function ($scope) {  //Controlador de validar
	$scope.hilera ="";
	$scope.reconocedor = new reconocedorRecursivo($scope.hilera);//Se instancia un objeto de reconocedorRecursivo

	$scope.validar = function(){										//Se valida la hilera ingresada
		$scope.reconocedor.setHilera($scope.hilera);					//Al objeto reconocedor de la clase reconocedorRecursivo se le aplica el metodo set hilera.
		$scope.resultado = $scope.reconocedor.esHileraValida();			//Se aploica el metodo esHileraValida, este es el metodo principal recursivo por llamarlo de
	}																	//otra forma.
}]);