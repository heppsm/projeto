const form = document.querySelector("#task-form");
const input = document.querySelector("#tarefa1");
const lista = document.querySelector("#task-list");
const botaoTema = document.getElementById("toggle-theme");
const filterBtn = document.getElementById("toggle-filter");

console.log("script conectado com sucesso!");
console.log("Formulário:", form);
console.log("Campo de input:", input);
console.log("Lista de tarefas:", lista);

let statusFilter = "all";

function updateFilterBtn(){
    if(!filterBtn) return;
    if(statusFilter === "all") filterBtn.textContent = "🔎 Todas";
    if (statusFilter === "open") filterBtn.textContent = "📝 Abertas";
    if (statusFilter === "done") filterBtn.textContent = "✅ Concluídas";
}
if(filterBtn){
    updateFilterBtn();
    filterBtn.addEventListener("click", () => {
        statusFilter = statusFilter === "all" ? "open" : statusFilter === "open" ? "done" : "all";
        updateFilterBtn();
        renderizarTarefas();
    })
}
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || []; //array que guarda as tarefas

function salvarTarefasNoLocalStorage(){
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}
if (localStorage.getItem("tema")==="dark"){
    document.body.classList.add("dark-mode");
    botaoTema.textContent = "☀️ Modo claro";
}   else{
    botaoTema.textContent = "🌙 Modo escuro";
}
botaoTema.addEventListener("click", () => {
    const modoEscuroAtivo = document.body.classList.toggle("dark-mode");

    localStorage.setItem("tema", modoEscuroAtivo ? "dark" : "light");
    botaoTema.textContent = modoEscuroAtivo ? "☀️ Modo claro" : "🌙 Modo escuro";
});
function renderizarTarefas(){
    lista.innerHTML = "";

    const filtradas = tarefas.filter((t) => {
        return statusFilter === "all" ||
        (statusFilter === "open" && !t.concluida) || 
        (statusFilter === "done" && t.concluida);
    });

    if(filtradas.length === 0){
        const vazio = document.createElement("li");
        vazio.className = "empty-state";
        vazio.textContent = "Nenhuma tarefa encontrada";
        lista.appendChild(vazio);
        return;
    }
    filtradas.forEach((tarefa) => {
        const novaTarefa = document.createElement("li");
        novaTarefa.classList.add("invisivel");

        const spanTexto = document.createElement("span");
        spanTexto.textContent = tarefa.texto;
        if (tarefa.concluida){
            spanTexto.classList.add("concluida");
        }
        // Cria o botão concluido
        const botaoConcluir = document.createElement("button");
        botaoConcluir.textContent = "✔";
        botaoConcluir.classList.add("botao-concluir");
        botaoConcluir.addEventListener("click",function(){ // Da funcionalidade ao botão concluir
            const realIndex = tarefas.indexOf(tarefa);
            if(realIndex === -1) return;
            tarefas[realIndex].concluida = !tarefas[realIndex].concluida;
            
            botaoConcluir.setAttribute(
                "aria-pressed",
                String(tarefas[realIndex].concluida)
            );

            salvarTarefasNoLocalStorage();

            if(statusFilter === "all"){
                spanTexto.classList.toggle("concluida");
            } else {
                renderizarTarefas();
            }
        });
        //Cria o botão remover
        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "X";
        botaoRemover.classList.add("botao-remover");
        botaoRemover.addEventListener("click", function (){ // Da funcionalidade ao botão remover
            novaTarefa.classList.add("invisivel"); //inicia o fade-out
            const onEnd = (e) => {
                if (e.propertyName !== "opacity") return;
                novaTarefa.removeEventListener("transitionend",onEnd);
                const realIndex = tarefas.indexOf(tarefa);
                if(realIndex > -1){
                    tarefas.splice(realIndex, 1);
                    salvarTarefasNoLocalStorage();
                }
                renderizarTarefas();
            };
            novaTarefa.addEventListener("transitionend", onEnd);
        }); 
        //Adiciona os elemenstos ao <li>
        novaTarefa.appendChild(botaoConcluir);
        novaTarefa.appendChild(spanTexto);
        novaTarefa.appendChild(botaoRemover);
        //Adiciona esse item dentro da lista (ul)
        lista.appendChild(novaTarefa);

        requestAnimationFrame(() => {
            novaTarefa.classList.remove("invisivel");
        });
        //Limpa o campo de input para digitar outra tarefa
        input.value = "";
    });
}
    //Quando o formulário for enviado...
form.addEventListener("submit", function(event){
    event.preventDefault();
    //Pega o texto que o usuário digitou
    const textoDaTarefa = input.value.trim();
    if(textoDaTarefa === ""){
        alert("Por favor, digite uma tarefa");
        return; //Para a execução se estiver vazio
    }
    const novaTarefaObj = {
        texto: textoDaTarefa,
        concluida:false
    };
    tarefas.push(novaTarefaObj); //adiciona no array
        salvarTarefasNoLocalStorage();
        renderizarTarefas();
        input.value="";
});

renderizarTarefas();    