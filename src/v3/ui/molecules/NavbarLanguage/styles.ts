import styled, { css } from "styled-components";

export const Image = styled.img`
  transform: rotate(0deg);
`;

// NavbarLanguage Content

export const WrapperFlag = styled.div`
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
  & ${Image} {
    width: 2rem;
    height: 2rem;
  }
`;
export const WrapperImage = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${theme.colors.secondaryBackground};
    border-radius: 0.5rem;
    width: 2rem;
    height: 2rem;

    :hover {
      opacity: 0.8;
    }
  `}
`;
export const WrapperContent = styled.div`
  position: absolute;
  right: 0;
  background-color: #2e303c;
  color: white;
  border-radius: 0 1rem 1rem 1rem;
  padding: 1rem;
  -webkit-box-shadow: 0 7px 18px 0 rgba(0, 0, 0, 0.27);
  -moz-box-shadow: 0 7px 18px 0 rgba(0, 0, 0, 0.27);
  box-shadow: 0 7px 18px 0 rgba(0, 0, 0, 0.27);
  display: none;
  z-index: 1;
  a {
    padding: 0.5rem;
  }
`;
export const Wrapper = styled.div`
  width: fit-content;
  position: relative;

  &:hover ${WrapperContent} {
    display: block;
  }

  &:hover ${WrapperImage} ${Image} {
    transform: rotate(180deg);
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 1rem 0;
  cursor: pointer;
`;

export const Title = styled.span`
  margin-right: 0.5rem;
`;

export const ContainerContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

// Dropdown Open
export const WrapperCountry = styled.div`
  min-width: 15rem;
`;

export const WrapperCurrency = styled.div`
  min-width: 10rem;
  display: flex;
  flex-direction: column;
`;

export const TitleLanguage = styled.p`
  font-size: 1.2rem;
  opacity: 0.5;
  margin-bottom: 1rem;
`;
