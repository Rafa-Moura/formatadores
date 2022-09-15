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
    let double = document.getElementById('formatoDoubleBanco');
    double.value = converteNumero(componente.value)
}

const converteNumero = (valor) => {
    return valor.replace(/[^\d,]+/g, '')
        .replace(',', '.');
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

    if (value[0] == "-" && value[1] == "0") {
        alert("0 não pode ser número negativo")
        value = "";
    }

    if (value[0] == "0" && value[1] == "0") {
        value = "0"
    } else if (value[0] == "0" && value[1] > "0") {
        value = value.replace("0", "");
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
    let integer = document.getElementById('formatoIntegerBanco');
    integer.value = componente.value
    componente.value = value;
}

function limpaCampoInteiro(componente) {
    value = componente.value
    if (value.length == 1 && value == '-') {
        value = '';
    }
    componente.value = value
}

function formatarPercentualInteiro(componente, event) {
    value = componente.value;

    value = value + ''
    value = parseInt(value.replace(/[\D]+/g, ''))
    value = value + ''
    value = value.replace(/([0-9])$/g, '$1')


    if (value.length >= 1 && value.length < 5) {
        value = value + '%'
    }

    var simbolo = value.length - 1;
    if (simbolo == "%" || event.keyCode == 8) {
        value = value.replace("%", '')
    }

    if (value.length == 3 && event.keyCode != 37) {
        value = value + '';
    }
    componente.value = value == "0NaN" || value == "NaN" || value == "NaN%" ? "" : value;
    checaPercentualInteiro(componente)
    let integerPercent = document.getElementById('formatoPercentualIntegerBanco')
    integerPercent.value = converteNumero(componente.value)
}

function colocaSimbolo(componente) {
    value = componente.value;
    var simbolo = value.lastIndexOf("%");
    if (value[simbolo] !== "%") {
        value = value + "%"
    }

    var checaValor = value.replace("%", '')

    if (checaValor > 999) {
        alert("Valor de percentual inteiro não pode ser maior que 999")
        value = '';
        componente.focus()
    }

    componente.value = value;
}

function checaPercentual(componente) {
    var valorReplace = componente.value.replace("%", "");
    var antesSimbolo = componente.value.substring(0, 3);
    var posSimbolo = componente.value.substring(4, 9);
    var simbolo = componente.value.lastIndexOf(",")
    if (valorReplace.length > 8) {
        componente.value = antesSimbolo + posSimbolo + '%';
        componente.focus();
        // alert("Você inseriu um valor maior que 999.9999 (valor digitado " + valorDigitado + ") para o campo percentual. Apenas valores menores ou iguais a 999.9999")
        return;
    }
    console.log(componente.value.substring(0,simbolo))
    if(componente.value.substring(0,simbolo).length >= 4){
        componente.value = ''
        alert("Ops, valor digitado de maneira incorreta. Tente novamente")
    }
}

function checaPercentualInteiro(componente) {
    var valorReplace = componente.value.replace("%", "");
    var valorDigitado = componente.value;
    if (valorReplace.length >= 4) {
        componente.value = valorReplace.substring(0, 3) + '%';
        componente.focus();
        // alert("Você inseriu um valor maior que 999 (valor digitado " + valorDigitado + ") para o campo percentual inteiro. Apenas valores menores ou iguais a 999")
        return;
    }
}

function formatarPercentualDecimal(componente, event) {
    value = componente.value;

    value = value + ''
    value = parseInt(value.replace(/[\D]+/g, ''))
    value = value + ''
    value = value.replace(/([0-9]{4})$/g, ',$1')



    if (value.length == 1) {
        value = "0,000" + value
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

    if (value.length >= 6 && value.length <= 8) {
        value = value + '%'
    }

    var simbolo = value.length - 1;
    if (simbolo == "%" || event.keyCode == 8) {
        value = value.replace("%", '')
    }

    if (value == "0,0000" && event.keyCode == 8) {
        value = ""
    }

    componente.value = value == "0,0NaN" || value == "0,0NaN%" || value == "NaN" ? "" : value;
    checaPercentual(componente)
    let doublePercent = document.getElementById('formatoDoublePercentBanco')
    doublePercent.value = converteNumero(componente.value)
}

function removeEspacos(componente) {
    value = componente.value
    componente.value = value.trim();
}

function validaString(componente) {
    value = componente.value
    let total = value.length - 1;
    if (value[0] == ' ') {
        value = value.trim()
    }
    componente.value = value;
    let stringValue = document.getElementById('formatoStringBanco')
    stringValue.value = componente.value
}

function validaChar(componente) {
    value = componente.value
    let total = value.length - 1;
    if (value[0] == ' ') {
        value = value.trim()
    }
    componente.value = value;
    let charValue = document.getElementById('formatoCharBanco')
    charValue.value = componente.value
}

function formatarData(data) {
    valor = data.value
    valor = valor.replace(/\D/g, "");
    valor = valor.replace(/(\d{2})(\d)/, "$1/$2");
    valor = valor.replace(/(\d{2})(\d)/, "$1/$2");

    data.value = valor;
    validarData(data)
    var formatoDateBanco = document.getElementById('formatoDateBanco');
    formatoDateBanco.value = valor;
}

function validarData(data) {
    const dia = data.value.substring(0, 2);
    const mes = data.value.substring(3, 5);
    let ano = data.value.substring(6, 10);

    if (dia > '31') {
        data.value = '' + data.value.substring(2)
        return;
    }
    if (mes > '12') {
        data.value = dia + '/' + ''
        return;
    }

    if (ano > '2999') {
        data.value = dia + '/' + mes + '/' + '2999'
        return;
    }
}

function formatarHora(hora) {
    valor = hora.value
    valor = valor.replace(/\D/g, "");
    valor = valor.replace(/(\d{2})(\d)/, "$1:$2");
    valor = valor.replace(/(\d{2})(\d)/, "$1:$2");

    hora.value = valor;
    validarHora(hora)
    var formatoTimeBanco = document.getElementById('formatoTimeBanco');
    formatoTimeBanco.value = valor;

}

function validarHora(componente) {
    const hora = componente.value.substring(0, 2);
    const minuto = componente.value.substring(3, 5);
    const segundo = componente.value.substring(6, 7);
    if (hora > '24') {
        componente.value = '' + componente.value.substring(2)
        return;
    }
    if (minuto > '59') {
        componente.value = hora + ':' + ''
        return;
    }
    if (segundo > '59') {
        componente.value = hora + ':' + minuto + ''
        return;
    }
}

function checaData(componente) {
    var pattern = (/\d{2}\/\d{2}\/\d{4}/)
    var teste = pattern.test(componente.value)
    if (!teste && componente.value != '') {
        alert("Campo de data inválido")
        componente.value = ''
        componente.focus()
    }
}

function checaHora(componente) {
    var pattern = (/(\d{2}\:\d{2}\:\d{2})|(\d{2}\:\d{2})/g)
    var teste = pattern.test(componente.value)
    var validaHora = componente.value.length > 5 && componente.value.length < 8
    console.log(teste)
    if (!teste && componente.value != '' || validaHora) {
        componente.value = ''
        componente.focus()
        alert("Campo de hora inválido")
    }
}

window.onload = function () {
    let inputs = document.getElementsByTagName('input')
    for (i = 0; i < inputs.length; i++) {
        inputs[i].autocomplete = "off";
        if (inputs[i].disabled) {
            inputs[i].style.color = "#FFF"
        }
    }
}
