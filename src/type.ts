export interface Language {
  name: string;
}

export interface NameEntry {
  language: Language;
  name: string;
}

export interface PokemonSpecies {
  names: NameEntry[];
}

export interface Pokemon {
  id: number;
  name: string;
  url: string;
  names?: NameEntry[];
  image?: string;
  engName?: string;
}
