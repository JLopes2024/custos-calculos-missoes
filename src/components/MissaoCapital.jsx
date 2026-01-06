import React, { useState } from "react";

const MissaoCapital = () => {
  const [qtd, setQtd] = useState(2);
  const [domingo, setDomingo] = useState("nao");
  const [tipoPassagem, setTipoPassagem] = useState("");
  const [apos22, setApos22] = useState("nao");
  const [valorUber, setValorUber] = useState("");
  const [resultado, setResultado] = useState(null);
  const [usouUber, setUsouUber] = useState(false);

  const arredondar = (v) => Math.ceil(v);

  const calcularTarifa = (tipo, valor) => {
    if (domingo === "sim") {
      if (tipo === "onibus") return 0;
      if (tipo === "integracao") return 5.4; // somente metrô
    }
    return valor;
  };

  const handleCalcular = () => {
    if (!qtd || qtd < 1) {
      setResultado("⚠️ Informe a quantidade de missionários.");
      return;
    }

    if (!tipoPassagem) {
      setResultado("⚠️ Selecione o tipo de passagem.");
      return;
    }

    const [tipo, valorStr] = tipoPassagem.split("|");
    const valorOriginal = Number(valorStr);

    const tarifaAplicada = calcularTarifa(tipo, valorOriginal);
    let base = arredondar(tarifaAplicada * 2 * 1.3 * qtd);

    let total = base;
    let uberAplicado = false;

    if (apos22 === "sim") {
      const uber = Number(valorUber);
      if (!uber || uber <= 0) {
        setResultado("⚠️ Informe o valor do Uber para finalizar o cálculo.");
        return;
      }
      total = arredondar(base + uber * 1.15);
      uberAplicado = true;
    }

    setUsouUber(uberAplicado);

    setResultado({
      base,
      total,
      tarifaAplicada,
      tipo,
    });
  };

  const handleCopiar = () => {
    if (!resultado) return;

    const texto = `
📌 *Missão na Capital*

👥 Missionários: ${qtd}
📅 Domingo: ${domingo === "sim" ? "Sim" : "Não"}

🚍 Transporte: ${
      tipoPassagem.split("|")[0] === "onibus"
        ? "Ônibus"
        : tipoPassagem.split("|")[0] === "metro"
        ? "Metrô"
        : "Integração Ônibus + Metrô"
    }
Tarifa aplicada: R$ ${resultado.tarifaAplicada.toFixed(2)}

> ${
      resultado.base === 0
        ? "Missão no domingo com deslocamento exclusivo por ônibus."
        : `Valor base (ida e volta + 30%): R$ ${resultado.base}`
    }

${usouUber ? "🚕 Uber aplicado (volta após as 22h)" : "🚶 Sem uso de Uber"}

💰 Valor final recomendado: R$ ${resultado.total}
Valor por missionário: R$ ${arredondar(resultado.total / qtd)}
`.trim();

    navigator.clipboard.writeText(texto);
    alert("Resumo copiado!");
  };

  return (
    <div>
        <h4>Missão na Capital</h4>
      <label>Quantidade de missionários</label>
      <input
        type="number"
        min="1"
        value={qtd}
        onChange={(e) => setQtd(Number(e.target.value))}
      />

      <label>Missão ocorre no domingo?</label>
      <select value={domingo} onChange={(e) => setDomingo(e.target.value)}>
        <option value="nao">Não</option>
        <option value="sim">Sim</option>
      </select>
      {domingo === "sim" && (
        <p style={{ color: "green" }}>
          Domingo: ônibus é gratuito. Integrações cobram apenas o metrô.
        </p>
      )}

      <label>Tipo de passagem</label>
      <select value={tipoPassagem} onChange={(e) => setTipoPassagem(e.target.value)}>
        <option value="">Selecione</option>
        <option value="onibus|5.30">Ônibus — R$ 5,30</option>
        <option value="metro|5.40">Metrô — R$ 5,40</option>
        <option value="integracao|9.38">Integração Ônibus + Metrô — R$ 9,38</option>
      </select>

      <label>A missão termina após as 22h?</label>
      <select value={apos22} onChange={(e) => setApos22(e.target.value)}>
        <option value="nao">Não</option>
        <option value="sim">Sim</option>
      </select>

      {apos22 === "sim" && (
        <div>
          <label>Simulação de Uber (R$)</label>
          <input
            type="number"
            value={valorUber}
            onChange={(e) => setValorUber(e.target.value)}
            placeholder="Ex: 28"
          />
        </div>
      )}

      <button onClick={handleCalcular}>Calcular missão</button>

      {resultado && (
        <div style={{ marginTop: "15px", border: "1px solid #ccc", padding: "10px" }}>
          {typeof resultado === "string" ? (
            <p>{resultado}</p>
          ) : (
            <>
              <p><b>Tarifa unitária aplicada por missionário:</b> R$ {resultado.tarifaAplicada.toFixed(2)}</p>
              <p>
                {resultado.base === 0
                  ? "Missão no domingo com deslocamento exclusivo por ônibus."
                  : `Valor base geral (ida e volta + 30%): R$ ${resultado.base}`}
              </p>
              <p>💰 Valor final recomendado: R$ {resultado.total}</p>
              <p>{usouUber ? "🚕 Uber aplicado (volta após 22h)" : "🚶 Sem uso de Uber"}</p>
              <button onClick={handleCopiar}>Copiar resumo</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MissaoCapital;
