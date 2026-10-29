document.addEventListener("DOMContentLoaded", function () {
    // Select images you want to be zoomable (e.g., service cards and portfolio photos)
    const galleryImages = document.querySelectorAll('.service-image, main > img');

    if (galleryImages.length === 0) return;

    // Create lightbox overlay elements dynamically
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox-modal';
    lightbox.style.cssText = `
        display: none;
        position: fixed;
        z-index: 1000;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.85);
        justify-content: center;
        align-items: center;
        cursor: pointer;
    `;

    const lightboxImg = document.createElement('img');
    lightboxImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 8px;
        box-shadow: 0 5px 25px rgba(0,0,0,0.5);
        cursor: default;
    `;

    lightbox.appendChild(lightboxImg);
    document.body.appendChild(lightbox);

    // Open lightbox on click
    galleryImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function () {
            lightboxImg.src = this.src;
            lightbox.style.display = 'flex';
        });
    });

    // Close lightbox on click outside the image or pressing Escape
    lightbox.addEventListener('click', function (e) {
        if (e.target !== lightboxImg) {
            lightbox.style.display = 'none';
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            lightbox.style.display = 'none';
        }
    });
});