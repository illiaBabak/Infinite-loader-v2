import { useRef } from 'react';
import { useInfiniteQueryPokemons } from 'src/api/pokemons';
import { Alert } from 'src/components/Alert';
import { Loader } from 'src/components/Loader';
import { Pokemon } from 'src/components/Pokemon';

const PAGE_SIZE = 20;

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 1,
};

export const App = (): JSX.Element => {
  const observer = useRef<IntersectionObserver | null>(null);

  const { data, fetchNextPage, isError, isFetchingNextPage } = useInfiniteQueryPokemons();

  const pokemons = data?.pages.flatMap((el) => el.results) ?? [];

  const handleIntersect = (el: HTMLElement | null) => {
    observer.current = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;

      if (pokemons.length + PAGE_SIZE <= (data?.pages[0].count ?? 0) && !isFetchingNextPage) fetchNextPage();
    }, options);

    if (el) observer.current.observe(el);
  };

  return (
    <div className='container'>
      <div className='list'>
        {pokemons.map((pokemon, index) => (
          <Pokemon name={pokemon.name} imgId={index + 1} key={`pokemon-${pokemon.name}-${index}`} />
        ))}
      </div>

      {isFetchingNextPage ? <Loader /> : <div ref={handleIntersect} />}

      {isError && <Alert />}
    </div>
  );
};
