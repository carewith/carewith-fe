"use client";

import styled from "styled-components";
import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { usePathname, useRouter } from "next/navigation";
import {
  FaRegCheckCircle,
  FaRegBell,
  FaRegUserCircle,
  FaRegTrashAlt,
  FaPencilAlt,
} from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Image from "next/image";

const HeaderContainer = styled.header`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  background-color: transparent;
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
  gap: 12px;
`;

const IconContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1000;
  padding-bottom: 1rem;
`;

const Modal = styled.div`
  background: #fff;
  padding: 1rem;
  border-radius: 24px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 95%;
  max-width: 768px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const ModalHandle = styled.div`
  width: 40px;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.grey.background};
  border-radius: 2px;
  margin-bottom: 1rem;
`;

const ModalButton = styled.button`
  background: #fff;
  border: 1px solid ${({ theme }) => theme.colors.grey.grey03};
  border-radius: 17px;
  padding: 0.5rem 1rem;
  width: 100%;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  line-height: 1.5;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${({ theme }) => theme.colors.grey.background};
  }

  svg {
    vertical-align: middle;
  }
`;

const ModalAlert = styled.div`
  background: #fff;
  border: 1px solid ${({ theme }) => theme.colors.grey.grey03};
  border-radius: 17px;
  padding: 1rem;
  width: 100%;
  text-align: center;
  font-size: 16px;
  line-height: 1.5;
`;

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isHomePage = pathname === "/";
  const isMediblock = pathname.startsWith("/cartridge");
  const isEditCompletePage = pathname.endsWith("/edit/complete");
  const isEditPage = pathname.endsWith("/edit");

  const isEditPath = pathname.includes("/edit");

  const handleEditClick = () => {
    const slug = pathname.split("/")[2];
    if (isEditPath) {
      setShowModal(false);
      setShowAlert(true);
    } else {
      setShowModal(false);
      router.push(`/cartridge/${slug}/edit`);
    }
  };

  const isAuthPage = pathname === "/login" || pathname === "/signup";

  if (isAuthPage) {
    return null;
  }

  return (
    <>
      <HeaderContainer>
        <LogoContainer>
          {isEditPath ? (
            // Only show the back icon when on an edit page
            <FaChevronLeft size={24} onClick={() => router.back()} />
          ) : isHomePage || isMediblock ? (
            <RxHamburgerMenu size={24} />
          ) : (
            <FaChevronLeft size={24} onClick={() => router.back()} />
          )}

          {/* Hide the logo when on an edit page */}
          {!isEditPath && (
            <Image
              src={"/images/Carewith_logo.png"}
              alt="logo"
              width={30}
              height={30}
              onClick={() => router.push("/")}
            />
          )}
        </LogoContainer>
        {!isEditPath && (
          <IconContainer>
            {isEditCompletePage ? null : isMediblock ? (
              <HiOutlineDotsVertical
                size={24}
                onClick={() => setShowModal(true)}
              />
            ) : (
              <>
                <FaRegBell size={24} />
                <FaRegUserCircle size={24} />
              </>
            )}
          </IconContainer>
        )}
      </HeaderContainer>
      {showModal && (
        <ModalOverlay onClick={() => setShowModal(false)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalHandle />
            <ModalButton>
              <FaRegCheckCircle /> 복용
            </ModalButton>
            <ModalButton onClick={handleEditClick}>
              <FaPencilAlt /> 편집
            </ModalButton>
            <ModalButton>
              <FaRegTrashAlt /> 삭제
            </ModalButton>
          </Modal>
        </ModalOverlay>
      )}
      {showAlert && (
        <ModalOverlay onClick={() => setShowAlert(false)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalHandle />
            <ModalAlert>이미 편집 모드에 있습니다.</ModalAlert>
          </Modal>
        </ModalOverlay>
      )}
    </>
  );
};

export default Header;
