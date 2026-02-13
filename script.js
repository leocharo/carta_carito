// Selección de elementos
const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".yes-btn");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// Variables de estado
let yesScale = 1;
let mensajeEnviado = false; // Controla el límite de Formspree

// 1. Lógica para abrir el sobre
envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";

    setTimeout(() => {
        document.querySelector(".letter-window").classList.add("open");
    }, 50);
});

// 2. Lógica para que el botón NO escape y el SÍ crezca
const moverNo = () => {
    const min = 70;
    const max = 130;
    const distance = Math.random() * (max - min) + min;
    const angle = Math.random() * Math.PI * 2;

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    // Mover botón No
    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;

    // Crecer el botón Sí
    yesScale += 0.35;
    yesBtn.style.transform = `scale(${yesScale})`;
};

// Eventos para PC y Móvil
noBtn.addEventListener("mouseover", moverNo);
noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault(); // Evita comportamientos extraños en táctil
    moverNo();
});

// 3. Lógica al presionar SÍ
yesBtn.addEventListener("click", () => {
    // Enviar notificación a Formspree solo la primera vez
    if (!mensajeEnviado) {
        fetch("https://formspree.io/f/xojnenbw", {
            method: "POST",
            body: JSON.stringify({
                mensaje: "¡Aceptó ser tu San Valentín! ❤️",
                fecha: new Date().toLocaleString()
            }),
            headers: { 'Accept': 'application/json' }
        });
        mensajeEnviado = true; // Bloquea envíos extra en esta sesión
    }

    // Cambios visuales finales
    title.textContent = "¡Siiii! ¡Sabía que sí! ♡";
    catImg.src = "cat_dance.gif";

    // Ocultar botones y mostrar mensaje de la cita
    buttons.style.display = "none";
    finalText.style.display = "block";

    // Clase final para ajustes de CSS
    document.querySelector(".letter-window").classList.add("final");
});
