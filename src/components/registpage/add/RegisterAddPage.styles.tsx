import { slideDown, slideIn, slideUp } from "@/utils/animate";
import styled, { css } from "styled-components";

export const Container = styled.div`
  padding: 1.5rem 1rem;
`;

export const SectionTitle = styled.h3`
  font-size: 16px;
  margin-bottom: 8px;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin: 1rem 0;
  background-color: ${({ theme }) => theme.colors.grey.background};
`;

export const SearchBarContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.grey.background};
  border-radius: 0.75rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  position: relative;
`;

export const SearchInput = styled.input`
  border: none;
  background: none;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.grey.grey01};
  width: 100%;
  cursor: pointer;
`;

export const ClearIcon = styled.div`
  cursor: pointer;
  position: absolute;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalOverlay = styled.div<{ isClosing: boolean }>`
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
  ${({ isClosing }) =>
    isClosing &&
    css`
      animation: ${slideDown} 0.3s ease-out forwards;
    `}
`;

export const ModalContainer = styled.div<{ isClosing: boolean }>`
  background: white;
  padding: 2rem;
  padding-top: 3rem;
  border-radius: 20px 20px 0 0;
  width: 100%;
  max-width: 750px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  animation: ${slideUp} 0.3s ease-out;
  overflow-y: auto;

  ${({ isClosing }) =>
    isClosing &&
    css`
      animation: ${slideDown} 0.3s ease-out forwards;
    `}
`;

export const HandleBar = styled.div`
  width: 40px;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.grey.grey03};
  border-radius: 2px;
  position: absolute;
  top: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
`;

export const MedicineInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const MedicineImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  margin-right: 15px;
`;

export const MedicineDetails = styled.div`
  flex: 1;
`;

export const MedicineName = styled.h3`
  font-size: 17px;
  font-weight: 400;
  margin: 0;
  color: ${({ theme }) => theme.colors.grey.grey01};
`;

export const MedicineDescription = styled.p`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.grey.grey02};
  margin: 5px 0 0;
`;

export const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  flex: 1;
  justify-content: center;
`;

export const StepContent = styled.div`
  animation: ${slideIn} 0.5s ease;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const StepTitle = styled.h3`
  font-size: 17px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.grey.grey01};
  margin-bottom: 5px;
`;

export const StepDescription = styled.p`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.grey.grey02};
  margin-bottom: 1rem;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.grey.grey01};
  display: flex;
  align-items: center;
`;

export const InputWrapper = styled.div`
  flex: 0 0 60%;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 14px;
  border: 1px solid ${({ theme }) => theme.colors.grey.grey03};
  border-radius: 6px;
  text-align: center;
  background-color: white;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary.blue02};
    outline: none;
  }
`;

export const InfoIcon = styled.span`
  margin-left: 0.5rem;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.grey.grey02};
`;

export const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin: 1rem 0;
`;

export const NumberButton = styled.button`
  padding: 1rem;
  font-size: 17px;
  min-height: 70px;
  background-color: #f0f0f0;
  border: none;
  color: #d9d9d9;
  border-radius: 12px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.blue02};
    color: white;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 24px;
`;

export const Spacer = styled.div`
  width: 10%;
`;

export const NextStepButton = styled.button<{ fullWidth?: boolean }>`
  background-color: ${({ theme }) => theme.colors.primary.blue02};
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  max-height: 50px;
  font-size: 17px;
  cursor: pointer;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "45%")};
`;

export const RoutingButton = styled.button<{ fullWidth?: boolean }>`
  border: 1px solid ${({ theme }) => theme.colors.grey.grey03};
  color: 1px solid ${({ theme }) => theme.colors.grey.grey01};
  background-color: white;
  padding: 12px 20px;
  border-radius: 12px;
  max-height: 50px;
  font-size: 17px;
  margin: 0.75rem 0;
  cursor: pointer;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "45%")};
`;

export const PreviousStepButton = styled(NextStepButton)`
  background-color: white;
  color: ${({ theme }) => theme.colors.grey.grey01};
  font-size: 17px;
  border: 1px solid ${({ theme }) => theme.colors.grey.grey03};
`;

export const ScrollableAlarmContainer = styled.div`
  max-height: 150px;
  overflow-y: auto;
  margin-bottom: 1rem;
`;

export const AlarmItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const AlarmTime = styled.div`
  flex-grow: 1;
  background-color: ${({ theme }) => theme.colors.primary.blue02};
  color: white;
  padding: 12px;
  font-size: 17px;
  font-weight: 400;
  border-radius: 12px;
  text-align: center;
  margin-right: 8px;
`;

export const CloseButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.grey.grey03};
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grey.background};
  }

  svg {
    color: ${({ theme }) => theme.colors.grey.grey01};
  }
`;

export const AddAlarmButton = styled.button`
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.grey.grey03};
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 17px;
  font-weight: 400;
  width: 100%;
  text-align: center;
`;
