document.addEventListener("DOMContentLoaded", () => {

  /* ======================
     ELEMENTOS
  ====================== */
  const tipoMissao = document.getElementById("tipoMissao");

  const forms = {
    capital: document.getElementById("formCapital"),
    interior: document.getElementById("formInterior"),
    fora: document.getElementById("formFora")
  };

  const passagemEl = document.getElementById("passagem");
  const apos22El = document.getElementById("apos22");
  const campoUberEl = document.getElementById("campoUber");
  const uberEl = document.getElementById("uberSimulado");

  const btnCalcular = document.getElementById("btnCalcular");

  const bannerNoturnoEl = document.getElementById("bannerNoturno");
  const textoBaseEl = document.getElementById("textoBase");
  const resultadoFinalEl = document.getElementById("resultadoFinal");

  /* ======================
     CONTROLE DE TELAS
  ====================== */
  function esconderForms() {
    Object.values(forms).forEach(f => f.style.display = "none");
  }

  tipoMissao.addEventListener("change", () => {
    esconderForms();
    if (forms[tipoMissao.value]) {
      forms[tipoMissao.value].style.display = "block";
    }
  });

  /* ======================
     VISIBILIDADE DO UBER
  ====================== */
  apos22El.addEventListener("change", () => {
    if (apos22El.value === "sim") {
      campoUberEl.style.display = "block";
    } else {
      campoUberEl.style.display = "none";
      uberEl.value = "";
    }
  });

  /* ======================
     REGRAS DE NEGÓCIO
  ====================== */
  function arredondar(valor) {
    return Math.ceil(valor);
  }

  function calcularBase(passagem) {
    return arredondar(passagem * 2 * 1.3);
  }

  /* ======================
     AÇÃO PRINCIPAL
  ====================== */
  btnCalcular.addEventListener("click", () => {

    bannerNoturnoEl.style.display = "block";
    textoBaseEl.innerText = "";
    resultadoFinalEl.innerText = "";

    const passagem = Number(passagemEl.value);
    if (!passagem) {
      textoBaseEl.innerText =
        "⚠️ Informe o valor da passagem para calcular a missão.";
      return;
    }

    const base = calcularBase(passagem);

    textoBaseEl.innerText =
      `Valor base recomendado (ida e volta + 30%): R$ ${base}`;

    if (apos22El.value === "sim") {
      const uber = Number(uberEl.value) || 0;
      const total = arredondar(base + uber);

      resultadoFinalEl.innerText =
        `Valor final recomendado (com Uber): R$ ${total}`;
    } else {
      resultadoFinalEl.innerText =
        `Valor final recomendado: R$ ${base}`;
    }
  });

});
