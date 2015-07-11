function gramaticaS(producciones){
	this.producciones = producciones;
	this.validar = validar;
	this.noHayLambdas = noHayLambdas;
	this.noEmpiezaPorNoTerm = noEmpiezaPorNoTerm;
	this.noHayNoTermRepPorProduc = noHayNoTermRepPorProduc;
	this.imprimeGramatica = imprimeGramatica;
	this.reconocimientoDecendene = reconocimientoDecendene;	
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


function reconocimientoDecendene(){  //Crea el codigo recursivo del reconocimiento decendente
	var rRecursivo=[];
	var vectorNT=construirNT(this.producciones);

	var seleccion = [];                                  //Conjunto seleccion de la gramatica ingresada.
	for (var i = 0; i<this.producciones.length ; i++) {
		seleccion[i]=this.producciones[i].der[0];
	};

	for (var j = 0; j < vectorNT.length; j++) {      //Recorro nT , variable J
		var txt="";
		txt="function metodo"+j+"(texto,pos)"+"{"+"\n"+"switch(texto[pos]){"+"\n"; // casos de simbolo
        for (var k = 0; k < this.producciones.length; k++) {   //Recorrer Producciones variable K
        	if (this.producciones[k].izq[1]===vectorNT[j]) {
               txt=txt+"case "+seleccion[k]+":"+"\n";          //Se agrega el case respectivo a la seleccion de la produccion
               var prodAux=this.producciones[k].der; 
               txt=txt+" pos=pos+1;"+"\n";    //lee(simbolo)
               var cont=0;
               var bool=0;
                 for (var l = 1; l <prodAux.length ; l++) {                  //Se recorre la produccion derecha variable l
                 	
                 	if(prodAux[l]!="<"){
                 		cont=cont+1;
 						txt=txt+"if(texto[pos]== " + prodAux[l] + " ) {"+"\n" + "pos=pos+1;"+"\n"; //lea(simbolo)
 						bool=1;
 						
                 	}
                 	if (prodAux[l]=="<") {
                 		txt=txt+"metodo"+posNTenVector(prodAux[l+1],vectorNT)+"(texto,pos);"+"\n";//nt+prodAux[l+1]()
                 		l=l+2;
                 	};




                 };
                 txt=txt+"return true"+"\n";


       for (var i = 0; i < cont; i++) {
       	txt=txt+"}"+"\n";
       };
       if(bool==1){
                 	txt=txt+"return false"+"\n";
                 };

	
            txt=txt+"break;"+"\n";
        	};

        };

txt=txt+"default:"+"\n"+"return false"+"\n";
txt=txt+"}"+"\n";


txt=txt+"}"+"\n";

   rRecursivo[j]=txt;
};

console.log(posNTenVector("A",vectorNT));
console.log(rRecursivo[0]);
return rRecursivo;


}






function posNTenVector(noterminal,vectorNT){  //Retorna la posicion de un NoTerminal, en su respectivo vector.
var pos;
for (var i = 0; i < vectorNT.length; i++) {
	if (vectorNT[i]===noterminal) {
 		return i;
	}
}
}



function construirNT(produccion){  //Se usa para contruir los NT 
var vectorNT=[];

for (var i = 0; i < produccion.length; i++) {
  vectorNT[i]=produccion[i].izq[1];
	
	};
vectorNT=eliminarR(vectorNT);

return vectorNT;

}

function eliminarR(vector) { //Elimina Elementos Repetidos De Un Vector
 var i,
     len=vector.length,
     out=[],
     obj={};

 for (i=0;i<len;i++) {
    obj[vector[i]]=0;
 }
 for (i in obj) {
    out.push(i);
 }
 return out;
}