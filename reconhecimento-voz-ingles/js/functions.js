var engine = {
    "cores":['green','purple','pink', 'red', 'yellow','orange','grey','black'],
    "hexadecimais":{
        'green':'#02ef00',
        'purple':'#790093',
        'pink':'#f02a7e',
        'red':'#e90808',
        'yellow':'#e7d703',
        'orange':'#f16529',
        'grey':'#ebebeb',
        'black':'#141414',

    },
    "moedas":0
}

const audioMoeda = new Audio('audio/audio_moeda.mp3');
const audioErrou = new Audio('audio/audio_errou.mp3');

function sortearCor(){
    var indexCorSorteada = Math.floor(Math.random()*engine.cores.length);
    var legendaCorDaCaixa = document.getElementById('cor-na-caixa');
    var nomeCorSorteada = engine.cores[indexCorSorteada];

    legendaCorDaCaixa.innerText = nomeCorSorteada.toUpperCase();
    return engine.hexadecimais[nomeCorSorteada];
}

function aplicarCorNaCaixa(nomeDaCor){
    var caixaDasCores = document.getElementById('cor-atual');
    caixaDasCores.style.backgroundColor=nomeDaCor;
    caixaDasCores.style.backgroundImage="url('./img/caixa-fechada.png')";
    caixaDasCores.style.backgroundSize='100%';

}

function atualizaPontuacao(valor){
    var pontuacao = document.getElementById('pontuacao-atual');
    engine.moedas += valor;

    if(valor<0){
        audioErrou.play();
    }else{
        audioMoeda.play();
    }

    pontuacao.innerText = engine.moedas;
}

aplicarCorNaCaixa(sortearCor())

// API DE RECONHECIMENTO DE VOZ

var btnGravador = document.getElementById("btn-responder");
var transcricaoAudio ="";
var respostaCorreta = "";

// Guardar speech na variavel, tanto se tiver uma ou outra, para poder utilizar
if(window.SpeechRecognition || window.webkitSpeechRecognition){
    var SpeechAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    var gravador = new SpeechAPI();

    gravador.continuos = false;
    gravador.lang = "en-US";



    gravador.onstart = function(){
        btnGravador.innerText="estou ouvindo";
        
        btnGravador.style.backgroundColor="white";
        btnGravador.style.color="black";
    }
    gravador.onend = function(){
        btnGravador.innerText="Responder";
        
        btnGravador.style.backgroundColor="transparent";
        btnGravador.style.color="white";

    }

    gravador.onresult=function(event){
        transcricaoAudio = event.results[0][0].transcript.toUpperCase();
        respostaCorreta = document.getElementById('cor-na-caixa').innerText.toUpperCase();

        console.log(transcricaoAudio);

        if(transcricaoAudio===respostaCorreta){
            atualizaPontuacao(1);
        }else{
            atualizaPontuacao(-1);
        }


        aplicarCorNaCaixa(sortearCor());
    }


}else{
    alert('nao tem suporte');
}


btnGravador.addEventListener('click', function(e){
    gravador.start();
})










