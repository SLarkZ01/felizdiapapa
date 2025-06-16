// Función para mostrar la sorpresa
function showSurprise() {
    const modal = new bootstrap.Modal(document.getElementById('surpriseModal'));
    modal.show();
    // Subir el volumen del video del modal al máximo cuando se abre
    const video = document.getElementById('mensaje-especial-video');
    if (video) {
        video.volume = 1.0; // Volumen máximo
        // Opcional: reproducir automáticamente si el usuario ya ha interactuado
        // video.play();
    }

    // Agregar efecto de confeti
    createConfetti();
}

// Crear efecto de confeti
function createConfetti() {
    const colors = ['#b8860b', '#daa520', '#8b0000', '#dc143c', '#606060'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.zIndex = '9999';
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.animation = 'confetti-fall 3s linear forwards';

            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 100);
    }
}

// Agregar estilos para el confeti
const style = document.createElement('style');
style.textContent = `
            @keyframes confetti-fall {
                0% {
                    transform: translateY(-10px) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(style);

// Agregar más estrellas flotantes dinámicamente
function addFloatingStars() {
    const container = document.querySelector('.floating-elements');
    const emojis = ['⭐', '⚡', '💥', '🥊', '💪', '❤️'];

    setInterval(() => {
        const star = document.createElement('div');
        star.className = 'floating-star';
        star.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        star.style.left = Math.random() * 100 + '%';
        star.style.animationDuration = (Math.random() * 4 + 4) + 's';
        star.style.fontSize = (Math.random() * 1 + 1.5) + 'rem';

        container.appendChild(star);

        setTimeout(() => {
            star.remove();
        }, 8000);
    }, 2000);
}

// Inicializar efectos
document.addEventListener('DOMContentLoaded', function () {
    addFloatingStars();

    // Referencias a los elementos de video y audio
    const video = document.getElementById('background-video');
    let audio = document.getElementById('background-audio');
    if (!audio) {
        audio = document.createElement('audio');
        audio.id = 'background-audio';
        audio.src = 'music/musica.mp3';
        audio.loop = true;
        audio.volume = 0.12; // volumen más bajo por defecto
        audio.style.display = 'none';
        document.body.appendChild(audio);
    }

    // Pausar video y audio al inicio
    video.pause();
    audio.pause();
    video.currentTime = 0;
    audio.currentTime = 0;
    video.muted = true; // El video siempre debe estar silenciado

    // Función para iniciar ambos sincronizados
    function startMedia() {
        // Iniciar ambos desde el principio
        video.currentTime = 0;
        audio.currentTime = 0;
        video.muted = true; // El video siempre debe estar silenciado
        // Reproducir ambos
        Promise.all([
            video.play().catch(()=>{}),
            audio.play().catch(()=>{})
        ]);
        // Remover el listener para que solo funcione una vez
        document.removeEventListener('click', startMedia);
    }

    // Esperar cualquier click en la página para iniciar ambos
    document.addEventListener('click', startMedia);

    // Efecto de scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Efecto de hover en las tarjetas de estadísticas
document.querySelectorAll('.stat-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Mostrar modal personalizado para cada stat-card
function showStatCardModal(gifSrc, mensaje, titulo) {
    let oldModal = document.getElementById('statCardModal');
    if (oldModal) oldModal.remove();

    const modalDiv = document.createElement('div');
    modalDiv.className = 'modal fade custom-fade-modal';
    modalDiv.id = 'statCardModal';
    modalDiv.tabIndex = -1;
    modalDiv.innerHTML = `
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content" style="background: linear-gradient(135deg, rgba(26,26,26,0.97), rgba(45,45,45,0.93)); border: 4px solid var(--serious-gold); border-radius: 25px; box-shadow: 0 0 60px #000b;">
                <div class="modal-header border-0" style="justify-content: center;">
                    <h5 class="modal-title w-100 text-center" style="font-family: 'Orbitron', monospace; font-size: 2.2rem; color: var(--serious-gold); letter-spacing: 1px;">${titulo}</h5>
                    <button type="button" class="btn-close btn-close-white position-absolute end-0 me-3 mt-3" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body text-center p-4 p-md-5" style="color: var(--serious-white);">
                    <div style="display: flex; justify-content: center; align-items: center; width: 100%;">
                        <img src="${gifSrc}" alt="gif" style="max-width: 420px; width: 100%; height: auto; border-radius: 20px; box-shadow: 0 0 40px #000a; margin-bottom: 2.5rem; object-fit: cover; aspect-ratio: 16/9; background: #222;">
                    </div>
                    <p style="font-size: 1.25rem; line-height: 1.7; margin: 0 auto; max-width: 600px; font-family: 'Roboto', sans-serif; font-weight: 400; letter-spacing: 0.5px;">
                        ${mensaje}
                    </p>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modalDiv);
    const modal = new bootstrap.Modal(modalDiv);
    modal.show();
    modalDiv.addEventListener('hidden.bs.modal', () => modalDiv.remove());
}

// Bajar volumen de la música al reproducir el video del modal especial y restaurarlo al pausar
function setupSpecialMessageVideoAudioControl() {
    const audio = document.getElementById('background-audio');
    const modal = document.getElementById('surpriseModal');
    if (!modal) return;
    modal.addEventListener('shown.bs.modal', function () {
        const video = document.getElementById('mensaje-especial-video');
        if (!video) return;
        // Cuando el video se reproduce, baja el volumen de la música aún más
        video.addEventListener('play', function () {
            if (audio) audio.volume = 0.005;
        });
        // Cuando el video se pausa o termina, sube el volumen de la música
        video.addEventListener('pause', function () {
            if (audio) audio.volume = 0.12;
        });
        video.addEventListener('ended', function () {
            if (audio) audio.volume = 0.12;
        });
    });
    // Al cerrar el modal, restaurar el volumen por si acaso
    modal.addEventListener('hidden.bs.modal', function () {
        if (audio) audio.volume = 0.12;
    });
}

// Inicializar el control de audio/video especial al cargar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupSpecialMessageVideoAudioControl);
} else {
    setupSpecialMessageVideoAudioControl();
}

// Asignar eventos a cada stat-card
const statCards = document.querySelectorAll('.stat-card');
const statData = [
    {
        gif: 'images/saitama1.gif',
        titulo: 'Fuerza Infinita',
        mensaje: '<strong>¡Papá, tu fuerza es legendaria!</strong><br>Así como Saitama derrota cualquier obstáculo de un solo golpe, tú siempre logras vencer cualquier reto que te propongas. <br><br><em>Gracias por ser mi héroe invencible.</em>'
    },
    {
        gif: 'images/saitama2.gif',
        titulo: 'Héroe Clase S',
        mensaje: '<strong>¡Eres mi héroe de clase S!</strong><br>Tu resiliencia y esfuerzo me inspiran cada día a ser mejor. <br><br><em>No hay nadie más fuerte que tú, papá.</em>'
    },
    {
        gif: 'images/saitama3.gif',
        titulo: 'One Punch',
        mensaje: '<strong>Un solo chiste tuyo lo soluciona todo</strong><br>Como Saitama con su puño, tus chistes son capaces de borrar cualquier tristeza. <br><br><em>¡Te quiero con toda mi fuerza!</em>'
    }
];
statCards.forEach((card, i) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function () {
        const data = statData[i];
        showStatCardModal(data.gif, data.mensaje, data.titulo);
    });
});