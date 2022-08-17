function formatarDouble(componente, event) {

    value = componente.value;

    value = value + ''
    value = parseInt(value.replace(/[\D]+/g, ''))
    value = value + ''
    value = value.replace(/([0-9]{2})$/g, ',$1')

    if (value.length > 2 && value.length <= 3) {
        value = "0" + value;
    }

    if (value.length == 1) {
        value = "0,0" + value;
    }

    if (value == "0,00" && event.keyCode == 8) {
        value = ""
    }

    value = denifinirMilhares(value);
    componente.value = value == "0NaN" || value == "NaN" ? "" : value;

    console.log(componente.value.replace(",", "."))
}

function denifinirMilhares(moeda) {
    var novoValor = '';
    var milhares = '';
    var j = 0;
    if (moeda.length > 3) {
        novoValor = moeda.substring(0, moeda.length - 3)
        for (i = novoValor.length; i >= 0; i--) {
            if (i != 0 && i % 3 == 0 && j != 0) {
                milhares += '.';
            }
            milhares += novoValor.charAt(j++)
        }
    }
    return milhares + moeda.substring(moeda.length - 3, moeda.length)
}

function formatarInteiro(componente) {
    value = componente.value

    if (value[0] == "-") {
        componente.maxLength = 4;
    } else {
        componente.maxLength = 3;
    }

    if (value[0] == "-" && value[1] == "0") {
        alert("0 não pode ser número negativo")
        value = "";
    }

    if (value.length == 1) {
        value = value.replace(/[^-0-9]/g, "");//primeiro caractere deve ser hífen ou números
    } else if (value.length == 2) {
        value = value.replace(/[^0-9]$/g, "");//segundo caractere só pode ser número
    } else if (value.length >= 3) {
        value = value.replace(/(([^0-9].)|([^0-9]))$/g, "");//adicionado para caso o usuário pressione duas teclas ao mesmo tempo e uma delas não seja número
        value = value.replace(/\B[^0-9]{1,}\B/g, "");// non-word-boundary para selecionar posições dentro de uma palavra. (caso o usuário mova o cursor e tente inserir alguma letra entre os números)            
        value = value.replace(/\b[^0-9]{1,}\b/g, "");//word boundary para selecionar a posição antes ou depois de uma palavra. (caso o usuário mova o cursor e tente inserir algum caractere entre os números)            
    }
    componente.value = value;
}

function formatarPercentualInteiro(componente) {
    value = componente.value;

    value = value + ''
    value = parseInt(value.replace(/[\D]+/g, ''))
    value = value + ''
    value = value.replace(/([0-9])$/g, '$1')

    componente.value = value == "0NaN" || value == "NaN" ? "" : value;
    console.log(componente.value.replace(",", "."))
}

function formatarPercentualDecimal(componente) {
    value = componente.value;

    value = value + ''
    value = parseInt(value.replace(/[\D]+/g, ''))
    value = value + ''
    value = value.replace(/([0-9]{4})$/g, ',$1')

    if (value.length == 1) {
        value = "0,000" + value;
    }

    if (value.length >= 2 && value.length < 3) {
        value = "0,00" + value;
    }

    if (value.length >= 3 && value.length <= 4) {
        value = "0,0" + value
    }

    if (value.length > 4 && value.length <= 5) {
        value = "0" + value;
    }


    if (value == "0,0000" && event.keyCode == 8) {
        value = ""
    }

    componente.value = value == "0,0NaN" || value == "NaN" ? "" : value;
    console.log(componente.value.replace(",", "."))
}

window.onload = function () {
    let inputs = document.getElementsByTagName('input')
    for (i = 0; i < inputs.length; i++) {
        inputs[i].autocomplete = "off";
    }
}