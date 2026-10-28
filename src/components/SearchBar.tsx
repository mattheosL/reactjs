import { useState, type FormEvent } from "react";

interface SearchBarProps {
  onBuscar: (termo: string) => void;
}

export default function SearchBar({ onBuscar }: SearchBarProps) {
  const [valor, setValor] = useState("");

  function buscar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const termo = valor.trim().toLowerCase();
    if (termo) onBuscar(termo);
  }

  return (
    <form className="search-bar" onSubmit={buscar}>
      <input
        value={valor}
        onChange={(evento) => setValor(evento.target.value)}
        placeholder="Ex.: pikachu"
        aria-label="Nome do Pokémon"
      />
      <button type="submit">Buscar</button>
    </form>
  );
}
