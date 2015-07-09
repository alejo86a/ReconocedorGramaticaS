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

	var seleccion = [];
	for (var i = 0; i<this.producciones.length ; i++) {
		seleccion[i]=this.producciones[i].der[0];
	};

	for (var j = 0; j < vectorNT.length; j++) {      //Recorreo nT , variable J
		var txt="";
		txt="nT"+vectorNT[j]+"{"+"\n"+"casos de simbolo:"+"\n";
        for (var k = 0; k < this.producciones.length; k++) {   //Recorrer Producciones variable K
        	if (this.producciones[k].izq[1]===vectorNT[j]) {
               txt=txt+"case "+seleccion[k]+":"+"\n";          //Se agrega el case respectivo a la seleccion de la produccion
               var prodAux=this.producciones[k].der; 
               txt=txt+" lea(Simbolo)"+"\n";
               var cont=0;
               var bool=0;
                 for (var l = 1; l <prodAux.length ; l++) {                  //Se recorre la produccion derecha variable l
                 	
                 	if(prodAux[l]!="<"){
                 		cont=cont+1;
 						txt=txt+"if simbolo == " + prodAux[l] + " them {"+"\n" + "lea (simbolo)"+"\n"; 
 						bool=1;
 						
                 	}
                 	if (prodAux[l]=="<") {
                 		txt=txt+"nT"+prodAux[l+1]+"();"+"\n";
                 		l=l+2;
                 	};




                 };
                 txt=txt+"return"+"\n";


       for (var i = 0; i < cont; i++) {
       	txt=txt+"}"+"\n";
       };
       if(bool==1){
                 	txt=txt+"Rechace"+"\n";
                 };

	
            txt=txt+"(fin caso);"+"\n";
        	};

        };

txt=txt+"else:"+"\n"+"Rechace"+"\n";
txt=txt+"FINCASOS;"+"\n";


txt=txt+"}"+"\n"+"Fin METODO"+"\n";

   rRecursivo[j]=txt;
};

console.log(rRecursivo[0]);

var f = new fs("/reconocedorRecursivo.js");

var fh = new File("/reconocedorRecursivo.js"); // Open the file for writing

if(fh!=-1) // If the file has been successfully opened
{
    var str = rRecursivo[0];
    fwrite(fh, str); // Write the string to a file
    fclose(fh); // Close the file 
}

return rRecursivo;


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