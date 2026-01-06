import React, { useState } from "react";
import Menu from "./components/Menu";
import Capital from "./components/MissaoCapital";
import InteriorSP from "./components/MissaoInterior";
import ForaSP from "./components/MissaoFora";

function App() {
  const sections = [
    { key: "capital", label: "Capital" },
    { key: "interior", label: "Interior SP" },
    { key: "fora", label: "Fora de SP" },
  ];

  const [activeSection, setActiveSection] = useState("capital");

  return (
    <div className="App">
      <header>
        <h1>Missão SP</h1>
        <p>Calculadora inteligente de custos</p>
      </header>

      <Menu
        sections={sections}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main>
        {activeSection === "capital" && <Capital />}
        {activeSection === "interior" && <InteriorSP />}
        {activeSection === "fora" && <ForaSP />}
      </main>
    </div>
  );
}

export default App;
