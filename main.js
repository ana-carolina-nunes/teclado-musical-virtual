const listaTeclas = document.querySelectorAll('.tecla'); //busca do arquivo html todas as tags da classe tecla
var dicRelacaoTeclaNotas = new Map(); //dictionary: armazenado em pares e chave unica | ordem é preservada é uma instancia do Object mas o contrario n é valido
//Object aceita apenas tipos simples na hora de declarar elementos e não preserva ordem

const listaTeclasPretas = document.querySelectorAll('.tecla_preta');
var dicRelacaoTeclaNotasPretas = new Map();

for (let i = 0; i < listaTeclas.length; i++) {
    const tecla = listaTeclas[i];
    dicRelacaoTeclaNotas.set(tecla.textContent, tecla.classList[1]);
};

for (let i = 0; i < listaTeclasPretas.length; i++) {
    const teclaPreta = listaTeclasPretas[i];
    dicRelacaoTeclaNotasPretas.set(teclaPreta.textContent, teclaPreta.classList[1]);
};

function tocarSomNota(idElementoAudio) {

    const elemento = document.querySelector(idElementoAudio);
    const idTeclaCorrespondente = idElementoAudio.substring(5, idElementoAudio.length);
    const teclaCorrespondente = document.querySelector(`.${idTeclaCorrespondente}`);

    if (elemento && elemento.localName == 'audio') {
        elemento.currentTime = 0;  //p/ tirar delay de audio
        elemento.play();
        teclaCorrespondente.classList.add('ativa');
    } else {
        alert('elemento não encontrado ou não é tag de audio'); //dialog
        console.log('elemento não encontrado ou não é tag de audio');
        console.log(idElementoAudio);
    }
}

//função anônima - se chamar declarar diretamente chama assim q executar programa
onkeydown = function (evento) {

    const teclaPressionada = evento.key.toUpperCase(); 
    let dicRelacaoTodasTeclas = new Map();

    if (dicRelacaoTeclaNotas.has(teclaPressionada)) {//verifica se tecla digitada corresponde a uma nota musical
        dicRelacaoTodasTeclas = dicRelacaoTeclaNotas;
    } else if (dicRelacaoTeclaNotasPretas.has(teclaPressionada)) {
        dicRelacaoTodasTeclas = dicRelacaoTeclaNotasPretas;
    }

    console.log(dicRelacaoTodasTeclas);

    if (dicRelacaoTodasTeclas.size > 0) {

        const notaMusical = dicRelacaoTodasTeclas.get(teclaPressionada);
        const btnNota = document.querySelector(`.${notaMusical}`);
        const idAudio = `#som_${notaMusical}`; //template string/interpolação

        tocarSomNota(idAudio);
        btnNota.classList.add('ativa'); //destaca de azul

        console.log(`evento.code: ${evento.code} - idAdudio: ${idAudio} - notaMusical: ${notaMusical} - btnNOta: ${btnNota}`);
    }
}

onkeyup = function (evento) {

    const teclaPressionada = evento.key.toUpperCase();

    let dicRelacaoTodasTeclas = new Map();

    if (dicRelacaoTeclaNotas.has(teclaPressionada)) {
        dicRelacaoTodasTeclas = dicRelacaoTeclaNotas;
    } else if (dicRelacaoTeclaNotasPretas.has(teclaPressionada)) {
        dicRelacaoTodasTeclas = dicRelacaoTeclaNotasPretas;
    }

    if (dicRelacaoTodasTeclas.size > 0) {
        const notaMusical = dicRelacaoTodasTeclas.get(teclaPressionada);
        const btnNota = document.querySelector(`.${notaMusical}`);

        btnNota.classList.remove('ativa'); //remove destaque 

        console.log(`evento.code: ${evento.code} - notaMusical: ${notaMusical} - btnNota: ${btnNota}`);
    }
}

onclick = function (evento) {

    const teclaNotaClick = evento.srcElement.classList[1]
    const teclaTecladoClick = document.querySelector(`.${teclaNotaClick}`).textContent;

    let dicRelacaoTodasTeclas = new Map();

    if (dicRelacaoTeclaNotas.has(teclaTecladoClick)) {
        dicRelacaoTodasTeclas = dicRelacaoTeclaNotas;
    } else if (dicRelacaoTeclaNotasPretas.has(teclaTecladoClick)) {
        dicRelacaoTodasTeclas = dicRelacaoTeclaNotasPretas;
    }

    if (dicRelacaoTodasTeclas.size > 0) {
        const notaMusical = dicRelacaoTodasTeclas.get(teclaTecladoClick);
        const btnNota = document.querySelector(`.${notaMusical}`);
        const idAudio = `#som_${notaMusical}`; 

        tocarSomNota(idAudio);
        btnNota.classList.remove('ativa'); //onclick ja vem com ativação automatica, remover pra n ficar ativo sempre

        console.log(`evento.code: ${evento.code} - idAdudio: ${idAudio} - notaMusical: ${notaMusical} - btnNOta: ${btnNota}`);
    }
}