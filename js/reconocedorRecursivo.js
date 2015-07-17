function metodo0(texto,pos){
switch(texto[pos]){
case 'a':
 pos=pos+1;
pos=metodo1(texto,pos);
if(texto[pos]== 'b' ) {
pos=pos+1;
pos=metodo1(texto,pos);
return pos
}
return false;
break;
default:
return false;
}
}
function metodo1(texto,pos){
switch(texto[pos]){
case 'b':
 pos=pos+1;
return pos
break;
default:
return false;
}
}
function reconocedorRecursivo(texto){
this.texto=texto;
this.esHileraValida = esHileraValida;
this.setHilera = setHilera;this.pos=0;
this.metodo0=metodo0;
this.metodo1=metodo1;

}
function esHileraValida(texto){
var lugar=0;
lugar=metodo0(this.texto,this.pos);
if(this.texto[lugar]=='Â¬'){console.log('acepto');return true;}else{console.log('Rechace');return false;}
}
function setHilera(t){
this.texto = t;
}