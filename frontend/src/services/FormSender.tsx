import React, { ReactNode } from 'react';
import axios, { AxiosResponse } from 'axios';

interface FormSenderProps {
  path: string;
  children: ReactNode;
  reloadPage: boolean;
  handleLogin?: (data: any) => void; 
  resp: boolean;
}


interface ServerResponse {
  [key: string]: unknown;
}


const sendData = async (path: string, data: FormData | object, reloadPage: boolean): Promise<ServerResponse> => {
  try {
    const response: AxiosResponse<ServerResponse> = await axios.post(path, data);
    console.log('Ответ от сервера:', response.data);
    if (reloadPage) {
      window.location.reload();
    }
    return response.data;
  } catch (error) {
    console.error('Ошибка при отправке данных:', error);
    throw error;
  }
};


const handleFormSubmit = async (
  event: React.FormEvent<HTMLFormElement>,
  path: string,
  reloadPage: boolean,
  handleLogin?: (data: unknown) => void, 
  resp?: boolean
) => {
  event.preventDefault();
  try {
    const formData = new FormData(event.target as HTMLFormElement);
    if (resp) {
      const jsonData: { [key: string]: unknown } = {};
      formData.forEach((value, key) => {
        jsonData[key] = value;
      });
      const responseData = await sendData(path, jsonData, reloadPage);
      if (handleLogin) {
        handleLogin(responseData); 
      }
    } else {
      await sendData(path, formData, reloadPage);
    }
  } catch (error) {
    console.error('Ошибка:', error);
  }
};


const FormSender: React.FC<FormSenderProps> = ({ path, children, reloadPage, handleLogin, resp }) => {
  return (
    <form onSubmit={(event) => handleFormSubmit(event, path, reloadPage, handleLogin, resp)}>
      {children}
    </form>
  );
};

export default FormSender;
