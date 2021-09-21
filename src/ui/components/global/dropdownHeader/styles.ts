import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
${({ theme }) => css`
  display: flex;
  align-items: center;
  color: ${theme.colors.white};
  cursor: pointer;
  & span {
    font-weight: 600;
  }
  div:last-child {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    margin-left: .5rem;
    background: ${theme.colors.gray};
    border-radius: .4rem;
  }
`}
`

export const WrapperIcon = styled.div`
  margin-right: .6rem;
  & img {
    max-width: 2.2rem;
    width: 100%;
  }
`

