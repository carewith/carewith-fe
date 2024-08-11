"use client";
import { Container } from "@/components/registpage/add/RegisterAddPage.styles";
import { registDispenser } from "@/service/dispenser";

function TestPage() {
  const handleRegister = async () => {
    try {
      const response = await registDispenser("ZjczYTc", 1);
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <button onClick={handleRegister}>테스트버튼</button>
    </Container>
  );
}

export default TestPage;
