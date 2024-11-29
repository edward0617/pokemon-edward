export interface BasicPokemonDataType {
  name: string;
  url: string;
}

interface Type {
  slot: number;
  type: BasicPokemonDataType;
}
export interface PokemonResultType {
  count: number;
  next: string | null;
  previous: string | null;
  results: BasicPokemonDataType[];
}

interface Sprites {
  front_default: string;
  back_default: string;
}

export interface PokemonCardType {
  name: string;
  id: number;
  sprites: Sprites;
  types: Type[];
}