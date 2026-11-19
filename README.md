# zoji-site

Site institucional do **Zoji** — landing page em React com seções de apresentação, screenshots, download e páginas legais (Termos e Privacidade). Disponível em [zoji.app](https://zoji.app).

## Stack

- **React 19** + **TypeScript**
- **Vite** — bundler
- **Tailwind CSS 4** — estilização
- **React Router 7** — roteamento (páginas legais)

---

## Estrutura

```
zoji-site/
└── src/
    ├── sections/
    │   ├── Hero.tsx         # Seção principal com CTA
    │   ├── Features.tsx     # Funcionalidades do app
    │   ├── Screenshots.tsx  # Galeria de screenshots
    │   ├── Download.tsx     # Botões App Store e Google Play
    │   └── Footer.tsx       # Rodapé com links e badges das lojas
    ├── pages/
    │   ├── Privacy.tsx      # Política de Privacidade
    │   └── Terms.tsx        # Termos de Uso
    ├── App.tsx              # Roteamento e composição das seções
    ├── main.tsx
    └── index.css
```

---

## Instalação local

```bash
git clone https://github.com/zoji-app/zoji-site.git
cd zoji-site
npm install
npm run dev
```

O site estará disponível em `http://localhost:5173`.

---

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento com HMR |
| `npm run build` | Build de produção em `dist/` |
| `npm run preview` | Pré-visualização do build |
| `npm run lint` | Verificação de lint |

---

## Deploy

O site é estático (`npm run build` gera a pasta `dist/`). A publicação em zoji.app é feita por quem mantém o projeto; PRs aprovados entram no próximo deploy.

## Contribuindo

As regras de contribuição, o código de conduta e a assinatura DCO são os mesmos do app: veja o [CONTRIBUTING do repositório zoji](https://github.com/zoji-app/zoji/blob/main/CONTRIBUTING.md). Assine seus commits com `git commit -s`.

---

## Links das lojas

Os links para download estão em `src/sections/Download.tsx` e `src/sections/Footer.tsx`:

- **App Store (iOS):** https://apps.apple.com/br/app/zoji/id6762674303
- **Google Play (Android):** https://play.google.com/store/apps/details?id=dev.de4araujo.zoji

## Licença

O código do site está sob a [Mozilla Public License 2.0](LICENSE). © De Araujo Desenvolvimento LTDA.

O nome, o ícone, as imagens e a identidade visual do Zoji não fazem parte da licença.
