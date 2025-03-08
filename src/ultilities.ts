// 이미지 경로 id, format 받아 이미지 경로를 만들어주는 함수
export function makeImgPath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}
