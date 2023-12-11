var btnOptionExibit = document.getElementById('btn-option-exibit')
var btnOptionAnnual = document.getElementById('btn-option-annual')

btnOptionExibit.addEventListener(
    'click',
    function () {
        window.location.href = "./main.html";
    }
)

btnOptionAnnual.addEventListener(
    'click',
    function () {
        window.location.href = "./options.html";
    }
)