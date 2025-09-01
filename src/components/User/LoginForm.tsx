import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAppDispatch } from "../../app/model/store";
import { userActions, userSelector } from "./model/state";
import { useSelector } from "react-redux";

export const LoginForm = () => {
  const dispatch = useAppDispatch();

  const { isAuth, formError } = useSelector(userSelector);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.login({ email, password }))
  }

  const handleLogout = useCallback((e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.logout());
  }, []);

  if (isAuth) {
    return (
      <Form className="col-3 mt-2" onSubmit={handleLogout}>
        <Button variant="primary" type="submit">
          Logout
        </Button>
      </Form>
    )
  }

  return (
    <Form className="col-2 mt-2" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control value={email} onChange={handleChangeEmail}  placeholder="Enter email" />
        {formError.email ? (
          <Form.Text className="text-danger">
            {formError.email}
          </Form.Text>
        ) : (
          <Form.Text className="text-muted">
            "We'll never share your email with anyone else" -- Tea App.
          </Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control value={password} onChange={handleChangePassword} type="password" placeholder="Password" />
        {formError.password && (
          <Form.Text className="text-danger">
            {formError.password}
         </Form.Text>
        )}
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
