const comecarContagem = document.getElementById('start-pause');
const cardBotoes = document.querySelector('.app__card-list');
const DomMusica = document.querySelector('.toggle-checkbox');
const timer = document.querySelector('.app__card-timer');
const Texto = document.querySelector('.app__title');
const img = document.querySelector('.app__image');
const html = document.querySelector('html');
const musica = new Audio("sons/luna-rise-part-one.mp3");
const alertaPause = new Audio("sons/pause.mp3");
const alertaPlay = new Audio("sons/play.wav");
const alertaFim = new Audio("sons/beep.mp3");
let estadoPLay = false;
let intervalo;
let contador;
const ativadorDeEventos = {
    foco : false,
    curto : false,
    longo : false,
}
DomMusica.addEventListener('change', function (e) {
    if (e.target.checked){
        musica.play();
        musica.loop = true;
    }
    else{
        musica.pause();
    }
});
cardBotoes.addEventListener('click', function(e){
    html.setAttribute('data-contexto', e.target.attributes[0].value);
    img.setAttribute('src', `imagens/${e.target.attributes[0].value}.png`);
    if(e.target.attributes[0].value === "foco"){
        contador = 1500;
        mostrarTempo(contador);
        Texto.innerHTML = `
        Otimize sua produtividade,<br>
        <strong class="app__title-strong">mergulhe no que importa.</strong>`
        ativarEventoUnico("foco");
    }
    else if(e.target.attributes[0].value === "descanso-curto"){
        contador = 300;
        mostrarTempo(contador);
        Texto.innerHTML = `
        Que tal dar uma respirada?<br>
        <strong class="app__title-strong">Faça uma pausa curta!</strong>`
        ativarEventoUnico("curto");
    }
    else if(e.target.attributes[0].value === "descanso-longo"){
        contador = 900;
        mostrarTempo(contador);
        Texto.innerHTML = `
        Hora de voltar à superfície,<br>
        <strong class="app__title-strong">Faça uma pausa longa.</strong>`
        ativarEventoUnico("longo");
    }
});
comecarContagem.addEventListener('click', function(){
    if(ativadorDeEventos.foco === false && ativadorDeEventos.curto === false &&ativadorDeEventos.longo === false){
            alert("Escolhar um modo para iniciar");
    }
    else{
        if(estadoPLay === false){
            alertaPlay.play();
            intervalo = setInterval(decrementarContador, 1000);
            estadoPLay = true;
            document.getElementById('start-pause').innerHTML = `<img class="app__card-primary-butto-icon" src="imagens/pause.png" alt="">
            <span>Pausar</span>`
        }
        else{
            document.getElementById('start-pause').innerHTML = `<img class="app__card-primary-butto-icon" src="imagens/play_arrow.png" alt="">
            <span>Continuar</span>`
            alertaPause.play();
            zerar();
            estadoPLay = false;
        }
    }
});
function ativarEventoUnico(valor){
    Object.keys(ativadorDeEventos).forEach(function(chave){
        if(chave === valor){
            ativadorDeEventos[chave] = true;
        }
        else{
            ativadorDeEventos[chave] = false;
        }
    });
    Object.keys(ativadorDeEventos).forEach(function(chave){
        if(ativadorDeEventos[chave] === true){
            document.getElementsByClassName(`app__card-button--${chave}`)[0].classList.add("active");
        }
        else{
            document.getElementsByClassName(`app__card-button--${chave}`)[0].classList.remove("active");
        }
    });
}
function mostrarTempo(contador){
    const tempo = new Date(contador*1000);
    const tempoformatado = tempo.toLocaleTimeString("pt-Br", {minute: "2-digit", second: "2-digit"});
    timer.innerHTML = tempoformatado;
}
const decrementarContador = function(){
    if(contador <= 0){
        alertaFim.play();
        alert("Tempo esgotado!");
        zerar();
        return;
    }
    contador -= 1;
    mostrarTempo(contador);
}   
function zerar(){
    clearInterval(intervalo);
    intervalo = null;
}


