import React, { useState } from 'react';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

// Define interface for form values
interface RegisterFormValues {
  email: string;
  username: string;
  password: string;
  conf_pass: string;
}

// Define props interface
interface RegisterFormProps {
  onRegister: (success: boolean) => void;
}

const RegisterSchema = Yup.object().shape({
    // EMAIL
    email: Yup.string()
      .email('Invalid email format') // Đảm bảo đúng định dạng email
      .required('Email is required'), // Không được bỏ trống
  
    // USERNAME
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters') // Tối thiểu 3 ký tự
      .max(20, 'Username must not exceed 20 characters') // Tối đa 20 ký tự
      .required('Username is required'), // Không được bỏ trống
  
    // PASSWORD
    password: Yup.string()
    .min(8, 'Password must be at least 8 characters') // Tối thiểu 8 ký tự
    .max(12, 'Password must not exceed 12 characters') // Tối đa 12 ký tự
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter') // Có ít nhất 1 chữ thường
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter') // Có ít nhất 1 chữ hoa
    .matches(/\d/, 'Password must contain at least one number') // Có ít nhất 1 chữ số
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character') // ✅ Ký tự đặc biệt
    .required('Password is required') ,// Không được bỏ trống
  
    // CONFIRM PASSWORD
    conf_pass: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match') // Phải giống với password
      .required('Confirm password is required'), // Không được bỏ trống
  });
  

// Function to generate random ID
const generateRandomId = (): string => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  let id = '';

  // Generate 3 random letters
  for (let i = 0; i < 3; i++) {
    id += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  // Generate 3 random numbers
  for (let i = 0; i < 3; i++) {
    id += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }

  return id;
};

// OTP validation schema
const OtpSchema = Yup.object().shape({
  otp: Yup.array()
    .of(
      Yup.number()
        .min(0, 'Must be a number between 0-9')
        .max(9, 'Must be a number between 0-9')
        .required('Required')
    )
    .length(6, 'Please enter all 6 digits')
    .required('OTP is required'),
});

function RegisterForm({ onRegister }: RegisterFormProps): React.ReactElement {
    const [values,setValues]=useState<RegisterFormValues>( {email: '', username: '', password: '', conf_pass: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [userId, setUserId] = useState<string>('');
  const [otpError, setOtpError] = useState<string>('');
  const [otp, setOtp] = useState<Array<string | number>>(Array(6).fill(''));
  const otpInputRefs = Array.from({ length: 6 }, () => React.createRef<HTMLInputElement>());
  const handleRegisterSubmit = (values: RegisterFormValues): void => {
    // Generate a unique ID for the user
    const id = generateRandomId();
    setUserId(id);
  
    // Mock sending OTP
    console.log('OTP sent to email:', values.email);
    setValues({...values,conf_pass:values.conf_pass});
    getOtp(values);  // Gọi hàm gửi OTP sau khi xử lý xong đăng ký
    // Show OTP modal
    setShowOtpModal(true);
  };
  
  const SubmitRegister=async (values:RegisterFormValues)=>{
        // Convert otp array to string
        const otpString = otp.join('');
  
    let temple={
        ...values,
        id:userId,
        code:otpString,
    }
    setValues(temple)
    axios.post('/auths/register',{
        type : 'register',
        ...temple
    });
    console.log(temple);
    
  }
  const getOtp=async (values: RegisterFormValues)=>{
    axios.post('/auths/send-otp',{
        type : 'register'
        ,email:values.email})
  }

  const handleOtpChange = (index: number, value: string) => {
    // Allow only numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if current input is filled
    if (value && index < 5) {
      otpInputRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs[index - 1].current?.focus();
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    // Check if all fields are filled
    if (otp.some(digit => digit === '')) {
      setOtpError('Please enter all 6 digits');
      return;
    }
  

    SubmitRegister(values);
  
    // Đóng modal và tiếp tục
    setShowOtpModal(false);
    localStorage.setItem("username",values.username)
    onRegister(true);
  };
  

  const closeOtpModal = () => {
    setShowOtpModal(false);
    setOtp(Array(6).fill(''));
    setOtpError('');
  };

  //bảo mật app 
  // tại sao quy trình kiểm thử lại kiểm thử song song 
  return (
    <RegisterContainer>
      <RegisterCard>
        <RegisterHeader>Library Management System</RegisterHeader>
        <RegisterSubheader>Create Account</RegisterSubheader>
        
        <Formik
          initialValues={values}
          validationSchema={RegisterSchema}
          onSubmit={handleRegisterSubmit}
        >
          {({ isSubmitting, touched, errors }) => (
            <FormContainer>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <StyledField 
                  type="email" 
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className={touched.email && errors.email ? 'error' : ''}
                />
                <AlertMessage name="email" />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <StyledField 
                  type="text" 
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  className={touched.username && errors.username ? 'error' : ''}
                />
                <AlertMessage name="username" />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <PasswordContainer>
                  <StyledField 
                    type={showPassword ? "text" : "password"} 
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    className={touched.password && errors.password ? 'error' : ''}
                  />
                  <PasswordToggle 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </PasswordToggle>
                </PasswordContainer>
                <AlertMessage name="password" />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="conf_pass">Confirm Password</Label>
                <PasswordContainer>
                  <StyledField 
                    type={showConfirmPassword ? "text" : "password"} 
                    id="conf_pass"
                    name="conf_pass"
                    placeholder="Confirm your password"
                    className={touched.conf_pass && errors.conf_pass ? 'error' : ''}
                  />
                  <PasswordToggle 
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </PasswordToggle>
                </PasswordContainer>
                <AlertMessage name="conf_pass" />
              </FormGroup>
              
              <SubmitButton type="submit" disabled={isSubmitting}>
  {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </SubmitButton>

              
              <LoginLink href="/login">Already have an account? Login</LoginLink>
            </FormContainer>
          )}
        </Formik>
      </RegisterCard>
      
      {/* OTP Modal */}
      {showOtpModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <h2>Enter Verification Code</h2>
              <CloseButton onClick={closeOtpModal}>&times;</CloseButton>
            </ModalHeader>
            <ModalBody>
              <p>{`We've sent a 6-digit verification code to your email.`}</p>
              <p>Your User ID: <strong>{userId}</strong></p>
              
              <form onSubmit={handleOtpSubmit}>
                <OtpContainer>
                  {otp.map((digit, index) => (
                    <OtpInput
                      key={index}
                      ref={otpInputRefs[index]}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    />
                  ))}
                </OtpContainer>
                
                {otpError && <ErrorMessage>{otpError}</ErrorMessage>}
                
                <VerifyButton type="submit">Verify</VerifyButton>
              </form>
              
              <ResendText>
                {`Didn't receive the code? `}<ResendLink>Resend</ResendLink>
              </ResendText>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </RegisterContainer>
  );
}

// Styled components
const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f3f4f6;
`;

const RegisterCard = styled.div`
  width: 100%;
  max-width: 480px;
  padding: 2rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const RegisterHeader = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #3b82f6;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const RegisterSubheader = styled.h2`
  font-size: 1.25rem;
  text-align: center;
  color: #4b5563;
  margin-bottom: 1.5rem;
`;

const ErrorMessage = styled.div`
  background-color: #fee2e2;
  color: #b91c1c;
  padding: 0.75rem;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
`;

const FormContainer = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
`;

const StyledField = styled(Field)`
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  font-size: 1rem;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  }
  
  &.error {
    border-color: #ef4444;
  }
`;

const AlertMessage = styled(FormikErrorMessage)`
  background-color: #fee2e2;
  color: #b91c1c;
  padding: 0.75rem;
  border-radius: 0.25rem;
`;

const PasswordContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 0.75rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #6b7280;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #4b5563;
  }
`;

const SubmitButton = styled.button`
  padding: 0.75rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 0.5rem;
  
  &:hover {
    background-color: #2563eb;
  }
  
  &:disabled {
    background-color: #93c5fd;
    cursor: not-allowed;
  }
`;

const LoginLink = styled.a`
  text-align: center;
  color: #3b82f6;
  text-decoration: none;
  font-size: 0.875rem;
  margin-top: 1rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

// Modal Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  width: 90%;
  max-width: 400px;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  border-bottom: 1px solid #e5e7eb;
  
  h2 {
    font-size: 1.25rem;
    font-weight: bold;
    color: #111827;
    margin: 0;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
  
  &:hover {
    color: #111827;
  }
`;

const ModalBody = styled.div`
  padding: 1.5rem;
  
  p {
    margin-bottom: 1rem;
    color: #4b5563;
  }
`;

const OtpContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1.5rem 0;
`;

const OtpInput = styled.input`
  width: 45px;
  height: 50px;
  padding: 0;
  font-size: 1.25rem;
  text-align: center;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
  }
`;

const VerifyButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 1rem;
  
  &:hover {
    background-color: #2563eb;
  }
`;

const ResendText = styled.p`
  text-align: center;
  margin-top: 1rem;
  color: #6b7280;
  font-size: 0.875rem;
`;

const ResendLink = styled.a`
  color: #3b82f6;
  text-decoration: none;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

export default RegisterForm;