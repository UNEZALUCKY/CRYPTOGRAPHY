document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('image-form');
    const fileInput = document.getElementById('image-file');
    const seedInput = document.getElementById('image-seed');
    const resultImage = document.getElementById('result-image');
    const selectedImagePreview = document.getElementById('selected-image-preview');
    const imagePreviewSection = document.getElementById('image-preview-section');

    // Create and insert download button
    const downloadButton = document.createElement('a');
    downloadButton.textContent = 'Download Result';
    downloadButton.style.display = 'none';
    downloadButton.className = 'button'; // optional style class
    resultImage.insertAdjacentElement('afterend', downloadButton);

    let originalImage = new Image();

    fileInput.addEventListener('change', function () {
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                originalImage.src = e.target.result;
                selectedImagePreview.src = e.target.result;
                imagePreviewSection.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!originalImage || !seedInput.value.trim()) {
            alert("Please select an image and enter a seed key.");
            return;
        }

        const seed = seedInput.value.trim();
        const action = document.querySelector('input[name="action"]:checked').value;

        originalImage.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = originalImage.width;
            canvas.height = originalImage.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(originalImage, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            // Reset seed
            Math.seedrandom(seed);

            for (let i = 0; i < data.length; i += 4) {
                const r = Math.floor(Math.random() * 256);
                const g = Math.floor(Math.random() * 256);
                const b = Math.floor(Math.random() * 256);

                // XOR RGB only; leave alpha untouched
                data[i] ^= r;       // Red
                data[i + 1] ^= g;   // Green
                data[i + 2] ^= b;   // Blue
                // data[i + 3] untouched (alpha)
            }

            ctx.putImageData(imageData, 0, 0);
            const dataUrl = canvas.toDataURL();

            resultImage.src = dataUrl;
            resultImage.style.display = 'block';

            // Setup download
            downloadButton.href = dataUrl;
            downloadButton.download = action === 'encrypt' ? 'encrypted_image.png' : 'decrypted_image.png';
            downloadButton.style.display = 'inline-block';
        };

        // Trigger onload if already loaded
        if (originalImage.complete) {
            originalImage.onload();
        }
    });
});
