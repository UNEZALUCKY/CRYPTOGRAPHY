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
        monoOutputText.value = "";
    });
});

monoForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const plainAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let inputTextValue = monoInputText.value;
    let selectedOption = Array.from(monoEncodeOrDecode).find((option) => option.checked).value;
    let substitutionAlphabet = substitutionAlphabetInput.value.toUpperCase();
    let letterCaseValue = monoLetterCase.value;
    let foreignCharsValue = monoForeignChars.value;

    // Validation
    if (substitutionAlphabet.length !== 26 || !/^[A-Z]+$/.test(substitutionAlphabet)) {
        alert("Substitution alphabet must be exactly 26 uppercase A-Z letters.");
        return;
    }

    // Remove foreign characters if selected
    if (foreignCharsValue == 1) {
        inputTextValue = inputTextValue.replace(/[^a-zA-Z\s]/g, "");
    }

    // Core logic
    let result = "";

    for (let char of inputTextValue) {
        let isLower = char === char.toLowerCase();
        let upperChar = char.toUpperCase();
        let index;

        if (/[A-Z]/i.test(char)) {
            if (selectedOption === "encode") {
                index = plainAlphabet.indexOf(upperChar);
                char = substitutionAlphabet[index];
            } else if (selectedOption === "decode") {
                index = substitutionAlphabet.indexOf(upperChar);
                char = plainAlphabet[index];
            }

            if (isLower && char) {
                char = char.toLowerCase();
            }
        }

        result += char || "";
    }

    // Adjust case based on selection
    if (letterCaseValue == 2) {
        result = result.toLowerCase();
    } else if (letterCaseValue == 3) {
        result = result.toUpperCase();
    }

    monoOutputText.value = result;
});
