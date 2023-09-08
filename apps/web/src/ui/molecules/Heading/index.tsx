import * as S from "./styles";

export type HeadingProps = {
  title: string;
};
export const Heading = ({ title }: HeadingProps) => (
  <S.Wrapper>{title}</S.Wrapper>
);
