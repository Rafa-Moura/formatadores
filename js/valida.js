//FUNÇÃO QUE FAZ O ENVIO DOS DADOS AO BACKEND SE TUDO ESTIVER CORRETO
const valoresForm = {
  valorDouble: "",
  valorInteiro: "",
  valorPercentual: "",
  valorPercentualInteiro: "",
  valorString: "",
  valorData: "",
  valorHora: "",
  valorCharset: "",
};

function enviar(event) {
  let valida = true;

  event.preventDefault();
  if (!validaDadosBackEnd()) {
    valuda = false;
    return false;
  }

  if (valida) {
    event.preventDefault();
    let input = document.getElementsByTagName("input");
    for (i = 0; i < input.length; i++) {
      if (input[i].className == "TIPO_DB") {
        valoresForm.valorDouble = input[i].value
          .split(".")
          .join("")
          .replace(",", ".");
      }
      if (input[i].className == "TIPO_IN") {
        valoresForm.valorInteiro = input[i].value;
      }
      if (input[i].className == "TIPO_PC") {
        valoresForm.valorPercentual = input[i].value
          .replace("%", "")
          .replace(",", ".");
      }
      if (input[i].className == "TIPO_PI") {
        valoresForm.valorPercentualInteiro = input[i].value.replace("%", "");
      }
      if (input[i].className == "TIPO_ST") {
        valoresForm.valorString = input[i].value.trim();
      }
      if (input[i].className == "TIPO_DT") {
        valoresForm.valorData = input[i].value;
      }
      if (input[i].className == "TIPO_HR") {
        valoresForm.valorHora = input[i].value;
      }
      if (input[i].className == "TIPO_CS") {
        valoresForm.valorCharset = input[i].value.trim();
      }
    }
    console.log(valoresForm);
  }
}

//FUNÇÕES CARREGADAS NO ONBLUR DOS CAMPOS PARA VALIDAR OS VALORES INSERIDOS APÓS RETIRAR O FOCO DO CAMPO

function onblurTipoDouble(componente) {
  let value = componente.value;
  const REGEX_DOUBLE =
    /^(\d{1,3}\.)*([0-9]{3})\,([0-9]{2}$)|^([0-9]{1,3})\,([0-9]{2}$)/g;
  if (!REGEX_DOUBLE.test(value) && value != "") {
    value = "";
    componente.focus();
    alert("Valor incorreto pro tipo double");
  }
  componente.value = value;
}

function onblurTipoInteiro(componente) {
  let value = componente.value;
  const REGEX_INTEIRO = /^((\-?\d{1,})$)/g;
  if (!REGEX_INTEIRO.test(value) && value != "") {
    value = "";
    alert("Valor incorreto para o tipo inteiro");
    componente.focus();
  }
  componente.value = value;
}

function onblurTipoData(componente) {
  let value = componente.value;
  const REGEX_DATA = /^(\d{2}\/\d{2}\/\d{4})$/g;
  if (!REGEX_DATA.test(value) && value != "") {
    alert("Campo de data inválido novo");
    value = "";
    componente.focus();
  }
  componente.value = value;
}

function onblurTipoHora(componente) {
  let value = componente.value;
  const REGEX_HORA = /^(\d{2}\:\d{2}\:\d{2})|(\d{2}\:\d{2})$/g;
  if (!REGEX_HORA.test(value) && value != "") {
    value = "";
    componente.focus();
    alert("Campo de hora inválido");
  }
  componente.value = value;
}

function onblurTipoPercentual(componente) {
  let value = componente.value;
  const REGEX_PERCENTUAL_DECIMAL = /^((\d{1,3})\,(\d{4})\%?$)/g;
  if (!REGEX_PERCENTUAL_DECIMAL.test(value) && value != "") {
    value = "";
    componente.focus();
    alert("Valor incorreto para o tipo Percentual");
  }

  if (value != "") {
    value = value + "%";
  }

  componente.value = value;
}

function onblurTipoPercentualInteiro(componente) {
  let value = componente.value;
  const REGEX_PERCENTUAL_INTEIRO = /^(\d{1,}\%?$)/gm;
  if (!REGEX_PERCENTUAL_INTEIRO.test(value) && value != "") {
    value = "";
    componente.focus();
    alert("Valor incorreto para o tipo Percentual Inteiro");
  }

  if (value != "") {
    value = value + "%";
  }

  componente.value = value;
}

function onblurTipoCharString(componente) {
  value = componente.value;
  componente.value = value.trim();
}

//FUNÇÕES PARA VALIDAR OS CAMPOS ANTES DE ENVIAR AO BACKEND

function validaDoubleSubmit() {
  let inputDouble = document.getElementsByClassName("TIPO_DB");
  const REGEX_DOUBLE =
    /^(\d{1,3}\.)*([0-9]{3})\,([0-9]{2}$)|^([0-9]{1,3})\,([0-9]{2}$)/g;
  for (i = 0; i < inputDouble.length; i++) {
    if (inputDouble[i].value == "") {
      alert("Favor preencher todos os valores");
      inputDouble[i].focus();
      return false;
    }
    if (!REGEX_DOUBLE.test(inputDouble[i].value)) {
      alert("Valor incorreto para o tipo Double");
      console.log(inputDouble[i].value);
      console.log(REGEX_DOUBLE.test(inputDouble[i].value));
      inputDouble[i].focus();
      return false;
    }
    return true;
  }
}

function validaInteiroSubmit() {
  let inputInteiro = document.getElementsByClassName("TIPO_IN");
  const REGEX_INTEIRO = /^((\-?[0-9]{1,})$)/g;
  for (i = 0; i < inputInteiro.length; i++) {
    if (inputInteiro[i].value == "") {
      alert("Preencher todos os valores");
      inputInteiro[i].focus();
      return false;
    }
    if (!REGEX_INTEIRO.test(inputInteiro[i].value)) {
      alert("Valor incorreto no tipo inteiro");
      inputInteiro[i].focus();
      return false;
    }
  }
  return true;
}

function validaDataSubmit() {
  let inputData = document.getElementsByClassName("TIPO_DT");
  const REGEX_DATA = /\d{2}\/\d{2}\/\d{4}/;
  for (let i = 0; i < inputData.length; i++) {
    var teste = REGEX_DATA.test(inputData[i].value);
    if (!teste && inputData[i].value != "") {
      alert("Campo de data inválido");
      inputData[i].value = "";
      inputData[i].focus();
      return false;
    }
    if (inputData[i].value == "") {
      inputData[i].focus();
      return false;
    }
  }
  return true;
}

function validaHoraSubmit() {
  let inputHora = document.getElementsByClassName("TIPO_HR");
  const REGEX_HORA = /^(\d{2}\:\d{2}\:\d{2})|(\d{2}\:\d{2})$/g;
  for (let i = 0; i < inputHora.length; i++) {
    let teste = REGEX_HORA.test(inputHora[i].value);
    let validaHora =
      inputHora[i].value.length > 5 && inputHora[i].value.length < 8;
    if ((!teste && inputHora[i].value != "") || validaHora) {
      inputHora[i].value = "";
      inputHora[i].focus();
      alert("Campo de hora inválido");
      return false;
    }
    if (inputHora[i].value == "") {
      inputHora[i].focus();
      alert("Favor preencher todos os campos");
      return false;
    }
  }
  return true;
}

function validaDadosBackEnd() {
  if (!validaInteiroSubmit()) {
    return false;
  }

  if (!validaDataSubmit()) {
    return false;
  }

  if (!validaHoraSubmit()) {
    return false;
  }

  if (!validaDoubleSubmit()) {
    return false;
  }
  // if (!validaPercentual()) {
  //   return false;
  // }

  return true;
}

// AÇÕES EXECUTADAS AO CARREGAR COMPLETAMENTE A PÁGINA

window.onload = function () {
  let inputs = document.getElementsByTagName("input");
  for (i = 0; i < inputs.length; i++) {
    inputs[i].autocomplete = "off";
    if (inputs[i].disabled) {
      inputs[i].style.color = "#FFF";
    }
  }
};
