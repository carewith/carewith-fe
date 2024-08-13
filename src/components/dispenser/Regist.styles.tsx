import styled from "styled-components";

export const ContentSection = styled.section`
  padding: 16px 0;
`;

export const InputGroup = styled.div`
  margin-bottom: 24px;
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey.grey02};
  margin-bottom: 8px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.grey.grey03};
  border-radius: 8px;
  font-size: 16px;
`;

export const SelectButton = styled.button`
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.grey.grey03};
  border-radius: 8px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
`;

export const VolumeSlider = styled.input`
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: ${({ theme }) => theme.colors.primary.blue02};
  outline: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary.blue01};
    cursor: pointer;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.primary.blue01};
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  margin-top: 24px;
  cursor: pointer;
`;
