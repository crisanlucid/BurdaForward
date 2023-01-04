import { createContext, ReactNode, useContext, useState } from "react";

type ErrorMessage = {
  message: string;
  name: string;
};

export type FavoriteMovie = {
  id: number;
  title: string;
  img: string;
};

export type contextDataType = {
  getFavMovies: () => FavoriteMovie[] | [];
  updateListFavMovies: (_m: FavoriteMovie) => void;
  errors?: ErrorMessage[] | [];
};

export const FavMoviesContext = createContext<contextDataType | null>(null);

type StateContextProviderProps = { children: ReactNode };

export const FavMoviesProvider = ({ children }: StateContextProviderProps) => {
  const [listFavMovies, setListFavMovies] = useState<FavoriteMovie[]>([]);
  const [errors, setErrors] = useState<ErrorMessage[]>([]);
  //   const [loading, setLoading] = useState(true);

  const getFavMovies = () => {
    return listFavMovies;
  };

  const updateListFavMovies = (movie: FavoriteMovie) => {
    setListFavMovies([...listFavMovies, movie]);
  };

  let contextData = {
    getFavMovies: getFavMovies,
    updateListFavMovies: updateListFavMovies,
    errors: errors,
  };

  return (
    <FavMoviesContext.Provider value={contextData}>
      {children}
    </FavMoviesContext.Provider>
  );
};

export const useFavMovieContext = () => {
  return useContext(FavMoviesContext);
};
