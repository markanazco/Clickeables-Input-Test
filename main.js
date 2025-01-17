// Importar las funciones necesarias de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAa1pblLdflZSmiHa8MRA6aG60m3eQ794c",
  authDomain: "clickeables-input-test.firebaseapp.com",
  databaseURL: "https://clickeables-input-test-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "clickeables-input-test",
  storageBucket: "clickeables-input-test.firebasestorage.app",
  messagingSenderId: "492155081550",
  appId: "1:492155081550:web:507d3ce268587629f0c41f"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Variables HTML
const rowsInput = document.getElementById("rows");
const columnsInput = document.getElementById("columns");
const bgColorInput = document.getElementById("bgColor");
const btnColorInput = document.getElementById("btnColor");
const generateGridBtn = document.getElementById("generateGrid");
const testSection = document.getElementById("testSection");
const buttonGrid = document.getElementById("buttonGrid");
const startTestBtn = document.getElementById("startTest");
const endTestBtn = document.getElementById("endTest");

// Variables de medición
let startTime = 0;
let clickCount = 0;
let changeCount = 0;
let lastClickTime = 0;
let inactiveTime = 0;

// Generar la cuadrícula de botones
generateGridBtn.addEventListener("click", () => {
  const rows = parseInt(rowsInput.value);
  const columns = parseInt(columnsInput.value);
  const bgColor = bgColorInput.value;
  const btnColor = btnColorInput.value;

  document.body.style.backgroundColor = bgColor;
  buttonGrid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

  buttonGrid.innerHTML = ""; // Limpiar la cuadrícula existente
  for (let i = 0; i < rows * columns; i++) {
    const button = document.createElement("div");
    button.className = "dynamic-button";
    button.style.backgroundColor = btnColor;
    button.textContent = `Cama ${i + 1}`;
    button.addEventListener("click", () => toggleSelection(button));
    buttonGrid.appendChild(button);
  }

  testSection.style.display = "block";
});

// Alternar selección de botones
function toggleSelection(button) {
  const currentTime = Date.now();
  if (lastClickTime > 0) {
    inactiveTime += currentTime - lastClickTime;
  }
  lastClickTime = currentTime;

  clickCount++;
  if (button.classList.contains("selected")) {
    button.classList.remove("selected");
    changeCount++;
  } else {
    button.classList.add("selected");
  }
}

// Iniciar prueba
startTestBtn.addEventListener("click", () => {
  startTime = Date.now();
  clickCount = 0;
  changeCount = 0;
  inactiveTime = 0;
  lastClickTime = 0;
  startTestBtn.disabled = true;
  endTestBtn.disabled = false;
});

// Finalizar prueba y guardar en Firebase
endTestBtn.addEventListener("click", () => {
  const endTime = Date.now();
  const timeSpent = endTime - startTime;

  const data = {
    tiempoTotal: timeSpent / 1000, // Guardar en segundos
    cantidadDeClics: clickCount,
    numeroDeCambios: changeCount,
    tiempoInactivo: inactiveTime / 1000, // Guardar en segundos
    timestamp: endTime,
    prueba: "botones_grandes"
  };

  const refPath = push(ref(db, "pruebas/botones"));
  set(refPath, data)
    .then(() => alert("Datos guardados en Firebase"))
    .catch((error) => {
      console.error("Error al guardar los datos:", error);
      alert("Error al guardar los datos. Por favor, revisa la consola.");
    });

  startTestBtn.disabled = false;
  endTestBtn.disabled = true;
});
