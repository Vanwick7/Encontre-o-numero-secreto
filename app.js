// Configuração inicial do jogo
const numeroMaximo = 5000;
let numeroSecreto;
let tentativas = 0;

// Elementos do DOM
const inputChute = document.getElementById("inputChute");
const btnChutar = document.getElementById("btnChutar");
const btnReiniciar = document.getElementById("btnReiniciar");
const mensagem = document.getElementById("mensagem");

// Sons (adicione os arquivos .mp3 na mesma pasta ou ajuste o caminho)
const somAcerto = new Audio("acerto.mp3");
const somErro = new Audio("erro.mp3");

// Função para gerar número secreto
function gerarNumeroSecreto() {
    return Math.floor(Math.random() * numeroMaximo) + 1;
}

// Função para resetar o jogo
function resetarJogo() {
    numeroSecreto = gerarNumeroSecreto();
    tentativas = 0;
    mensagem.textContent = "";
    mensagem.classList.remove("maior", "menor", "acertou", "flash");
    inputChute.value = "";
    inputChute.disabled = false;
    btnChutar.disabled = false;
    btnReiniciar.classList.add("hidden");
    inputChute.focus();
    console.log("Número secreto:", numeroSecreto); // debug
}

// Função para animação visual
function animarResultado(tipo) {
    mensagem.classList.remove("maior", "menor", "acertou", "flash");
    void mensagem.offsetWidth; // Reinicia animação
    mensagem.classList.add(tipo);
}

// Função para processar o chute do usuário
function processarChute() {
    const chute = parseInt(inputChute.value);
    tentativas++;

    if (isNaN(chute) || chute < 1 || chute > numeroMaximo) {
        mensagem.textContent = `⚠️ Digite um número válido entre 1 e ${numeroMaximo}`;
        animarResultado("flash");
        somErro.play();
        return;
    }

    if (chute === numeroSecreto) {
        const palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        mensagem.textContent = `🎉 Parabéns! Você descobriu o número secreto ${numeroSecreto} em ${tentativas} ${palavraTentativa}.`;
        animarResultado("acertou");
        somAcerto.play();
        btnChutar.disabled = true;
        inputChute.disabled = true;
        btnReiniciar.classList.remove("hidden");
    } else if (chute > numeroSecreto) {
        mensagem.textContent = `🔽 O número secreto é menor que ${chute}`;
        animarResultado("menor");
        somErro.play();
    } else {
        mensagem.textContent = `🔼 O número secreto é maior que ${chute}`;
        animarResultado("maior");
        somErro.play();
    }

    inputChute.value = "";
    inputChute.focus();
}

// Event listeners
btnChutar.addEventListener("click", processarChute);
btnReiniciar.addEventListener("click", resetarJogo);

// Inicializa o jogo
resetarJogo();
