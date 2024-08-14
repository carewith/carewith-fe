import {
  ModalOverlay,
  ModalContent,
  ModalHandle,
  ModalTitle,
  ModalButton,
} from "@/components/mypage/myPage.styles";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHandle />
        <ModalTitle>{title}</ModalTitle>
        {children}
        <ModalButton onClick={onClose}>확인</ModalButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
