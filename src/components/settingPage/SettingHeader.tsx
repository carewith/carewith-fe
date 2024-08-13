import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa6";
import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  margin-bottom: 1rem;
  gap: 12px;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
`;

export const HeaderTitle = styled.h1`
  font-size: 21px;
  font-weight: 400;
  margin: 0;
`;

export const SettingHeader = ({ title }: { title: string }) => {
  const router = useRouter();

  return (
    <HeaderContainer>
      <BackButton onClick={() => router.back()}>
        <FaChevronLeft size={20} />
      </BackButton>
      <HeaderTitle>{title}</HeaderTitle>
    </HeaderContainer>
  );
};
