import React, { useState } from 'react';
import styled from 'styled-components';
import {
    CheckCircle,
    X,
    Settings,
    Clock,
    BookOpen
} from 'lucide-react';


// Styled Components
const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fb;
  font-family: 'Inter', sans-serif;
  flex:1;
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
`;

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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

const Input = styled.input`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #e0e4e8;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  
  &:focus {
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;
// Settings specific components
const SettingsContainer = styled.div`
  display: flex;
  gap: 20px;
  flex: 1;
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

// Main App Component
const LibraryManagementSystem = () => {
    const [savedAlert, setSavedAlert] = useState(false);
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
            <Input id="library-name" type="text" defaultValue="Thư viện trung tâm" />
        </FormGroup>

        <FormRow>
            <FormGroup>
                <Label htmlFor="admin-email">Email quản trị</Label>
                <Input id="admin-email" type="email" defaultValue="admin@thuvien.vn" />
            </FormGroup>

            <FormGroup>
                <Label htmlFor="contact-phone">Số điện thoại liên hệ</Label>
                <Input id="contact-phone" type="tel" defaultValue="0912345678" />
            </FormGroup>
        </FormRow>

        <FormGroup>
            <Label htmlFor="library-address">Địa chỉ</Label>
            <Input id="library-address" type="text" defaultValue="123 Đường Nguyễn Huệ, Quận 1, TP.HCM" />
        </FormGroup>

        <FormGroup>
            <Label htmlFor="description">Mô tả</Label>
            <Textarea id="description" defaultValue="Thư viện trung tâm - Nơi chia sẻ kiến thức và kết nối cộng đồng." />
        </FormGroup>
    </SettingsSection>

    <SectionDivider />

    <SettingsSection>
        <SectionTitle>
            <Clock size={20} />
            Cài đặt mượn sách
        </SectionTitle>

        <FormRow>
            <FormGroup>
                <Label htmlFor="loan-period">Thời hạn mượn sách (ngày)</Label>
                <Input id="loan-period" type="number" defaultValue="14" />
            </FormGroup>

            <FormGroup>
                <Label htmlFor="max-books">Số sách tối đa mỗi thành viên</Label>
                <Input id="max-books" type="number" defaultValue="5" />
            </FormGroup>
        </FormRow>

        <FormRow>
            <FormGroup>
                <Label htmlFor="fine-rate">Phí quá hạn (VND/ngày)</Label>
                <Input id="fine-rate" type="number" defaultValue="5000" />
            </FormGroup>

            <FormGroup>
                <Label htmlFor="renewal-limit">Số lần gia hạn tối đa</Label>
                <Input id="renewal-limit" type="number" defaultValue="2" />
            </FormGroup>
        </FormRow>

        <FormGroup>
            <SwitchContainer>
                <SwitchLabel>
                    <SwitchInput type="checkbox" defaultChecked />
                    <SwitchSlider />
                </SwitchLabel>
                <SwitchText>Gửi email nhắc nhở trước khi hết hạn</SwitchText>
            </SwitchContainer>
        </FormGroup>

        <FormGroup>
            <Label htmlFor="reminder-days">Số ngày gửi nhắc nhở trước hạn</Label>
            <Input id="reminder-days" type="number" defaultValue="2" />
        </FormGroup>
    </SettingsSection>

    <SectionDivider />

    <SettingsSection>
        <SectionTitle>
            <BookOpen size={20} />
            Cài đặt hiển thị
        </SectionTitle>

        <FormGroup>
            <Label htmlFor="items-per-page">Số mục hiển thị mỗi trang</Label>
            <Select id="items-per-page" defaultValue="10">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="25">25</option>
                <option value="50">50</option>
            </Select>
        </FormGroup>
    </SettingsSection>
    <button onClick={() => setSavedAlert(true)}>Lưu cài đặt</button>

</SettingsContent>

            </Content>
        </Container>
    );
};

export default LibraryManagementSystem;
