const API_KEY = "64f185d39f5340e399810230613e0132";
const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w300";

function buildUrl(path, params = {}) {
  const url = new URL(BASE_URL + path);
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("language", "pt-BR");
  Object.entries(params).forEach(([chave, valor]) => {
    if (valor !== undefined && valor !== null && valor !== "") {
      url.searchParams.set(chave, valor);
    }
  });
  return url.toString();
}

/**
 * Busca lançamentos do ano corrente usando o endpoint /discover.
 * type: "movie" ou "tv"
 */
export async function buscarLancamentos(type = "movie", page = 1, genreId = "") {
  const anoAtual = new Date().getFullYear();
  const filtroData =
    type === "movie"
      ? { "primary_release_date.gte": `${anoAtual}-01-01` }
      : { "first_air_date.gte": `${anoAtual}-01-01` };

  const params = {
    sort_by: "popularity.desc",
    page,
    with_genres: genreId || undefined,
    ...filtroData,
  };

  const url = buildUrl(`/discover/${type}`, params);

  try {
    const resposta = await fetch(url);
    if (!resposta.ok) {
      throw new Error("Erro ao buscar lançamentos.");
    }
    return await resposta.json();
  } catch (erro) {
    console.error("Erro em buscarLancamentos:", erro);
    throw erro;
  }
}

/**
 * Busca gêneros de filmes ou séries.
 */
export async function buscarGeneros(type = "movie") {
  const url = buildUrl(`/genre/${type}/list`);
  try {
    const resposta = await fetch(url);
    if (!resposta.ok) {
      throw new Error("Erro ao buscar gêneros.");
    }
    const dados = await resposta.json();
    return dados.genres || [];
  } catch (erro) {
    console.error("Erro em buscarGeneros:", erro);
    throw erro;
  }
}

/**
 * Busca detalhes de um título (movie ou tv).
 */
export async function buscarDetalhes(type, id) {
  const url = buildUrl(`/${type}/${id}`);
  try {
    const resposta = await fetch(url);
    if (!resposta.ok) {
      throw new Error("Erro ao buscar detalhes.");
    }
    return await resposta.json();
  } catch (erro) {
    console.error("Erro em buscarDetalhes:", erro);
    throw erro;
  }
}

/**
 * Busca episódios de uma temporada específica (apenas para séries).
 */
export async function buscarEpisodios(serieId, seasonNumber) {
  const url = buildUrl(`/tv/${serieId}/season/${seasonNumber}`);
  try {
    const resposta = await fetch(url);
    if (!resposta.ok) {
      throw new Error("Erro ao buscar episódios.");
    }
    return await resposta.json();
  } catch (erro) {
    console.error("Erro em buscarEpisodios:", erro);
    throw erro;
  }
}