document.addEventListener("DOMContentLoaded", () => {
  const seletor = document.getElementById("tipoMissao");

  const formCapital = document.getElementById("formCapital");
  const formInterior = document.getElementById("formInterior");
  const formFora = document.getElementById("formFora");

  function esconderTodos() {
    formCapital.style.display = "none";
    formInterior.style.display = "none";
    formFora.style.display = "none";
  }

  seletor.addEventListener("change", () => {
    esconderTodos();

    if (seletor.value === "capital") {
      formCapital.style.display = "block";
    }

    if (seletor.value === "interior") {
      formInterior.style.display = "block";
    }

    if (seletor.value === "fora") {
      formFora.style.display = "block";
    }
  });
});
