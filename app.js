let numeroMaximo = 5000;
let numeroSecreto;
let tentativas;

const inputChute = document.getElementById("inputChute");
const btnChutar = document.getElementById("btnChutar");
const btnReiniciar = document.getElementById("btnReiniciar");
const mensagem = document.getElementById("mensagem");

// Função para iniciar ou reiniciar o jogo
function iniciarJogo() {
    numeroSecreto = Math.floor(Math.random() * numeroMaximo) + 1;
    tentativas = 0;
    mensagem.textContent = "";
    inputChute.value = "";
    inputChute.disabled = false;
    btnChutar.disabled = false;
    btnReiniciar.classList.add("hidden");
    console.log("Número secreto:", numeroSecreto); // para debug
}

// Verifica o chute
btnChutar.addEventListener("click", () => {
    let chute = parseInt(inputChute.value);
    tentativas++;

    if (isNaN(chute) || chute < 1 || chute > numeroMaximo) {
        mensagem.textContent = `⚠️ Digite um número válido entre 1 e ${numeroMaximo}`;
        return;
    }

    if (chute === numeroSecreto) {
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        mensagem.textContent = `🎉 Isso aí! Você descobriu o número secreto ${numeroSecreto} com ${tentativas} ${palavraTentativa}.`;
        btnChutar.disabled = true;
        inputChute.disabled = true;
        btnReiniciar.classList.remove("hidden");
    } else if (chute > numeroSecreto) {
        mensagem.textContent = `🔽 O número secreto é menor que ${chute}`;
    } else {
        mensagem.textContent = `🔼 O número secreto é maior que ${chute}`;
    }

    inputChute.value = "";
    inputChute.focus();
});

// Reinicia ao clicar em "Jogar novamente"
btnReiniciar.addEventListener("click", iniciarJogo);

// Inicia na primeira vez
iniciarJogo();
