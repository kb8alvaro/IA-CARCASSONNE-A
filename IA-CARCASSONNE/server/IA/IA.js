// Fichero que incluye la lógica del juego.

/*++++++++++++++++++++++++++ cosas a recordar ++++++++++++++++++++++++++++++++

	marcar en que casilla de ficha va el escudo
		aplicarle el giro

	asignar propietario al insertar una ficha en el tablero
		aplicar ese cambio de propiedad a las adyacentes
		aplicar ese cambio de propiedad a las adyacentes de las adyacentes.....


	Comprobar:
		dame ficha,ponerFicha y poner seguidor de la parte de meteor -  no está hechas las llamadas en el server

*/

//******************************* datos ******************************************
var tipos=19;

// fichas
//Ojo entrada[0] es el tipo1, entrada[18] es el tipo19
var entrada=[
	//ciudad con caminos

	//3+1 madre
	//c city(ciudad), r road(camino), f field(campo), m monastery(convento), x cruce de caminos
	//u up, d down, l left, r rigth, tipo (n de sprite), giro (0,1,2,3), escudo (t o f) default f 
	//para aplicar un giro: pos=[posori+(3*giro)]mod 12	
		//	ul 	u 	ur 	ru 	r 	rd 	dr 	d 	dl ld  	l 	lu 	c	tipo giro escudo elegible
		 //	 0 	1 	2 	3	4 	5 	6 	7 	8	9	10	11	12
	{dato: ['c','c','c','f','r','f','f','f','f','f','r','f', 'r'],
	pdato: [1,1,1,1,1,2,2,2,2,2,1,1, 1],
	tipo: 1,
	cantidad:[4,0]
	},

	//3
	//c city(ciudad), r road(camino), f field(campo), m monastery(convento), x cruce de caminos
	//u up, d down, l left, r rigth, tipo (n de sprite), giro (0,1,2,3), escudo (t o f) default f 
	//para aplicar un giro: pos=[posori+(3*giro)]mod 12	
		//	ul 	u 	ur 	ru 	r 	rd 	dr 	d 	dl ld  	l 	lu 	c	tipo giro escudo elegible
		//	0 	1 	2 	3	4 	5 	6 	7 	8	9	10	11	12
	{dato: ['c','c','c','f','f','f','f','r','f','f','r','f', 'r'],
	pdato: [1,1,1,1,1,1,1,1,2,2,1,1, 1],
	tipo: 2,
	cantidad:[3,0]
	},
	//3
	//c city(ciudad), r road(camino), f field(campo), m monastery(convento), x cruce de caminos
	//u up, d down, l left, r rigth, tipo (n de sprite), giro (0,1,2,3), escudo (t o f) default f 
	//para aplicar un giro: pos=[posori+(3*giro)]mod 12	
		//	ul 	u 	ur 	ru 	r 	rd 	dr 	d 	dl ld  	l 	lu 	c	tipo giro escudo elegible
		//	0 	1 	2 	3	4 	5 	6 	7 	8	9	10	11	12
	{
	dato:  ['c','c','c','f','r','f','f','r','f','f','f','f', 'r'],
	pdato: [1,1,1,1,1,2,2,1,1,1,1,1, 1],
	tipo: 3,
	cantidad:[3,0]
	},
	//3
	//tipo problematico para el control de campo
	//ojo que tiene 3 caminos independientes y el centro pertenece al campo 1!! para que se pueda calcular que continúa el campo!!!!
	//c city(ciudad), r road(camino), f field(campo), m monastery(convento), x cruce de caminos
	//u up, d down, l left, r rigth, tipo (n de sprite), giro (0,1,2,3), escudo (t o f) default f 
	//para aplicar un giro: pos=[posori+(3*giro)]mod 12	
		//	ul 	u 	ur 	ru 	r 	rd 	dr 	d 	dl ld  	l 	lu 	c	tipo giro escudo elegible
		//	0 	1 	2 	3	4 	5 	6 	7 	8	9	10	11	12
	{
	dato:  ['c','c','c','f','r','f','f','r','f','f','r','f', 'x'],
	pdato: [1,1,1,1,1,2,2,2,3,3,3,1, 1],
	tipo: 4,
	cantidad:[3,0]
	},
	//3+2con escudo
	//el camino 4-7 está conectado
	//c city(ciudad), r road(camino), f field(campo), m monastery(convento), x cruce de caminos
	//u up, d down, l left, r rigth, tipo (n de sprite), giro (0,1,2,3), escudo (t o f) default f 
	//para aplicar un giro: pos=[posori+(3*giro)]mod 12	
		//	ul 	u 	ur 	ru 	r 	rd 	dr 	d 	dl ld  	l 	lu 	c	tipo giro escudo elegible
		//	0 	1 	2 	3	4 	5 	6 	7 	8	9	10	11	12
	{
	dato:  ['c','c','c','f','r','f','f','r','f','c','c','c', 'f'],
	pdato: [1,1,1,1,1,2,2,1,1,1,1,1, 1],
	tipo: 5,
	cantidad:[3,2]
	},
	//1+2con escudo
	//denotado centro como c, el camino se corta en la ciudad
	//c city(ciudad), r road(camino), f field(campo), m monastery(convento), x cruce de caminos
	//u up, d down, l left, r rigth, tipo (n de sprite), giro (0,1,2,3), escudo (t o f) default f 
	//para aplicar un giro: pos=[posori+(3*giro)]mod 12	
		//	ul 	u 	ur 	ru 	r 	rd 	dr 	d 	dl ld  	l 	lu 	c	tipo giro escudo elegible
		//	0 	1 	2 	3	4 	5 	6 	7 	8	9	10	11	12
	{
	dato:  ['c','c','c','c','c','c','f','r','f','c','c','c', 'c'],
	pdato: [1,1,1,1,1,1,1,1,2,1,1,1, 1],
	tipo: 6,
	cantidad:[1,2]
	},

//ciudad con campo
	//5
	//c city(ciudad), r road(camino), f field(campo), m monastery(convento), x cruce de caminos
	//u up, d down, l left, r rigth, tipo (n de sprite), giro (0,1,2,3), escudo (t o f) default f 
	//para aplicar un giro: pos=[posori+(3*giro)]mod 12	
		//	ul 	u 	ur 	ru 	r 	rd 	dr 	d 	dl ld  	l 	lu 	c	tipo giro escudo elegible
		//	0 	1 	2 	3	4 	5 	6 	7 	8	9	10	11	12
	{
	dato:  ['c','c','c','f','f','f','f','f','f','f','f','f', 'f'],
	pdato: [1,1,1,1,1,1,1,1,1,1,1,1, 1],
	tipo: 7,
	cantidad:[5,0]
	},
	//ojo!!! ficha con dos ciudades independientes

	//2
	//c city(ciudad), r road(camino), f field(campo), m monastery(convento), x cruce de caminos
	//u up, d down, l left, r rigth, tipo (n de sprite), giro (0,1,2,3), escudo (t o f) default f 
	//para aplicar un giro: pos=[posori+(3*giro)]mod 12	
		//	ul 	u 	ur 	ru 	r 	rd 	dr 	d 	dl ld  	l 	lu 	c	tipo giro escudo elegible
		//	0 	1 	2 	3	4 	5 	6 	7 	8	9	10	11	12
	{
	dato:  ['c','c','c','c','c','c','f','f','f','f','f','f', 'f'],
	pdato: [1,1,1,2,2,2,1,1,1,1,1,1, 1],
	tipo: 8,
	cantidad:[2,0]
	},
	//3
	//c city(ciudad), r road(camino), f field(campo), m monastery(convento), x cruce de caminos
	//u up, d down, l left, r rigth, tipo (n de sprite), giro (0,1,2,3), escudo (t o f) default f 
	//para aplicar un giro: pos=[posori+(3*giro)]mod 12	
		//	ul 	u 	ur 	ru 	r 	rd 	dr 	d 	dl ld  	l 	lu 	c	tipo giro escudo elegible
		//	0 	1 	2 	3	4 	5 	6 	7 	8	9	10	11	12
	{
	dato:  ['c','c','c','f','f','f','c','c','c','f','f','f', 'f'],
	pdato: [1,1,1,1,1,1,2,2,2,1,1,1, 1],
	tipo: 9,
	cantidad:[3,0]
	},
	//3+2con escudo
	//c city(ciudad), r road(camino), f field(campo), m monastery(convento), x cruce de caminos
	//u up, d down, l left, r rigth, tipo (n de sprite), giro (0,1,2,3), escudo (t o f) default f 
	//para aplicar un giro: pos=[posori+(3*giro)]mod 12	
		//	ul 	u 	ur 	ru 	r 	rd 	dr 	d 	dl ld  	l 	lu 	c	tipo giro escudo elegible
		//	0 	1 	2 	3	4 	5 	6 	7 	8	9	10	11	12
	{
	dato:  ['c','c','c','f','f','f','f','f','f','c','c','c', 'f'],
	pdato: [1,1,1,1,1,1,1,1,1,1,1,1, 1],
	tipo: 10,
	cantidad:[3,2]
	},
	//1+2con escudo
	//c city(ciudad), r road(camino), f field(campo), m monastery(convento), x cruce de caminos
	//u up, d down, l left, r rigth, tipo (n de sprite), giro (0,1,2,3), escudo (t o f) default f 
	//para aplicar un giro: pos=[posori+(3*giro)]mod 12	
		//	ul 	u 	ur 	ru 	r 	rd 	dr 	d 	dl ld  	l 	lu 	c	tipo giro escudo elegible
		//	0 	1 	2 	3	4 	5 	6 	7 	8	9	10	11	12
	{
	dato:  ['f','f','f','c','c','c','f','f','f','c','c','c','c'],
	pdato: [1,1,1,1,1,1,2,2,2,1,1,1,1],
	tipo: 11,
	cantidad:[1,2]
	},
	//3+1con escudo
	//c city(ciudad), r road(camino), f field(campo), m monastery(convento), x cruce de caminos
	//u up, d down, l left, r rigth, tipo (n de sprite), giro (0,1,2,3), escudo (t o f) default f 
	//para aplicar un giro: pos=[posori+(3*giro)]mod 12	
		//	ul 	u 	ur 	ru 	r 	rd 	dr 	d 	dl ld  	l 	lu 	c	tipo giro escudo elegible
		//	0 	1 	2 	3	4 	5 	6 	7 	8	9	10	11	12
	{
	dato:  ['c','c','c','c','c','c','f','f','f','c','c','c', 'c'],
	pdato: [1,1,1,1,1,1,1,1,1,1,1,1, 1],
	tipo: 12,
	cantidad:[3,1]
	},

//ciudad

	//1con escudo
	//c city(ciudad), r road(camino), f field(campo), m monastery(convento), x cruce de caminos
	//u up, d down, l left, r rigth, tipo (n de sprite), giro (0,1,2,3), escudo (t o f) default f 
	//para aplicar un giro: pos=[posori+(3*giro)]mod 12	
		//	ul 	u 	ur 	ru 	r 	rd 	dr 	d 	dl ld  	l 	lu 	c	tipo giro escudo elegible
		//	0 	1 	2 	3	4 	5 	6 	7 	8	9	10	11	12
	{
	dato:  ['c','c','c','c','c','c','c','c','c','c','c','c', 'c'],
	pdato: [1,1,1,1,1,1,1,1,1,1,1,1, 1],
	tipo: 13,
	cantidad:[0,1]
	},

//caminos

	//9
	//c city(ciudad), r road(camino), f field(campo), m monastery(convento), x cruce de caminos
	//u up, d down, l left, r rigth, tipo (n de sprite), giro (0,1,2,3), escudo (t o f) default f 
	//para aplicar un giro: pos=[posori+(3*giro)]mod 12	
		//	ul 	u 	ur 	ru 	r 	rd 	dr 	d 	dl ld  	l 	lu 	c	tipo giro escudo elegible
		//	0 	1 	2 	3	4 	5 	6 	7 	8	9	10	11	12
	{
	dato:  ['f','f','f','f','f','f','f','r','f','f','r','f', 'r'],
	pdato: [1,1,1,1,1,1,1,1,2,2,1,1, 1],
	tipo: 14,
	cantidad:[9,0]
	},
	//8
	//c city(ciudad), r road(camino), f field(campo), m monastery(convento), x cruce de caminos
	//u up, d down, l left, r rigth, tipo (n de sprite), giro (0,1,2,3), escudo (t o f) default f 
	//para aplicar un giro: pos=[posori+(3*giro)]mod 12	
		//	ul 	u 	ur 	ru 	r 	rd 	dr 	d 	dl ld  	l 	lu 	c	tipo giro escudo elegible
		//	0 	1 	2 	3	4 	5 	6 	7 	8	9	10	11	12
	{
	dato:  ['f','f','f','f','r','f','f','f','f','f','r','f', 'r'],
	pdato: [1,1,1,1,1,2,2,2,2,2,1,1, 1],
	tipo: 15,
	cantidad:[8,0]
	},
	//4
	//c city(ciudad), r road(camino), f field(campo), m monastery(convento), x cruce de caminos
	//u up, d down, l left, r rigth, tipo (n de sprite), giro (0,1,2,3), escudo (t o f) default f 
	//para aplicar un giro: pos=[posori+(3*giro)]mod 12	
		//	ul 	u 	ur 	ru 	r 	rd 	dr 	d 	dl ld  	l 	lu 	c	tipo giro escudo elegible
		//	0 	1 	2 	3	4 	5 	6 	7 	8	9	10	11	12
	{
	dato:  ['f','f','f','f','r','f','f','r','f','f','r','f', 'x'],
	pdato: [1,1,1,1,1,2,2,2,3,4,3,1, 1],
	tipo: 16,
	cantidad:[4,0]
	},
	//1
	//c city(ciudad), r road(camino), f field(campo), m monastery(convento), x cruce de caminos
	//u up, d down, l left, r rigth, tipo (n de sprite), giro (0,1,2,3), escudo (t o f) default f 
	//para aplicar un giro: pos=[posori+(3*giro)]mod 12	
		//	ul 	u 	ur 	ru 	r 	rd 	dr 	d 	dl ld  	l 	lu 	c	tipo giro escudo elegible
		//	0 	1 	2 	3	4 	5 	6 	7 	8	9	10	11	12
	{
	dato:  ['f','r','f','f','r','f','f','r','f','f','r','f', 'x'],
	pdato: [1,1,2,2,2,3,3,3,4,4,4,1, 1],
	tipo: 17,
	cantidad:[1,0]
	},
//monasterio

	//4
	//c city(ciudad), r road(camino), f field(campo), m monastery(convento), x cruce de caminos
	//u up, d down, l left, r rigth, tipo (n de sprite), giro (0,1,2,3), escudo (t o f) default f 
	//para aplicar un giro: pos=[posori+(3*giro)]mod 12	
		//	ul 	u 	ur 	ru 	r 	rd 	dr 	d 	dl ld  	l 	lu 	c	tipo giro escudo elegible
		//	0 	1 	2 	3	4 	5 	6 	7 	8	9	10	11	12
	{
	dato:  ['f','f','f','f','f','f','f','f','f','f','f','f', 'm'],
	pdato: [1,1,1,1,1,1,1,1,1,1,1,1, 1],
	tipo: 18,
	cantidad:[4,0]
	},
//monasterio con camino
	//4
	//c city(ciudad), r road(camino), f field(campo), m monastery(convento), x cruce de caminos
	//u up, d down, l left, r rigth, tipo (n de sprite), giro (0,1,2,3), escudo (t o f) default f 
	//para aplicar un giro: pos=[posori+(3*giro)]mod 12	
		//	ul 	u 	ur 	ru 	r 	rd 	dr 	d 	dl ld  	l 	lu 	c	tipo giro escudo elegible
		//	0 	1 	2 	3	4 	5 	6 	7 	8	9	10	11	12
	{
	dato:  ['f','f','f','f','f','f','f','r','f','f','f','f', 'm'],
	pdato: [1,1,1,1,1,1,1,1,1,1,1,1, 1],
	tipo: 19,
	cantidad:[2,0]
	}

];


//*********** Ficha **********

function Ficha (tipo, numFicha, escudo, pdato){
	this.dato=entrada[tipo-1].dato || [];
	this.pdato=pdato;
	this.tipo=tipo;
	this.escudo=escudo ||false; //default false
	this.numFicha=numFicha; //no default porque sino la ficha madre no toma valor
	this.giroUI = 0;
	this.seguidor = new Seguidor();
};

// girar

Ficha.prototype.aplicarGiro = function(giro){
	this.dato=girarDato(this.dato,giro);
	this.pdato=girarDato(this.pdato,giro);
	//this.seguidor.posSeguidor = (this.seguidor.posSeguidor(posant+(3*giro)) % 12);
}

Ficha.prototype.actualizarSeguidor = function(posSeguidor,IdPropietario){
	this.seguidor.posSeguidor = posSeguidor;
	this.seguidor.tipoSeguidor = this.dato[posSeguidor];
	this.seguidor.idJugSeguidor  = IdPropietario;
}

function girarDato(dato, giro){
	var nuevodato=[];
	var posact;
	//que no evalue el último elemento porque es la parte central
	for (posant=0; posant<dato.length-1; posant++){
		console.log(i);
		posact=((posant+(3*giro)) % 12);
		nuevodato[posact]=dato[posant];
	}
	//ultimo elemento, parte central
	nuevodato[dato.length-1]=dato[dato.length-1];
	return nuevodato;
}


//******* seguidor *******
var Seguidor = function(pos, tipo, idJug){
	this.posSeguidor = pos | -1;
	this.tipoSeguidor = tipo | -1;
	this.idJugSeguidor = idJug | -1;
}

//******* celda *********
var Cell = function(ficha,pos){
		this.ficha = ficha;
		this.pos = pos;
};


//*********** Mazo **********
var Mazo = function(){
	this.data = []; //donde estan las fichas.
    this.generate();
}

Mazo.prototype.generate = function(){
	var cont=0;
	//genera mazo ordenado, de forma que la primera ficha es la ficha madre
	//recorremos los tipos
	var cgc=0; //contador de ciudades distintas
	var cgf=0; //contador de campos distintos
	var cgr=0; //contador de caminos distintos
	var cgm=0; //contador de monasterios distintos
	var cgx=0; //contador de cruces distintos
	var nuevaFicha;
	for (i=1; i<=tipos; i++){
		//console.log("----------------------------------------tipo "+i);
		//recojo el dato del tipo actual y el pdato
		datoaux=entrada[i-1].dato;
		pdatoaux=entrada[i-1].pdato;

		//inserto la ficha generada en el mazo
		//nos normal o escudo
		for(nos=0;nos<entrada[i-1].cantidad.length;nos++){
			for(cst=1; cst<=entrada[i-1].cantidad[nos];cst++){
	
				//evaluo todas las casillas dentro de una ficha
				//contadores locales a ficha
				var cfc=0; //contador de ciudades distintas
				var cff=0; //contador de campos distintos
				var cfr=0; //contador de caminos distintos
				var cfm=0; //contador de monasterios distintos
				var cfx=0; //contador de cruces distintos
				var pdato=[];
				for(contaux=0;contaux<pdatoaux.length;contaux++){

					switch (datoaux[contaux]){
					case "c": //ciudad
						cfc = (cfc > pdatoaux[contaux]) ? cfc : pdatoaux[contaux];
						//escribo el nuevo valor en la variable que se le pasará al constructor de Ficha
						pdato[contaux]=cgc+pdatoaux[contaux];
						break;
					//campo
					case "f":
						cff = (cff > pdatoaux[contaux]) ? cff : pdatoaux[contaux];
						pdato[contaux]=cgf+pdatoaux[contaux];
						break;
					//camino
					case "r":
						cfr = (cfr > pdatoaux[contaux]) ? cfr : pdatoaux[contaux];
						pdato[contaux]=cgr+pdatoaux[contaux];
						break;
					//monasterio
					case "m":
						cfm = (cfm > pdatoaux[contaux]) ? cfm : pdatoaux[contaux];
						pdato[contaux]=cgm+pdatoaux[contaux];
						break;
					//cruces
					case "x":
						cfx = (cfx > pdatoaux[contaux]) ? cfx : pdatoaux[contaux];
						pdato[contaux]=cgx+pdatoaux[contaux];
						break;
					}
				}
				//he terminado de evaluar una ficha
				//actualizo contadores globales

				cgc=cgc+cfc; //contador de ciudades distintas
				cgf=cgf+cff; //contador de campos distintos
				cgr=cgr+cfr; //contador de caminos distintos
				cgm=cgm+cfm; //contador de monasterios distintos
				cgx=cgx+cfx; //contador de cruces distintos

				var tieneEscudo=(nos==1);
				nuevaFicha=new Ficha(i, cont, tieneEscudo, pdato)
				this.data.push(nuevaFicha);
				cont++;

				//console.log("--------------------"+cont);
				//console.log(nuevaFicha.dato);
				//console.log(pdatoaux);
				//console.log(nuevaFicha.pdato);
				//console.log("cgc= "+cgc+" cgf= "+cgf+" cgr= "+cgr+" cgm= "+cgm+" cgx= "+cgx);
			}//contador cuantas fichas hay de cada sub tipo dentro del tipo
		}//nos
	}//tipo
	console.log("generadas "+cont+" fichas." );
	console.log( +cgc+" porciones de ciudad, "+cgf+" porciones de campo, "+cgr+" porciones de camino, "+cgm+" monasterios y "+cgx+" cruces.");
}

Mazo.prototype.dameFichaMadre = function(){
	var ficha;
	var numFicha = this.data[0].numFicha;
	//compruebo que es la ficha madre
	if(numFicha == 0){
		var ficha = this.data[numFicha];
		this.data.splice (0,1); //eliminamos la ficha madre.
	}

	return ficha;
};

Mazo.prototype.dameFicha = function(){
	var num = Math.floor(Math.random()*this.data.length)
	var ficha = this.data [num];
	this.data.splice(num,1); //eliminamos la ficha del mazo.
	//devuelve una ficha aleatoria, y la guarda en fichaActual
	return ficha;
};



//******* tablero *********
//el tablero tendrá dim 100 x 100. La ficha madre estará en la posición (50,50). //esto se podrá cambiar.
var Tablero = function (){
	//el array estará formado por celdas en el que se almacena (ficha : {es necesario el tipo de la ficha}, pos: {x,y}).
    this.fichaActual;
    this.mazo = new Mazo();
	this.cellSet = [];    
	this.maxDim = 100;
	this.posCentral = {x: Math.floor((this.maxDim -1)/2),y: Math.floor((this.maxDim -1)/2)};
    this.generate();
};

Tablero.prototype.generate = function(){
	//para inicializar
	//llamar a poner ficha madre
	var fichaMadre = this.mazo.dameFichaMadre();
	var cellFichaMadre = new Cell(fichaMadre,this.posCentral);
    this.cellSet.push(cellFichaMadre);
};

//coloca una ficha en una posicion.
Tablero.prototype.put = function (ficha,pos){
    if(this.encaja(ficha,pos)){
    	console.log("la ficha encaja! y se añade al tablero");
		this.cellSet.push(new Cell(ficha,pos));
		return true;
    }else{
    	return false;
	}
}

Tablero.prototype.getPosAdyacentes = function(pos){
	// ************* u,r,d,l ************* //
	//si pos == esquina ==> array long 2,
	//si pos == marco ==> array long 3,
	//otro caso ==> array long 4.
	//de momento solo se comprueba el ultimo caso.
	return [{x:pos.x,y: pos.y -1},
			{x: pos.x+1,y: pos.y}, 
			{x: pos.x , y: pos.y + 1}, 
			{x: pos.x -1,y: pos.y}];
}

Tablero.prototype.getCellAdyacentes = function(pos){
	var posAd = this.getPosAdyacentes(pos);
	console.log("he sacado las posiciones adyacentes y son:");
	console.log(posAd);
	var cellAdyacentes = _(this.cellSet).filter (function(c){
		//esta función devolverá true si la ficha es la adyacente, es decir,
		//si su posición coincide con alguna de las posiciones adyacentes.
		return _(posAd).some(function(pAd){
			//compruebo si es su posicion.
			return pAd.x == c.pos.x && pAd.y == c.pos.y;
		});
	});
	console.log("he extraido las cell adyacentes");
	console.log(cellAdyacentes);
	return cellAdyacentes;
}

//este método permite saber si dos fichas coinciden o no.
Tablero.prototype.coinciden = function (f1,f2,p1,p2){
	console.log("comparo con: " + f2.dato);
	var success = false; //no encajan por defecto.
	//esta funcion nos permite conocer la ubicación de p1 con respecto a p2, es decir, 
	//si p1 esta arriba, abajo, izq y derecha de p2. OJO (arriba y abajo cambian puesto que el origen 
	//de coordenadas se encuentra en la esquina superior izquierda).
	var conocerUb = function(p1,p2){
		var ub;
		//la ficha adyacente está a la izq o derecha de la ficha a colocar.
		if (p1.y == p2.y){ //es vertical
			ub = (p1.x < p2.x && p1.y == p2.y) ? "r" : "l"; 
		}else{ //es horizontal
			ub = (p1.y < p2.y && p1.x == p2.x) ? "d" : "u";
		}
		return ub;
	};

	var ub = conocerUb(p1,p2);
	console.log("la ubicación de la ficha adyacente es: " + ub);
	//conocemos si encaja segun su ubicación. (si tienen las propiedades complementarias).
	switch (ub){
		case "r":
			//el lado derecho de la ficha a poner coincide con el lado izquierdo de la ficha a considerar?.
			success = f1.dato[3] == f2.dato[11] && f1.dato[4] == f2.dato[10] && f1.dato[5] == f2.dato[9];
			break;
		case "l":
			//el lado izq de la ficha a poner coincide con el lado derecho de la ficha a considerar?.
			success = f2.dato[3] == f1.dato[11] && f2.dato[4] == f1.dato[10] && f2.dato[5] == f1.dato[9];
			break;
		case "d":
			//el lado inferior de la ficha a poner coincide con el lado superior de la ficha a considerar?.
			success = f1.dato[8] == f2.dato[0] && f1.dato[7]  == f2.dato[1] && f1.dato[6] == f2.dato[2];
			break;
		case "u":
			//el lado superior de la ficha a poner coincide con el lado inferior de la ficha a considerar?.
			success = f2.dato[8] == f1.dato[0] && f2.dato[7]  == f1.dato[1] && f2.dato[6] == f1.dato[2];
			break;
	}
	console.log("coinciden: " + success);
	return success;
};

Tablero.prototype.encaja = function(ficha,pos){
	//busco las fichas que rodean a la posicion en la que quiero insertar la ficha.
	console.log("ficha a encajar: " + ficha.dato);
	var cellAdyacentes = this.getCellAdyacentes (pos);
	//devuelve si encaja con todas las fichas adyacentes.
	var that = this; //necesario para poder llamar a coinciden del tablero en la función del underscore.
	return _(cellAdyacentes).every(function(cAd){
		return that.coinciden (ficha,cAd.ficha,pos,cAd.pos);
	});
}

Tablero.prototype.ponerFicha = function(pos, giro){
	this.fichaActual.giroIU = giro;
	return this.put(this.fichaActual.aplicarGiro(giro),pos);
}

ablero.prototype.ponerSeguidor = function(posSeguidor,IdPropietario){
	this.fichaActual.giroIU = giro;
	this.fichaActual.actualizarSeguidor(posSeguidor,IdPropietario);
	//console.log(this.fichaActual.seguidor);
}
Tablero.prototype.dameFicha = function(){
	this.fichaActual = this.mazo.dameFicha();
	return this.fichaActual;
}


//******* partida *********
var Partida = function(idPartida,jugs,numJugs){
    
    this.idPartida = idPartida;
    addPartida(this);
    this.initialize(jugs,numJugs);
}

Partida.prototype.initialize = function(jugs,numJugs){
    //iran las cosas de jugadores y ia etcetc
    this.tablero = new Tablero();    
    this.jugs = [];
    this.puntosJugs = [];
    this.jugs.forEach(function(jug){
        this.puntosJugs[jug] = {puntos : 0};
    });
    var idIA = 0;
    for (var i = 0; i<numJugs; i++){
        if (i>= jugs.length){
            this.jugs [i] = "IA"+ idIA;
            idIA ++;
        }else{
            this.jugs[i] = jugs [i];
        }
    }
    this.turno = this.jugs[0];
}

Partida.prototype.getTurno = function(){
    return this.turno;
}

Partida.prototype.pasarTurno = function(){
    this.turno = (this.turno + 1 > this.jugs.length -1) ? 0 : this.turno +1;
}

Partida.prototype.finalizar = function(){
    //actualizar en la base de datos los puntos de los jugadores
    //borrar la partida actual
    //hablar con plataforma
}

Partida.prototype.getPuntos = function(){
    return this.puntosJugs;
}

//******* para todas las partidas *********
partidas = [];
addPartida  = function(partida){
    partidas[partida.idPartida] = partida;
}


//******* para meteor *********

generarPartida = function(id,jugs,num){
    return new Partida(id,jugs,num);
}

generarTablero = function(){
    return new Tablero();
}

generarMazo = function(){
    return new Mazo();
}

getPartida = function(id_partida){
	_(partidas).find(function (partida){
		return partida.idPartida == id_partida;
	});
}

/*

probarlos con meteor, por consola dice Error: no se puede acceder al objeto partida


dameFicha = function(){
	return partida.tablero.dameFicha();
}

ponerFicha = function(x, y, giro, posSeguidor,IdPropietario){
	var pos={x:x,y:y};
	partida.tablero.ponerFicha(pos, giro, posSeguidor,IdPropietario)
}

ponerSeguidor = function(posantSeguidor){
	//Nota: se aplica el giro a la posición del seguidor para que no lo tengan que hacer los de iu

	//recuperar la ultima celda puesta y añadir el seguidor
	var CellEnJuego = partida.tablero.cellSet[partida.tablero.cellSet.length-1];
	
	var nuevoSeguidor=new Seguidor(posact, CellEnJuego.ficha.data[posSeguidor], partida.turno));
	CellEnJuego.addSeguidor(nuevoSeguidor);
}
*/






