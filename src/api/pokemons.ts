import { useInfiniteQuery } from '@tanstack/react-query';
import { UseInfiniteQueryResult } from 'node_modules/@tanstack/react-query/build/legacy';
import { PokeListResponse, isPokemonsListResponse } from 'src/utils/guards';

const POKEMON_LIST_PAGE_SIZE = 20;

const getPokemons = async (pageNumber: number): Promise<(PokeListResponse & { pageNumber: number }) | undefined> => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${pageNumber * POKEMON_LIST_PAGE_SIZE}&limit=${POKEMON_LIST_PAGE_SIZE}`
    );

    const pokemonsData: unknown = await response.json();

    if (isPokemonsListResponse(pokemonsData)) {
      const { results, count } = pokemonsData;

      if (!results.length) throw new Error('Something went wrong with request');

      return { count, results, pageNumber };
    } else throw new Error('Something went wrong with API');
  } catch {
    throw new Error('Unexpected result');
  }
};

export const useInfiniteQueryPokemons = (): UseInfiniteQueryResult<
  { pages: PokeListResponse[] } | undefined,
  Error
> => {
  return useInfiniteQuery({
    queryKey: ['pokemons'],
    queryFn: async ({ pageParam }) => {
      return await getPokemons(pageParam);
    },
    initialPageParam: 0,
    getNextPageParam: (currentPage) => currentPage?.pageNumber ?? 0 + 1,
  });
};
