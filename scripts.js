import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBcbNAYEQwpFMIeUYuQUFhbNRfpg-Wx7EI",
    authDomain: "cefas-d2456.firebaseapp.com",
    projectId: "cefas-d2456",
    storageBucket: "cefas-d2456.appspot.com",
    messagingSenderId: "103060019553",
    appId: "1:103060019553:web:0f7e54f933a8eaaaa94d20"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function criarCalendario(mes, eventos) {
  var dataAtual = new Date();
  var numeroMes = mes;
  var nomesMeses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  var nomeMesAtual = nomesMeses[numeroMes];

  var body = document.getElementById("calendar");

  var primeiroDiaMes = new Date(dataAtual.getFullYear(), numeroMes, 1);
  var primeiroDiaSemana = primeiroDiaMes.getDay();

  var diaSemana = (primeiroDiaSemana - 1 + 7) % 7;  // Ajuste para começar a semana a partir de segunda-feira

  var ultimoDia = new Date(dataAtual.getFullYear(), numeroMes + 1, 0).getDate();

  var html = "<header><h2>" + nomeMesAtual + " 2024</h2></header><table><thead><tr><th>Domingo</th><th>Segunda</th><th>Terça</th><th>Quarta</th><th>Quinta</th><th>Sexta</th><th>Sábado</th></tr></thead><tbody><tr>";

  for (var i = 0; i < diaSemana; i++) {
      html += "<td></td>";
  }

  for (var dia = 1; dia <= ultimoDia; dia++) {
    var eventoDoDia = eventos[dia];
    var classeEvento = eventoDoDia ? 'evento' : '';

    var cell = document.createElement("td");
    cell.className = classeEvento;
    cell.textContent = dia;

    // Incluindo o evento dentro da célula
    if (eventoDoDia) {
     
  
      var eventoSpan = document.createElement("p");
      eventoSpan.textContent = eventoDoDia;
   
      cell.appendChild(eventoSpan);
    }

    html += cell.outerHTML;

    if ((dia + diaSemana) % 7 === 0) {
        html += "</tr><tr>";
    }
  }

  while ((ultimoDia + diaSemana) % 7 !== 0) {
      html += "<td></td>";
      ultimoDia++;
  }

  html += "</tr></tbody></table>";

  body.innerHTML = html;
}



async function carregarEventosDoBancoDeDados() {
    try {
        const querySnapshot = await getDocs(collection(db, "eventos"));
        const eventosDoBanco = {};

        querySnapshot.forEach((doc) => {
            const { dia, mes, evento } = doc.data();
            eventosDoBanco[dia] = evento;
        });

        return eventosDoBanco;
    } catch (error) {
        console.error("Erro ao carregar eventos do banco de dados:", error);
        return {};
    }
}

function verificarMudancaDeMes() {
  const today = new Date();
  const newMonth = today.getMonth();
  
  if (newMonth !== month) {
    month = newMonth;
    document.dispatchEvent(new Event('changeMonth'));
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  const eventosDoBanco = await carregarEventosDoBancoDeDados();
  
   today = new Date();
   month = today.getMonth();
  
  criarCalendario(month, eventosDoBanco);

  document.getElementsByClassName("close")[0].onclick = function() {
    var eventModal = document.getElementById("eventModal");
    eventModal.style.display = "none";
  }

  window.onclick = function(event) {
    var eventModal = document.getElementById("eventModal");
    if (event.target == eventModal) {
      eventModal.style.display = "none";
    }
  }

  document.addEventListener("changeMonth", async function () {
    const eventosDoBanco = await carregarEventosDoBancoDeDados();
    criarCalendario(month, eventosDoBanco);
  });

  setInterval(verificarMudancaDeMes, 1000);
});


document.addEventListener("DOMContentLoaded", async function () {
  const eventosDoBanco = await carregarEventosDoBancoDeDados();
  criarCalendario(month, eventosDoBanco);

  const botao = document.querySelector(".butao");
  botao.addEventListener("click", async function () {
      const eventosDoBanco = await carregarEventosDoBancoDeDados();
      criarCalendario(month, eventosDoBanco);
  });
});

  


  document.getElementsByClassName("close")[0].onclick = function() {
    var eventModal = document.getElementById("eventModal");
    eventModal.style.display = "none";
  }
  
  window.onclick = function(event) {
    var eventModal = document.getElementById("eventModal");
    if (event.target == eventModal) {
      eventModal.style.display = "none";
    }
  }
  
  var eventosFevereiro = {
    17: 'Prova de Matemática',
  };
  var dataAtual = new Date();
const monthOfYear = date => date.getMonth() + 1;

var today = new Date();
const senha = "9090"

let month = today.getMonth();
  criarCalendario(month, eventosFevereiro); 
  
  document.addEventListener("DOMContentLoaded", function () {
    const botao = document.querySelector(".butao");
    botao.addEventListener("click", addEvento);
  });
  
function addEvento()
{
  let foo = prompt('Senha');

  let senhaTeste = foo.valueOf()

  if (senhaTeste == senha)
    {
      alert("senha correta")

      let mes = prompt("mes: ")
      let dia = prompt("dia: ")
      let evento = prompt("evento: ")

      var mesValue = mes.valueOf()
      var diaValue = dia.valueOf()
      var eventoValue = evento.valueOf()

      try {
        const docRef =  addDoc(collection(db, "eventos"), {
          mes: mesValue,
          dia: diaValue,
          evento: eventoValue
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }



    }
  else
    {
       alert("senha incorreta")
    }
}


