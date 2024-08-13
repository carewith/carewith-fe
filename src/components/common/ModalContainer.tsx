import styled from "styled-components";
import { IoWarningOutline } from "react-icons/io5";

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 30px 20px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledIcon = styled(IoWarningOutline)`
  color: ${({ theme }) => theme.colors.primary.blue02};
  font-size: 60px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin-bottom: 15px;
`;

const Content = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 25px;
  line-height: 1.5;
`;

const ConfirmButton = styled.button`
  padding: 12px 24px;
  border: none;
  width: 100%;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.primary.blue02};
  color: white;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.blue01};
  }
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  confirmText: string;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  content,
  confirmText,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <IconWrapper>
          <StyledIcon />
        </IconWrapper>
        <Title>{title}</Title>
        <Content>{content}</Content>
        <ConfirmButton onClick={onConfirm}>{confirmText}</ConfirmButton>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default Modal;
