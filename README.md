# Mini Sistema de Tarefas (Vanilla JS)

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-live-brightgreen)](https://heppsm.github.io/projeto/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
![Made with JavaScript](https://img.shields.io/badge/Made%20with-JavaScript-F7DF1E?logo=javascript&logoColor=black)

Lista de tarefas feita em **HTML/CSS/JS puro**. Tem **modo escuro com persistência**, **localStorage** para guardar as tarefas e **animações (fade in/out)** ao adicionar/remover itens.

👉 **Demo:** **https://heppsm.github.io/projeto/**

---

## ✨ Funcionalidades
- Adicionar tarefas
- Remover tarefas
- Marcar como concluída (toggle)
- Mensagem de “Nenhuma tarefa ainda” quando a lista está vazia
- **Modo escuro** com persistência (salvo no `localStorage`)
- **Persistência** das tarefas (salvas no `localStorage`)
- **Transições** suaves (fade in/out) nas tarefas

---

## 🧪 Como rodar
- **Opção rápida:** abra `index.html` no navegador.
- **Com servidor local (opcional):**
  - VS Code → extensão **Live Server** → “Open with Live Server”.

---

## 🗂️ Estrutura
/
├─ index.html # marcação da página
├─ style.css # estilos (dark mode + transitions)
├─ script.js # lógica (eventos, renderização, localStorage)
├─ README.md
├─ .gitignore
└─ LICENSE

---

## 🛠️ Tecnologias
- **HTML5**
- **CSS3** (transitions)
- **JavaScript (ES6+)**
- **localStorage**

---

## 🧠 Como funciona (resumo técnico)
- As tarefas ficam em um array `tarefas` e são persistidas via `localStorage` (`"tarefas"`).
- O tema é salvo em `"tema"` (`"dark"` | `"light"`).
- O `renderizarTarefas()` reconstrói a lista a cada alteração.
- Para as animações:
  - Cada `<li>` entra com a classe `.invisivel` → removida no `requestAnimationFrame`, ativando o **fade-in**.
  - Ao remover, adiciona `.invisivel` e espera `transitionend` de `opacity` antes de tirar do DOM (**fade-out**).

---

## 🗺️ Roadmap
- [x] Empty state (“Nenhuma tarefa ainda”)
- [x] Modo escuro com persistência
- [x] Persistência das tarefas (localStorage)
- [x] Fade in/out nas tarefas
- [ ] **Edição de tarefa** (duplo clique + botão Editar)
- [ ] **Arrastar e soltar** (drag & drop) para reordenar
- [ ] **Filtros** (todas | pendentes | concluídas) e **busca por texto**
- [ ] **Prioridade** (alta | média | baixa) com destaque visual
- [ ] Acessibilidade (aria-labels, foco, leitura de tela)

---

## 🚀 Deploy (GitHub Pages)
O site é publicado via **GitHub Pages** a partir da branch `main` (pasta `/`).

- Configuração: **Settings → Pages → Source: Deploy from a branch → main/(root)**
- URL: `https://heppsm.github.io/projeto/`

---

## 🤝 Contribuindo
Sinta-se à vontade para abrir **Issues** e **PRs**. Commits pequenos e mensagens claras ajudam:
- `feat: edição de tarefa (duplo clique + botão)`
- `fix: corrigir classe .invisivel`
- `docs: atualizar README com link da demo`

---

## 📄 Licença
Distribuído sob a licença **MIT**. Veja `LICENSE` para mais detalhes.
