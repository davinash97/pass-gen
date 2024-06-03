// Main Password Related Variables
let passwordInput = document.getElementById("passwordInput");
let uppercaseCheckbox = document.getElementById("uppercaseCheckbox");
let lowercaseCheckbox = document.getElementById("lowercaseCheckbox");
let numberCheckbox = document.getElementById("numberCheckbox");
let specialCheckbox = document.getElementById("specialCheckbox");
let lengthInput = document.getElementById("lengthInput");

// Buttons
// Main Buttons
const generateButton = document.getElementById("generateButton");
const clipboardButton = document.getElementById("clipboardButton");
const resetButton = document.getElementById("resetButton");

// Range
const length = document.getElementById("length");

// Functions

let resetEverything = () => {
    passwordInput.value = "";
    lengthInput.value = 6;
    numberCheckbox.checked = true;
    lowercaseCheckbox.checked = true;
    uppercaseCheckbox.checked = true;
    specialCheckbox.checked = true;
    event.preventDefault();
};

const copyToClipboard = text => {
    if (!document.queryCommandSupported("copy")) {
        // Clipboard API not supported, provide fallback or message.
        window.alert("Clipboard API not supported.");
        return;
    }

    if (text === "") {
        // Inform the user that there's nothing to copy.
        // You can also show a message in the UI.
        window.alert("Nothing to copy.");
        return;
    }

    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.select();

    try {
        const successful = document.execCommand("copy");
        if (!successful) {
            window.alert("Copying to clipboard failed.");
        }
    } catch (err) {
        window.alert("Copying to clipboard failed with error:", err);
    } finally {
        document.body.removeChild(textArea);
    }
};

function generatePassword() {
    if (
        !uppercaseCheckbox.checked &&
        !lowercaseCheckbox.checked &&
        !numberCheckbox.checked &&
        !specialCheckbox.checked
    ) {
        window.alert("Make sure one of them is checked At least");
        return;
    }

    const characterSets = {
        uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        lowercase: "abcdefghijklmnopqrstuvwxyz",
        number: "0123456789",
        special: "@#$%&~<>(){}[];:/?|/",
    };

    const selectedSets = Object.keys(characterSets).filter(
        set => document.getElementById(set + "Checkbox").checked
    );

    if (selectedSets.length === 0) {
        window.alert("Make sure one of them is checked At least");
        return;
    }

    let result = "";
    const selectedLength = parseInt(lengthInput.value);

    while (result.length < selectedLength) {
        const randomSet =
            characterSets[
                selectedSets[Math.floor(Math.random() * selectedSets.length)]
            ];
        const randomChar =
            randomSet[Math.floor(Math.random() * randomSet.length)];
        result += randomChar;
    }

    passwordInput.value = result;
}

// Accent
const colorOptions = [
    { value: "#F31559" },
    { value: "#F86F03" },
    { value: "#7FB77E" },
    { value: "#7FBCD2" },
    { value: "#FBF0B2" },
    { value: "#A084E8" },
    { value: "#5776ff" },
];

const ul = document.querySelector("ul");

ul.addEventListener("click", event => {
    const clickedLi = event.target.closest("li");
    if (!clickedLi) return; // Clicked outside of a <li>

    const colorName = clickedLi.getAttribute("data-color");
    if (colorName) changeAccent(colorName);
});

function populateColorOptions() {
    colorOptions.forEach(color => {
        const li = document.createElement("li");
        li.style.backgroundColor = color.value;
        li.setAttribute("data-color", color.value);
        ul.appendChild(li);
    });
}

const changeAccent = color => {
    document.documentElement.style.cssText = "--accent:" + color;
    localStorage.setItem("accent", color);
};

function defaultAccent() {
    const getAccent = localStorage.getItem("accent");
    if (getAccent !== null) {
        changeAccent(getAccent);
    }
}

// Populate color options on page load
populateColorOptions();
defaultAccent();

// Auto Day/Night Mode

const prefersLightScheme = window.matchMedia(
    "(prefers-color-scheme: light)"
).matches;
document.body.style.background = prefersLightScheme
    ? "var(--light)"
    : "var(--dark)";
document.body.style.color = prefersLightScheme
    ? "var(--black)"
    : "var(--light)";

// Event Listeners for Buttons and Window Load

// Window Load
window.addEventListener("load", defaultAccent);

// Main Buttons

generateButton.addEventListener("click", generatePassword);
resetButton.addEventListener("click", resetEverything);
clipboardButton.addEventListener("click", () => copyToClipboard(passwordInput.value));

// Length range
length.addEventListener("change", () => {
    lengthInput.value = length.value;
})
