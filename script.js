const envelope = document.getElementById("envelope-container");
const letter = document.getElementById("letter-container");
const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".yes-btn");
const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

let yesScale = 1;
let mensajeEnviado = false;

// Abrir sobre
envelope.addEventListener("click", () => {
    envelope.style.display = "none";
    letter.style.display = "flex";
    setTimeout(() => {
        document.querySelector(".letter-window").classList.add("open");
    }, 50);
});

// Mover NO y crecer SÍ
const moverNo = () => {
    const distance = Math.random() * 60 + 70;
    const angle = Math.random() * Math.PI * 2;
    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
    yesScale += 0.3;
    yesBtn.style.transform = `scale(${yesScale})`;
};

noBtn.addEventListener("mouseover", moverNo);
noBtn.addEventListener("touchstart", (e) => {
    e.preventDefault();
    moverNo();
});

// Click SÍ (Notificación al nuevo link)
yesBtn.addEventListener("click", () => {
    if (!mensajeEnviado) {
        fetch("https://formspree.io/f/mreapadj", {
            method: "POST",
            body: JSON.stringify({ mensaje: "❤️ ¡DIJO QUE SÍ! ❤️" }),
            headers: { 'Accept': 'application/json' }
        });
        mensajeEnviado = true;
    }

    title.textContent = "¡Siiii! ¡Sabía que sí! ♡";
    catImg.src = "cat_dance.gif";
    buttons.style.display = "none";
    finalText.style.display = "block";
    document.querySelector(".letter-window").classList.add("final");
});