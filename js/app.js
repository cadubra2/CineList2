// js/app.js
import {
  buscarLancamentos,
  buscarGeneros,
  buscarDetalhes,
  buscarEpisodios,
} from "./api.js";
import {
  mostrarLoading,
  esconderLoading,
  mostrarErro,
  limparErro,
  renderizarTitulos,
  atualizarInfoPagina,
  atualizarBotoesPaginacao,
  mostrarDetalhes,
  fecharDetalhes,
  renderizarEpisodios,
} from "./ui.js";

let estado = {
  type: "movie",
  generoSelecionado: "",
  paginaAtual: 1,
  totalPaginas: 1,
  mapaGeneros: {}, // id -> nome
};

async function carregarGeneros(type) {
  try {
    const generos = await buscarGeneros(type);
    const select = document.getElementById("generoSelect");
    select.innerHTML = '<option value="">Todos</option>';

    estado.mapaGeneros = {};
    generos.forEach((g) => {
      estado.mapaGeneros[g.id] = g.name;
      const opt = document.createElement("option");
      opt.value = g.id;
      opt.textContent = g.name;
      select.appendChild(opt);
    });
  } catch (erro) {
    console.error(erro);
    mostrarErro("Não foi possível carregar os gêneros. Tente novamente.");
  }
}

async function carregarTitulos() {
  mostrarLoading();
  limparErro();
  try {
    const dados = await buscarLancamentos(
      estado.type,
      estado.paginaAtual,
      estado.generoSelecionado
    );
    estado.totalPaginas = dados.total_pages;
    renderizarTitulos(dados.results, estado.type, estado.mapaGeneros);
    atualizarInfoPagina(estado.paginaAtual, estado.totalPaginas);
    atualizarBotoesPaginacao(estado.paginaAtual, estado.totalPaginas);
  } catch (erro) {
    mostrarErro("Erro ao carregar títulos. Verifique sua conexão ou tente mais tarde.");
  } finally {
    esconderLoading();
  }
}

async function aoTrocarTipo(evento) {
  estado.type = evento.target.value;
  estado.paginaAtual = 1;
  await carregarGeneros(estado.type);
  await carregarTitulos();
}

async function aoTrocarGenero(evento) {
  estado.generoSelecionado = evento.target.value;
  estado.paginaAtual = 1;
  await carregarTitulos();
}

async function aoClicarPagina(delta) {
  const novaPagina = estado.paginaAtual + delta;
  if (novaPagina < 1 || novaPagina > estado.totalPaginas) return;
  estado.paginaAtual = novaPagina;
  await carregarTitulos();
}

async function aoClicarCard(evento) {
  const card = evento.target.closest(".card-titulo");
  if (!card) return;

  const { id, type } = card.dataset;

  mostrarLoading();
  limparErro();
  try {
    const detalhes = await buscarDetalhes(type, id);
    mostrarDetalhes(detalhes, type);
  } catch (erro) {
    mostrarErro("Não foi possível carregar os detalhes desse título.");
  } finally {
    esconderLoading();
  }
}

async function aoClicarTemporada(evento) {
  const li = evento.target.closest("li");
  if (!li) return;

  const seasonNumber = li.dataset.seasonNumber;
  const serieId = li.dataset.serieId;
  if (!seasonNumber || !serieId) return;

  mostrarLoading();
  try {
    const dadosTemporada = await buscarEpisodios(serieId, seasonNumber);
    renderizarEpisodios(dadosTemporada);
  } catch (erro) {
    console.error(erro);
    mostrarErro("Não foi possível carregar os episódios dessa temporada.");
  } finally {
    esconderLoading();
  }
}

function configurarNavegacaoSecoes() {
  const botoes = document.querySelectorAll(".menu__link");
  const secCatalogo = document.getElementById("sec-catalogo");
  const secEquipe = document.getElementById("sec-equipe");

  botoes.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.section;
      if (target === "catalogo") {
        secCatalogo.classList.remove("escondido");
        secEquipe.classList.add("escondido");
      } else {
        secEquipe.classList.remove("escondido");
        secCatalogo.classList.add("escondido");
      }
    });
  });
}

function colocarAnoRodape() {
  const spanAno = document.getElementById("anoAtual");
  spanAno.textContent = new Date().getFullYear();
}

function configurarEventos() {
  document
    .getElementById("tipoSelect")
    .addEventListener("change", aoTrocarTipo);

  document
    .getElementById("generoSelect")
    .addEventListener("change", aoTrocarGenero);

  document
    .getElementById("btnPrev")
    .addEventListener("click", () => aoClicarPagina(-1));

  document
    .getElementById("btnNext")
    .addEventListener("click", () => aoClicarPagina(1));

  document
    .getElementById("listaTitulos")
    .addEventListener("click", aoClicarCard);

  document
    .getElementById("btnFecharDetalhes")
    .addEventListener("click", () => fecharDetalhes());

  // fechar ao clicar fora do conteúdo
  document
    .getElementById("detalhesTitulo")
    .addEventListener("click", (e) => {
      if (e.target.id === "detalhesTitulo") {
        fecharDetalhes();
      }
    });

  document
    .getElementById("listaTemporadas")
    .addEventListener("click", aoClicarTemporada);
}

async function iniciar() {
  configurarEventos();
  configurarNavegacaoSecoes();
  colocarAnoRodape();

  await carregarGeneros(estado.type);
  await carregarTitulos();
}

document.addEventListener("DOMContentLoaded", iniciar);
