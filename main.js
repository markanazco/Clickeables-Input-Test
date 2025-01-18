// Importar funciones de Firebase
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

// --- Función para mostrar secciones ---
function showSection(section) {
    document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
    document.getElementById(section).style.display = 'block';
}

// --- Implementación de las pruebas ---
document.getElementById("generateGrid").addEventListener("click", () => {
    // Generar la cuadrícula de botones
});

document.getElementById("startTest").addEventListener("click", () => {
    // Iniciar la prueba de botones
});

document.getElementById("endTest").addEventListener("click", () => {
    // Finalizar y guardar datos en Firebase para botones grandes
});

document.getElementById("startFarmacoTest").addEventListener("click", () => {
    // Iniciar la prueba de fármacos
});

document.getElementById("endFarmacoTest").addEventListener("click", () => {
    // Finalizar y guardar datos en Firebase para fármacos
});

document.getElementById("generateCasillaGrid").addEventListener("click", () => {
    // Generar la cuadrícula de casillas
});

document.getElementById("startCasillaTest").addEventListener("click", () => {
    // Iniciar la prueba de casillas
});

document.getElementById("endCasillaTest").addEventListener("click", () => {
    // Finalizar y guardar datos en Firebase para casillas seleccionables
});
