var inputDate = document.getElementById('js-date');
var inputTime = document.getElementById('js-time');

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

function formatarPercentualInteiro(componente) {
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

    componente.value = value == "0NaN" || value == "NaN" || value == "NaN%" ? "" : value;
    let integerPercent = document.getElementById('formatoPercentualIntegerBanco')
    integerPercent.value = converteNumero(componente.value)
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

var dateInputMask = function dateInputMask(elm) {
    elm.addEventListener('keyup', function (e) {
        if (e.keyCode < 47 || e.keyCode > 57) {
            e.preventDefault();
        }

        var len = elm.value.length;

        if (len !== 1 || len !== 3) {
            if (e.keyCode == 47) {
                e.preventDefault();
            }
        }

        if (len == 2 && e.keyCode != 8 && e.keyCode != 46) {
            elm.value += '/'
        }
        if (len == 5 && e.keyCode != 8 && e.keyCode != 46) {
            elm.value += '/'
        }

        checaValoresData(elm);
        let dateValue = document.getElementById('formatoDateBanco')
        dateValue.value = elm.value
    })
}

let checaValoresData = function (elem) {
    const dia = elem.value.substring(0, 2)
    const mes = elem.value.substring(3, 5)

    if (+dia > 31) {
        elem.value = '12' + elem.value.substring(2)
    } else if (dia == '00') {
        elem.value = '01' + elem.value.substring(2);
    }

    if (+mes > 12) {
        elem.value = elem.value.substring(0, 3) + '12' + elem.value.substring(5);
    } else if (mes == '00') {
        elem.value = elem.value.substring(0, 3) + '01' + elem.value.substring(5);
    }
}



let hourInputMask = function hourInputMask(elm) {
    elm.addEventListener('keyup', function (e) {
        if (e.keyCode < 47 || e.keyCode > 57) {
            e.preventDefault();
        }

        var len = elm.value.length;

        if (len !== 1 || len !== 3) {
            if (e.keyCode == 47) {
                e.preventDefault();
            }
        }

        if (len == 2 && e.keyCode != 8 && e.keyCode != 46) {
            elm.value.replace(/[\D]+/g, '') += ':'
        }

        checaValoresHora(elm);
        let timeValue = document.getElementById("formatoTimeBanco")
        timeValue.value = elm.value;
    })
}

var checaValoresHora = function (elem) {
    const hora = elem.value.substring(0, 2);
    const minuto = elem.value.substring(3, 4);

    if (+hora > 23) {
        elem.value = '23' + elem.value.substring(2);
    }
    if (+minuto > 59) {
        elem.value = elem.value.substring(0, 3) + '59';
    }
}

function validaHora(componente) {
    const regexHora = /^(2[0-3]|[0-1]?[\d]):[0-5][\d]$/
    const result = regexHora.test(componente.value)
    if (!result && componente.value.length > 0) {
        componente.value = ''
        alert('favor verificar o horário informado')
        componente.focus();
    }
}

dateInputMask(inputDate);
hourInputMask(inputTime)
window.onload = function () {
    let inputs = document.getElementsByTagName('input')
    for (i = 0; i < inputs.length; i++) {
        inputs[i].autocomplete = "off";
        if (inputs[i].disabled) {
            inputs[i].style.color = "#FFF"
        }
    }
}