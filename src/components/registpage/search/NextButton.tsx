"use client";
import styled from "styled-components";

const NextButton = () => <StyledNextButton>다음</StyledNextButton>;

export default NextButton;

const StyledNextButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary.blue02};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px;
  font-size: 16px;
  width: 100%;
  text-align: center;
  margin-top: 16px;
  cursor: pointer;
`;
