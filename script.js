const form = document.querySelector("#task-form");
const input = document.querySelector("#tarefa1");
const lista = document.querySelector("#task-list");
const botaoTema = document.getElementById("toggle-theme");

console.log("script conectado com sucesso!");
console.log("Formulário:", form);
console.log("Campo de input:", input);
console.log("Lista de tarefas:", lista);

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || []; //array que guarda as tarefas
console.log(tarefas);
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

    if(tarefas.length === 0){
        const vazio = document.createElement("li");
        vazio.className = "empty-state";
        vazio.textContent = "Nenhuma tarefa ainda";
        lista.appendChild(vazio);
        return; //nada mais a renderizar
    }
    tarefas.forEach((tarefa, index) => {
        const novaTarefa = document.createElement("li");
        novaTarefa.classList.add("invisivel"); //começa invisivel

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
            tarefas[index].concluida = !tarefas[index].concluida;
            spanTexto.classList.toggle("concluida");
            salvarTarefasNoLocalStorage();
            renderizarTarefas();
        });
        // Cria o botão remover
        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "X";
        botaoRemover.classList.add("botao-remover");
        botaoRemover.addEventListener("click", function (){ // Da funcionalidade ao botão remover
            novaTarefa.classList.add("invisivel"); //inicia o fade-out

            const onEnd = (e) => {
                if (e.propertyName !== "opacity") return;
                novaTarefa.removeEventListener("transitionend",onEnd);
                tarefas.splice(index, 1);
                salvarTarefasNoLocalStorage();
                renderizarTarefas();
            };
            novaTarefa.addEventListener("transitionend", onEnd);
        });
            
        
        // Adiciona os elemenstos ao <li>
        novaTarefa.appendChild(botaoConcluir);
        novaTarefa.appendChild(spanTexto);
        novaTarefa.appendChild(botaoRemover);

        // 5. Adiciona esse item dentro da lista (ul)
        lista.appendChild(novaTarefa);

        requestAnimationFrame(() => {
            novaTarefa.classList.remove("invisivel");
        });
        //6. Limpa o campo de input para digitar outra tarefa
        input.value = "";
    });
}
    // 1. Quando o formulário for enviado...
form.addEventListener("submit", function(event){
    event.preventDefault();
    // 2. Pega o texto que o usuário digitou
    const textoDaTarefa = input.value.trim();
    if(textoDaTarefa === ""){
        alert("Por favor, digite uma tarefa");
        return; //Para a execução se estiver vazio
    }
    const novaTarefaObj = {
        texto: textoDaTarefa,
        concluida:false
    };
    tarefas.push(novaTarefaObj); // adiciona no array
    salvarTarefasNoLocalStorage();
    renderizarTarefas();
    input.value="";
});

renderizarTarefas();    