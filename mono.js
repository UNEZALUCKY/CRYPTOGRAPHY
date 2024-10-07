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
    let substitutionAlphabetValue = substitutionAlphabetInput.value;
    let letterCaseValue = monoLetterCase.value;
    let foreignCharsValue = monoForeignChars.value;

    function monoAlphabeticCipher(decode, text, substitutionAlphabet, foreignChars) {
        const plainAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let result = "";
        if (foreignChars == 1) {
            text = removeForeignChars(text);
        }
        substitutionAlphabet = substitutionAlphabet.toUpperCase();

        for (let i = 0; i < text.length; i++) {
            let char = text.charAt(i);
            let index = plainAlphabet.indexOf(char.toUpperCase());

            if (decode === "decode") {
                index = substitutionAlphabet.indexOf(char.toUpperCase());
                char = plainAlphabet[index] || char;
            } else {
                char = substitutionAlphabet[index] || char;
            }

            result += char;
        }
        return result;
    }

    function removeForeignChars(input) {
        const regex = /[^a-zA-Z0-9 ]/g;
        return input.replace(regex, "");
    }

    let cipherOutput = monoAlphabeticCipher(selectedOption.value, inputTextValue, substitutionAlphabetValue, foreignCharsValue);
    if (letterCaseValue == 2) {
        cipherOutput = cipherOutput.toLowerCase();
    } else if (letterCaseValue == 3) {
        cipherOutput = cipherOutput.toUpperCase();
    }
    monoOutputText.textContent = cipherOutput;
});
