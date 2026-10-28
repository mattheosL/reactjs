import type { Pokemon } from "../types/pokemon";

interface PokemonCardProps { pokemon: Pokemon; }

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <article className="pokemon-card">
      <div className="pokemon-card__image">
        {pokemon.imagem ? <img src={pokemon.imagem} alt={pokemon.nome} /> : <span className="image-fallback">Imagem indisponível</span>}
      </div>
      <div className="pokemon-card__content">
        <p className="pokemon-card__number">Nº {String(pokemon.id).padStart(3, "0")}</p>
        <h2>{pokemon.nome}</h2>
        <dl className="pokemon-card__stats">
          <div><dt>Altura</dt><dd>{pokemon.altura / 10} m</dd></div>
          <div><dt>Peso</dt><dd>{pokemon.peso / 10} kg</dd></div>
        </dl>
      </div>
    </article>
  );
}
