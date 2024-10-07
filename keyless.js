const keylessForm = document.getElementById("keyless-controls");
const keylessInputText = document.getElementById("keyless-input-text");
const keylessOutputText = document.getElementById("keyless-output-text");
const keylessType = document.getElementById("keyless-type");
const keylessEncodeOrDecode = document.getElementsByName("code");

keylessEncodeOrDecode.forEach((option) => {
    option.addEventListener("click", () => {
        if (option.value === "encode") {
            keylessInputText.placeholder = "Enter plaintext";
            keylessOutputText.placeholder = "Output";
            keylessInputText.value = "";
            keylessOutputText.textContent = "";
        } else if (option.value === "decode") {
            keylessInputText.placeholder = "Enter ciphertext";
            keylessOutputText.placeholder = "Output";
            keylessInputText.value = "";
            keylessOutputText.textContent = "";
        }
    });
});

keylessForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let inputTextValue = keylessInputText.value;
    let selectedOption = Array.from(keylessEncodeOrDecode).find((option) => option.checked);
    let cipherType = keylessType.value;

    function keylessCipher(decode, text, type) {
        if (type === "atbash") {
            return atbashCipher(text);
        } else if (type === "rot13") {
            return rot13Cipher(text);
        }
        return text;
    }

    function atbashCipher(text) {
        const alphabet = "abcdefghijklmnopqrstuvwxyz";
        const reversedAlphabet = alphabet.split("").reverse().join("");
        let result = "";
        for (let i = 0; i < text.length; i++) {
            let char = text.charAt(i).toLowerCase();
            const index = alphabet.indexOf(char);
            if (index !== -1) {
                char = reversedAlphabet[index];
            }
            result += char;
        }
        return result;
    }

    function rot13Cipher(text) {
        return text.replace(/[a-zA-Z]/g, (char) => {
            return String.fromCharCode(
                char.charCodeAt(0) + (char.toLowerCase() < "n" ? 13 : -13)
            );
        });
    }

    let cipherOutput = keylessCipher(selectedOption.value, inputTextValue, cipherType);
    keylessOutputText.textContent = cipherOutput;
});
