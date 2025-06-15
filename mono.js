const monoForm = document.getElementById("mono-controls");
const monoInputText = document.getElementById("mono-input-text");
const monoOutputText = document.getElementById("mono-output-text");
const substitutionAlphabetInput = document.getElementById("substitution-alphabet-input");
const monoEncodeOrDecode = document.getElementsByName("code");
const monoLetterCase = document.getElementById("mono-letter-case");
const monoForeignChars = document.getElementById("mono-foreign-chars");

monoEncodeOrDecode.forEach((option) => {
    option.addEventListener("click", () => {
        if (option.value === "encode") {
            monoInputText.placeholder = "Enter plaintext";
        } else {
            monoInputText.placeholder = "Enter ciphertext";
        }
        monoInputText.value = "";
        monoOutputText.textContent = "";
    });
});

monoForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let inputTextValue = monoInputText.value;
    let selectedOption = Array.from(monoEncodeOrDecode).find((option) => option.checked);
    let substitutionAlphabetValue = substitutionAlphabetInput.value.toUpperCase();
    let letterCaseValue = monoLetterCase.value;
    let foreignCharsValue = monoForeignChars.value;

    function removeForeignChars(input) {
        const regex = /[^a-zA-Z0-9 ]/g;
        return input.replace(regex, "");
    }

    function monoAlphabeticCipher(mode, text, substitutionAlphabet, foreignChars) {
        const plainAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let result = "";

        if (foreignChars == 1) {
            text = removeForeignChars(text);
        }

        for (let i = 0; i < text.length; i++) {
            let char = text[i];
            let upperChar = char.toUpperCase();

            if (plainAlphabet.includes(upperChar)) {
                if (mode === "encode") {
                    let index = plainAlphabet.indexOf(upperChar);
                    let cipherChar = substitutionAlphabet[index];
                    result += (char === char.toLowerCase()) ? cipherChar.toLowerCase() : cipherChar;
                } else if (mode === "decode") {
                    let index = substitutionAlphabet.indexOf(upperChar);
                    let plainChar = plainAlphabet[index];
                    result += (char === char.toLowerCase()) ? plainChar.toLowerCase() : plainChar;
                }
            } else {
                result += char; // keep punctuation or spaces
            }
        }

        return result;
    }

    let cipherOutput = monoAlphabeticCipher(selectedOption.value, inputTextValue, substitutionAlphabetValue, foreignCharsValue);

    if (letterCaseValue == 2) {
        cipherOutput = cipherOutput.toLowerCase();
    } else if (letterCaseValue == 3) {
        cipherOutput = cipherOutput.toUpperCase();
    }

    monoOutputText.textContent = cipherOutput;
});
