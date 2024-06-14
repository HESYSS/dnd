import React from 'react';
import axios from 'axios';

const sendData = async (path, formData, reloadPage) => {
  try {
    const response = await axios.post(path, formData);
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

const handleFormSubmit = async (event, path, reloadPage, handleLogin, resp) => {
  event.preventDefault();
  try {
    const formData = new FormData(event.target);
    if (resp) {
      const jsonData = {};
      formData.forEach((value, key) => {
        jsonData[key] = value;
      });
      const responseData = await sendData(path, jsonData, reloadPage);
      handleLogin(responseData);
    } else {
      await sendData(path, formData, reloadPage);
    }
  } catch (error) {
    console.error('Ошибка:', error);
  }
};

const FormSender = ({ path, children, reloadPage, handleLogin, resp }) => {
  return (
    <form onSubmit={(event) => handleFormSubmit(event, path, reloadPage, handleLogin, resp)}>
      {children}
    </form>
  );
};

export default FormSender;
