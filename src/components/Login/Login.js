import React, { useEffect, useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import styles from "./Login.module.css";
import Button from "../UI/Button/Button";

const Login = (props) => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);



  useEffect(() => {

    // Если в течении 3 секунд не ввожу какое-то число то срабатывает timer, иначе если ввожу данные в инпут подряд, то таймер очищается
    const timer = setTimeout(() => {
      console.log('Effect Function')
      setFormIsValid(inputEmail.includes('@') && inputPassword.trim().length > 7)
    }, 1000)

    // Я ввожу букву О, срабатывает timer(пошел таймер) и автоматически срабатывает console.log("очистка"), если я после этого ввожу еще раз какую-то букву, то срабатывает очистка
    
    return () => {
      console.log('Очистка')
      clearTimeout(timer)
    }
    // функция запускается при каждом вводе символа либо в inputEmail либо в inputPassword. Есть простое правило что передавать в dependencies - То что используем в эффекте функции
    // каждый раз когда будут меняться inputEmail или inputPassword будет запускаться этот эффект
    
  }, [inputEmail, inputPassword]);

  const emailChangeHandler = (event) => {
    setInputEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setInputPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    setEmailIsValid(inputEmail.includes("@"));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(inputPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    localStorage.setItem('isLoggedIn', '1')
    props.onLogin(inputEmail, inputPassword);
  };

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${styles.control} ${
            emailIsValid === false ? styles.invalid : ""
          }`}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={inputEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${styles.control} ${
            passwordIsValid === false ? styles.invalid : ""
          }`}
        >
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            value={inputPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={styles.actions}>
          <Button type="submit" className={styles.btn} disabled={!formIsValid}>
            Вход
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
