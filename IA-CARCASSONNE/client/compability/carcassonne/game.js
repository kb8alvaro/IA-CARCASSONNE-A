var play = function (){
	Meteor.call("generarMazo",function(error){
		if(error){
			console.log("error al generar el mazo");
		}else{
			console.log("se ha generado el mazo");
		}
	})
    
/*
	Meteor.call("dameFichaMadre",function(error,ficha){
		if (error){
			console.log("error en el servidor al devolver la ficha madre");
		}else{
			console.log(ficha);
		}
	});*/

    Meteor.call("generarTablero",function(error){
            if(error){
				console.log("error al generar el tablero");
			}else{
				console.log("se ha generado el tablero");
			}
    });

    for (i=1; i<72; i++){
		Meteor.call("dameFicha",function(error,ficha){
			if(error){
				console.log("error en el servidor al devolver una ficha al azar");
			}else{
				console.log(ficha);
			}
		});
	};

    Meteor.call ("crearPartida","aajkejeijeie",[1,2], 4, function(error){
        if(error){
				console.log("error al crear la partida");
			}else{
				console.log("se ha creado la partida");
			}
    })
    Meteor.call("ponerFicha",function(error){
    	if (error){
    		console.log("el encajar tiene fallos");
    	}else{
    		console.log("todo ha salido bien al probar el encajar ficha");
    	}
    })
}

$(play());
