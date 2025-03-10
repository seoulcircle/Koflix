import { Link, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  motion,
  useScroll,
  useAnimation,
  useMotionValueEvent,
} from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Nav = styled(motion.nav)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  height: 80px;
  background-color: black;
  color: white;
  font-size: 14px;
  padding: 20px 60px;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 95px;
  height: 25px;
  fill: ${(props) => props.theme.red};
  path {
    stroke-width: 5px;
    stroke: white;
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Item = styled.li`
  margin-right: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  &:hover {
    font-weight: bold;
  }
`;
const Circle = styled(motion.span)`
  // layoutId를 위한 motion.span
  position: absolute;
  bottom: -5px;
  width: 5px;
  height: 5px;
  border-radius: 3px;
  background-color: ${(props) => props.theme.red};
`;
const Search = styled.form`
  // form 요소여야만 OnSubmitdl 정상작동
  position: relative;
  color: white;
  display: flex;
  align-items: center;

  svg {
    position: absolute;
    right: 0;
    height: 25px;
  }
`;

const Input = styled(motion.input)`
  transform-origin: right center; // 변화가 시작하는 위치
  background: transparent;
  border: 1px solid white;
  color: white;
  padding: 5px 10px 5px 33px;
`;

const NavVariants = {
  top: {
    backgroundColor: "rgba(0,0,0,0)",
  },
  scroll: {
    backgroundColor: "rgba(0,0,0,1)",
  },
};

const LogoVariants = {
  normal: {
    fillOpacity: 1,
    pathLength: 0,
    transition: { duration: 1 },
  },
  active: {
    fillOpacity: 0,
    pathLength: 1,
    transition: {
      pathLength: { duration: 4 },
      fillOpacity: { duration: 1 },
    },
  },
};

interface IForm {
  keyword: string;
}

function Header() {
  const homeMatch = useMatch("/"); // React Router에서 현재 경로url이 특정 경로와 일치하는지 확인하는 훅
  const tvMatch = useMatch("tv");
  const [searchOpen, setSearchOpen] = useState(false);
  const openSearch = () => setSearchOpen((current) => !current);
  const navAnimation = useAnimation(); // 원하는 시점에 애니메이션을 실행하거나 중단 가능
  const { scrollY } = useScroll(); // 현재의 스크롤 값
  useMotionValueEvent(scrollY, "change", (y) => {
    if (y < 0.1) {
      navAnimation.start("top"); // 스크롤이 0일 때 'top' 애니메이션 실행
    } else {
      navAnimation.start("scroll"); // 스크롤 내려가면 scroll 애니메이션 실행
    }
  });
  const { register, handleSubmit } = useForm<IForm>();
  const navigate = useNavigate();
  const onValid = (data: IForm) => {
    navigate(`/search?keyword=${data.keyword}`);
  };

  return (
    <Nav variants={NavVariants} animate={navAnimation} initial={"top"}>
      <Col>
        <Logo
          xmlns="http://www.w3.org/2000/svg"
          width="1024"
          height="276.742"
          viewBox="0 0 1024 276.742"
        >
          <motion.path
            variants={LogoVariants}
            initial="normal"
            whileHover="active"
            d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z"
          />
        </Logo>
        <Items>
          <Link to="/">
            <Item style={{ fontWeight: homeMatch ? "bold" : "normal" }}>
              Home
              {homeMatch ? <Circle layoutId="circle" /> : ""}
            </Item>
          </Link>
          <Link to="tv">
            <Item style={{ fontWeight: tvMatch ? "bold" : "normal" }}>
              Tv Shows
              {tvMatch ? <Circle layoutId="circle" /> : ""}
            </Item>
          </Link>
        </Items>
      </Col>
      <Col>
        <Search onSubmit={handleSubmit(onValid)}>
          <motion.svg
            animate={{ x: searchOpen ? -160 : 0 }} // 돋보기 누를 때 아이콘 위치 변경
            onClick={openSearch}
            transition={{ type: "linear" }} // 애니메이션 속도 시작부터 끝까지 같은 속도로 움직이게 -> 기계적인 느낌
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </motion.svg>
          <Input
            {...register("keyword", { required: true, minLength: 2 })}
            animate={{ scaleX: searchOpen ? 1 : 0 }} // 돋보기 누를 때 input창의 사이즈 조절
            transition={{ type: "linear" }}
            placeholder="title, actor, genre"
          />
        </Search>
      </Col>
    </Nav>
  );
}
export default Header;
