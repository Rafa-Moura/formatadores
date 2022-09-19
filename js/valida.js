function enviar(event) {
  if (!validaDoubleSubmit()) {
    event.preventDefault();
    return false;
  } else {
    alert("ok");
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
      REGEX_DOUBLE.test(element.value) ||
      !REGEX_MASCARA_DOUBLE.test(element.value)
    ) {
      alert("Valor incorreto para o tipo double!");
      element.focus();
      return false;
    }
  }
  return true;
}
