import React, { JSX, useState } from 'react';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Define interface for form values
interface LoginFormValues {
  email: string;
  password: string;
}

// Define props interface
interface LoginFormProps {
  onLogin: (success: boolean) => void;
}

// Create validation schema using Yup
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

function LoginForm({ onLogin }: LoginFormProps): JSX.Element {
  const [authError, setAuthError] = useState<string>('');
  const navigate = useNavigate();
  const [val] = useState<LoginFormValues>({email: '', password: ""});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  const login = async (val: LoginFormValues) => {
    try {
      setIsSubmitting(true);
      const res = await axios.post("/auths/login", { ...val });
      console.log("Phản hồi từ BE: ", res.data);
  
      // Sửa đoạn này để truy xuất đúng vị trí của token và username
      const { data } = res.data;
      
      if (data && data.token && data.username) {
        localStorage.setItem("access_token", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("isAuthenticated", "true");
        onLogin(true);
        navigate('/');
      } else {
        setAuthError("No exist account");
      }
    } catch (error) {
      console.error("Lỗi login:", error);
      setAuthError("Đăng nhập thất bại, vui lòng thử lại");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleSubmit = (values: LoginFormValues): void => {
    setAuthError('');
    console.log('hi');
    login(values);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <LoginContainer>
      <LoginCard>
        <LoginHeader>Library Management System</LoginHeader>
        <LoginSubheader> Login</LoginSubheader>
        
        {authError && <ErrorMessage>{authError}</ErrorMessage>}
        
        <Formik
          initialValues={val}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors }) => (
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
                <AlertMessage name="email" component="div" />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <PasswordFieldWrapper>
                  <PasswordField 
                    type={showPassword ? "text" : "password"} 
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    className={touched.password && errors.password ? 'error' : ''}
                  />
                  <TogglePasswordButton 
                    type="button" 
                    onClick={togglePasswordVisibility}
                    tabIndex={-1} // Prevents button from getting focus in tab sequence
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </TogglePasswordButton>
                </PasswordFieldWrapper>
                <AlertMessage name="password" component="div" />
              </FormGroup>
              
              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Login'}
              </SubmitButton>
              <RegisterButton onClick={() => {
                navigate('/register')
              }}>
                You do not have an account?
              </RegisterButton>
            </FormContainer>
          )}
        </Formik>
      </LoginCard>
    </LoginContainer>
  );
}

// Styled components
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f3f4f6;
`;

const LoginCard = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const LoginHeader = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #3b82f6;
  text-align: center;
  margin-bottom: 0.5rem;
`;

const LoginSubheader = styled.h2`
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
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  }
  
  &.error {
    border-color: #ef4444;
  }
`;

// Custom component for password field with integrated icon
const PasswordFieldWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
`;

const PasswordField = styled(Field)`
  width: 100%;
  padding: 0.75rem;
  padding-right: 2.5rem; /* Space for the icon */
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
  }
  
  &.error {
    border-color: #ef4444;
  }
`;

const TogglePasswordButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  height: 24px;
  width: 24px;
  
  &:hover {
    color: #3b82f6;
  }
  
  &:focus {
    outline: none;
  }
`;

const AlertMessage = styled(FormikErrorMessage)`
  background-color: #fee2e2;
  color: #b91c1c;
  padding: 0.75rem;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
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

const RegisterButton = styled.button`
  background-color: transparent;
  border: none;
  color: blue;
  size: 16px;
  text-align: start;
  opacity: 0.7;
  cursor: pointer;
  &:hover{
    /* scale: 0.9; */
    opacity: 1;
  }
`;

export default LoginForm;