import * as S from "./styles";
import { Props } from "./types";

export const Skeleton = ({
  width = "-webkit-fill-available",
  height = "1rem",
  ...props
}: Props) => <S.Wrapper width={width} height={height} {...props}></S.Wrapper>;

export default Skeleton;
