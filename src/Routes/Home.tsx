import { useQuery } from "react-query";
import { getMovies, IGetMoviesResult } from "../api";
import styled from "styled-components";
import { makeImgPath } from "../ultilities";
import { motion, AnimatePresence } from "framer-motion"; // AnimatePresence는 컴포넌트가 render, destroy될 때 효과 줄 수 있따
import { useMatch, useNavigate } from "react-router"; // 페이지 이동 처리 hook
import { useState } from "react";
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
  width: 50%;
  font-size: 20px;
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  position: absolute; // 옆에 연속적으로 오게 하려면 필요한 속성인듯
  display: grid;
  grid-template-columns: repeat(6, 1fr); // 6개의 컬럼, 1fraction
  width: 100%;
  gap: 5px;
`;

const Box = styled(motion.div)`
  cursor: pointer;
  &:first-child {
    transform-origin: center left; // 왼쪽 중앙으로 기준점 변경
  }
  &:lasr-child {
    transform-origin: center right;
  }
`;
const Img = styled(motion.div)<{ bgPhoto: string }>`
  height: 200px;
  background-image: url(${(props) => props.bgPhoto});
  background-position: center center;
  background-size: cover;
`;

const Info = styled(motion.div)`
  padding: 20px;
  background-color: black;
  opacity: 0;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};

const boxVariants = {
  normal: {
    scale: 1.0,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.5, // hover인 상태일 때만 delay 주는거
      duration: 0.1,
      type: "tween",
    },
  },
};

const InfoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5, // hover인 상태일 때만 delay 주는거
      duration: 0.1,
      type: "tween",
    },
  },
};

function Home() {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const bigMovieMatch = useMatch("/movies/:movieId");
  console.log(bigMovieMatch);
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const offset = 6; // 한번에 보여줄 영화의 갯수
  const increaseIndex = () => {
    if (data) {
      // data가 있다면
      if (leaving) return; // leaving이 true면 바로 리턴
      toggleLeaving();
      const totalMovies = data.results.length - 1; // banner에서 쓴 영화 하나 빼고
      const maxIndex = Math.ceil(totalMovies / offset) - 1; // 반올림으로 row의 최대 갯수 구해주기
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1)); // row의 최댓값과 현재 페이지 인덱스가 같으면 처음 페이지로 돌아오도록
    }
  };

  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  return (
    <Wrapper style={{ height: "200vh" }}>
      {isLoading ? (
        <Loader>Loading..</Loader>
      ) : (
        <>
          <Banner
            onClick={increaseIndex}
            bgPhoto={makeImgPath(data?.results[0].backdrop_path || "")}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              {/* AnimatePresence는 Row가 사라질 때 exit 애니메이션 적용하여 부드러운 전환 가능 ,
              onExitComplete는 motion exit됐을 때 호출되는 함수
              inital false는 컴포넌트가 처음 mount될 때 애니메이션 없이 
              */}
              <Row
                key={index}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
              >
                {data?.results
                  .slice(1) // 첫번째 영화는 banner에서 쓰였으니 자르고
                  .slice(offset * index, offset * index + offset) // 각 페이지별로 offset만큼 나눠서 끊어주기
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + ""}
                      key={movie.id}
                      variants={boxVariants}
                      whileHover="hover"
                      initial="normal"
                      transition={{ type: "tween" }} // 마우스 왔따갔다 할 때 bounce효과때문
                      onClick={() => onBoxClicked(movie.id)}
                    >
                      <Img bgPhoto={makeImgPath(movie.poster_path, "w500")} />
                      <Info variants={InfoVariants}>{movie.title}</Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {bigMovieMatch ? (
              <motion.div
                layoutId={bigMovieMatch.params.movieId}
                style={{
                  position: "absolute",
                  width: "40vw",
                  height: "50vh",
                  backgroundColor: "red",
                  top: 50,
                  left: 0,
                  right: 0,
                  margin: "0 auto",
                }}
              >
                {bigMovieMatch.params.movieId}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
