"use client";

import styled from "styled-components";
import { useState } from "react";
import { FaPlus, FaCamera } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";

const AddButtonContainer = styled.button`
  background-color: ${({ theme }) => theme.colors.primary.blue02};
  color: white;
  border: none;
  border-radius: 12px;
  padding: 0.75rem 0rem;
  font-size: 17px;
  margin-top: 2.25rem;
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    margin-right: 8px;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  width: 95%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
`;

const ModalHandle = styled.div`
  width: 40px;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.grey.background};
  border-radius: 2px;
`;

const ModalHeader = styled.div`
  font-size: 19px;
  font-weight: 500;
  align-self: flex-start;
  margin-top: 0.5rem;
`;

const ModalDescription = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.grey.grey02};
  text-align: left;
  align-self: flex-start;
  margin-bottom: 1rem;
`;

const ModalButtonGroup = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`;

const ModalButton = styled.button`
  background: #fff;
  border: 1px solid ${({ theme }) => theme.colors.grey.grey03};
  border-radius: 12px;
  padding: 1.5rem 1.5rem;
  text-align: center;
  flex: 1;
  font-size: 17px;
  cursor: pointer;
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

const AddButton = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <AddButtonContainer onClick={() => setShowModal(true)}>
        <FaPlus />
        복용약 추가
      </AddButtonContainer>
      {showModal && (
        <ModalOverlay onClick={() => setShowModal(false)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalHandle />
            <ModalHeader>복용약 추가</ModalHeader>
            <ModalDescription>
              건강을 지키는 작은 습관, 건강을 지키는 작은 습관
            </ModalDescription>
            <ModalButtonGroup>
              <ModalButton>
                <IoSearch size={20} /> 직접 등록
              </ModalButton>
              <ModalButton>
                <FaCamera size={20} /> 처방전 스캔
              </ModalButton>
            </ModalButtonGroup>
          </Modal>
        </ModalOverlay>
      )}
    </>
  );
};

export default AddButton;
