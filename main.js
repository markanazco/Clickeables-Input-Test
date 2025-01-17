// Importar funciones necesarias de Firebase
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

// --- Funciones Comunes ---
let startTime = 0;
let clickCount = 0;
let changeCount = 0;
let lastClickTime = 0;
let inactiveTime = 0;

// Mostrar secciones
function showSection(section) {
    document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
    document.getElementById(section).style.display = 'block';
}

// --- Botones Grandes ---
document.getElementById("generateGrid").addEventListener("click", () => {
    // Implementación de la generación de botones
});

// --- Fármacos y Vías ---
const farmacos = ["Paracetamol", "Ibuprofeno", "Amoxicilina", "Metformina", "Omeprazol"];
document.getElementById("startFarmacoTest").addEventListener("click", () => {
    // Implementación de la prueba de Fármacos
});

// --- Casillas Seleccionables ---
document.getElementById("generateCasillaGrid").addEventListener("click", () => {
    // Implementación de la generación de casillas
});
