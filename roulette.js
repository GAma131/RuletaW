let wheel = document.querySelector(".wheel");
let spinBtn = document.querySelector(".spinBtn");
let numbers = wheel.querySelectorAll(".number");
let currentRotation = Math.ceil(Math.random() * 3600);

// Crear y configurar el modal
const modal = createModal();

// Mostrar el modal y lanzar confeti después de la animación
spinBtn.addEventListener("click", () => {
  const selectedNumber = spinWheel(wheel, numbers, currentRotation);
  currentRotation += Math.ceil(Math.random() * 3600);

  setTimeout(() => {
    showModal(modal, `¡Felicidades! tu descuento es de ${selectedNumber}%`);
    launchConfetti();
  }, 3000);
});

// Función para crear el modal
function createModal() {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
            <div class="modal-content">
                <p id="modal-message"></p>
                <button id="modal-close">Cerrar</button>
            </div>
        `;
  document.body.appendChild(modal);

  const closeButton = modal.querySelector("#modal-close");
  closeButton.addEventListener("click", () => (modal.style.display = "none"));

  return modal;
}

// Función para girar la rueda
function spinWheel(wheel, numbers, rotation) {
  const segmentAngle = 360 / numbers.length;
  const randomIndex = Math.floor(Math.random() * numbers.length);
  const totalRotation = 360 * 5 + segmentAngle * randomIndex;

  wheel.style.transition = "transform 3s ease-out";
  wheel.style.transform = `rotate(${totalRotation}deg)`;

  return numbers[randomIndex].textContent.trim();
}

// Función para mostrar el modal
function showModal(modal, message) {
  modal.querySelector("#modal-message").textContent = message;
  modal.style.display = "flex";
}

// Función para lanzar confeti
function launchConfetti() {
  const duration = 3000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
