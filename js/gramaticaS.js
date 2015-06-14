function gramaticaS(producciones){
	this.producciones = producciones;
	this.validar = validar;
	this.noHayLambdas = noHayLambdas;
	this.noEmpiezaPorNoTerm = noEmpiezaPorNoTerm;
	this.noHayNoTermRepPorProduc = noHayNoTermRepPorProduc;
	this.imprimeGramatica = imprimeGramatica;	
}

function validar(){
	if(this.noHayLambdas()){
		if(this.noEmpiezaPorNoTerm()){
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
	for(var i=0;i<this.producciones.length;i++){
		if(this.producciones[i].der.search(/λ/)!=-1){
			return false;
		}else{
			return true;
		}
	}
}

function noEmpiezaPorNoTerm(){
	for(var i=0;i<this.producciones.length;i++){
		if(this.producciones[i].der[0]=='<'){
			return false;
		}else{
			return true;
		}
	}
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