document.addEventListener("DOMContentLoaded", () => {

  const tipoMissao = document.getElementById("tipoMissao");
  const forms = {
    capital: document.getElementById("formCapital"),
    interior: document.getElementById("formInterior"),
    fora: document.getElementById("formFora")
  };

  const qtdEl = document.getElementById("qtdMissionarios");
  const domingoEl = document.getElementById("domingo");
  const tipoPassagemEl = document.getElementById("tipoPassagem");
  const apos22El = document.getElementById("apos22");
  const campoUberEl = document.getElementById("campoUber");
  const uberEl = document.getElementById("uberSimulado");

  const hintDomingo = document.getElementById("hintDomingo");

  const btnCalcular = document.getElementById("btnCalcular");
  const btnCopiar = document.getElementById("btnCopiar");

  const banner = document.getElementById("bannerResultado");
  const infoTarifa = document.getElementById("infoTarifa");
  const textoBase = document.getElementById("textoBase");
  const valorPorPessoa = document.getElementById("valorPorPessoa");
  const resultadoFinal = document.getElementById("resultadoFinal");

  const arredondar = v => Math.ceil(v);

  /* ===============================
     CONTROLE DE FORMULÁRIOS
     =============================== */
  tipoMissao.addEventListener("change", () => {
    Object.values(forms).forEach(f => f.style.display = "none");
    if (forms[tipoMissao.value]) forms[tipoMissao.value].style.display = "block";
  });

  domingoEl.addEventListener("change", () => {
    hintDomingo.innerText =
      domingoEl.value === "sim"
        ? "Domingo: ônibus é gratuito. Integrações cobram apenas o metrô."
        : "";
  });

  apos22El.addEventListener("change", () => {
    campoUberEl.style.display = apos22El.value === "sim" ? "block" : "none";
    if (apos22El.value === "nao") uberEl.value = "";
  });

  /* ===============================
     REGRAS DE TARIFA
     =============================== */
  function calcularTarifa(tipo, valor, domingo) {
    if (domingo === "sim") {
      if (tipo === "onibus") return 0;
      if (tipo === "integracao") return 5.40;
    }
    return valor;
  }

  /* ===============================
     CÁLCULO PRINCIPAL
     =============================== */
  btnCalcular.addEventListener("click", () => {

    banner.style.display = "block";
    infoTarifa.innerText = "";
    textoBase.innerText = "";
    valorPorPessoa.innerText = "";
    resultadoFinal.innerText = "";

    const qtd = Number(qtdEl.value);
    if (!qtd || qtd < 1) {
      textoBase.innerText = "⚠️ Informe a quantidade de missionários.";
      return;
    }

    if (!tipoPassagemEl.value) {
      textoBase.innerText = "⚠️ Selecione o tipo de passagem.";
      return;
    }

    const domingo = domingoEl.value;
    const [tipo, valorStr] = tipoPassagemEl.value.split("|");
    const valorOriginal = Number(valorStr);

    const tarifaAplicada = calcularTarifa(tipo, valorOriginal, domingo);
    const base = arredondar(tarifaAplicada * 2 * 1.3 * qtd);

    infoTarifa.innerText = `Tarifa aplicada: R$ ${tarifaAplicada.toFixed(2)}`;

    textoBase.innerText =
      base === 0
        ? "Missão no domingo com deslocamento exclusivo por ônibus."
        : `Valor base (ida e volta + 30%): R$ ${base}`;

    let total = base;

    if (apos22El.value === "sim") {
      const uber = Number(uberEl.value);
      if (!uber || uber <= 0) {
        resultadoFinal.innerText =
          "⚠️ Informe o valor do Uber para finalizar o cálculo.";
        return;
      }
      total = arredondar(base + uber * 1.15);
    }

    valorPorPessoa.innerText =
      `Valor por missionário: R$ ${arredondar(total / qtd)}`;

    resultadoFinal.innerText =
      `Valor final recomendado: R$ ${total}`;
  });

  /* ===============================
     COPIAR RESUMO (WHATSAPP)
     =============================== */
  btnCopiar.addEventListener("click", () => {

    if (!resultadoFinal.innerText) {
      alert("Calcule a missão antes de copiar.");
      return;
    }

    const usouUber =
      apos22El.value === "sim" && Number(uberEl.value) > 0;

    const texto = `
📌 *Missão na Capital*

👥 Missionários: ${qtdEl.value}
📅 Domingo: ${domingoEl.value === "sim" ? "Sim" : "Não"}

🚍 Transporte: ${tipoPassagemEl.options[tipoPassagemEl.selectedIndex].text}
${infoTarifa.innerText}

${textoBase.innerText}

${resultadoFinal.innerText}
${valorPorPessoa.innerText}

${usouUber ? "🚕 Uber aplicado -> *volta após às 22h*" : "🚶 Sem uso de Uber"}

`.trim();

    navigator.clipboard.writeText(texto);

    btnCopiar.innerText = "Resumo copiado!";
    setTimeout(() => btnCopiar.innerText = "Copiar resumo", 1500);
  });

});
