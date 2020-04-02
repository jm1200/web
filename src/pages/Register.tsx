import React, { useState } from "react";
import { useRegisterMutation, MeDocument, MeQuery } from "../generated/graphql";
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

const Register: React.FC<IRegisterProps & RouteComponentProps> = ({
  history
}) => {
  const [registerError, setRegisterError] = useState("");
  const [register, { client }] = useRegisterMutation();

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
        setRegisterError("");
        // make async call
        const registerFunc = async () => {
          try {
            const response = await register({
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
                      user: data.register.user,
                      userSettings: data.register.userSettings
                    }
                  }
                });
              }
            });
            if (response && response.data) {
              setAccessToken(response.data.register.accessToken);
            }
            await client?.resetStore();
          } catch (err) {
            //invalid login
            if (err.graphQLErrors) {
              if (
                err.graphQLErrors[0].message.includes(
                  "duplicate key value violates unique constraint"
                )
              ) {
                setRegisterError(
                  "That email is unavailable. Choose another email"
                );
              } else {
                setRegisterError(err.graphQLErrors[0].message);
              }
            } else {
              setRegisterError("Something went wrong. Try again later.");
            }
          }
        };

        registerFunc();

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
              Register
            </Button>
          </div>
          <div style={{ color: "red" }}>
            {registerError ? <p>{registerError}</p> : null}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Register;
