import type { Evolucao, Pokemon } from "../types/pokemon";

const API_URL = "https://pokeapi.co/api/v2";

interface PokemonApiResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: { front_default: string | null };
  species: { url: string };
}

interface SpeciesApiResponse { evolution_chain: { url: string }; }

interface ChainNode {
  species: { name: string; url: string };
  evolves_to: ChainNode[];
}

interface EvolutionChainApiResponse { chain: ChainNode; }

async function consultar<T>(url: string): Promise<T> {
  const resposta = await fetch(url);
  if (!resposta.ok) throw new Error("Pokémon não encontrado.");
  return resposta.json() as Promise<T>;
}

async function buscarEvolucao(nome: string): Promise<Evolucao> {
  const dados = await consultar<PokemonApiResponse>(`${API_URL}/pokemon/${nome}`);
  return { id: dados.id, nome: dados.name, imagem: dados.sprites.front_default };
}

function nomesDaCadeia(no: ChainNode): string[] {
  const nomes = [no.species.name];
  let atual = no;
  while (atual.evolves_to[0]) {
    atual = atual.evolves_to[0];
    nomes.push(atual.species.name);
  }
  return nomes;
}

export async function buscarPokemon(nome: string): Promise<Pokemon> {
  const dados = await consultar<PokemonApiResponse>(`${API_URL}/pokemon/${encodeURIComponent(nome)}`);
  const especie = await consultar<SpeciesApiResponse>(dados.species.url);
  const cadeia = await consultar<EvolutionChainApiResponse>(especie.evolution_chain.url);
  const evolucoes = await Promise.all(nomesDaCadeia(cadeia.chain).map(buscarEvolucao));

  return {
    id: dados.id,
    nome: dados.name,
    imagem: dados.sprites.front_default,
    altura: dados.height,
    peso: dados.weight,
    evolucoes,
  };
}
