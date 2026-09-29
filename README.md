# H2J Growth Company — Linkpage

Linkpage oficial e personalizada da **H2J Growth Company**, construída com design minimalista de alta conversão, tipografia Sora, preloader vetorial animado em SVG e suporte nativo ao Google Tag Manager (GTM).

---

## 🚀 Tecnologias e Recursos

- **HTML5 & CSS3 Moderno**: Layout responsivo (mobile-first), glassmorphism, variáveis CSS e suporte a `prefers-reduced-motion`.
- **Preloader SVG Dinâmico**: Animação vetorial stroke-draw usando cálculo dinâmico de paths via `getTotalLength()`.
- **Tipografia Personalizada**: Família tipográfica **Sora** (pesos de Thin a ExtraBold) via `@font-face`.
- **Google Tag Manager (GTM)**: Estrutura pronta no `<head>` e `<noscript>`, além de dataLayer events para cliques em links (`linkpage_click`).
- **Deploy Ready**: Estrutura estática otimizada para deploy direto na **Vercel** ou plataformas equivalentes.

---

## 📂 Estrutura do Projeto

```text
h2j/
├── index.html        # Página principal com tags semânticas, GTM e SVGs inline
├── style.css         # Estilização completa, variáveis, animações e responsividade
├── main.js           # Orquestração do preloader, tracking do dataLayer e a11y
├── .gitignore        # Arquivos ignorados pelo controle de versão
├── README.md         # Documentação do projeto
├── fonts/            # Arquivos TTF da família Sora
│   ├── Sora-Thin.ttf
│   ├── Sora-Light.ttf
│   ├── Sora-Regular.ttf
│   ├── Sora-Medium.ttf
│   ├── Sora-SemiBold.ttf
│   ├── Sora-Bold.ttf
│   └── Sora-ExtraBold.ttf
└── img/              # Imagens e referências da marca
    ├── logo-h2j.svg
    └── Logotipo 9.png
```

---

## 🔗 Links Configurados

1. **WhatsApp Especialista**: `(47) 99111-0402` com mensagem direta parametrizada.
2. **Site Institucional**: `www.h2jcompany.com.br`

---

## 🛠️ Como rodar localmente

Se desejar testar localmente via Python:

```bash
python -m http.server 9123 --bind 127.0.0.1
```

Acesse: `http://127.0.0.1:9123`

---

## ☁️ Deploy na Vercel

1. Suba este repositório para o seu GitHub.
2. Acesse [vercel.com](https://vercel.com) e importe o repositório.
3. Como se trata de um projeto estático, basta clicar em **Deploy**.
