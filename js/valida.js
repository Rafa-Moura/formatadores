function validarTipoDouble(valida) {
    var inputsDouble = document.getElementsByClassName('TIPO_DB');
    for (i = 0; i < inputsDouble.length; i++) {
        if (inputsDouble[i].value == '' || inputsDouble[i].value < 0) {
            valida = false;
            return valida;
        }
    }
    valida = true;
    return valida;
}

function enviar(event) {
    let input = document.getElementsByTagName('input')
    let valida = false;
    for (i = 0; i < input.length; i++) {
        if (input[i].value == '') {
            input[i].focus();
            input[i].style.border = "1px solid #F17575"
            valida = false;
            event.preventDefault();
            return;
        }
        validarTipoDouble(valida)
        input[i].style.border = "1px solid #000"
        valida = true;
    }
    if (!valida) {
        event.preventDefault();
    } else {
        alert('Ok')
    }
}