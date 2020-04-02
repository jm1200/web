import React, { useState } from "react";
import { useLoginMutation, MeDocument, MeQuery } from "../generated/graphql";
import { RouteComponentProps } from "react-router-dom";
import { setAccessToken } from "../accessToken";
import * as yup from "yup";
import { Form, Formik } from "formik";
import { Button } from "@material-ui/core";
import { MyTextField } from "../Components/MyTextField";

interface IRegisterProps {}

const validationSchema = yup.object({
  email: yup
    .string()
    .required()
    .email(),
  password: yup.string().required()
});

const Login: React.FC<IRegisterProps & RouteComponentProps> = ({ history }) => {
  const [loginError, setLoginError] = useState("");
  const [login, { client }] = useLoginMutation();

  return (
    <Formik
      validateOnChange={true}
      initialValues={{
        email: "",
        password: ""
      }}
      validationSchema={validationSchema}
      onSubmit={(data, { setSubmitting }) => {
        setSubmitting(true);
        setLoginError("");
        // make async call
        const loginFunc = async () => {
          try {
            const response = await login({
              variables: {
                email: data.email,
                password: data.password
              },
              update: (store, { data }) => {
                if (!data) {
                  return null;
                }
                store.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: {
                    me: {
                      __typename: "MeResponse",
                      user: data.login.user,
                      userSettings: data.login.userSettings
                    }
                  }
                });
              }
            });

            if (response && response.data) {
              setAccessToken(response.data.login.accessToken);
            }

            await client?.resetStore();
          } catch (err) {
            //invalid login
            if (err.graphQLErrors) {
              setLoginError(err.graphQLErrors[0].message);
            } else {
              setLoginError("Something went wrong. Try again later.");
            }
          }
        };

        loginFunc();

        setSubmitting(false);
        history.push("/home");
      }}
    >
      {({ values, errors, isSubmitting }) => (
        <Form>
          <div>
            <MyTextField placeholder="email" name="email" />
          </div>
          <div>
            <MyTextField
              type="password"
              placeholder="password"
              name="password"
            />
          </div>

          <div>
            <Button disabled={isSubmitting} type="submit">
              Login
            </Button>
          </div>
          <div style={{ color: "red" }}>
            {loginError ? <p>{loginError}</p> : null}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
