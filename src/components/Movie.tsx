import { FC, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  contextDataType,
  useFavMovieContext,
} from "../context/FavMovieContext";

type MovieType = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type MovieProps = {
  item: MovieType;
};

export const Movie: FC<MovieProps> = ({ item }) => {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { updateListFavMovies, getFavMovies } =
    useFavMovieContext() as contextDataType;

  const saveShow = async (item: MovieType) => {
    const { id, title, backdrop_path } = item;
    setLike(!like);
    setSaved(true);
    //save show
    // updateListFavMovies({ id, title });
  };

  console.log(getFavMovies());
  return (
    <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
      <img
        className="w-full h-auto block"
        src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
        alt={item?.title}
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
        <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
          {item?.title}
        </p>
        <p onClick={() => saveShow(item)}>
          {like ? (
            <FaHeart className="absolute top-4 left-4 text-gray-300" />
          ) : (
            <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
          )}
        </p>
      </div>
    </div>
  );
};
