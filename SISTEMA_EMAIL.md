# Sistema de Envio de Emails - Documentação

## 📧 Visão Geral

Sistema completo de envio de emails integrado com **EmailJS**, desenvolvido em React + TypeScript com validação em tempo real, prevenção de spam e design profissional.

## ✨ Funcionalidades Implementadas

### 1. **Formulário Completo**
- ✅ Nome completo (obrigatório)
- ✅ Email (obrigatório, com validação de formato)
- ✅ Telefone (opcional, com máscara brasileira)
- ✅ Assunto (obrigatório)
- ✅ Mensagem (obrigatória, mínimo 10 caracteres)

### 2. **Validações**
- ✅ Validação em tempo real após primeiro toque no campo
- ✅ Feedback visual imediato (bordas vermelhas + mensagens de erro)
- ✅ Mensagens de erro descritivas e amigáveis
- ✅ TypeScript com tipagem forte

### 3. **Feedback Visual**
- ✅ Estados de loading (spinner animado)
- ✅ Indicador de sucesso (ícone verde)
- ✅ Indicador de erro (ícone vermelho)
- ✅ Animações suaves com Framer Motion
- ✅ Transições profissionais

### 4. **Experiência do Usuário**
- ✅ Contador de caracteres na mensagem (0/1000)
- ✅ Botão "Limpar" com confirmação
- ✅ Dialog de confirmação antes de enviar
- ✅ Toast notifications para feedback
- ✅ Máscara automática de telefone brasileiro
- ✅ Design responsivo (mobile-first)

### 5. **Prevenção de Spam**
- ✅ Limite de 3 envios por hora
- ✅ Armazenamento local das tentativas
- ✅ Feedback claro sobre tempo de espera

### 6. **Acessibilidade**
- ✅ ARIA labels em todos os campos
- ✅ aria-invalid para estados de erro
- ✅ aria-describedby para mensagens de erro
- ✅ Labels semânticos

## 🔧 Configuração do EmailJS

### Credenciais Configuradas:
```typescript
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_m9p1a69',
  TEMPLATE_ID: 'template_96suuwb',
  PUBLIC_KEY: 'EQlDtTR4LjkrMpVkV',
};
```

### Template do EmailJS
Certifique-se de que seu template no EmailJS contém estas variáveis:
- `{{from_name}}` - Nome do remetente
- `{{from_email}}` - Email do remetente
- `{{phone}}` - Telefone (ou "Não informado")
- `{{subject}}` - Assunto da mensagem
- `{{message}}` - Corpo da mensagem
- `{{to_name}}` - Nome do destinatário (Astraeus)

## 📁 Estrutura de Arquivos

```
src/
├── components/
│   ├── ContactSection.tsx      # Componente principal do formulário
│   └── ui/
│       ├── alert-dialog.tsx    # Dialog de confirmação
│       ├── button.tsx
│       ├── input.tsx
│       └── textarea.tsx
├── hooks/
│   └── use-contact-form.ts     # Hook customizado com validação
└── lib/
    └── utils.ts
```

## 🎨 Hook Customizado: `useContactForm`

### Funcionalidades do Hook:
- Gerenciamento de estado do formulário
- Validação em tempo real
- Rastreamento de campos "tocados"
- Formatação automática de telefone
- Função de reset

### Exemplo de Uso:
```typescript
const {
  formData,        // Dados do formulário
  errors,          // Erros de validação
  touched,         // Campos que foram tocados
  updateField,     // Atualiza um campo
  handleBlur,      // Marca campo como tocado
  validateForm,    // Valida todos os campos
  resetForm,       // Limpa o formulário
} = useContactForm();
```

## 🔐 Prevenção de Spam

### Configuração:
```typescript
const SPAM_PREVENTION = {
  MAX_ATTEMPTS: 3,           // Máximo de 3 envios
  TIME_WINDOW: 3600000,      // 1 hora (em milissegundos)
};
```

### Como Funciona:
1. Registra cada tentativa de envio no `localStorage`
2. Se exceder 3 tentativas em 1 hora, bloqueia novos envios
3. Mostra mensagem com tempo restante de espera
4. Reset automático após 1 hora

## 🎯 Validações Implementadas

### Nome:
- Obrigatório
- Mínimo 3 caracteres
- Máximo 100 caracteres

### Email:
- Obrigatório
- Formato válido de email
- Máximo 255 caracteres

### Telefone:
- Opcional
- Formato brasileiro: (99) 99999-9999
- 10 ou 11 dígitos
- Máscara automática

### Assunto:
- Obrigatório
- Mínimo 3 caracteres
- Máximo 100 caracteres

### Mensagem:
- Obrigatória
- Mínimo 10 caracteres
- Máximo 1000 caracteres
- Contador de caracteres em tempo real

## 🚀 Como Testar

1. **Desenvolvimento:**
   ```bash
   npm run dev
   ```

2. **Acesse:** `http://localhost:5173`

3. **Navegue até a seção de Contato** (scroll ou clique no menu)

4. **Teste os cenários:**
   - ✅ Envio com sucesso (todos os campos válidos)
   - ❌ Validação de campos vazios
   - ❌ Email inválido
   - ❌ Telefone inválido
   - ❌ Mensagem muito curta (< 10 caracteres)
   - ⏱️ Limite de envios (tente enviar 4 vezes seguidas)

## 📱 Design Responsivo

- **Mobile:** Layout em coluna única
- **Tablet:** Grid adaptativo
- **Desktop:** Grid de 2 colunas (info + formulário)

## 🎨 Estados Visuais

### Loading:
- Spinner animado
- Botão desabilitado
- Texto "Enviando..."

### Sucesso:
- Ícone verde com checkmark
- Toast de confirmação
- Formulário limpo automaticamente
- Animação de entrada

### Erro:
- Ícone vermelho com alerta
- Toast de erro
- Formulário mantém os dados
- Possibilidade de tentar novamente

## 🔍 Tratamento de Erros

```typescript
try {
  // Envia email
  await emailjs.send(...);
  // Sucesso
} catch (error) {
  // Log do erro (para debug)
  console.error('Erro ao enviar email:', error);
  
  // Feedback ao usuário
  toast({
    title: "Erro ao enviar mensagem",
    description: "Tente novamente.",
    variant: "destructive",
  });
}
```

## 🧪 Testes Sugeridos

1. ✅ Envio com todos os campos válidos
2. ✅ Validação de email inválido
3. ✅ Validação de campos vazios
4. ✅ Máscara de telefone funcionando
5. ✅ Contador de caracteres
6. ✅ Botão limpar
7. ✅ Dialog de confirmação
8. ✅ Prevenção de spam
9. ✅ Responsividade mobile
10. ✅ Acessibilidade com teclado

## 🆘 Solução de Problemas

### Email não está sendo enviado:
1. Verifique as credenciais do EmailJS
2. Confira se o template existe no EmailJS
3. Verifique o console do navegador para erros
4. Certifique-se de que está conectado à internet

### Validação não funciona:
1. Verifique se o hook `use-contact-form.ts` está sendo importado
2. Confirme que os campos estão usando `updateField` e `handleBlur`

### Prevenção de spam não funciona:
1. Limpe o localStorage do navegador
2. Verifique a função `checkSpamPrevention()`

## 📦 Dependências Utilizadas

- `@emailjs/browser` - Envio de emails
- `framer-motion` - Animações
- `lucide-react` - Ícones
- `@radix-ui/*` - Componentes UI
- `react-hook-form` - Gerenciamento de formulários (opcional)
- `zod` - Validação de schema (disponível)

## 🎉 Pronto para Produção!

O sistema está completo e pronto para uso em produção. Todos os requisitos foram implementados:

✅ Validação em tempo real  
✅ Feedback visual  
✅ EmailJS integrado  
✅ Design profissional  
✅ Máscara de telefone  
✅ Prevenção de spam  
✅ Acessibilidade  
✅ TypeScript  
✅ Código limpo e comentado  

---

**Desenvolvido para Astraeus** 🚀
