# Mini Sistema de Tarefas (Vanilla JS)

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-live-brightgreen)](https://heppsm.github.io/projeto/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
![Made with JavaScript](https://img.shields.io/badge/Made%20with-JavaScript-F7DF1E?logo=javascript&logoColor=black)

Lista de tarefas feita em **HTML/CSS/JS puro**. Possui **modo escuro com persistência**, **localStorage** para guardar tarefas, **filtro por status** (Todas | Abertas | Concluídas) com botão flutuante e **animações** ao adicionar/remover itens.

👉 **Demo:** **https://heppsm.github.io/projeto/**

---

## ✨ Funcionalidades
- Adicionar tarefas (Enter no input envia)
- Remover tarefas (com **fade-out**)
- Marcar como concluída (toggle) — **sem fade** no check, só risco no texto
- **Mensagem de vazio**:
  - Lista vazia: “Nenhuma tarefa ainda”
  - Sem resultados no filtro: “Nenhuma tarefa encontrada”
- **Modo escuro** com persistência (`localStorage: "tema"`)
- **Persistência** das tarefas (`localStorage: "tarefas"`)
- **Filtro por status** (Todas | Abertas | Concluídas) via botão flutuante
- **Responsivo** (mobile/tablet/desktop)
- **Pequenos toques de UX**: feedback nos botões (pressionar escala), ✔ com `aria-pressed`

---

## 🧪 Como rodar
- **Rápido:** abra `index.html` no navegador.
- **Com servidor local (opcional):**
  - VS Code → extensão **Live Server** → “Open with Live Server”.

---

## 🗂️ Estrutura
/
├─ index.html # marcação da página
├─ style.css # estilos (dark mode, responsivo, transitions)
├─ script.js # lógica (eventos, render com filtro, localStorage)
├─ README.md
├─ .gitignore
└─ LICENSE

---

## 🧠 Como funciona (resumo técnico)
- As tarefas vivem em `let tarefas = [...]` e são salvas em `localStorage` (chave `"tarefas"`).
- Tema salvo em `"tema"` (`"dark"` | `"light"`).
- `statusFilter` controla o filtro atual (Todas | Abertas | Concluídas).  
  - *Obs:* por padrão **não** persiste; se quiser, basta salvar/ler `"statusFilter"` no `localStorage`.
- `renderizarTarefas()`:
  1. filtra `tarefas` conforme `statusFilter`;
  2. reconstrói a lista com base nas **filtradas**;
  3. aplica **fade-in** adicionando `<li>.invisivel` e removendo via `requestAnimationFrame`;
  4. na remoção, espera `transitionend` de `opacity` para tirar do DOM (fade-out).
- Clique no ✔:
  - Em **Todas**: só alterna a classe `.concluida` (sem re-render).
  - Em **Abertas/Concluídas**: re-renderiza para refletir a saída/entrada no filtro.
  - Define `aria-pressed` no botão para acessibilidade.

---

## 🗺️ Roadmap
- [x] Empty state (“Nenhuma tarefa ainda”)
- [x] Modo escuro com persistência
- [x] Persistência das tarefas (localStorage)
- [x] Fade in/out ao adicionar/remover
- [x] **Filtro por status** (Todas | Abertas | Concluídas)
- [ ] Contador de pendentes/concluídas
- [ ] Persistir `statusFilter` no `localStorage`
- [ ] **Edição de tarefa** (duplo clique + botão “Editar”)
- [ ] **Arrastar e soltar** (drag & drop) para reordenar
- [ ] **Busca por texto**
- [ ] **Prioridade** (alta | média | baixa) com destaque visual
- [ ] Acessibilidade extra (atalhos, foco, leitura de tela)

---

## 🚀 Deploy (GitHub Pages)
Publicado via **GitHub Pages** a partir da branch `main` (pasta raiz).

- Configuração: **Settings → Pages → Source: Deploy from a branch → main/(root)**
- URL: `https://heppsm.github.io/projeto/`

---

## 🤝 Contribuindo
Sinta-se à vontade para abrir **Issues** e **PRs**. Mensagens de commit sugeridas:
- `feat: filtro por status (todas/abertas/concluídas)`
- `feat: equalizar tamanho dos botões ✔ e X`
- `fix: remover fade no check e manter apenas no add/remove`
- `docs: atualizar README com recursos e roadmap`

---

## 📄 Licença
Distribuído sob a licença **MIT**. Veja `LICENSE` para mais detalhes.