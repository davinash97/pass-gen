// Main Password Related Codes
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

// Increment and Decrement buttons
const incrementButton = document.getElementById("incrementButton");
const decrementButton = document.getElementById("decrementButton");

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

const copyToClipboard = (text) => {
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
}

//Generating Everything Seperately to avoid similar character (HTML Charset)
// You can refer to https://www.w3schools.com/html/html_charset.asp
// Number (48-57)
// Uppercase (65-90)
// Lowercase (97-122)
// For Special Characters we will be using an Array Set (Cuz it is btter that way)

// Generate a random uppercase letter (A-Z)
let generateUpperClass = () => String.fromCharCode(Math.floor(Math.random() * 26) + 65);

// Generate a random lowercase letter (a-z)
let generateLowerClass = () => String.fromCharCode(Math.floor(Math.random() * 26) + 97);

// Generate a random number (0-9)
let generateNumber = () => String.fromCharCode(Math.floor(Math.random() * 10) + 48);

// Generate a random special character
let generateSpecialChars = () => {
  const specialChars = "!@#$%^&*()-=_+[]{};:\"<>./?|'\\";
  return specialChars[Math.floor(Math.random() * specialChars.length)];
};


let generatePassword = () => {
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
    special: "!@#$%^&*()-=_+[]{};:\"<>./?|'\\",
  };

  const selectedSets = Object.keys(characterSets).filter(
    (set) => document.getElementById(set + "Checkbox").checked
  );

  if (selectedSets.length === 0) {
    window.alert("Make sure one of them is checked At least");
    return;
  }

  let result = "";
  const selectedLength = parseInt(lengthInput.value);

  while (result.length < selectedLength) {
    const randomSet =
      characterSets[selectedSets[Math.floor(Math.random() * selectedSets.length)]];
    const randomChar = randomSet[Math.floor(Math.random() * randomSet.length)];
    result += randomChar;
  }

  passwordInput.value = result;
};

// Increment - Decrement

const adjustValue = (increment) => {
  const value = parseInt(lengthInput.value);
  const newValue = increment ? value + 1 : value - 1;

  if (newValue < 6) {
    window.alert("Minimum suggested length of the Password is 6.");
    lengthInput.value = 6;
  } else if (newValue > 12) {
    window.alert(
      "Number greater than 12 is hard to remember. If you still want to proceed, you can type it manually"
    );
    lengthInput.value = 12;
  } else {
    lengthInput.value = newValue;
  }
};

// Accent
const colorOptions = [
  { name: "red", value: "#F31559" },
  { name: "orange", value: "#F86F03" },
  { name: "green", value: "#7FB77E" },
  { name: "cyan", value: "#7FBCD2" },
  { name: "yellow", value: "#FBF0B2" },
  { name: "purple", value: "#A084E8" },
  { name: "blue", value: "#5776ff" },
];

const ul = document.querySelector("ul");

ul.addEventListener("click", function (event) {
  const clickedLi = event.target.closest("li");
  if (!clickedLi) return; // Clicked outside of a <li>

  const colorName = clickedLi.getAttribute("data-color");
  if (colorName) {
    changeAccent(colorName);
  }
});

function populateColorOptions() {
  colorOptions.forEach((color) => {
    const li = document.createElement("li");
    li.style.backgroundColor = color.value;
    li.setAttribute("data-color", color.name);
    ul.appendChild(li);
  });
}

function changeAccent(color) {
  document.documentElement.style.cssText = "--accent:" + color;
  localStorage.setItem("accent", color);
}

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

const prefersLightScheme = window.matchMedia("(prefers-color-scheme: light)").matches;
document.body.style.background = prefersLightScheme ? "var(--light)" : "var(--dark)";
document.body.style.color = prefersLightScheme ? "var(--black)" : "var(--light)";

// Event Listeners for Buttons and Window Load

// Window Load
window.addEventListener("load", defaultAccent);

// Main Buttons

generateButton.addEventListener("click", generatePassword);
resetButton.addEventListener("click", resetEverything);
clipboardButton.addEventListener("click", () => {
  copyToClipboard(passwordInput.value);
});

// Increment Decrement Buttons

incrementButton.addEventListener("click", () => {
  adjustValue(true);
});
decrementButton.addEventListener("click", () => {
  adjustValue(false);
});
