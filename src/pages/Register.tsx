import React, { useState } from "react";
import { useRegisterMutation, MeDocument, MeQuery } from "../generated/graphql";
import { RouteComponentProps } from "react-router-dom";
import { setAccessToken } from "../accessToken";
import * as yup from "yup";
import { Form, Formik, useField, FieldAttributes } from "formik";
import { TextField, Button } from "@material-ui/core";

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
            history.push("/loggedInHome");
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
      }}
    >
      {({ values, errors, isSubmitting }) => (
        <Form>
          <div>
            <MyTextField placeholder="email" name="email" />
          </div>
          <div>
            <MyTextField placeholder="password" name="password" />
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

    // <form
    //   onSubmit={async e => {
    //     e.preventDefault();

    //   }}
    // >
    //   <div>
    //     <input
    //       value={email}
    //       placeholder="email"
    //       onChange={e => setEmail(e.target.value)}
    //     />
    //   </div>
    //   <div>
    //     <input
    //       type={password}
    //       value={password}
    //       placeholder="password"
    //       onChange={e => setPassword(e.target.value)}
    //     />
    //   </div>
    //   <button type="submit">Register</button>
    // </form>
  );
};

export default Register;

const MyTextField: React.FC<FieldAttributes<{}>> = ({
  placeholder,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};
