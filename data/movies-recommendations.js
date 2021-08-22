const { parentPort, workerData } = require("worker_threads");
const { likedMovies } = workerData;
const recommender = require("movie-recommender");
const { movies } = require(".");

async function getRecommendations(likedMovies) {
  let recommendedMovies = await recommender.getRecommendations(likedMovies, 20);
  recommendedMovies = recommendedMovies.map((v) => {
    movies.getMovieById(v);
  });
  /* Mock data
  const recommendedMovies = [
    {
      _id: 246664,
      title: "Batman: Dying Is Easy",
      year: 2021,
      posterUrl: "/szcH4JUFQfL9jc26jETOepiq9NU.jpg",
    },
    ...
  ];*/

  parentPort.postMessage(recommendedMovies);
}

getRecommendations();
