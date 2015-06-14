function gramaticaS(producciones){
	this.producciones = producciones;
	this.validar = validar;
	this.noHayLambdas = noHayLambdas;
	this.empiezaPorNoTerm = empiezaPorNoTerm;
	this.noHayNoTermRepPorProduc = noHayNoTermRepPorProduc;
	this.imprimeGramatica = imprimeGramatica;	
}

function validar(){
	if(this.noHayLambdas()){
		if(this.empiezaPorNoTerm()){
			if(this.noHayNoTermRepPorProduc()){
				return 0;
			}else{
				return 3;
			}
		}else{
			return 2;
		}
	}else{
		return 1;
	}
}

function noHayLambdas(){
	return true;
}

function empiezaPorNoTerm(){
	return false;
}

function noHayNoTermRepPorProduc(){
	return true;
}

function imprimeGramatica(){
	for(var i=0;i<this.producciones.length;i++){
		console.log(this.producciones[i].izq
			+' '+this.producciones[i].der);
	}
}