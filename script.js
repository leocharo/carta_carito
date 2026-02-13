// Selección de elementos del DOM
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".yes-btn");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// Variable para controlar el crecimiento del botón Sí
let yesScale = 1;

// 1. Lógica para abrir el sobre
envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";

    // Pequeño retraso para que la animación de escala de la ventana funcione
    setTimeout(() => {
        document.querySelector(".letter-window").classList.add("open");
    }, 50);
});

// 2. Lógica para mover el botón NO y hacer crecer el botón SÍ
// Usamos 'mouseover' para PC y 'touchstart' para mejorar la respuesta en celulares
const huirDelNo = () => {
    // Calcular distancia de movimiento (ajustada para pantallas pequeñas)
    const min = 80;
    const max = 140;
    const distance = Math.random() * (max - min) + min;
    const angle = Math.random() * Math.PI * 2;

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    // Aplicar movimiento al botón No
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;

    // Hacer crecer el botón Sí
    yesScale += 0.35; // Incremento de tamaño (puedes subirlo a 0.5 si quieres que crezca más rápido)
    yesBtn.style.transform = `scale(${yesScale})`;

    // Opcional: Aumentar el z-index del botón Sí para que siempre quede por encima si crece mucho
    yesBtn.style.zIndex = "100";
};

noBtn.addEventListener("mouseover", huirDelNo);
noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault(); // Evita que el click se dispare en móviles al intentar tocarlo
    huirDelNo();
});

// 3. Lógica cuando se presiona el botón SÍ
yesBtn.addEventListener("click", () => {
    // Cambiar texto y gato
    title.textContent = "¡Sabía que dirías que sí! ♡";
    catImg.src = "cat_dance.gif";

    // Aplicar clase final para ajustes visuales de CSS
    document.querySelector(".letter-window").classList.add("final");

    // Ocultar botones y mostrar mensaje de la cita
    buttons.style.display = "none";
    finalText.style.display = "block";
});