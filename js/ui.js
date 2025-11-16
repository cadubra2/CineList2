import { IMAGE_BASE_URL } from "./api.js";

export function mostrarLoading() {
  document.getElementById("loading").classList.remove("escondido");
}

export function esconderLoading() {
  document.getElementById("loading").classList.add("escondido");
}

export function mostrarErro(mensagem) {
  const erroEl = document.getElementById("erro");
  erroEl.textContent = mensagem;
  erroEl.classList.remove("escondido");
}

export function limparErro() {
  const erroEl = document.getElementById("erro");
  erroEl.textContent = "";
  erroEl.classList.add("escondido");
}

/**
 * Renderiza os cards dos títulos na grade.
 */
export function renderizarTitulos(titulos, type, listaGeneros) {
  const container = document.getElementById("listaTitulos");
  container.innerHTML = "";

  if (!titulos || titulos.length === 0) {
    container.innerHTML = "<p>Nenhum resultado encontrado.</p>";
    return;
  }

  titulos.forEach((item) => {
    const card = document.createElement("article");
    card.className = "card-titulo";
    card.dataset.id = item.id;
    card.dataset.type = type;

    const img = document.createElement("img");
    img.className = "card-titulo__img";
    if (item.poster_path) {
      img.src = IMAGE_BASE_URL + item.poster_path;
      img.alt = item.title || item.name;
    } else {
      img.alt = "Sem imagem disponível";
    }

    const conteudo = document.createElement("div");
    conteudo.className = "card-titulo__conteudo";

    const tituloEl = document.createElement("h3");
    tituloEl.className = "card-titulo__titulo";
    tituloEl.textContent = item.title || item.name;

    const ano =
      (item.release_date && item.release_date.slice(0, 4)) ||
      (item.first_air_date && item.first_air_date.slice(0, 4)) ||
      "N/A";

    const tipoLegivel = type === "movie" ? "Filme" : "Série";

    const meta = document.createElement("p");
    meta.className = "card-titulo__meta";
    meta.textContent = `${tipoLegivel} • ${ano}`;

    const generosNomes = (item.genre_ids || [])
      .map((id) => listaGeneros[id])
      .filter(Boolean)
      .join(", ");

    const generosEl = document.createElement("p");
    generosEl.className = "card-titulo__generos";
    generosEl.textContent = generosNomes || "Gênero não informado";

    const overview = document.createElement("p");
    overview.className = "card-titulo__resumo";
    overview.textContent = item.overview
      ? item.overview
      : "Sinopse não disponível.";

    conteudo.appendChild(tituloEl);
    conteudo.appendChild(meta);
    conteudo.appendChild(generosEl);
    conteudo.appendChild(overview);

    card.appendChild(img);
    card.appendChild(conteudo);
    container.appendChild(card);
  });
}

/**
 * Atualiza o texto da paginação.
 */
export function atualizarInfoPagina(paginaAtual, totalPaginas) {
  const info = document.getElementById("infoPagina");
  info.textContent = `Página ${paginaAtual} de ${totalPaginas}`;
}

/**
 * Habilita/desabilita botões de paginação.
 */
export function atualizarBotoesPaginacao(paginaAtual, totalPaginas) {
  const btnPrev = document.getElementById("btnPrev");
  const btnNext = document.getElementById("btnNext");

  btnPrev.disabled = paginaAtual <= 1;
  btnNext.disabled = paginaAtual >= totalPaginas;
}

/**
 * Renderiza detalhes do título em um modal.
 */
export function mostrarDetalhes(detalhes, type) {
  const secDetalhes = document.getElementById("detalhesTitulo");
  secDetalhes.classList.remove("escondido");

  const poster = document.getElementById("detPoster");
  if (detalhes.poster_path) {
    poster.src = IMAGE_BASE_URL + detalhes.poster_path;
  } else {
    poster.removeAttribute("src");
  }

  document.getElementById("detTitulo").textContent =
    detalhes.title || detalhes.name;

  const ano =
    (detalhes.release_date && detalhes.release_date.slice(0, 4)) ||
    (detalhes.first_air_date && detalhes.first_air_date.slice(0, 4)) ||
    "N/A";

  const tipoLegivel = type === "movie" ? "Filme" : "Série";
  const infoExtra = `${tipoLegivel} • ${ano} • Idioma: ${
    detalhes.original_language?.toUpperCase() || "N/A"
  }`;

  document.getElementById("detInfoExtra").textContent = infoExtra;

  const rating = detalhes.vote_average
    ? `${detalhes.vote_average.toFixed(1)} / 10`
    : "Sem avaliação";

  document.getElementById(
    "detRating"
  ).textContent = `Avaliação média: ${rating}`;

  const sinopse =
    detalhes.overview && detalhes.overview.trim().length > 0
      ? detalhes.overview
      : "Sinopse não informada para este título.";
  document.getElementById("detSinopse").textContent = sinopse;

  // Temporadas (apenas para séries)
  const secTemporadas = document.getElementById("secTemporadas");
  const listaTemporadas = document.getElementById("listaTemporadas");
  const episodiosContainer = document.getElementById("episodiosContainer");
  const listaEpisodios = document.getElementById("listaEpisodios");

  listaTemporadas.innerHTML = "";
  listaEpisodios.innerHTML = "";
  episodiosContainer.classList.add("escondido");

  if (type === "tv" && detalhes.seasons && detalhes.seasons.length > 0) {
    secTemporadas.classList.remove("escondido");
    detalhes.seasons.forEach((season) => {
      const li = document.createElement("li");
      li.textContent = `Temporada ${season.season_number} — ${season.episode_count} episódios`;
      li.dataset.seasonNumber = season.season_number;
      li.dataset.serieId = detalhes.id;
      listaTemporadas.appendChild(li);
    });
  } else {
    secTemporadas.classList.add("escondido");
  }
}

/**
 * Oculta o modal de detalhes.
 */
export function fecharDetalhes() {
  const secDetalhes = document.getElementById("detalhesTitulo");
  secDetalhes.classList.add("escondido");
}

/**
 * Renderiza episódios de uma temporada.
 */
export function renderizarEpisodios(dadosTemporada) {
  const episodiosContainer = document.getElementById("episodiosContainer");
  const listaEpisodios = document.getElementById("listaEpisodios");

  listaEpisodios.innerHTML = "";

  if (!dadosTemporada.episodes || dadosTemporada.episodes.length === 0) {
    listaEpisodios.innerHTML = "<li>Sem episódios encontrados.</li>";
    episodiosContainer.classList.remove("escondido");
    return;
  }

  dadosTemporada.episodes.forEach((ep) => {
    const li = document.createElement("li");
    li.textContent = `${ep.episode_number}. ${ep.name}`;
    listaEpisodios.appendChild(li);
  });

  episodiosContainer.classList.remove("escondido");
}