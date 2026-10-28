import { useEffect, useState } from "react";
import EvolutionChain from "./components/EvolutionChain";
import PokemonCard from "./components/PokemonCard";
import SearchBar from "./components/SearchBar";
import { buscarPokemon } from "./services/pokeApi";
import type { Pokemon } from "./types/pokemon";

export default function App() {
  const [termo, setTermo] = useState("");
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    if (!termo) return;

    let ativo = true;

    async function carregarPokemon() {
      setCarregando(true);
      setErro("");
      setPokemon(null);

      try {
        const resultado = await buscarPokemon(termo);
        if (ativo) setPokemon(resultado);
      } catch {
        if (ativo) setErro("Pokémon não encontrado. Confira o nome e tente novamente.");
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    void carregarPokemon();
    return () => { ativo = false; };
  }, [termo]);

  return (
    <main className="app">
      <section className="pokedex" aria-labelledby="titulo-pokedex">
        <div className="pokedex__header">
          <span className="pokeball" aria-hidden="true"><i /></span>
          <div>
            <p className="eyebrow">Pokémon data explorer</p>
            <h1 id="titulo-pokedex">Pokédex</h1>
          </div>
        </div>
        <p className="intro">Pesquise um Pokémon pelo nome e descubra seus dados e evolução.</p>
        <SearchBar onBuscar={setTermo} />
        <section className="resultado" aria-live="polite">
          {!termo && <p className="mensagem mensagem--vazia">Comece pesquisando por <strong>pikachu</strong>, <strong>charmander</strong> ou <strong>eevee</strong>.</p>}
          {carregando && <p className="mensagem"><span className="spinner" aria-hidden="true" />Carregando dados do Pokémon…</p>}
          {erro && <p className="mensagem mensagem--erro" role="alert">{erro}</p>}
          {pokemon && <><PokemonCard pokemon={pokemon} /><EvolutionChain evolucoes={pokemon.evolucoes} /></>}
        </section>
      </section>
    </main>
  );
}
