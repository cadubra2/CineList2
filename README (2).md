# 🎬 CineList  
Catálogo interativo de filmes e séries utilizando a API oficial do **The Movie Database (TMDB)**.  
Projeto desenvolvido como atividade prática do 3º período de Ciência da Computação.

---

## 📌 Sobre o Projeto

O **CineList** é uma aplicação web que permite:

- Visualizar lançamentos de **filmes** e **séries** do ano atual  
- Filtrar por **tipo** (filme/série)  
- Filtrar por **gênero**  
- Navegar entre páginas de resultados  
- Abrir um **modal detalhado** com informações completas  
- Para séries: visualizar temporadas e episódios  
- Conhecer a equipe que desenvolveu o projeto  

A aplicação foi construida do zero utilizando HTML, CSS e JavaScript modularizado.

---

## 🚀 Funcionalidades

### 🔎 Catálogo
- Lista de lançamentos atualizados do ano corrente  
- Cards com:
  - Imagem do poster  
  - Título  
  - Gêneros  
  - Ano  
  - Sinopse resumida em 2 linhas  
- Paginação dinâmica  
- Feedback de carregamento e erros  

---

### 📝 Detalhes do Título
Ao clicar em um card, o usuário pode visualizar:

- Poster em alta qualidade  
- Título completo  
- Ano de lançamento  
- Idioma original  
- Nota média TMDB  
- Sinopse completa  

Para **séries**, também é exibido:

- Lista de temporadas  
- Lista de episódios de cada temporada  

---

### 👥 Equipe
Seção dedicada aos membros do grupo:

- Foto circular  
- Nome completo  
- Papel desempenhado no desenvolvimento  

---

## 🧩 Tecnologias Utilizadas

- **HTML5**
- **CSS3**
- **JavaScript ES Modules**
- **Fetch API**
- **TMDB API**

---

## 🗂️ Estrutura do Projeto

```
CineList/
│
├── README.md
├── index.html
├── styles.css
│
└── js/
    ├── app.js
    ├── api.js
    └── ui.js
│
└── img/
```

---

## 🔧 Como Executar o Projeto

1. Baixe ou clone o repositório:
```bash
git clone https://github.com/SEU-USUARIO/CineList.git
```

2. Abra o arquivo **index.html** no navegador  
3. Configure sua **API KEY** no arquivo `api.js`:
```js
const API_KEY = "SUA_CHAVE_AQUI";
```

---

## 🧪 Requisitos

- Navegador atualizado  
- Conexão com a internet (para carregar dados da API)  

---

## 🧑‍💻 Membros da Equipe

| Nome | Função |
|------|--------|
| Carlos Eduardo Brandão Benedito | Estruturação inicial do HTML e organização |
| Pedro Henrique Sousa Cruz | Implementação da API (api.js) |
| Dalessandro José Coelho da Silva | Estilização, layout e ui.js |
| Antônio Wesley Veras Costa | Lógica principal, filtros, paginação e integração geral |

---

## 📜 Licença
Projeto desenvolvido apenas para fins **educacionais**.
