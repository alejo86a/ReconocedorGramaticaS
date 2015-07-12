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
/**
 * El siguiente algoritmo cumple con la funcion de construir el reconocedor Decendete recursivo.
 * Funciona de la siguiente manera:
 * Primero se declaran dos vectores , "rRecursivo" es un vector de String en el cual cada una de sus posiciones,
 * le corresponde un subprograma.El tamaño de este vector es el numero de noTerminales que tenga la gramatica.
 *
 *En el caso de "vectorNT", es un vector donde en cada una de sus posiciones se incluye cada terminal de la gramatica sin ser
 *repetidos.Es de gran importancia este vector, ya que nos determina el tamaño de rRecursivo y nos indica la posicion correcta 
 *en la cual  se debe agregar cada "caso".
 *
 *Se procede entonces a contruir el conjunto seleccion de la gramatica.Al ser este proceso una funcion que se hace luego de haber
 *validado que la gramatica es S , entonces nos podemos asegurar de algo. 'El conjunto seleccion de la gramatica S, son los primeros
 *de cada produccion'.Este vector , sera utilizado como guia para saber los "casos" del reconocedor decendente. 
 *
 * El siguiente proceso es generar el codigo JavaScrip para el reconocedor. Se recorre el vector "vectorNT" y se guarda la plantilla
 * principal del submetodo.
 *
 * 					Producciones
 *
 * <S> ----------------------------------->a<S>
 * Lado izquiedo						 Lado Derecho.
 *
 *Si el lado izquierdo  de la produccion es igual al vector en la posicion i , se procede a generar codigo.
 *El caso sera el valor que se encuentre en la posicion i del vector seleccion y se establecen reglas 
 *las cuales se van agrupando en una variable llamada txt. Txt se ira modificando mientras el ciclo este recorriendo
 *cada uno de los elementos de la produccion en su lado derecho.
 *
 * Al finalizar el recorrido por la produccion , se hacen unos ultimos retoques para completar el submetodo y se guarda en
 * la posicion J correspondiente a su lugar en el vecto "vectorNT".
 */

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


       for (var i = 0; i < cont; i++) {     //Se cierran los parentesis abiertos en caso de  ser necesario.
       	txt=txt+"}"+"\n";
       };
       if(bool==1){
                 	txt=txt+"return false"+"\n";
                 };

	
            txt=txt+"break;"+"\n";                            //Break de cada case.
        	};

        };

txt=txt+"default:"+"\n"+"return false"+"\n";                 //Funciona como "De lo contrario" de los casos.
txt=txt+"}"+"\n";


txt=txt+"}"+"\n";

   rRecursivo[j]=txt;                                      //Se guarda el texto en el vector rRecursibo
};

console.log(posNTenVector("A",vectorNT));
console.log(rRecursivo[0]);
return rRecursivo;                                          //Retornamos nuestro reconocedor decendente


}






function posNTenVector(noterminal,vectorNT){  //Retorna la posicion de un NoTerminal, en su respectivo vector.METODO DE UTILERIA.
var pos;
for (var i = 0; i < vectorNT.length; i++) {
	if (vectorNT[i]===noterminal) {
 		return i;
	}
}
}



function construirNT(produccion){  //Se usa para contruir los NT . METODO DE UTILERIA.
var vectorNT=[];

for (var i = 0; i < produccion.length; i++) {
  vectorNT[i]=produccion[i].izq[1];
	
	};
vectorNT=eliminarR(vectorNT);

return vectorNT;

}

function eliminarR(vector) { //Elimina Elementos Repetidos De Un Vector. METODO DE UTILERIA
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