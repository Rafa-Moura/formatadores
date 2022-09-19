//FUNÇÃO QUE FAZ O ENVIO DOS DADOS AO BACKEND SE TUDO ESTIVER CORRETO

function enviar(event) {
  let valida = true;

  if (!validaDadosBackEnd()) {
    event.preventDefault();
    valida = false;
  }

  if (valida) {
    alert("Ok");
  }
}

//FUNÇÕES CARREGADAS NO ONBLUR DOS CAMPOS PARA VALIDAR OS VALORES INSERIDOS APÓS RETIRAR O FOCO DO CAMPO

function onblurTipoDouble(componente) {
  let value = componente.value;
  let valueReplace = value.replace(",", "").replace(".", "");
  for (i = 0; i < value.length; i++) {
    if (valueReplace.charCodeAt(i) < 48 || valueReplace.charCodeAt(i) > 57) {
      value = "";
    }
  }
  componente.value = value;
}

function onblurTipoInteiro(componente) {
  let value = componente.value;
  let valueReplace = value.replace("-", "");
  for (i = 0; i < value.length; i++) {
    if (valueReplace.charCodeAt(i) < 48 || valueReplace.charCodeAt(i) > 57) {
      value = "";
      alert("Valor incorreto para o tipo inteiro");
    }
  }
  componente.value = value;
}

function onblurTipoData(componente) {
  var pattern = /\d{2}\/\d{2}\/\d{4}/;
  var teste = pattern.test(componente.value);
  if (!teste && componente.value != "") {
    alert("Campo de data inválido");
    componente.value = "";
    componente.focus();
  }
}

function onblurTipoHora(componente) {
  var pattern = /(\d{2}\:\d{2}\:\d{2})|(\d{2}\:\d{2})/g;
  var teste = pattern.test(componente.value);
  var validaHora = componente.value.length > 5 && componente.value.length < 8;
  if ((!teste && componente.value != "") || validaHora) {
    componente.value = "";
    componente.focus();
    alert("Campo de hora inválido");
  }
}

function onblurTipoPercentual(componente) {
  let value = componente.value;
  let valueReplace = value.replace("%", "").replace(",", "");
  console.log(value);
  for (i = 0; i < value.length; i++) {
    if (valueReplace.charCodeAt(i) < 48 || valueReplace.charCodeAt(i) > 57) {
      value = "";
    }
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
  const REGEX_DOUBLE = /([a-zA-Z])|([^0-9\,\.])+/g;
  const REGEX_MASCARA_DOUBLE = /((\d{1,3}\.))|(\d{1,3}\,)(\d{2})/g;
  for (i = 0; i < inputDouble.length; i++) {
    if (inputDouble[i].value == "") {
      alert("Favor preencher todos os valores");
      inputDouble[i].focus();
      return false;
    }
    if (
      REGEX_DOUBLE.test(inputDouble[i].value) ||
      !REGEX_MASCARA_DOUBLE.test(inputDouble[i].value)
    ) {
      alert("Valor incorreto para o tipo double!");
      inputDouble[i].focus();
      return false;
    }
  }
  return true;
}

function validaInteiroSubmit() {
  let inputInteiro = document.getElementsByClassName("TIPO_IN");
  for (i = 0; i < inputInteiro.length; i++) {
    let valorReplace = inputInteiro[i].value.replace("-", "");
    if (valorReplace.charCodeAt(i) < 48 || valorReplace.charCodeAt(i) > 57) {
      alert("Valor incorreto no tipo inteiro");
      inputInteiro[i].focus();
      return false;
    }
    if (inputInteiro[i].value == "") {
      alert("Preencher todos os valores");
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
  const REGEX_HORA = /(\d{2}\:\d{2}\:\d{2})|(\d{2}\:\d{2})/g;
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
