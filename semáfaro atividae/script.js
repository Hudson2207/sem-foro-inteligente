// Pergunta o nome do usuário ao iniciar
let nomeUsuario = prompt("Digite seu nome:");
document.getElementById("boasVindas").textContent = `Olá, ${nomeUsuario}! Bem-vindo ao simulador.`;

// Seletores das luzes e elementos
const luzes = {
  vermelho: document.getElementById("vermelho"),
  amarelo: document.getElementById("amarelo"),
  verde: document.getElementById("verde")
};

const contador = document.getElementById("contador");
const mensagem = document.getElementById("mensagem");
const botaoPedestre = document.getElementById("botaoPedestre");

let faseAtual = 0;
let pedestreSolicitou = false;

// Fases do semáforo com tempo
const fases = [
  { cor: "verde", tempo: 5 },
  { cor: "amarelo", tempo: 2 },
  { cor: "vermelho", tempo: 5 },
];

// Acende a luz correta e apaga as outras
function acenderLuz(cor) {
  for (let acend in luzes) {
    luzes[acend].classList.remove("ativo");
  }
  luzes[cor].classList.add("ativo");
}

// Inicia o ciclo normal
function iniciarCiclo() {
  const fase = fases[faseAtual];
  acenderLuz(fase.cor);
  mensagem.textContent = `Luz ${fase.cor.toUpperCase()}`;

  iniciarContador(fase.tempo, () => {
    if (fase.cor === "verde" && pedestreSolicitou) {
      iniciarTravessiaPedestre();
    } else {
      faseAtual = (faseAtual + 1) % fases.length;
      iniciarCiclo();
    }
  });
}

// Contagem regressiva visual
function iniciarContador(tempo, callback) {
  contador.textContent = tempo;
  let intervalo = setInterval(() => {
    tempo--;
    contador.textContent = tempo;
    if (tempo <= 0) {
      clearInterval(intervalo);
      callback();
    }
  }, 1000);
}

// Travessia de pedestre
function iniciarTravessiaPedestre() {
  acenderLuz("vermelho"); // Carros param
  mensagem.textContent = `${nomeUsuario}, você pode atravessar!`;
  let tempo = 5;
  contador.textContent = tempo;

  const intervalo = setInterval(() => {
    tempo--;
    contador.textContent = tempo;
    if (tempo <= 0) {
      clearInterval(intervalo);
      pedestreSolicitou = false;
      mensagem.textContent = "Aguardando...";
      faseAtual = 0;
      iniciarCiclo();
    }
  }, 1000);
}

// Evento de clique no botão
botaoPedestre.addEventListener("click", () => {
  pedestreSolicitou = true;
  mensagem.textContent = `${nomeUsuario} solicitou travessia. Aguarde...`;
});

// Inicia ciclo automático ao abrir
iniciarCiclo();