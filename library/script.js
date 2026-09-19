const lien = document.getElementById('aniFunFun');
                const min = 1;
                const max = 20;
                const nombreAleatoire = Math.floor(Math.random() * (max - min + 1)) + min;
                const points = "!".repeat(nombreAleatoire);
                lien.textContent = "Pratique " + points;



                function openPopup(title, author, content) {
                const popup = document.getElementById('popup');
                document.getElementById('popup-title').innerText = title;
                document.getElementById('popup-author').innerText = author;
                document.getElementById('popup-text').innerHTML = content;
                popup.style.display = 'flex';
                }
                function closePopup() {
                document.getElementById('popup').style.display = 'none';
                }
                function alignTextToImage(card) {
                const img = card.querySelector('img');
                const content = card.querySelector('.card-content');
                if (!img || !content) return;
                const containerRatio = card.clientWidth / card.clientHeight;
                const imageRatio = img.naturalWidth / img.naturalHeight;
                let realWidth, realHeight;
                if (imageRatio > containerRatio) {
                realWidth = card.clientWidth;
                realHeight = card.clientWidth / imageRatio;
                } else {
                realHeight = card.clientHeight;
                realWidth = card.clientHeight * imageRatio;
                }
                const topPos = (card.clientHeight - realHeight) / 2;
                const rightPos = (card.clientWidth - realWidth) / 2;
                content.style.top = `${topPos}px`;
                content.style.right = `${rightPos - content.clientWidth - 15}px`;
                }
                let topZIndex = 10;
                const cards = document.querySelectorAll('.card');
                cards.forEach((card, index) => {
                card.style.animationDelay = `${index * -1.5}s`;
                const img = card.querySelector('img');
                if (img) {
                if (img.complete) {
                alignTextToImage(card);
                } else {
                img.addEventListener('load', () => alignTextToImage(card));
                }
                }
                const isMobile = window.innerWidth < 768;
                const maxX = window.innerWidth - 480;
                const maxY = isMobile ? 1800 : window.innerHeight - 340;
                card.style.left = `${Math.floor(Math.random() * Math.max(0, maxX))}px`;
                card.style.top = `${Math.floor(Math.random() * Math.max(0, maxY))}px`;
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
                originalOnClick.call(card, e);
                }
                });
                });