import { useState } from 'react';
import { ImgLoader } from '../ImgLoader';
import { ImgError } from '../ImgError';

type Props = {
  name: string;
  imgId: number;
};

export const Pokemon = ({ name, imgId }: Props): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  return (
    <div className='pokemon'>
      {isLoading && <ImgLoader />}
      {isError ? (
        <ImgError />
      ) : (
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${imgId}.png`}
          onLoad={() => setIsLoading(false)}
          style={{ display: isLoading ? 'none' : 'block' }}
          onError={() => {
            setIsLoading(false);
            setIsError(true);
          }}
        />
      )}
      <p>{name}</p>
    </div>
  );
};
