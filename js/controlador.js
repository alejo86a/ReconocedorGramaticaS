/**
*  Module
*
* Description
*/
angular.module('gramaticaS', []).
controller('controladorP', ['$scope', function ($scope) {
	/**
	*Declaración de atributos
	*/
	$scope.estadoGramatica ='Aceptado';
	$scope.ultimaLinea ={		
		noTerminal : '',
		produccion :''
	};
	$scope.lineas =[{
		noTerminal : '',
		produccion :''
	}];
	/**
	*Declaración de funciones
	*/
	$scope.addFila = function(){
		$scope.lineas.push($scope.ultimaLinea);
		$scope.ultimaLinea ={		
		noTerminal : '',
		produccion :''
	};
	}
	$scope.reiniciar = function(){
	$scope.estadoGramatica ='';
	$scope.ultimaLinea ={		
		noTerminal : '',
		produccion :''
	};
	$scope.lineas =[{
		noTerminal : '',
		produccion :''
	}];
	}
	$scope.validar = function(){

	}
	/**
	*cambiar el metodo porque simplemente no esta mostrando
	*lo que no tienen noTerminal toca mirar si lineas 
	*esta vacio
	*/
	$scope.esVacio = function(texto){
		if(texto==''){
			return false;
		}else{
			return true;
		}
	}
	$scope.addLambda = function(linea){
		linea.produccion = linea.produccion+'λ';
	}
	$scope.borrarLinea = function(linea){
		/**
		*Tener en cuenta que si es la ultima linea
		*la que se quiere borrar toca eliminarla y
		*quitar la ultima linea de lineas y convertir
		*esa en la ultima linea
		*/
		if(linea==$scope.ultimaLinea){
			$scope.ultimaLinea =$scope.lineas[$scope.lineas.length-1];
			$scope.lineas.splice($scope.lineas.length-1,1);
		}
		/**
		*falta eliminar un elemento de lineas (primero toca buscarlo
		*con un for para hacerle splice a esa posicion)
		*/
		if(linea==$scope.lineas[$scope.lineas.length-1]){
			console.log("lol");
		}
	}
}]);