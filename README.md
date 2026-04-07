# 🇧🇷 Geo do Pedro — Regionalização do Brasil

App educacional de Geografia para o Pedro (7º ano) estudar para a prova.

---

## 📱 Como o app foi feito
- **React + Vite** (build moderno e rápido)
- **Mobile-first** — otimizado para Samsung A56
- Todas as imagens são do material didático original
- Tema escuro estilo gamer, emojis, quiz interativo

---

## 🚀 Como publicar no GitHub Pages (passo a passo)

### 1. Crie o repositório no GitHub
- Acesse github.com → botão **New repository**
- Nome sugerido: `pedro-geo`
- Deixe **público** (obrigatório para GitHub Pages gratuito)
- **NÃO** marque "Add a README file"
- Clique em **Create repository**

### 2. Ajuste o nome base no vite.config.js
Abra o arquivo `vite.config.js` e troque `pedro-geo` pelo nome exato do seu repositório:
```js
base: '/SEU-NOME-DE-REPO/',
```

### 3. Suba o projeto para o GitHub (via VS Code)
No terminal do VS Code (Ctrl + `):
```bash
cd caminho/para/a/pasta/geografia_pedro
git init
git add .
git commit -m "primeiro commit"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/pedro-geo.git
git push -u origin main
```

### 4. Ative o GitHub Pages com Actions
No seu repositório no GitHub:
- Vá em **Settings → Pages**
- Em **Source**, selecione **GitHub Actions**
- Salve

O deploy vai rodar automaticamente a cada `git push`!

### 5. Acesse o app
Após 1-2 minutos, o app estará disponível em:
```
https://SEU_USUARIO.github.io/pedro-geo/
```

---

## 💻 Como rodar localmente (para testar no VS Code)

```bash
npm install
npm run dev
```
Acesse: http://localhost:5173/pedro-geo/

---

## 📁 Estrutura do projeto

```
geografia_pedro/
├── public/
│   └── images/          # Todas as imagens do material didático
├── src/
│   ├── App.jsx          # App completo com todo o conteúdo
│   ├── main.jsx         # Entry point
│   └── index.css        # Estilos globais
├── .github/
│   └── workflows/
│       └── deploy.yml   # Deploy automático no GitHub Pages
├── index.html
├── package.json
└── vite.config.js       # ⚠️ Ajuste o 'base' para o nome do seu repo!
```

---

## 📷 Créditos das imagens

As imagens são do material didático original. Fontes identificadas:
- **IBGE** — mapas oficiais (domínio público)
- **Wikimedia Commons** — imagens com licença livre
- **Pulsar Imagens**, **Shutterstock**, **stock.adobe.com** — uso educacional privado, citadas conforme o material didático
