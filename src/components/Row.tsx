import axios from "axios";
import { FC, useEffect, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Movie } from "./Movie";

type RowProps = {
  title: string;
  fetchURL: string;
  rowID: string;
};
export const Row: FC<RowProps> = ({ title, fetchURL, rowID }) => {
  const [movies, setMovies] = useState([]);
  let slider;

  useEffect(() => {
    axios.get(fetchURL).then((response) => {
      setMovies(response.data.results);
    });
  }, [fetchURL]);

  const slideLeft = () => {
    slider = document.getElementById("slider" + rowID);
    if (!slider) return;
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    slider = document.getElementById("slider" + rowID);
    if (!slider) return;
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={slideLeft}
          className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
        <div
          id={"slider" + rowID}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.map((item, id) => (
            <Movie key={id} item={item} />
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {movies.slice(0, 3).map((movie: any) => (
          <img
            className="w-full lg:w-[280px] h-auto block cursor-pointer relative p-2"
            src={`https://image.tmdb.org/t/p/w500/${movie?.backdrop_path}`}
            alt={movie?.title}
          />
        ))}
      </div>
    </>
  );
};
