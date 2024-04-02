"use strict";

document.addEventListener("DOMContentLoaded", function() {
    let pillImages = document.querySelectorAll('.pill-image');
    pillImages.forEach(img => {
        img.addEventListener('click', function() {
            let radio = this.previousElementSibling;
            radio.checked = true;
        });
    });
});

// I added script and the proper styles to change the radio buttons into images of the pills that will be highlighted when selected.