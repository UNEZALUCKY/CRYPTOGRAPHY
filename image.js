document.addEventListener('DOMContentLoaded', function () {
    const imageForm = document.getElementById('image-form');
    const imageFile = document.getElementById('image-file');
    const imageSeed = document.getElementById('image-seed');
    const selectedImagePreview = document.getElementById('selected-image-preview');
    const previewHeading = document.getElementById('preview-heading');
    const resultImage = document.getElementById('result-image');
    const previewSection = document.getElementById('image-preview-section');
  
    imageForm.addEventListener('submit', function (event) {
      event.preventDefault();
  
      const file = imageFile.files[0];
      const seed = imageSeed.value.trim();
      const action = document.querySelector('input[name="action"]:checked').value;
  
      if (!file || !seed) {
        alert("Please provide both an image and a seed key.");
        return;
      }
  
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
  
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const processedData = (action === 'encrypt')
            ? shufflePixels(imageData, seed)
            : unshufflePixels(imageData, seed);
  
          ctx.putImageData(processedData, 0, 0);
          resultImage.src = canvas.toDataURL();
          resultImage.style.display = 'block';
        };
        img.src = e.target.result;
  
        previewSection.style.display = 'block';
        previewHeading.style.display = 'block';
        selectedImagePreview.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  
    function shufflePixels(imageData, seed) {
      const { data, width, height } = imageData;
      const totalPixels = width * height;
      const indices = getShuffledIndices(totalPixels, seed);
      const newData = new Uint8ClampedArray(data.length);
  
      indices.forEach((shuffledIndex, i) => {
        for (let j = 0; j < 4; j++) {
          newData[i * 4 + j] = data[shuffledIndex * 4 + j];
        }
      });
  
      return new ImageData(newData, width, height);
    }
  
    function unshufflePixels(imageData, seed) {
      const { data, width, height } = imageData;
      const totalPixels = width * height;
      const indices = getShuffledIndices(totalPixels, seed);
      const newData = new Uint8ClampedArray(data.length);
  
      indices.forEach((shuffledIndex, i) => {
        for (let j = 0; j < 4; j++) {
          newData[shuffledIndex * 4 + j] = data[i * 4 + j];
        }
      });
  
      return new ImageData(newData, width, height);
    }
  
    function getShuffledIndices(length, seed) {
      const rng = new Math.seedrandom(seed);
      const indices = [...Array(length).keys()];
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
      return indices;
    }
  });
  document.getElementById("image-file").addEventListener("change", function () {
    const file = this.files[0];
    const preview = document.getElementById("selected-image-preview");
    const previewSection = document.getElementById("image-preview-section");

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result;
            previewSection.style.display = "block";
        };
        reader.readAsDataURL(file);
    } else {
        previewSection.style.display = "none";
    }
});

  