import React, { useState } from "react";

const MissaoInterior = () => {
  const [qtd, setQtd] = useState(1);
  const [transporte, setTransporte] = useState("");
  const [passagem, setPassagem] = useState("");
  const [gasolina, setGasolina] = useState("");
  const [pedagio, setPedagio] = useState("");
  const [aluguel, setAluguel] = useState("");
  const [horas, setHoras] = useState("");
  const [resultado, setResultado] = useState(null);

  const arredondar = (v) => Math.ceil(v);

  const calcular = () => {
    let total = 0;
    const blocos3h = Math.ceil(horas / 3);

    if (!qtd || qtd < 1) return setResultado("⚠️ Informe a quantidade de missionários.");
    if (!horas || horas < 1) return setResultado("⚠️ Informe a quantidade de horas.");
    if (!transporte) return setResultado("⚠️ Selecione o meio de transporte.");

    if (transporte === "onibus") {
      if (!passagem || passagem <= 0) return setResultado("⚠️ Informe o valor da passagem.");
      total = qtd * (passagem * 2 + 50 * blocos3h);
    }

    if (transporte === "carro_proprio") {
      if (gasolina === "" || pedagio === "") return setResultado("⚠️ Informe gasolina e pedágio.");
      total = Number(gasolina) + Number(pedagio) + 100 * horas * qtd;
    }

    if (transporte === "carro_alugado") {
      if (!aluguel || aluguel <= 0) return setResultado("⚠️ Informe o valor do aluguel.");
      total = Number(aluguel) + 50 * blocos3h * qtd;
    }

    total = arredondar(total);
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

      {transporte === "onibus" && (
        <div>
          <label>Valor da passagem (ida)</label>
          <input type="number" value={passagem} onChange={(e) => setPassagem(Number(e.target.value))} />
          <p>Passagem (ida e volta) + R$50 a cada 3h de deslocamento</p>
        </div>
      )}

      {transporte === "carro_proprio" && (
        <div>
          <label>Valor estimado de gasolina</label>
          <input type="number" value={gasolina} onChange={(e) => setGasolina(Number(e.target.value))} />
          <label>Valor total de pedágio</label>
          <input type="number" value={pedagio} onChange={(e) => setPedagio(Number(e.target.value))} />
          <p>Gasolina + pedágio + R$100 por hora de deslocamento</p>
        </div>
      )}

      {transporte === "carro_alugado" && (
        <div>
          <label>Valor do aluguel do carro</label>
          <input type="number" value={aluguel} onChange={(e) => setAluguel(Number(e.target.value))} />
          <p>Aluguel + R$50 a cada 3h de deslocamento</p>
        </div>
      )}

      <label>Horas totais de deslocamento</label>
      <input type="number" value={horas} onChange={(e) => setHoras(Number(e.target.value))} />

      <button onClick={calcular}>Calcular missão</button>

      {resultado && (
        <div style={{ marginTop: "15px", border: "1px solid #ccc", padding: "10px" }}>
          {typeof resultado === "string" ? (
            <p>{resultado}</p>
          ) : (
            <p>💰 Valor final recomendado: R$ {resultado}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MissaoInterior;
