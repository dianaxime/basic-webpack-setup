/* 
    Universidad del Valle de Guatemala
    Sistemas y Tecnologias Web
    I Semestre 2020
    Nombre: Diana Ximena de Leon Figueroa
    Carne: 18607
    Fecha: 30/01/2020   
*/

/*const renderLuz = ({
    color,
    size = 200,
    isTurnedOn = false,
}) => {
    const luz = document.createElement('div');
    luz.style.width = `${size}px`;
    luz.style.height = `${size}px`;
    luz.style.borderRadius = `${size / 2}px`;
    luz.style.backgroundColor = color;
    luz.style.opacity = isTurnedOn ? 1.0 : 0.25;
    return luz;
}


const render = (mount, state) => {
    const { turnedOnIndex } = state;

    const semaforo = document.createElement('div');
    semaforo.style.backgroundColor = 'black';
    semaforo.style.width = '200px';
    semaforo.style.padding = '25px';
    /*[
        'red',
        'yellow',
        'green'
    ].map(
        (color, index) => renderLuz({
            color,
            isTurnedOn: index === turnedOnIndex,
        }),
    ).forEach(
        luz => semaforo.appendChild(luz),
    );

    const boton = document.createElement('button');
    boton.style.width = '250px';
    boton.style.fontSize = '20px';
    boton.innerText = 'Siguiente';

    boton.onclick = () => {
        state.turnedOnIndex = (state.turnedOnIndex + 1) % 3;
        root.innerHTML = '';
        render(root, state);
    };

    mount.appendChild(semaforo);
    //mount.appendChild(boton);
};


const APP_STATE = {
    turnedOnIndex: 1,
};

const root = document.getElementById('root');

render(root, APP_STATE);*/

/* Estados: 
        
        Blancas : -1
        Negras  :  1

*/

const render = (mount, state) => {

    const { Turn, Board} = state;

    mount.style.backgroundColor = '#ecd67b';
    mount.style.padding = '25px';


    const vertical_abajo = (celda, indice) => {
        let i_final=null;
        for (var i=indice+1; i<64; i++){
            if (indice%8 === i%8){
                if (state.Board[i]===celda){
                    i_final=i; 
                    break;
                }
                if (state.Board[i]===0){
                    break;
                }
            }
        }
        if (i_final !== null){
            for (var e=indice; e<i_final; e++){
                if (indice%8 === e%8 && state.Board[e]!==0){
                    state.Board[e]=celda;
                }
            }
        }
    }

    const vertical_arriba = (celda, indice) => {
        let i_final=null;
        for (var i=indice-1; i>0; i--){
            if (indice%8 === i%8){
                if (state.Board[i]===celda){
                    i_final=i; 
                    break;
                }
                if (state.Board[i]===0){
                    break;
                }
            }
        }
        if (i_final !== null){
            for (var e=indice; e>i_final; e--){
                if (indice%8 === e%8 && state.Board[e]!==0){
                    state.Board[e]=celda;
                }
            }
        }
    }
    const horizontar_derecha = (celda, indice) => {
        let i_final=null;
        console.log("Hola");
        for (var i=indice+1; i<64; i++){
            if (parseInt(indice/8) === parseInt(i/8)){
                console.log(i);
                if (state.Board[i]===celda){
                    i_final=i; 
                    break;
                }
                if (state.Board[i]===0){
                    break;
                }
            }
        }
        if (i_final !== null){
            for (var e=indice; e<i_final; e++){
                if (parseInt(indice/8) === parseInt(e/8) && state.Board[e]!==0){
                    state.Board[e]=celda;
                }
            }
        }
    }

    const horizontal_izquierda = (celda, indice) => {
        let i_final=null;
        for (var i=indice-1; i>0; i--){
            if (parseInt(indice/8) === parseInt(i/8)){
                if (state.Board[i]===celda){
                    i_final=i; 
                    break;
                }
                if (state.Board[i]===0){
                    break;
                }
            }
        }
        if (i_final !== null){
            for (var e=indice; e>i_final; e--){
                if (parseInt(indice/8) === parseInt(e/8) && state.Board[e]!==0){
                    state.Board[e]=celda;
                }
            }
        }
    }


    const renderCasilla = ({
        celda,
        indice,
        size = 50,
    }) => {
        //Crea la casilla
        const casilla = document.createElement('button');
        casilla.style.width = `${size}px`;
        casilla.style.height = `${size}px`;
        casilla.style.borderColor = '#000000';
        casilla.style.backgroundColor = '#00b75b';
        casilla.style.borderRadius = `${size/10}px`;
        const ficha = document.createElement('div');
        ficha.style.width = `${size-15}px`;
        ficha.style.height = `${size-15}px`;
        //Le da el estilo correspondiente si esta posicionada una ficha blanca
        if(celda === 1){
            ficha.style.backgroundColor = '#000000';
            ficha.style.borderRadius = `${size/2}px`;
            casilla.appendChild(ficha);
        }
        //Le da el estilo correspondiente si esta posicionada una ficha negra
        if(celda === -1){
            ficha.style.backgroundColor = '#FFFFFF';
            ficha.style.borderRadius = `${size/2}px`;
            casilla.appendChild(ficha);
        }
        //Si esta vacia y el usuario presiona esa casilla
        if (celda === 0){
            casilla.onclick = () => {
                if (Turn){
                    APP_STATE.Board[indice] = 1;
                    APP_STATE.Turn = !Turn;
                    vertical_abajo( 1, indice);
                    vertical_arriba( 1, indice);
                    horizontal_izquierda(1, indice);
                    horizontar_derecha(1, indice);
                    root.innerHTML = '';
                    render(root, APP_STATE);
                }
                else if (!Turn){
                    APP_STATE.Board[indice] = -1;
                    APP_STATE.Turn = !Turn;
                    vertical_abajo(-1, indice);
                    vertical_arriba(-1, indice);
                    horizontal_izquierda(-1, indice);
                    horizontar_derecha(-1, indice);
                    root.innerHTML = '';
                    render(root, APP_STATE);
                }
            }
        }
        return casilla;
    }

    const info = document.createElement('div');
    info.style.minWidth = '410px';
    info.style.display = 'flex';
    info.style.flexDirection = 'column';
    info.style.alignItems = 'center';

    //Titulo
    const render_titulo = () =>{
        const title = document.createElement('h1');
        title.innerText = 'Play Othello';
        title.style.fontSize = '48px';
        title.style.fontFamily= 'sans-serif';
        return title;
    }
    
    //Cuenta la cantidad de fichas de cada color
    let cuenta_blancas = 0;
    let cuenta_negras = 0;

    state.Board.map(((celda, indice) => {
        if (celda === -1){
            cuenta_blancas += 1;
        }
        if (celda === 1){
            cuenta_negras += 1;
        }
    }));

    const render_estado_whites = () =>{
       const state_white = document.createElement('div');
        state_white.style.display = 'flex';
        state_white.style.flexDirection = 'row';
        const whites = document.createElement('h3');
        whites.innerText = "Cant. Blancas:"
        const c_whites = document.createElement('h3');
        c_whites.innerText = cuenta_blancas;
        c_whites.style.paddingLeft = '5px';
        whites.style.paddingLeft = '25px';

        state_white.appendChild(whites);
        state_white.appendChild(c_whites); 
        return state_white;
    }
    
    const render_estado_blacks = () =>{
       const state_black = document.createElement('div');
        state_black.style.display = 'flex';
        state_black.style.flexDirection = 'row';
        const blacks = document.createElement('h3');
        blacks.innerText = "Cant. Negras:"
        const c_blacks = document.createElement('h3');
        c_blacks.innerText = cuenta_negras;
        c_blacks.style.paddingLeft = '5px';
        blacks.style.paddingLeft = '25px';

        state_black.appendChild(blacks);
        state_black.appendChild(c_blacks); 
        return state_black;
    }
    

    //Muestra la cantidad de fichas por color
    const render_estado_de_juego = () =>{
        const state_game = document.createElement('div');
        state_game.style.minWidth = '410px';
        state_game.display = 'flex';
        state_game.style.flexDirection = 'row';
        state_game.style.alignItems = 'center';
        state_game.style.backgroundColor = '#ecd67b';
        state_game.style.borderStyle = 'dashed';
        state_game.style.borderSize = '2px';
        state_game.appendChild(render_estado_whites());
        state_game.appendChild(render_estado_blacks());
        state_game.appendChild(render_turno());
        return state_game;
    }

    //Muestra el turno del jugador
    const render_turno = () =>{
        const info_turno = document.createElement('div');
        info_turno.style.alignItems = 'center';
        info_turno.style.display = 'flex';
        info_turno.style.flexDirection = 'row';
        const turno_turno = document.createElement('h2');
        const turno_player = document.createElement('h2');
        turno_turno.style.paddingLeft = '100px';
        turno_player.style.paddingLeft = '25px';

        const player_turn = (Turn) ? 'Jugador 1' : 'Jugador 2';

        turno_turno.innerText = "Turno:";
        turno_player.innerText = player_turn;

        info_turno.appendChild(turno_turno);
        info_turno.appendChild(turno_player);
        
        return info_turno; 
    }

    info.appendChild(render_titulo());
    info.appendChild(render_estado_de_juego());

    //Muestra el tablero
    const render_tablero = () =>{
        const tablero = document.createElement('div');
        tablero.style.backgroundColor = '#00b75b';
        tablero.style.width = '410px';
        tablero.style.margin = '10px';
        tablero.style.padding = '25px';
        tablero.style.borderRadius = '5px';

        state.Board.map((celda, indice) => renderCasilla({celda, indice})).forEach(casilla => tablero.appendChild(casilla));
        return tablero;
    }
    
    
    info.appendChild(render_tablero());
    mount.appendChild(info);
    
};

const APP_STATE = {
    Turn: true,
    Board: [
            0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,
            0,0,0,-1,1,0,0,0,
            0,0,0,1,-1,0,0,0,
            0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,
            ],
}

const root = document.getElementById('root');

render(root, APP_STATE);
