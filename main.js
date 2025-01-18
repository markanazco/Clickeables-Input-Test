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

// Variables globales
let userInfo = {};

// Mostrar sección
function showSection(section) {
    document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
    document.getElementById(section).style.display = 'block';
}

// Capturar datos de usuario
document.getElementById('startTests').addEventListener('click', () => {
    const age = document.getElementById('age').value;
    const sex = document.getElementById('sex').value;

    if (!age || !sex) {
        alert("Por favor, complete todos los campos antes de continuar.");
        return;
    }

    userInfo = { age, sex };
    document.getElementById('userInfo').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
    alert("Usuario registrado. Puede comenzar las pruebas.");
});

// Agregar lógica de pruebas (Botones, Fármacos, Casillas) aquí...
