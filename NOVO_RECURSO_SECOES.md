# ✨ Novo Recurso: Títulos de Seção

## 🎯 Objetivo

Permitir que o usuário organize o briefing em **seções/temas**, adicionando títulos separadores entre as perguntas.

## 🛠️ Alterações Realizadas

### 1. Tipagem (`types/form.ts`)

- Adicionado novo tipo de pergunta: `'section'`.

### 2. Construtor de Formulário (`components/builder/QuestionEditor.tsx`)

- Adicionada opção "**Título de Seção / Divisor**" no dropdown de tipos.
- Quando selecionado:
  - O campo "Pergunta" vira "Título da Seção".
  - Oculta opções de resposta (se houver).
  - Oculta switch de "Campo Obrigatório" (títulos não precisam de resposta).

### 3. Renderização (`components/renderer/FormRenderer.tsx`)

- Atualizada a lógica de renderização para exibir seções como **títulos (`<h3>`)** em vez de campos de input.
- **Numeração Inteligente:** A numeração das perguntas (1, 2, 3...) agora **pula os títulos**, mantendo a sequência correta apenas para as perguntas reais.

## 📸 Como Usar

1. Crie um novo Briefing.
2. Adicione uma nova pergunta.
3. Mude o tipo para **"Título de Seção / Divisor"**.
4. Escreva o nome da seção (Ex: "Dados Pessoais", "Sobre o Projeto").
5. Arraste para a posição desejada usando as setas ▲ ▼.

O resultado final para o cliente será um formulário organizado e dividido por temas! 🚀
