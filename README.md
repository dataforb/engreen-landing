# Engreen — Landing page

Site institucional da Engreen (engenharia civil sustentável), feito em **HTML + Tailwind CSS v4 + JavaScript puro**. É um site estático, sem servidor nem banco de dados.

## Estrutura

```
engreen-site/
├── public/                 ← pasta publicada (o site em si)
│   ├── index.html          ← a página inteira
│   ├── css/style.css       ← CSS gerado pelo Tailwind (não editar à mão)
│   ├── js/main.js          ← menu mobile, animações, WhatsApp, formulário
│   └── assets/
│       ├── fonts/          ← Satoshi (woff2)
│       ├── img/            ← hero e posts do Instagram
│       └── logo/           ← logos e favicon
├── src/input.css           ← cores, fontes e componentes (edite aqui)
└── package.json
```

## Como rodar

```bash
npm install          # instala o Tailwind (só na primeira vez)
npm run dev          # recompila o CSS automaticamente enquanto você edita
npm run serve        # abre o site em http://localhost:3000 (em outro terminal)
npm run build        # gera o CSS final minificado antes de publicar
```

> Sempre rode `npm run build` antes do commit, pois o `public/css/style.css` vai junto para o Git.

## Onde trocar as coisas

| O quê | Onde |
|---|---|
| Número do WhatsApp, @ do Instagram, mensagem padrão | `public/js/main.js` → objeto `CONFIG` no topo |
| Textos, e-mail, cidade, CNPJ | `public/index.html` (procure por `[` para achar os placeholders) |
| Cores e fontes | `src/input.css` → bloco `@theme` |
| Fotos dos projetos | `public/assets/img/` + trocar a `<div>[FOTO DO PROJETO]</div>` por `<img>` (há um exemplo em comentário no HTML) |

## Paleta (classes Tailwind)

| Nome | Hex | Exemplo de uso |
|---|---|---|
| `escuro` | `#0b1e26` | `bg-escuro` |
| `petroleo` | `#18333d` | `bg-petroleo` |
| `musgo` | `#487070` | `bg-musgo` |
| `verde` | `#1c621b` | `text-verde` |
| `lime` | `#a5ec60` | `bg-lime`, `text-lime` |
| `offwhite` | `#f2f2f2` | `text-offwhite` |

## Formulário de contato

O formulário não precisa de servidor: ao enviar, ele abre o WhatsApp com a mensagem já montada (nome, serviço, mensagem e telefone). Para receber por e-mail no futuro, dá para ligar num serviço como Formspree, Web3Forms ou numa função serverless.

## Publicação

Qualquer hospedagem estática serve. Aponte a pasta de publicação para `public/`:

- **Vercel / Netlify:** build command `npm run build`, output directory `public`
- **GitHub Pages:** publique a pasta `public/` (por exemplo, via GitHub Actions)
