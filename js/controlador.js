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
	$scope.estadoGramatica ='';
	$scope.mostrarproducciones = false;	
	$scope.producciones =[{
		izq : '',
		der :''
	}];
	$scope.gramaticaS = new gramaticaS($scope.producciones);
	/**
	*Declaración de funciones
	*/
	$scope.addFila = function(){
		$scope.producciones.push({		
			izq : '',
			der :''
		});
	}
	$scope.reiniciar = function(){
		$scope.estadoGramatica ='';
		$scope.producciones =[{
			izq : '',
			der :''
		}];
		$scope.gramaticaS = new gramaticaS($scope.producciones);
	}
	$scope.validar = function(){
		$scope.resul = $scope.gramaticaS.validar();
		console.log('error: '+$scope.resul);
		$scope.gramaticaS.imprimeGramatica();
		$scope.gramaticaS.reconocimientoDecendene();
		
	}
	/**
	*cambiar el metodo porque simplemente no esta mostrando
	*lo que no tienen izq toca mirar si producciones 
	*esta vacio
	*/
	$scope.esVacio = function(texto){
		if(texto==''){
			return false;
		}else{
			return true;
		}
	}
	$scope.addLambda = function(produccion){
		produccion.der = produccion.der+'λ';
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
}]);