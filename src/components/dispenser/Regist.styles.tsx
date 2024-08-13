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
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary.blue01};
  }
`;

export const UnderlinedInput = styled.input`
  width: 100%;
  padding: 12px 0;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey.grey03};
  font-size: 16px;
  &:focus {
    outline: none;
    border-bottom-color: ${({ theme }) => theme.colors.primary.blue01};
  }
`;

export const SelectButton = styled.button`
  width: 100%;
  padding: 12px 0;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey.grey03};
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
`;

export const VolumeSliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
`;

export const VolumeSliderBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.grey.grey03};
  border-radius: 2px;
`;

export const VolumeSliderFill = styled.div<{ width: number }>`
  position: absolute;
  top: 50%;
  left: 0;
  height: 4px;
  width: ${(props) => props.width}%;
  background-color: ${({ theme }) => theme.colors.primary.blue02};
  border-radius: 2px;
  transform: translateY(-50%);
`;

export const VolumeSlider = styled.input`
  width: 100%;
  -webkit-appearance: none;
  background: transparent;
  outline: none;
  margin: 0;
  padding: 0;
  z-index: 2;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
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
  &:disabled {
    background-color: #c2c1c1;
    cursor: not-allowed;
  }
`;
