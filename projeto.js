//Declaração de variaveis
const form = document.querySelector("form");
const listaDeItens = document.querySelector(".listaDeItens");
let itensArr =
  JSON.parse(localStorage.getItem("lista")) === null
    ? []
    : JSON.parse(localStorage.getItem("lista"));

//Declaração de funções

//Salvar as divs criadas no localstorage
const mandarDivParaLocalStorage = (listaDeItens) => {
  localStorage.setItem("div", JSON.stringify(listaDeItens.innerHTML));
};

//Carregar div no DOM
const carregarDiv = () => {
  if (JSON.parse(localStorage.getItem("div")) != null) {
    console.log('Lista carregada')
    document.querySelector(".listaDeItens").innerHTML = `${JSON.parse(
      localStorage.getItem("div"))}`;
  } 
};

//Recuperar lista do localstorage
const pegarListaDoStorage = () => {
  if (JSON.parse(localStorage.getItem("lista")).length > 0) {
    console.log("peguei a lista");
    return JSON.parse(localStorage.getItem("lista"));
  } else {
    console.log("retornei vazio");
    return [];
  }
};

//Marcando texto
const tacharTexto = () => {
  console.log("Entrei na função");
  const idDaDiv = this.document.activeElement.parentNode.parentNode.parentNode.getAttribute("id");
  const divSuperior = document.getElementById(idDaDiv);
  console.log(idDaDiv)
  console.log(divSuperior.querySelector('input'))
  divSuperior.querySelector('input').style = 'display:none'
  divSuperior.classList.toggle("tachado");
  mandarDivParaLocalStorage(listaDeItens);
};

// Adiciona item confirmado ao div no DOM
const adionarItemAoDiv = (x) => {
  console.log("Mostrei a lista");
  listaDeItens.innerHTML = 
  listaDeItens.innerHTML + 
  `<div id='d${x}' onclick='tacharTexto()' class='itens'>
    <div class='itens2'><div><input type='checkbox'></div>
    <div><label>${x}</label></div></div>
    <div class='itens3'><button onclick='removerItemConfirmado()' id='${x}' >X</button><div>
    </div>`;
};

//Adicionando item a lista
const adicionarItemALista = (itensArr, atividade) => {
  itensArr.push(atividade);
  console.log("Adicionei a lista");
};

//Mandando item para localstorage
const mandarParaLocalStorage = (itensArr) => {
  localStorage.setItem("lista", JSON.stringify(itensArr));
  console.log("Mandei para storage");
};

//Removendo itens da lista, localstorage e dom
const removerItem = () => {
  const idForTheDiv = this.document.activeElement.getAttribute("id");
  const idDiv = document.getElementById("d" + idForTheDiv);
  let pos = itensArr.indexOf(idForTheDiv);
  itensArr.splice(pos, 1);
  idDiv.remove();
  mandarDivParaLocalStorage(listaDeItens);
  mandarParaLocalStorage(itensArr)
};

//Confirmação que quer remover um item
const removerItemConfirmado = () => {
  if(window.confirm('Tem certeza que quer remover esse item?')){
    removerItem();
  }
}

// Pegando informações do form e salvando no localStorage
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const atividade = document.querySelector("#atividade").value;
  adicionarItemALista(itensArr, atividade);
  mandarParaLocalStorage(itensArr);
  adionarItemAoDiv(atividade);
  mandarDivParaLocalStorage(listaDeItens);
  carregarDiv();
  form.reset();
});

window.onload = () => {
  carregarDiv();
};
