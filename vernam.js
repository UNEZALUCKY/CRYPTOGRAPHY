const vernamForm = document.getElementById("vernam-controls");
const vernamInputText = document.getElementById("vernam-input-text");
const vernamOutputText = document.getElementById("vernam-output-text");
const vernamKeyInput = document.getElementById("vernam-key-input");
const vernamEncodeOrDecode = document.getElementsByName("code");
const vernamLetterCase = document.getElementById("vernam-letter-case");
const vernamForeignChars = document.getElementById("vernam-foreign-chars");

vernamEncodeOrDecode.forEach((option) => {
    option.addEventListener("click", () => {
        if (option.value === "encode") {
            vernamInputText.placeholder = "Enter plaintext";
            vernamOutputText.placeholder = "Output";
            vernamInputText.value = "";
            vernamOutputText.textContent = "";
        } else if (option.value === "decode") {
            vernamInputText.placeholder = "Enter ciphertext";
            vernamOutputText.placeholder = "Output";
            vernamInputText.value = "";
            vernamOutputText.textContent = "";
        }
    });
});

vernamForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let inputTextValue = vernamInputText.value;
    let selectedOption = Array.from(vernamEncodeOrDecode).find((option) => option.checked);
    let vernamKeyValue = vernamKeyInput.value;
    let letterCaseValue = vernamLetterCase.value;
    let foreignCharsValue = vernamForeignChars.value;

    function vernamCipher(decode, text, key, foreignChars) {
        if (foreignChars == 1) {
            text = removeForeignChars(text);
        }

        let result = "";
        for (let i = 0; i < text.length; i++) {
            let textCharCode = text.charCodeAt(i);
            let keyCharCode = key.charCodeAt(i % key.length);
            let cipheredCharCode = textCharCode ^ keyCharCode;
            let cipheredChar = String.fromCharCode(cipheredCharCode);
            result += cipheredChar;
        }
        return result;
    }

    function removeForeignChars(input) {
        const regex = /[^a-zA-Z0-9 ]/g;
        return input.replace(regex, "");
    }

    let cipherOutput = vernamCipher(selectedOption.value, inputTextValue, vernamKeyValue, foreignCharsValue);

    if (letterCaseValue == 2) {
        cipherOutput = cipherOutput.toLowerCase();
    } else if (letterCaseValue == 3) {
        cipherOutput = cipherOutput.toUpperCase();
    }
    vernamOutputText.textContent = cipherOutput;

    // For debugging
    console.log("Input:", inputTextValue);
    console.log("Key:", vernamKeyValue);
    console.log("Output:", cipherOutput);
});
