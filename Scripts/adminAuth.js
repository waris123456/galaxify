// Code by Abdul Waris
var adminUn = document.getElementById('adminUn');
var adminPass = document.getElementById('adminPass');
var adminLogBtn = document.getElementById('adminLogBtn');

function handleAdminAuth() {
    var usernameValue = adminUn.value;
    var passwordValue = adminPass.value;

    if (usernameValue === "adminbms" && passwordValue === "admin1097") {
        console.log("Authentication successful");
        window.location.href = "./admin.html"
    } else {
        console.log("Authentication failed");
        alert("Invalid credentials")
        location.reload(true)
    }
}

adminLogBtn.addEventListener(
    'click',
    (event) => {
        event.preventDefault();
        handleAdminAuth();
    }
);
