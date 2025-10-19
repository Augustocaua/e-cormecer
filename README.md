# e-cormecer

Loja virtual de eletrônicos construída com Vite, React e TypeScript.

## Tecnologias

- Vite
- React
- TypeScript
- shadcn-ui
- Tailwind CSS

## Desenvolvimento local

Pré-requisitos: Node.js 18+ e npm.

Passos:

```sh
# Instalar dependências
npm i

# Rodar em modo desenvolvimento (porta 8080)
npm run dev
```

## Build e Preview

```sh
# Gerar build de produção
npm run build

# Servir a build para teste local
npm run preview
```

## Estrutura

- `index.html`: metas e título do site.
- `public/logo.svg`: logo do projeto.
- `src/components/`: componentes reutilizáveis.
- `src/pages/`: páginas da aplicação.
- `vite.config.ts`: configuração do Vite (porta 8080, plugin React).

## Notas

Este repositório não possui integrações ou dependências da Lovable. Qualquer referência anterior foi removida.

## Segurança

- Metas de segurança adicionadas no `index.html`:
  - `Content-Security-Policy` para mitigar XSS no desenvolvimento (permite HMR: `ws:` e `'unsafe-eval'`).
  - `referrer` definido como `strict-origin-when-cross-origin` para reduzir vazamento de informações.
- Cabeçalhos de segurança para produção em `public/_headers` (útil em hosts estáticos como Netlify):
  - `Content-Security-Policy`: bloqueia fontes externas não declaradas, desativa `object-src` e `frame-ancestors`.
  - `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy`, `HSTS` e `Permissions-Policy`.

Ajustes comuns:
- Se sua API estiver em outro domínio, inclua-o em `connect-src` (CSP) e avalie CORS no servidor.
- Em produção, remova `'unsafe-eval'` de `script-src` (já não está presente nos headers de produção).
- Se usar Google Fonts, mantenha `style-src https://fonts.googleapis.com` e `font-src https://fonts.gstatic.com`.

Observação: políticas muito restritas podem bloquear recursos externos. Caso surjam erros no console do navegador relacionados a CSP, ajuste as diretivas de forma pontual (apenas o necessário) e evite adicionar `'unsafe-inline'`/`'unsafe-eval'` em produção.

## Validação e sanitização de entradas

- Utilitários em `src/lib/validation.ts`:
  - `sanitizeForSearch`, `normalizeWhitespace`, `stripTags`, `escapeHtml`.
  - Validadores: `isValidSearchQuery`, `isValidEmail`, `isValidPhone`, `isValidName`, `isSafeUrl`.
- Hook `useSanitizedInput` em `src/hooks/useSanitizedInput.ts` para inputs controlados.
- Integração aplicada ao campo de busca do `Header.tsx` (desktop e mobile):
  - Limita tamanho (`maxLength=100`), remove `<, >, ' , ", \`` e espaços extras.
  - Valida ao digitar e ao colar; mostra toast em caso de busca inválida.

Como usar em outro input:

```tsx
import { useSanitizedInput } from "@/hooks/useSanitizedInput";
import { sanitizeForSearch, isValidSearchQuery } from "@/lib/validation";

const search = useSanitizedInput({ sanitize: sanitizeForSearch, validate: isValidSearchQuery });
<Input value={search.value} onChange={search.onChange} onPaste={search.onPaste} aria-invalid={!search.isValid} />
```

Boas práticas:
- Nunca renderizar HTML vindo do usuário; se necessário, sanitizar com uma biblioteca dedicada.
- Validar tamanho e formato do dado no cliente e no servidor.
- Em links externos com `target="_blank"`, incluir `rel="noopener noreferrer"`.
