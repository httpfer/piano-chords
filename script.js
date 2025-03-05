// Lista de notas na escala cromática (12 notas)
const notasCromaticas = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const notasEnharmonicas = {
    "Bb": "A#",
    "Db": "C#",
    "Eb": "D#",
    "Gb": "F#",
    "Ab": "G#"
};

// Dicionário com as fórmulas dos acordes
const formulasAcordes = {
    "maior": [0, 4, 7], "menor": [0, 3, 7], "7": [0, 4, 7, 10],
    "m7": [0, 3, 7, 10], "maj7": [0, 4, 7, 11], "dim": [0, 3, 6],
    "m7b5": [0, 3, 6, 10], "sus2": [0, 2, 7], "sus4": [0, 5, 7], "aug": [0, 4, 8],
    "9": [0, 4, 7, 10, 14], "m9": [0, 3, 7, 10, 14]
};

// Função para obter as notas do acorde
function obterNotasAcorde(notaFundamental, tipoAcorde) {
    let indiceNota = notasCromaticas.indexOf(notaFundamental);

    if (indiceNota === -1) return null; // Nota não encontrada

    let intervalos = formulasAcordes[tipoAcorde];

    if (!intervalos) return null; // Tipo de acorde não encontrado

    return intervalos.map(i => notasCromaticas[(indiceNota + i) % 12]);
}

// Função para calcular o acorde
function calcularAcorde() {
    let entrada = document.getElementById("acordeInput").value.trim().toUpperCase();
    let resultadoDiv = document.getElementById("acordeResultado");

    if (!entrada) {
        resultadoDiv.innerHTML = "Por favor, insira um acorde válido!";
        return;
    }

    let notaFundamental, tipoAcorde;

    if (entrada.length > 1 && entrada[1] === '#') {
        notaFundamental = entrada.substring(0, 2);
        tipoAcorde = entrada.substring(2) || "maior";
    } else {
        notaFundamental = entrada.charAt(0);
        tipoAcorde = entrada.substring(1) || "maior";
    }

    // Verifica se a nota fundamental é válida
    if (!notasCromaticas.includes(notaFundamental) && !notasEnharmonicas[notaFundamental]) {
        resultadoDiv.innerHTML = "Nota fundamental inválida. Use notas como C, C#, D, etc.";
        return;
    }

    // Substitui enharmônicos, se necessário
    if (notasEnharmonicas[notaFundamental]) {
        notaFundamental = notasEnharmonicas[notaFundamental];
    }

    // Verifica se o tipo de acorde é válido
    if (!formulasAcordes[tipoAcorde.toLowerCase()]) {
        resultadoDiv.innerHTML = "Tipo de acorde inválido. Use tipos como 'm', '7', 'maj7', etc.";
        return;
    }

    let notasDoAcorde = obterNotasAcorde(notaFundamental, tipoAcorde.toLowerCase());

    if (notasDoAcorde) {
        resultadoDiv.innerHTML = `Notas do acorde <strong>${entrada}</strong>: ${notasDoAcorde.join(', ')}`;
    } else {
        resultadoDiv.innerHTML = "Acorde inválido.";
    }
}

// Adicionando evento ao botão
document.getElementById("btnCalcular").addEventListener("click", calcularAcorde);

// Função para adicionar notas ao input via teclado virtual
document.querySelectorAll(".nota").forEach(button => {
    button.addEventListener("click", function () {
        let acordeInput = document.getElementById("acordeInput");
        acordeInput.value += this.dataset.nota; // Adiciona a nota ao input
    });
});
