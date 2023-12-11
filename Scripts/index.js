var formInput = document.getElementById("formInput");
var loginBtn = document.getElementById("loginBtn");


function saveUserID() {
    if (/^\d+$/.test(formInput.value) && formInput.value.length <= 4) {
        localStorage.setItem("UserID", formInput.value)
        window.location.href = "./options.html";
    } else {
        alert("Invalid credentials. Please enter a numeric value with a maximum length of 4.");
    }
}
loginBtn.addEventListener('click', saveUserID);