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
	$scope.mostrarLineas = false;	
	$scope.ultimaLinea ={		
		noTerminal : '',
		produccion :''
	};
	$scope.lineas =[{
		noTerminal : '',
		produccion :''
	}];
	$scope.gramaticaS = new gramaticaS($scope.lineas, $scope.ultimaLinea);
	/**
	*Declaración de funciones
	*/
	$scope.addFila = function(){
		if($scope.lineas.length==1 && $scope.mostrarLineas==false){
			$scope.lineas[$scope.lineas.length-1].noTerminal = 
			$scope.ultimaLinea.noTerminal;
			$scope.lineas[$scope.lineas.length-1].produccion = 
			$scope.ultimaLinea.produccion;
			$scope.ultimaLinea.noTerminal ='';
			$scope.ultimaLinea.produccion ='';
			$scope.mostrarLineas = true;
		}else{
			$scope.lineas.push($scope.ultimaLinea);
			$scope.ultimaLinea ={		
				noTerminal : '',
				produccion :''
			};
		}
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
		$scope.mostrarLineas = false;
	}
	$scope.validar = function(){
		$scope.resul = $scope.gramaticaS.validar();
		console.log("valida");
		console.log($scope.resul);
		$scope.gramaticaS.imprimeGramatica();
		
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
		if(linea==$scope.lineas[$scope.lineas.length-1]){
			console.log("lol");
		}

		for(var i =0; i<$scope.lineas.length;i++){
			if($scope.lineas[i]==linea){
				$scope.lineas.splice(i,1);
			}
		}
	}
}]);