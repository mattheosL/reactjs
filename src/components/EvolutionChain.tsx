import type { Evolucao } from "../types/pokemon";

interface EvolutionChainProps { evolucoes: Evolucao[]; }

export default function EvolutionChain({ evolucoes }: EvolutionChainProps) {
  if (evolucoes.length <= 1) return null;

  return (
    <section className="evolution" aria-labelledby="titulo-evolucao">
      <h3 id="titulo-evolucao">Cadeia de evolução</h3>
      <div className="evolucoes-lista">
        {evolucoes.map((evolucao, index) => (
          <div key={evolucao.id} className="evolucao-item">
            <div className="evolucao-card">
              {evolucao.imagem ? <img src={evolucao.imagem} alt={evolucao.nome} /> : <span className="image-fallback">Sem imagem</span>}
              <p>{evolucao.nome}</p>
            </div>
            {index < evolucoes.length - 1 && <span className="seta" aria-hidden="true">→</span>}
          </div>
        ))}
      </div>
    </section>
  );
}
