function reset() {
    document.getElementById('password').value = '';
    document.getElementById('length').value = '6';
}

function clipboard() {
    const pass = document.getElementById('password');
    pass.select();
    pass.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(pass.value);
}

//Generating Everything Seperately to avoid similar character (HTML Charset)
// You can refer to https://www.w3schools.com/html/html_charset.asp
// Special (33-47)
// Number (48-57)
// Uppercase (65-90)
// Lowercase (97-122)
let random = '';
function generate_num() {
    random = Math.floor(Math.random() * 10); // Random from (0-9) 10 in Total
    return String.fromCharCode(parseInt(random + 48));
}

function generate_lowerclass() {
    random = Math.floor(Math.random() * 27); // Random from (0-25) 26 in Total
    return String.fromCharCode(parseInt(random + 97));
}

function generate_upperclass() {
    random = Math.floor(Math.random() * 27); //Random from (0-25) 26 in Total
    return String.fromCharCode(parseInt(random + 65));
}

function generate_special() {
    random = Math.floor(Math.random() * 18); // Random from (0-17) 18 in Total
    console.log(random);
    return String.fromCharCode(parseInt(random + 33));
}
 
function generate() {
    console.clear();
    const pass = document.getElementById('password');
    let result = '';
    pass.value = result;

    // To get the value from Input field (length of Password)
    let length = document.getElementById('length').value;

    // To check if they are checked
    let number = document.getElementById('number').checked;
    let uppercase = document.getElementById('uppercase').checked;
    let lowercase = document.getElementById('lowercase').checked;
    let special = document.getElementById('special').checked;

    for(let i=0; i<length; i++) {
        if(number) { // returns True if Number is checked
            result += generate_num();
        }
        if(uppercase) { // returns True if Uppercase is checked
            result += generate_upperclass();
        }
        if(lowercase) { // returns True if Lowercase is checked
            result += generate_lowerclass();
        }
        if(special) { // returns True if Special Character is checked
            result += generate_special();
        }
    }
    // Result
    pass.value = result.slice(0,length);
}