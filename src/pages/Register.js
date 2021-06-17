import React, { useState } from "react";
import {
  Row,
  Col,
  Button,
  Checkbox,
  message,
  Form,
  Input,
  Spin,
  Alert,
} from "antd";

import { Formik } from "formik";
import image from "../assets/images/bg.png";
import Api from "../api/api";

const initialValues = {
  username: "",
  email: "",
  password: "",
};

export default function Register({ history }) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const success = () => {
    message.success("Registered succesfully");
  };

  return (
    <>
      <Spin spinning={loading} size="large">
        <Row justify="space-around" className="register-section" align="middle">
          <Col xs={0} lg={14}>
            <img className="register-image" src={image} alt="" />
          </Col>
          <Col xs={24} lg={7} className="form">
            <Col>
              <div>
                <h1 className="text">Welcome Back!</h1>
                <h2 className="text">
                  Fill in your login credentials to pick up where you left off
                </h2>
              </div>
            </Col>
            {error && (
              <Alert className="mb" message={error} type="error" showIcon />
            )}
            {validationErrors && Object.entries(validationErrors).length >= 1 && (
              <div className="alert">
                <ul>
                  {Object.keys(validationErrors).map((keys, index) => {
                    return <li key={index}>{validationErrors[keys]}</li>;
                  })}
                </ul>
              </div>
            )}
            <Formik
              initialValues={initialValues}
              validate={(values) => {
                const errors = {};
                if (!values.password) {
                  errors.password = "Password is required";
                }
                if (!values.username) {
                  errors.username = "username is required";
                }
                if (!values.email) {
                  errors.email = "email is required";
                }
                if (["admin", "null", "god"].includes(values.username)) {
                  errors.username = "Nice try";
                }
                setValidationErrors({ ...errors });
                return errors;
              }}
              onSubmit={async (values) => {
                setLoading(true);
                values = {
                  ...values,
                };
                console.log(values);
                  const response = await Api.register({ user: values });
                  if (response && response.status === 201) {
                    success();
                    history.goBack()
                  } else {
                    setError("Unable to register user, username or email has been taken");
                  }
                setLoading(false);
              }}
            >
              {({
                values,
                errors,
                touced,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <form className="form" onSubmit={handleSubmit}>
                  <Row>
                    <input
                      placeholder="username"
                      className="form-control"
                      name="username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                    />
                  </Row>
                  <Row>
                    <input
                      type="email"
                      password="email"
                      className="form-control"
                      name="email"
                      placeholder="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                  </Row>
                  <Row>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                  </Row>

                  <button
                    type="submit"
                    loading={loading}
                    className="register-btn"
                  >
                    Register
                  </button>
                </form>
              )}
            </Formik>
          </Col>
        </Row>
      </Spin>
    </>
  );
}
