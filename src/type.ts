type PokemonResponse = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  order: number;
  is_default: boolean;
  abilities: Ability[];
  forms: NamedAPIResource[];
  game_indices: GameIndex[];
  held_items: HeldItem[];
  location_area_encounters: string;
  moves: Move[];
  species: NamedAPIResource;
  sprites: Sprites;
  stats: Stat[];
  types: TypeSlot[];
};

type Ability = {
  ability: NamedAPIResource;
  is_hidden: boolean;
  slot: number;
};

type NamedAPIResource = {
  name: string;
  url: string;
};

type GameIndex = {
  game_index: number;
  version: NamedAPIResource;
};

type HeldItem = {
  item: NamedAPIResource;
  version_details: {
    rarity: number;
    version: NamedAPIResource;
  }[];
};

type Move = {
  move: NamedAPIResource;
  version_group_details: {
    level_learned_at: number;
    move_learn_method: NamedAPIResource;
    version_group: NamedAPIResource;
  }[];
};

type Sprites = {
  front_default: string | null;
};

type Stat = {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
};

type TypeSlot = {
  slot: number;
  type: NamedAPIResource;
};
