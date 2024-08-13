import styled from "styled-components";

export const SettingContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  height: 100vh;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.grey.background};
`;

export const ContentSection = styled.section`
  background-color: white;
  border-radius: 24px;
  padding: 0.75rem 1rem;
`;

export const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  font-size: 14px;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey.background};

  &:last-child {
    border-bottom: none;
  }
`;
