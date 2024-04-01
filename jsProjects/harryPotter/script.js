document.addEventListener('DOMContentLoaded', () => {
    // Music setup
    const music = document.getElementById('backgroundMusic');
    const controlBtn = document.getElementById('musicControl');

    controlBtn.addEventListener('click', () => {
        if (music.paused) {
            music.play();
            controlBtn.textContent = 'Stop Music';
        } else {
            music.pause();
            controlBtn.textContent = 'Play Music';
        }
    });

    // Cards animation setup
    const cards = document.querySelectorAll('.game-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.5}s`;
    });
});
