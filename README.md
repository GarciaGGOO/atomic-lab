# ⚛️ Atomic Design System - React Study

Este projeto é um laboratório prático focado na implementação e estudo da metodologia **Atomic Design**, criada por [Brad Frost](https://atomicdesign.bradfrost.com/).

O objetivo é demonstrar como interfaces complexas podem ser construídas a partir de componentes menores, reutilizáveis e isolados, utilizando **React**, **TypeScript** e **TailwindCSS**.

## 📚 Conceito (A Metodologia)

> "Atomic design is a methodology for creating design systems." — Brad Frost

A estrutura deste projeto segue estritamente a hierarquia química proposta na metodologia:

1.  **Atoms (Átomos):** Blocos de construção indivisíveis. Se quebrados, perdem a função.
    - _No projeto:_ `Button`, `Input`, `Label`, `Icon`.
2.  **Molecules (Moléculas):** Grupos de átomos unidos que funcionam como uma unidade.
    - _No projeto:_ `TextField` (Label + Input), `SearchBar`.
3.  **Organisms (Organismos):** Grupos de moléculas e/ou átomos que formam seções distintas da interface.
    - _No projeto:_ `UserRegistrationForm`, `Header`, `Footer`.
4.  **Templates:** Estruturas de página que definem o layout sem conteúdo real.
    - _No projeto:_ Define onde o Header, o Form e o Footer se encaixam.
5.  **Pages (Páginas):** Instâncias específicas dos templates preenchidas com conteúdo real.

🔗 **Referência Oficial:** [Atomic Design by Brad Frost](https://atomicdesign.bradfrost.com/)

## 🛠️ Tecnologias

- **Core:** [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/) (Tipagem estrita para Props)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/) (Utility-first)

## 📂 Estrutura de Pastas

A arquitetura reflete diretamente os conceitos teóricos:

```text
src/
├── components/
│   ├── atoms/          # Componentes básicos (ex: Button.tsx)
│   ├── molecules/      # Composições simples (ex: SearchBar.tsx)
│   ├── organisms/      # Seções complexas (ex: NavBar.tsx)
│   └── templates/      # Layouts de página (ex: DashboardLayout.tsx)
├── pages/              # Telas da aplicação
└── styles/             # Configurações globais
```

## 🚀 Como Executar

1. Clone o repositório:

```bash
git clone https://github.com/GarciaGGOO/atomic-lab.git
```

2. Instale as dependências:

```bash
npm install
# ou
yarn
```

3. Rode o servidor de desenvolvimento:

```bash
npm run dev
```
