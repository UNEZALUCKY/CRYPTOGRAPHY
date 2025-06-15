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
            monoOutputText.placeholder = "Output";
            monoInputText.value = "";
            monoOutputText.textContent = "";
        } else if (option.value === "decode") {
            monoInputText.placeholder = "Enter ciphertext";
            monoOutputText.placeholder = "Output";
            monoInputText.value = "";
            monoOutputText.textContent = "";
        }
    });
});

monoForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let inputTextValue = monoInputText.value;
    let selectedOption = Array.from(monoEncodeOrDecode).find((option) => option.checked);
    let substitutionAlphabetValue = substitutionAlphabetInput.value.toUpperCase();
    let letterCaseValue = monoLetterCase.value;
    let foreignCharsValue = monoForeignChars.value;

    const plainAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    function removeForeignChars(input) {
        return input.replace(/[^a-zA-Z0-9 ]/g, "");
    }

    function monoAlphabeticCipher(mode, text, substitutionAlphabet, foreignChars) {
        if (foreignChars == 1) {
            text = removeForeignChars(text);
        }

        let result = "";

        for (let i = 0; i < text.length; i++) {
            let char = text.charAt(i);
            let isLower = char === char.toLowerCase();
            let upperChar = char.toUpperCase();

            if (plainAlphabet.includes(upperChar)) {
                if (mode === "encode") {
                    let index = plainAlphabet.indexOf(upperChar);
                    char = substitutionAlphabet[index];
                } else if (mode === "decode") {
                    let index = substitutionAlphabet.indexOf(upperChar);
                    char = plainAlphabet[index];
                }

                // Preserve case
                if (isLower) {
                    char = char.toLowerCase();
                }
            }

            result += char;
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
