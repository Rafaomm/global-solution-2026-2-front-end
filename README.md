# Zelalerta - Front-end (React + Vite + TypeScript)
 
Aplicação web (SPA) da **zeladoria colaborativa Zelalerta**, projeto da Global Solution 2026/2 (tema **CitizenTech**) da FIAP, disciplina *Front-End Design Engineering*.
 
## Objetivo
 
O cidadão vê um buraco, um poste apagado, lixo acumulado ou um ponto de alagamento, reclama e nunca sabe se alguém fez algo. A prefeitura recebe tudo misturado e não sabe o que atacar primeiro.
 
O Zelalerta resolve isso com uma interface simples e responsiva, na qual:
 
- o **morador** registra o problema (categoria, bairro e endereço), confirma ocorrências de outros moradores com o botão **"Eu também vi"** e acompanha o status;
- a **prefeitura** vê as ocorrências ordenadas por prioridade e os bairros com mais problemas.
**ODS:** 11 (Cidades e comunidades sustentáveis), com apoio do 16 (Instituições eficazes).
 
## Integrantes
 
| Nome | RM | Turma |
|---|---|---|
| Rafael Macedo | 569313 | `1TDSPY` |
| Eliza Duarte | 572989 | `1TDSPY` |
| Gustavo Rapozo | 573513 | `1TDSPY` |
| Julia Freitas | 568627 | `1TDSPY` |
| Felipe Kenji | 572358 | `1TDSPY` |
 
## Links
 
| Item | URL |
|---|---|
| GitHub | `https://github.com/Rafaomm/global-solution-2026-2-front-end.git` |
| Aplicação na Vercel | `https://global-solution-2026-2-front-end.vercel.app` |
| API Java (Render) | `https://global-solution-2026-2-java.onrender.com/` |
| Vídeo no YouTube (até 3 min) | `https://youtu.be/cplWoy9h5rU` |

## Tecnologias
 
- [React](https://react.dev/) 19
- [Vite](https://vite.dev/) 6
- TypeScript
- [Tailwind CSS](https://tailwindcss.com/) 4 (plugin `@tailwindcss/vite`)
- React Router (rotas estáticas e rota com parâmetro)
- Fetch API para todas as chamadas HTTP
- Oxlint (lint)
- Git e GitHub (versionamento)
- Vercel (deploy do front) e Render (deploy da API Java)

## Estrutura de pastas
 
```
.
├── public/                  # favicon e arquivos estáticos
├── src/
│   ├── components/          # componentes reutilizáveis (Header, Footer, CardOcorrencia, Loading, Mensagem...)
│   ├── pages/               # uma página por rota
│   ├── services/            # funções de acesso à API (fetch)
│   ├── types/               # interfaces TypeScript (Ocorrencia, Bairro, Categoria, Usuario...)
│   ├── App.tsx              # definição das rotas
│   ├── main.tsx             # ponto de entrada
│   └── index.css            # import do Tailwind
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vercel.json
└── README.md
```