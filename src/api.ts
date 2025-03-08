const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmOWMwODMzMWIwZDc2OTE0OGY2YThjMTQzMjI5YzAzYyIsIm5iZiI6MTc0MTQyMjE4MS4zMDQsInN1YiI6IjY3Y2JmZTY1OWEzZjcwMTNmYTRmNzMwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g2Wvh4CL_arZilCkWTcU5gv0FqKjMf4MSP6h24BtVRo",
  },
};
export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}
export interface IGetMoviesResult {
  data: {
    maximum: number;
    minimum: number;
  };
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export async function getMovies() {
  // fetch는 Promise이므로 async로 작성해야함
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
    options
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movies"); // 에러 처리
  }

  return response.json(); // 데이터를 반환
}

export function getImage() {
  fetch("https://api.themoviedb.org/3/movie/${movie_id}/images", options)
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}
