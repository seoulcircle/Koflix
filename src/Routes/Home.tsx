import { useQuery } from "react-query";
import { getMovies, IGetMoviesResult } from "../api";
import styled from "styled-components";
import { makeImgPath } from "../ultilities";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.black};
`;

const Loader = styled.div``;

const Banner = styled.div<{ bgPhoto: string }>`
  // bgPhoto가 온다고 알려주는중
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 58px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Overview = styled.p`
  width: 50vw;
  font-size: 20px;
`;

function Home() {
  const { data, isLoading, error } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  console.log(data);
  return (
    <Wrapper style={{ height: "200vh" }}>
      {isLoading ? (
        <Loader>Loading..</Loader>
      ) : (
        <Banner bgPhoto={makeImgPath(data?.results[0].poster_path || "")}>
          <Title>{data?.results[0].title}</Title>
          <Overview>{data?.results[0].overview}</Overview>
        </Banner>
      )}
    </Wrapper>
  );
}

export default Home;
