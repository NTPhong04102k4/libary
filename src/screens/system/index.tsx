import React, { useState } from 'react';
import styled from 'styled-components';
import {
    CheckCircle,
    X,
    Settings,
    Sun,
    Moon,
    Languages
} from 'lucide-react';

// Styled Components
const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fb;
  font-family: 'Inter', sans-serif;
  flex: 1;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #e0e4e8;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  background-color: white;
  
  &:focus {
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
  
  &:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #e0e4e8;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
  
  &:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const SwitchLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  
  &:checked + span {
    background-color: #3498db;
  }
  
  &:checked + span:before {
    transform: translateX(24px);
  }
`;

const SwitchSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
  
  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
`;

const SwitchText = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const SettingsSection = styled.div`
  margin-bottom: 30px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SectionDivider = styled.hr`
  border: none;
  border-top: 1px solid #e0e4e8;
  margin: 30px 0;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  
  & > ${FormGroup} {
    flex: 1;
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #34495e;
`;

const DisabledLabel = styled(Label)`
  color: #7f8c8d;
`;

const Input = styled.input<{ readOnly?: boolean }>`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #e0e4e8;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  
  &:focus {
    border-color: ${props => props.readOnly ? '#e0e4e8' : '#3498db'};
    box-shadow: ${props => props.readOnly ? 'none' : '0 0 0 2px rgba(52, 152, 219, 0.2)'};
  }
  
  &:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const SettingsContent = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const AlertBox = styled.div<{ type: 'success' | 'warning' | 'error' }>`
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  background-color: ${props =>
    props.type === 'success' ? '#e8f7ef' :
    props.type === 'warning' ? '#fff8e1' : '#fdecea'};
  border-left: 4px solid ${props =>
    props.type === 'success' ? '#27ae60' :
    props.type === 'warning' ? '#f39c12' : '#e74c3c'};
`;

const AlertIcon = styled.div<{ type: 'success' | 'warning' | 'error' }>`
  color: ${props =>
    props.type === 'success' ? '#27ae60' :
    props.type === 'warning' ? '#f39c12' : '#e74c3c'};
  margin-top: 2px;
`;

const AlertContent = styled.div`
  flex: 1;
`;

const AlertTitle = styled.div`
  font-weight: 600;
  margin-bottom: 5px;
`;

const AlertMessage = styled.div`
  font-size: 14px;
  color: #596275;
`;

const AlertCloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  color: #7f8c8d;
  
  &:hover {
    color: #34495e;
  }
`;

const SaveButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 20px;
  
  &:hover {
    background-color: #2980b9;
  }
  
  &:active {
    background-color: #1f6dad;
  }
`;

const ThemeOption = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const RadioContainer = styled.div`
  display: flex;
  gap: 25px;
  margin-top: 10px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1px solid #e0e4e8;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f5f7fb;
  }
  
  input:checked + & {
    border-color: #3498db;
    background-color: #ebf5fb;
  }
`;

const RadioInput = styled.input`
  display: none;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Main App Component
const LibraryManagementSystem = () => {
    const [savedAlert, setSavedAlert] = useState(false);
    const [libraryName, setLibraryName] = useState("Thư viện trung tâm");
    const [theme, setTheme] = useState("light");
    const [language, setLanguage] = useState("vi");

    const handleSave = () => {
        setSavedAlert(true);
        // Ở đây sẽ là logic lưu cài đặt thực tế
    };

    return (
        <Container>
            <Content>
                <Header>
                    <PageTitle>Cài đặt hệ thống</PageTitle>
                </Header>

                <SettingsContent>
                    {savedAlert && (
                        <AlertBox type="success">
                            <AlertIcon type="success">
                                <CheckCircle size={20} />
                            </AlertIcon>
                            <AlertContent>
                                <AlertTitle>Đã lưu cài đặt</AlertTitle>
                                <AlertMessage>
                                    Cài đặt của bạn đã được lưu thành công.
                                </AlertMessage>
                            </AlertContent>
                            <AlertCloseButton onClick={() => setSavedAlert(false)}>
                                <X size={16} />
                            </AlertCloseButton>
                        </AlertBox>
                    )}

                    <SettingsSection>
                        <SectionTitle>
                            <Settings size={20} />
                            Thông tin thư viện
                        </SectionTitle>

                        <FormGroup>
                            <Label htmlFor="library-name">Tên thư viện</Label>
                            <Input 
                                id="library-name" 
                                type="text" 
                                disabled
                                value={libraryName} 
                                onChange={(e) => setLibraryName(e.target.value)} 
                            />
                        </FormGroup>

                        <FormRow>
                            <FormGroup>
                                <DisabledLabel htmlFor="admin-email">Email quản trị</DisabledLabel>
                                <Input 
                                    id="admin-email" 
                                    type="email" 
                                    defaultValue="admin@thuvien.vn" 
                                    disabled 
                                />
                            </FormGroup>

                            <FormGroup>
                                <DisabledLabel htmlFor="contact-phone">Số điện thoại liên hệ</DisabledLabel>
                                <Input 
                                    id="contact-phone" 
                                    type="tel" 
                                    defaultValue="0912345678" 
                                    disabled 
                                />
                            </FormGroup>
                        </FormRow>

                        <FormGroup>
                            <DisabledLabel htmlFor="library-address">Địa chỉ</DisabledLabel>
                            <Input 
                                id="library-address" 
                                type="text" 
                                defaultValue="123 Đường Nguyễn Huệ, Quận 1, TP.HCM" 
                                disabled 
                            />
                        </FormGroup>

                        <FormGroup>
                            <DisabledLabel htmlFor="description">Mô tả</DisabledLabel>
                            <Textarea 
                                id="description" 
                                defaultValue="Thư viện trung tâm - Nơi chia sẻ kiến thức và kết nối cộng đồng." 
                                disabled 
                            />
                        </FormGroup>
                    </SettingsSection>

                    <SectionDivider />

                    <SettingsSection>
                        <SectionTitle>
                            {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                            Giao diện
                        </SectionTitle>

                        <FormGroup>
                            <Label>Chế độ giao diện</Label>
                            <RadioContainer>
                                <div>
                                    <RadioInput
                                        type="radio"
                                        id="theme-light"
                                        name="theme"
                                        value="light"
                                        checked={theme === "light"}
                                        onChange={() => setTheme("light")}
                                    />
                                    <RadioLabel htmlFor="theme-light">
                                        <IconWrapper>
                                            <Sun size={16} />
                                        </IconWrapper>
                                        Sáng
                                    </RadioLabel>
                                </div>
                                
                                <div>
                                    <RadioInput
                                        type="radio"
                                        id="theme-dark"
                                        name="theme"
                                        value="dark"
                                        checked={theme === "dark"}
                                        onChange={() => setTheme("dark")}
                                    />
                                    <RadioLabel htmlFor="theme-dark">
                                        <IconWrapper>
                                            <Moon size={16} />
                                        </IconWrapper>
                                        Tối
                                    </RadioLabel>
                                </div>
                            </RadioContainer>
                        </FormGroup>
                    </SettingsSection>

                    <SectionDivider />
                    
                    <SettingsSection>
                        <SectionTitle>
                            <Languages size={20} />
                            Ngôn ngữ
                        </SectionTitle>

                        <FormGroup>
                            <Label>Ngôn ngữ hệ thống</Label>
                            <RadioContainer>
                                <div>
                                    <RadioInput
                                        type="radio"
                                        id="lang-vi"
                                        name="language"
                                        value="vi"
                                        checked={language === "vi"}
                                        onChange={() => setLanguage("vi")}
                                    />
                                    <RadioLabel htmlFor="lang-vi">
                                        Tiếng Việt
                                    </RadioLabel>
                                </div>
                                
                                <div>
                                    <RadioInput
                                        type="radio"
                                        id="lang-en"
                                        name="language"
                                        value="en"
                                        checked={language === "en"}
                                        onChange={() => setLanguage("en")}
                                    />
                                    <RadioLabel htmlFor="lang-en">
                                        English
                                    </RadioLabel>
                                </div>
                            </RadioContainer>
                        </FormGroup>
                    </SettingsSection>

                    <SaveButton onClick={handleSave}>Lưu cài đặt</SaveButton>
                </SettingsContent>
            </Content>
        </Container>
    );
};

export default LibraryManagementSystem;