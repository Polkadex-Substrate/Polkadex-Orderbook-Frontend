import styled from "styled-components";

export const Label = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: fit-content;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  /* Style the checkmark/indicator */
  span:after {
    margin-left: 0.5rem;
    margin-top: 0.2rem;
    width: 0.3rem;
    height: 0.6rem;
    border: solid white;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;
export const Input = styled.input`
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;

  /* When the checkbox is checked*/
  :checked ~ span {
    background-color: #e6007a;
  }

  /* Show the checkmark when checked */
  :checked ~ span:after {
    display: block;
  }
`;
export const Span = styled.span`
  width: 1.5rem;
  height: 1.5rem;
  background-color: #434658;
  margin-right: 0.5rem;
  border-radius: 0.4rem;

  /* Checkmark/indicator (hidden when not checked) */
  :after {
    content: "";
    display: none;
  }
`;
export const Title = styled.p`
  font-size: 1.3rem;
  white-space: nowrap;
`;
