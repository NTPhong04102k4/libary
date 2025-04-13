import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';

// Định nghĩa schema validation bằng Yup
const schema = yup.object().shape({
  email: yup.string().email('Email không hợp lệ').required('Bắt buộc nhập email'),
  password: yup.string().min(6, 'Mật khẩu tối thiểu 6 ký tự').required('Bắt buộc nhập mật khẩu'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Mật khẩu không khớp')
    .required('Bắt buộc xác nhận mật khẩu'),
  otp: yup
    .string()
    .matches(/^\d{6}$/, 'OTP phải gồm đúng 6 chữ số')
    .required('Bắt buộc nhập OTP'),
});

type FormData = yup.InferType<typeof schema>;

export default function LoginForm() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log('Dữ liệu hợp lệ:', data);
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <h2>Đăng nhập</h2>

      <Label>Email:</Label>
      <Controller
        name="email"
        control={control}
        render={({ field }) => <Input type="email" {...field} />}
      />
      <ErrorText>{errors.email?.message}</ErrorText>

      <Label>Mật khẩu:</Label>
      <Controller
        name="password"
        control={control}
        render={({ field }) => <Input type="password" {...field} />}
      />
      <ErrorText>{errors.password?.message}</ErrorText>

      <Label>Xác nhận mật khẩu:</Label>
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => <Input type="password" {...field} />}
      />
      <ErrorText>{errors.confirmPassword?.message}</ErrorText>

      <Label>OTP (6 số):</Label>
      <Controller
        name="otp"
        control={control}
        render={({ field }) => <Input type="text" maxLength={6} {...field} />}
      />
      <ErrorText>{errors.otp?.message}</ErrorText>

      <SubmitButton type="submit">Xác nhận</SubmitButton>
    </FormContainer>
  );
}


// Styled Components
const FormContainer = styled.form`
  max-width: 400px;
  margin: 60px auto;
  padding: 30px;
  border-radius: 8px;
  background-color: #f5f5f5;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const Label = styled.label`
  margin-top: 15px;
  font-weight: bold;
  display: block;
`;

const Input = styled.input`
  padding: 10px;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #ccc;
  margin-top: 5px;
`;

const ErrorText = styled.p`
  color: red;
  font-size: 0.9rem;
  margin: 5px 0 10px;
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
