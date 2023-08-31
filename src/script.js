// Main Password Related Codes
let password = document.getElementById("password");
let number = document.getElementById("number");
let lowercase = document.getElementById("lowercase");
let uppercase = document.getElementById("uppercase");
let special = document.getElementById("special");
let length = document.getElementById("length");
let red = document.getElementById("red");
let green = document.getElementById("green");
let blue = document.getElementById("blue");
let random;


function reset() {
    password.value = "";
    length.value = 6;
    number.checked = true;
    lowercase.checked = true;
    uppercase.checked = true;
    special.checked = true;
}

function clipboard() {
    if(password.value === "") {
        window.alert("You Need to Generate Password First");
    } else {
        password.select();
        password.setSelectionRange(0, 99999); // For mobile devices
        navigator.clipboard.writeText(password.value);
    }
}

//Generating Everything Seperately to avoid similar character (HTML Charset)
// You can refer to https://www.w3schools.com/html/html_charset.asp
// Number (48-57)
// Uppercase (65-90)
// Lowercase (97-122)
// For Special Characters we will be using an Array Set (Cuz it is btter that way)


function generate_num() {
    random = Math.floor(Math.random() * 10); // Random from (0-9) 10 in Total
    return String.fromCharCode(parseInt(random + 48));
}

function generate_lowerclass() {
    random = Math.floor(Math.random() * 26); // Random from (0-25) 26 in Total
    return String.fromCharCode(parseInt(random + 97));
}

function generate_upperclass() {
    random = Math.floor(Math.random() * 26); //Random from (0-25) 26 in Total
    return String.fromCharCode(parseInt(random + 65));
}

function generate_special() {
    const select = ['!','@','#','$','%','^','&','*','(',')',
                    '-','=','_','+','/','[',']','{','}',';',
                    ':','"','<','>','.','?','/','|','\'','\\']
    random = Math.floor(Math.random() * 30); // Random from (0-30) 31 in Total
    return select[random];
}
 
function generate() {
    // To check if they are checked
    if(uppercase.checked || lowercase.checked || number.checked || special.checked) {
        let result = '';
        password.value = result;

        for(let i=0; i<length.value; i++) {

            if(uppercase.checked) { // returns True if Uppercase is checked
                result += generate_upperclass();
            }
            if(lowercase.checked) { // returns True if Lowercase is checked
                result += generate_lowerclass();
            }
            if(number.checked) { // returns True if Number is checked
                result += generate_num();
            }
            if(special.checked) { // returns True if Special Character is checked
                result += generate_special();
            }
        }

        // Result
        password.value = result.slice(0,length.value);
    } else {
        window.alert("Make sure one of them is checked Atleast");
    }
}

// Increment - Decrement

function increment() {
    length.value = ++length.value;
    if(length.value > 12) {
        window.alert("Number greater than 12 is hard to remember. If you still want to proceed, you can type it manually");
        length.value = 12;
    }
}

let decrement = () => {
    length.value = --length.value;
    if(length.value < 6) {
        window.alert("Minimum suggested length of the Password is 6.");
        length.value = 6;
    }
}

// Accent


let defaultColor = () => {
    let get = localStorage.getItem("accent");
    let elements = document.querySelectorAll("li");
    elements.forEach(element => {
        document.getElementById(element.id).style.background = element.id;
    });
    if(get === null) {
        let color = "#ff4848";
        localStorage.setItem("accent", color);
        document.documentElement.style.cssText = "--accent: "+ color;
        document.documentElement.style.accentColor = color;
    } else {
        document.documentElement.style.cssText = "--accent:" + get;
        document.documentElement.style.accentColor = get;
    }
}

let changeAccent = (args) => {
    document.documentElement.style.cssText = "--accent:" + args;
    document.documentElement.style.accentColor = args;
    localStorage.setItem("accent", args);
}

// Day/Night Mode

if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    // document.body.style.background = 'var(--light)';
} else {
    document.body.style.background = 'var(--dark)';
}