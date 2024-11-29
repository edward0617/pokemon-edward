export interface BasicPokemonDataType {
  name: string;
  url: string;
}

export interface PokemonResultType {
  count: number;
  next: string | null;
  previous: string | null;
  results: BasicPokemonDataType[];
}

export interface Sprites {
  front_default: string;
  back_default: string;
}

export interface PokemonCardType {
  name: string;
  sprites: Sprites;
}