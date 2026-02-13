const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".yes-btn");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

let yesScale = 1;

// 1. Abrir el sobre
envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";
    setTimeout(() => {
        document.querySelector(".letter-window").classList.add("open");
    }, 50);
});

// 2. Lógica del botón NO (Huir y agrandar el SÍ)
const moverNo = () => {
    const min = 70;
    const max = 130;
    const distance = Math.random() * (max - min) + min;
    const angle = Math.random() * Math.PI * 2;

    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;

    // Crecer el botón Sí
    yesScale += 0.35;
    yesBtn.style.transform = `scale(${yesScale})`;
};

noBtn.addEventListener("mouseover", moverNo);
noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    moverNo();
});

// 3. Lógica del botón SÍ (Notificación y Éxito)
yesBtn.addEventListener("click", () => {
    // Enviar notificación a tu móvil vía Formspree
    fetch("https://formspree.io/f/mojnenpn", {
        method: "POST",
        body: JSON.stringify({ mensaje: "¡Aceptó ser tu San Valentín! ❤️" }),
        headers: { 'Accept': 'application/json' }
    });

    title.textContent = "¡Siiii! ¡Sabía que sí! ♡";
    catImg.src = "cat_dance.gif";
    buttons.style.display = "none";
    finalText.style.display = "block";
    document.querySelector(".letter-window").classList.add("final");
});
