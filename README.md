# ⚛️ Atomic Design System - React Study

Este projeto é um laboratório prático focado na implementação e estudo da metodologia **Atomic Design**, criada por [Brad Frost](https://atomicdesign.bradfrost.com/).

O objetivo é demonstrar como interfaces complexas podem ser construídas a partir de componentes menores, reutilizáveis e isolados, utilizando **React**, **TypeScript** e **TailwindCSS**.

<!-- <img width="1263" height="822" alt="image" src="https://github.com/user-attachments/assets/4212ea1a-7921-489e-ba6e-e6fff6bff48a" /> -->

<!-- <img width="1306" height="822" alt="image" src="https://github.com/user-attachments/assets/6a3b25ed-b7d4-4c15-b81e-6b75d9bd85f5" /> -->

<img width="1262" height="815" alt="image" src="https://github.com/user-attachments/assets/6f475def-1da7-4218-97bc-6a999da1498a" />

<img width="1305" height="818" alt="image" src="https://github.com/user-attachments/assets/542f20fc-d158-4c70-81a2-67e3329fada2" />




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
