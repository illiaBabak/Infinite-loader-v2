import { PokemonType } from 'src/types/pokemon';

export type PokeListResponse = {
  count: number;
  results: PokemonType[];
};

const isObj = (data: unknown): data is object => !!data && typeof data === 'object';

const isString = (val: unknown): val is string => typeof val === 'string';

const isPokemon = (data: unknown): data is PokemonType => {
  return isObj(data) && 'name' in data && 'url' in data && typeof isString(data.name) && isString(data.url);
};

export const isPokemonsListResponse = (data: unknown): data is PokeListResponse => {
  return (
    isObj(data) &&
    'results' in data &&
    'count' in data &&
    typeof data.count === 'number' &&
    Array.isArray(data.results) &&
    data.results.every((el) => isPokemon(el))
  );
};
