document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('image-form');
    const imageInput = document.getElementById('image-file');
    const seedInput = document.getElementById('image-seed');
    const resultImage = document.getElementById('result-image');
    const previewSection = document.getElementById('image-preview-section');
    const selectedImagePreview = document.getElementById('selected-image-preview');
    const downloadButton = document.getElementById('download-button');

    let originalImage = null;

    imageInput.addEventListener('change', function () {
        const file = imageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                selectedImagePreview.src = e.target.result;
                previewSection.style.display = 'block';
                originalImage = new Image();
                originalImage.src = e.target.result;
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

            // Seed random
            Math.seedrandom(seed);

            for (let i = 0; i < data.length; i++) {
                const rand = Math.floor(Math.random() * 256);
                data[i] = data[i] ^ rand; // XOR operation
            }

            ctx.putImageData(imageData, 0, 0);

            const dataUrl = canvas.toDataURL();

            // Set result image
            resultImage.src = dataUrl;
            resultImage.style.display = 'block';

            // Setup download button
            downloadButton.href = dataUrl;
            downloadButton.download = action === 'encrypt' ? 'encrypted_image.png' : 'decrypted_image.png';
            downloadButton.style.display = 'inline-block';
        };

        // Re-trigger onload in case the image is already loaded
        if (originalImage.complete) {
            originalImage.onload();
        }
    });
});
