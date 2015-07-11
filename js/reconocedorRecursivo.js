function reconocedorRecursivo(texto){
	this.texto = texto;
	this.esHileraValida = esHileraValida;
	this.setHilera = setHilera;
}

function esHileraValida(){
	console.log(this.texto);
	return "true";
}

function setHilera(t){
	this.texto = t;
}

function metodo1(){

}

function metodo2(){

}
