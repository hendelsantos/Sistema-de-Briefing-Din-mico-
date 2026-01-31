# 🐛 Correção do Formulário de Briefing

## 🔍 Problema Identificado

O usuário relatou que ao tentar adicionar perguntas no formulário, o sistema "criava o link" automaticamente (ou seja, enviava o formulário), impedindo a criação de múltiplas perguntas.

Isso acontecia porque:

1. O componente `FormBuilder` está dentro de uma tag `<form>` na página `app/admin/novo/page.tsx`.
2. Os botões de adicionar/remover/mover perguntas **não tinham o atributo `type="button"`**.
3. Por padrão, um `<button>` dentro de um `<form>` atua como `submit`, submetendo o formulário ao ser clicado.

## ✅ Correção Aplicada

Adicionei o atributo `type="button"` em todos os botões interativos dos componentes:

- `components/builder/FormBuilder.tsx`
- `components/builder/QuestionEditor.tsx`

Isso garante que ao clicar em "Adicionar Pergunta", "Mover", "Remover" ou adicionar opções, o formulário **não seja enviado**. O envio só ocorrerá ao clicar no botão final "Criar Briefing".

## 🧪 Como Testar

1. Acesse a página de criação de briefing.
2. Tente adicionar várias perguntas.
3. Observe que o formulário **não é mais enviado** automaticamente.
4. Preencha todos os dados.
5. Clique em "Criar Briefing" para finalizar.

**Status:** ✅ Corrigido e pronto para deploy/teste.
