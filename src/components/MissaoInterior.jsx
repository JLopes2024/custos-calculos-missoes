import React, { useState } from "react";

const MissaoInterior = () => {
  const [qtd, setQtd] = useState(1);
  const [transporte, setTransporte] = useState("");
  const [passagem, setPassagem] = useState("");
  const [litroGasolina, setLitroGasolina] = useState("");
  const [consumoCarro, setConsumoCarro] = useState(""); // km/l
  const [distancia, setDistancia] = useState(""); // km
  const [pedagio, setPedagio] = useState("");
  const [aluguel, setAluguel] = useState("");
  const [horas, setHoras] = useState("");
  const [resultado, setResultado] = useState(null);
  const [detalhes, setDetalhes] = useState("");

  const arredondar = (v) => Math.ceil(v);

  const calcular = () => {
    let total = 0;
    const blocos3h = Math.ceil(horas / 3);
    let detalhesCalc = "";

    if (!qtd || qtd < 1) return setResultado("⚠️ Informe a quantidade de missionários.");
    if (!horas || horas < 1) return setResultado("⚠️ Informe a quantidade de horas de deslocamento.");
    if (!transporte) return setResultado("⚠️ Selecione o meio de transporte.");

    // ===================== ÔNIBUS =====================
    if (transporte === "onibus") {
      if (!passagem || passagem <= 0) return setResultado("⚠️ Informe o valor da passagem.");
      const passagemTotal = passagem * 2 * qtd;
      const alimentacao = 50 * blocos3h * qtd;
      total = passagemTotal + alimentacao;

      detalhesCalc = `
      💵 Passagem (ida e volta): R$ ${passagemTotal.toFixed(2)}
      🍽️ Alimentação: R$ ${alimentacao.toFixed(2)} (${blocos3h} blocos de 3h x 50 por missionário)
      `;
    }

    // ===================== CARRO PRÓPRIO =====================
    if (transporte === "carro_proprio") {
      if (!litroGasolina || !consumoCarro || !distancia) return setResultado("⚠️ Informe litro, consumo e distância.");
      if (pedagio === "") return setResultado("⚠️ Informe o valor do pedágio.");

      const litrosNecessarios = distancia / consumoCarro;
      const custoGasolina = litrosNecessarios * litroGasolina;
      const custoCarro = 100 * blocos3h;
      const alimentacao = qtd * 50 * blocos3h;

      total = custoGasolina + Number(pedagio) + custoCarro + alimentacao;

      detalhesCalc = `
      ⛽ Gasolina: R$ ${custoGasolina.toFixed(2)} (${litrosNecessarios.toFixed(2)}L x R$${litroGasolina}/L)
      🛣️ Pedágio: R$ ${Number(pedagio).toFixed(2)}
      🚗 Custos do carro: R$ ${custoCarro.toFixed(2)} (${blocos3h} blocos de 3h x R$100)
      🍽️ Alimentação: R$ ${alimentacao.toFixed(2)} (${blocos3h} blocos de 3h x R$50 por missionário)
      `;
    }

    // ===================== CARRO ALUGADO =====================
    if (transporte === "carro_alugado") {
      if (!aluguel || aluguel <= 0) return setResultado("⚠️ Informe o valor do aluguel.");
      const alimentacao = 50 * blocos3h * qtd;
      total = Number(aluguel) + alimentacao;

      detalhesCalc = `
      🚗 Aluguel do carro: R$ ${Number(aluguel).toFixed(2)}
      🍽️ Alimentação: R$ ${alimentacao.toFixed(2)} (${blocos3h} blocos de 3h x R$50 por missionário)
      `;
    }

    total = arredondar(total);
    setDetalhes(detalhesCalc);
    setResultado(total);
  };

  return (
    <div>
      <label>Quantidade de missionários</label>
      <input type="number" min="1" value={qtd} onChange={(e) => setQtd(Number(e.target.value))} />

      <label>Meio de transporte</label>
      <select value={transporte} onChange={(e) => setTransporte(e.target.value)}>
        <option value="">Selecione</option>
        <option value="onibus">Ônibus</option>
        <option value="carro_proprio">Carro próprio</option>
        <option value="carro_alugado">Carro alugado</option>
      </select>

      {/* ÔNIBUS */}
      {transporte === "onibus" && (
        <div>
          <label>Valor da passagem (ida)</label>
          <input type="number" value={passagem} onChange={(e) => setPassagem(Number(e.target.value))} />
          <p>Passagem ida e volta + R$50 por missionário a cada 3h</p>
        </div>
      )}

      {/* CARRO PRÓPRIO */}
      {transporte === "carro_proprio" && (
        <div>
          <label>Preço do litro da gasolina (R$)</label>
          <input type="number" value={litroGasolina} onChange={(e) => setLitroGasolina(Number(e.target.value))} />

          <label>Consumo do carro (km/l)</label>
          <input type="number" value={consumoCarro} onChange={(e) => setConsumoCarro(Number(e.target.value))} />

          <label>Distância da missão (km)</label>
          <input type="number" value={distancia} onChange={(e) => setDistancia(Number(e.target.value))} />

          <label>Valor total do pedágio (R$)</label>
          <input type="number" value={pedagio} onChange={(e) => setPedagio(Number(e.target.value))} />

          <p>Gasolina + pedágio + R$100 por bloco de 3h do carro + R$50 por missionário a cada bloco de 3h</p>
        </div>
      )}

      {/* CARRO ALUGADO */}
      {transporte === "carro_alugado" && (
        <div>
          <label>Valor do aluguel do carro (R$)</label>
          <input type="number" value={aluguel} onChange={(e) => setAluguel(Number(e.target.value))} />
          <p>Aluguel + R$50 por missionário a cada 3h de deslocamento</p>
        </div>
      )}

      <label>Horas totais de deslocamento</label>
      <input type="number" value={horas} onChange={(e) => setHoras(Number(e.target.value))} />

      <button onClick={calcular} style={{ marginTop: "10px" }}>Calcular missão</button>

      {resultado !== null && (
        <div style={{ marginTop: "15px", border: "1px solid #ccc", padding: "10px" }}>
          {typeof resultado === "string" ? (
            <p>{resultado}</p>
          ) : (
            <>
              <p>💰 Valor final recomendado: R$ {resultado}</p>
              <div style={{ marginTop: "10px", background: "#f9f9f9", padding: "10px", borderRadius: "5px" }}>
                <h4>📝 Detalhes do cálculo</h4>
                <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>{detalhes}</pre>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MissaoInterior;
