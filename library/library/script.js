const lien = document.getElementById('aniFunFun');
const min = 1;
const max = 20;
const nombreAleatoire = Math.floor(Math.random() * (max - min + 1)) + min;
const points = "!".repeat(nombreAleatoire);
lien.textContent = "Pratique " + points;

function openPopup(title, author, content, mediaPath) {
    const popup = document.getElementById('popup');
    document.getElementById('popup-title').innerText = title;
    document.getElementById('popup-author').innerText = author;
    document.getElementById('popup-text').innerHTML = content;
    
    const mediaContainer = document.getElementById('popup-media');
    if (mediaContainer) {
        mediaContainer.innerHTML = '';
        if (mediaPath) {
            const extension = mediaPath.split('.').pop().toLowerCase();
            if (['mp4', 'webm', 'ogg'].includes(extension)) {
                const video = document.createElement('video');
                video.src = mediaPath;
                video.controls = true;
                video.autoplay = false;
                mediaContainer.appendChild(video);
            } else if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
                const img = document.createElement('img');
                img.src = mediaPath;
                mediaContainer.appendChild(img);
            }
        }
    }
    
    popup.style.display = 'flex';
}

function closePopup() {
    const popup = document.getElementById('popup');
    const mediaContainer = document.getElementById('popup-media');
    
    if (mediaContainer) {
        const video = mediaContainer.querySelector('video');
        if (video) {
            video.pause();
            video.src = '';
        }
        mediaContainer.innerHTML = '';
    }
    
    popup.style.display = 'none';
}

function runTextAnimation() {
    const baseText = "Pratique ";
    const delay = ms => new Promise(res => setTimeout(res, ms));

    async function animate() {
        while (true) {
            for (let i = 1; i <= 17; i++) {
                lien.textContent = baseText + "!".repeat(i);
                await delay(60);
            }
            await delay(500);

            for (let i = 13; i >= 8; i--) {
                lien.textContent = baseText + "!".repeat(i);
                await delay(180);
            }
            await delay(1500);

            for (let i = 7; i >= 3; i--) {
                lien.textContent = baseText + "!".repeat(i);
                await delay(150);
            }
            await delay(3000);

            lien.textContent = baseText + "!!";
            await delay(250);
            lien.textContent = baseText + "!";
            await delay(1500);

            lien.textContent = baseText;
            await delay(400);

            lien.textContent = baseText + "?";
            await delay(1500);

            lien.textContent = baseText;
            await delay(400);

            lien.textContent = baseText + ".";
            await delay(1000);

            lien.textContent = baseText + "...";
            await delay(1500);

            lien.textContent = baseText + "!";
            await delay(2000);
        }
    }

    animate();
}

runTextAnimation();

const cardsContainer = document.querySelector('.cards');
if (cardsContainer) {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
}

let topZIndex = 10;
const cards = document.querySelectorAll('.card');

cards.forEach((card, index) => {
    card.style.animationDelay = `${index * -1.5}s`;
    
    const isMobile = window.innerWidth < 768;
    
    const cardWidthEstimate = card.clientWidth || 180;
    const cardHeightEstimate = card.clientHeight || 50;
    
    const maxX = window.innerWidth - cardWidthEstimate - 40;
    const maxY = window.innerHeight - cardHeightEstimate - 100;
    
    card.style.left = `${Math.floor(Math.random() * Math.max(20, maxX))}px`;
    card.style.top = `${Math.floor(Math.random() * Math.max(40, maxY))}px`;
    
    let isMoving = false;
    let hasDragged = false;
    let startX, startY, initialLeft, initialTop;
    const originalOnClick = card.onclick;
    card.onclick = null;

    card.addEventListener('pointerdown', (e) => {
        isMoving = true;
        hasDragged = false;
        card.classList.add('dragging');
        topZIndex++;
        card.style.zIndex = topZIndex;
        startX = e.clientX;
        startY = e.clientY;
        initialLeft = card.offsetLeft;
        initialTop = card.offsetTop;
        card.setPointerCapture(e.pointerId);
    });

    card.addEventListener('pointermove', (e) => {
        if (!isMoving) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
            hasDragged = true;
        }
        card.style.left = `${initialLeft + dx}px`;
        card.style.top = `${initialTop + dy}px`;
    });

    card.addEventListener('pointerup', (e) => {
        if (!isMoving) return;
        isMoving = false;
        card.classList.remove('dragging');
        card.releasePointerCapture(e.pointerId);
        
        if (!hasDragged && originalOnClick) {
            const isMobileViewport = window.innerWidth <= 768;

            if (isMobileViewport) {
                if (!card.classList.contains('show-info')) {
                    document.querySelectorAll('.card.show-info').forEach(c => {
                        c.classList.remove('show-info');
                    });
                    card.classList.add('show-info');
                } else {
                    card.classList.remove('show-info');
                    originalOnClick.call(card, e);
                }
            } else {
                originalOnClick.call(card, e);
            }
        }
    });
});

document.addEventListener('pointerdown', (e) => {
    if (!e.target.closest('.card')) {
        document.querySelectorAll('.card.show-info').forEach(c => {
            c.classList.remove('show-info');
        });
    }
    
    const popup = document.getElementById('popup');
    if (e.target === popup) {
        closePopup();
    }
});


const videoContainer = document.querySelector('.video-container');
const video = document.querySelector('.maVideo');
const playBtn = document.querySelector('.bigPlayBtn');
const playIcon = document.querySelector('.playIcon');
const pauseIcon = document.querySelector('.pauseIcon');

function togglePlay() {
    if (video.paused) {
        video.play();
        videoContainer.classList.add('playing');
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    } else {
        video.pause();
        videoContainer.classList.remove('playing');
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    }
}

playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);

const slider = document.querySelector('.video-slider');

video.addEventListener('timeupdate', () => {
    if (!video.duration) return;
    const pourcentage = (video.currentTime / video.duration) * 100;
    slider.value = pourcentage;
});

slider.addEventListener('input', () => {
    if (!video.duration) return;
    const nouveauTemps = (slider.value / 100) * video.duration;
    video.currentTime = nouveauTemps;
});


document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.timeline-item');
  const track = document.getElementById('timeline-track');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  if (items.length > 0 && track) {
    // 1. Liaison avec votre fonction globale openPopup (déjà présente dans vos guides)
    items.forEach(item => {
      item.addEventListener('click', (e) => {
        const title = item.getAttribute('data-title') || "Projet";
        const author = item.getAttribute('data-year') || "Design Social";
        const desc = item.getAttribute('data-desc') || "Aucune description fournie.";
        const media = item.getAttribute('data-media') || ""; // Optionnel : chemin vers image/vidéo

        // Appelle la fonction native définie en haut de votre fichier
        if (typeof openPopup === "function") {
          openPopup(title, author, desc, media);
        }
      });
    });

    // 2. Correction des commandes de navigation (Calcul dynamique)
    const scrollAmount = 450; // Distance du saut de défilement (adapté au grand écartement)

    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    
    // Optionnel : Permet de naviguer aussi avec la molette de la souris horizontalement sur la frise
    track.addEventListener('wheel', (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        track.scrollLeft += e.deltaY;
      }
    });
  }
});
