import { useLocation } from "react-router-dom";

function Search() {
  const location = useLocation(); // 현재 있는 곳에 관한 정보 얻을 수 있음
  const keyword = new URLSearchParams(location.search).get("keyword"); // url 쿼리 스트링을 다루기 위한 js 내장 객체, url에서 키워드 받아냄

  return null;
}

export default Search;
