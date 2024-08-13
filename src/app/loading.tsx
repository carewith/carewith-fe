"use client";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";

export default function Loading() {
  return (
    <Container>
      <ClipLoader size={50} color={"#5A81FA"} />
    </Container>
  );
}
export const Container = styled.div`
  display: flex;
  width: 100vw;
  max-width: 768px;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 1.5rem 1rem;
`;
