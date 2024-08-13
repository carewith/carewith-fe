import styled from "styled-components";
export const Container = styled.div`
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.grey.background};
`;

export const ProfileSection = styled.section`
  padding: 16px;
`;

export const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 16px;
`;

export const UserName = styled.h2`
  font-size: 17px;
  font-weight: 500;
  margin: 0;
`;

export const UserContact = styled.p`
  font-size: 11px;
  color: black;
`;

export const EditProfileButton = styled.button`
  background-color: white;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.grey.grey02};
  font-weight: 400;
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

export const NavigationMenu = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary.blue02};
  border-radius: 24px;
  padding: 20px;
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  color: white;
`;

export const NavItemWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`;

export const NavText = styled.div`
  margin-top: 4px;
  font-size: 13px;
`;

export const Divider = styled.div`
  height: 48px;
  width: 1px;
  background-color: white;
`;

export const SectionWrapper = styled.section`
  background-color: white;
  border-radius: 24px;
  padding: 16px;
  margin-bottom: 16px;
`;

export const SettingsTitle = styled.h4`
  font-size: 13px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.grey.grey02};
  margin-bottom: 8px;
`;

export const SettingItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10.5px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey.background};
  font-size: 14px;
  cursor: pointer;
`;

export const InfoSectionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 400;
  font-size: 14px;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;

  span:first-child {
    flex: 1;
    margin-right: 1rem;
  }
`;

export const ToggleSwitchWrapper = styled.span`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.grey.grey02};
  cursor: pointer;

  input[type="checkbox"] {
    display: none;
  }

  .toggle-switch {
    position: relative;
    width: 48px;
    height: 24px;
    background-color: ${({ theme }) => theme.colors.grey.background};
    border-radius: 12px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .toggle-switch::before {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    transition: transform 0.3s;
  }

  input[type="checkbox"]:checked + .toggle-switch::before {
    transform: translateX(24px);
  }

  input[type="checkbox"]:checked + .toggle-switch {
    background-color: ${({ theme }) => theme.colors.primary.blue02};
  }
`;
