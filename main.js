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

// Función para mostrar secciones
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

// --- Implementación para Botones Grandes ---
let buttonGrid = [];
let buttonStartTime = 0;
let buttonClicks = 0;
let buttonChanges = 0;
let buttonLastClickTime = 0;
let buttonInactiveTime = 0;

document.getElementById('generateGrid').addEventListener('click', () => {
    const rows = parseInt(document.getElementById('rows').value);
    const columns = parseInt(document.getElementById('columns').value);
    const grid = document.getElementById('buttonGrid');

    grid.innerHTML = '';
    grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

    buttonGrid = [];
    for (let i = 0; i < rows * columns; i++) {
        const button = document.createElement('div');
        button.className = 'dynamic-button';
        button.textContent = i + 1;
        button.dataset.selected = 'false';

        button.addEventListener('click', () => {
            const currentTime = Date.now();
            if (buttonLastClickTime > 0) {
                buttonInactiveTime += currentTime - buttonLastClickTime;
            }
            buttonLastClickTime = currentTime;

            buttonClicks++;
            if (button.dataset.selected === 'false') {
                button.dataset.selected = 'true';
                button.classList.add('selected');
                buttonChanges++;
            } else {
                button.dataset.selected = 'false';
                button.classList.remove('selected');
            }
        });

        grid.appendChild(button);
        buttonGrid.push(button);
    }
});

document.getElementById('startTest').addEventListener('click', () => {
    if (buttonGrid.length === 0) {
        alert("Por favor, genere la cuadrícula antes de iniciar.");
        return;
    }

    buttonStartTime = Date.now();
    buttonClicks = 0;
    buttonChanges = 0;
    buttonInactiveTime = 0;
    buttonLastClickTime = 0;

    document.getElementById('endTest').disabled = false;
    alert("Prueba iniciada.");
});

document.getElementById('endTest').addEventListener('click', () => {
    const endTime = Date.now();
    const totalTime = (endTime - buttonStartTime) / 1000;
    const activeTime = totalTime - buttonInactiveTime / 1000;
    const avgClickTime = buttonClicks > 0 ? totalTime / buttonClicks : 0;

    const nuevaRef = push(ref(db, "pruebas/botones"));
    set(nuevaRef, {
        ...userInfo,
        totalTime: totalTime.toFixed(2),
        clicks: buttonClicks,
        changes: buttonChanges,
        inactiveTime: (buttonInactiveTime / 1000).toFixed(2),
        activeTime: activeTime.toFixed(2),
        avgClickTime: avgClickTime.toFixed(2),
        timestamp: new Date().toISOString()
    })
    .then(() => {
        alert("Prueba finalizada. Datos guardados en Firebase.");
    })
    .catch((error) => {
        alert("Error al guardar los datos: " + error.message);
    });

    document.getElementById('endTest').disabled = true;
});

// --- Implementación para Fármacos y Vías ---
let farmacosData = [];
const farmacos = [
    "Paracetamol", "Ibuprofeno", "Amoxicilina", "Ceftriaxona", "Clorfenamina",
    "Diclofenaco", "Omeprazol", "Ranitidina", "Hidrocortisona", "Salbutamol",
    "Metronidazol", "Ketorolaco", "Tramadol", "Furosemida", "Heparina",
    "Atropina", "Adrenalina", "Morfina", "Diazepam", "Midazolam"
];
const vias = ["IM", "SC", "EV", "Rectal", "Oral", "Sublingual", "Otras"];
const unidades = ["mg", "g", "ml"];

function renderFarmacos() {
    const container = document.getElementById('farmacosContainer');
    container.innerHTML = '';
    farmacos.forEach(farmaco => {
        const row = document.createElement('div');
        row.className = 'farmaco-row';

        const name = document.createElement('span');
        name.textContent = farmaco;

        const viaSelect = document.createElement('select');
        vias.forEach(via => {
            const option = document.createElement('option');
            option.value = via;
            option.textContent = via;
            viaSelect.appendChild(option);
        });

        const unidadSelect = document.createElement('select');
        unidades.forEach(unidad => {
            const option = document.createElement('option');
            option.value = unidad;
            option.textContent = unidad;
            unidadSelect.appendChild(option);
        });

        const cantidadInput = document.createElement('input');
        cantidadInput.type = 'number';
        cantidadInput.min = 0;

        row.appendChild(name);
        row.appendChild(viaSelect);
        row.appendChild(unidadSelect);
        row.appendChild(cantidadInput);
        container.appendChild(row);

        farmacosData.push({ farmaco, viaSelect, unidadSelect, cantidadInput });
    });
}

document.getElementById('startFarmacoTest').addEventListener('click', () => {
    renderFarmacos();
    alert("Prueba de fármacos iniciada.");
});

document.getElementById('endFarmacoTest').addEventListener('click', () => {
    const results = farmacosData.map(data => ({
        farmaco: data.farmaco,
        via: data.viaSelect.value,
        unidad: data.unidadSelect.value,
        cantidad: data.cantidadInput.value
    }));

    const nuevaRef = push(ref(db, "pruebas/farmacos"));
    set(nuevaRef, {
        ...userInfo,
        results,
        timestamp: new Date().toISOString()
    })
    .then(() => {
        alert("Prueba de fármacos finalizada. Datos guardados en Firebase.");
    })
    .catch((error) => {
        alert("Error al guardar los datos: " + error.message);
    });
});

// --- Implementación para Casillas Seleccionables ---
let casillaGrid = [];
let casillaStartTime = 0;

document.getElementById('generateCasillaGrid').addEventListener('click', () => {
    const rows = parseInt(document.getElementById('casillaRows').value);
    const columns = parseInt(document.getElementById('casillaColumns').value);
    const grid = document.getElementById('casillaGrid');

    grid.innerHTML = '';
    grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

    casillaGrid = [];
    for (let i = 0; i < rows * columns; i++) {
        const casilla = document.createElement('div');
        casilla.className = 'casilla';
        casilla.textContent = i + 1;

        casilla.addEventListener('click', () => {
            casilla.classList.toggle('selected');
        });

        grid.appendChild(casilla);
        casillaGrid.push(casilla);
    }
});

document.getElementById('startCasillaTest').addEventListener('click', () => {
    casillaStartTime = Date.now();
    alert("Prueba de casillas iniciada.");
});

document.getElementById('endCasillaTest').addEventListener('click', () => {
    const endTime = Date.now();
    const totalTime = (endTime - casillaStartTime) / 1000;
    const selectedCasillas = casillaGrid.filter(casilla => casilla.classList.contains('selected')).map(casilla => casilla.textContent);

    const nuevaRef = push(ref(db, "pruebas/casillas"));
    set(nuevaRef, {
        ...userInfo,
        totalTime: totalTime.toFixed(2),
        selectedCasillas,
        timestamp: new Date().toISOString()
    })
    .then(() => {
        alert("Prueba de casillas finalizada. Datos guardados en Firebase.");
    })
    .catch((error) => {
        alert("Error al guardar los datos: " + error.message);
    });
});
