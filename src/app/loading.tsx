"use client";
import { Container } from "@/components/registpage/add/RegisterAddPage.styles";
import { ClipLoader } from "react-spinners";

export default function Loading() {
  return (
    <Container>
      <ClipLoader size={50} color={"#5A81FA"} />
    </Container>
  );
}
