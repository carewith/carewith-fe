"use client";

import styled from "styled-components";
import { usePathname, useRouter } from "next/navigation";
import { FaArrowLeft, FaRegBell, FaRegUserCircle } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { HiOutlineDotsVertical } from "react-icons/hi";

const HeaderContainer = styled.header`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  height: 60px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.layout.padding};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const IconContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isHomePage = pathname === "/";
  const isMediblock = pathname.startsWith("/mediblock");
  const isEditCompletePage = pathname.endsWith("/edit/complete");

  return (
    <HeaderContainer>
      <LogoContainer>
        {isHomePage || isMediblock ? (
          <RxHamburgerMenu size={24} />
        ) : (
          <FaArrowLeft size={24} onClick={() => router.back()} />
        )}
        <Logo>LOGO</Logo>
      </LogoContainer>
      <IconContainer>
        {isEditCompletePage ? null : isMediblock ? (
          <HiOutlineDotsVertical size={24} />
        ) : (
          <>
            <FaRegBell size={24} />
            <FaRegUserCircle size={24} />
          </>
        )}
      </IconContainer>
    </HeaderContainer>
  );
};

export default Header;
