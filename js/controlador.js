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
	$scope.estadoGramatica ='Rechazado';
	$scope.ultimaLinea ={

	};
	$scope.lineas =[{
		noTerminal : '',
		produccion :''
	}];
	/**
	*Declaración de funciones
	*/
	$scope.addFila = function(){
		
	}
	$scope.reiniciar = function(){

	}
	$scope.validar = function(){

	}
	$scope.esVacio = function(texto){
		return false;
	}
	$scope.addLambda = function(linea){

	}
	$scope.borrarLinea = function(linea){
		/**
		*Tener en cuenta que si es la ultima linea
		*la que se quiere borrar toca eliminarla y
		*quitar la ultima linea de lineas y convertir
		*esa en la ultima linea
		*/
	}
}]);