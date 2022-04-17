import React from "react";
import "./UserForm.css";
import Input from "../Input";
import { Button } from "@mui/material";
import { Formik, Form } from "formik";
import * as yup from "yup";

export const UserForm = () => {
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    avatar: "",
  };

  const imgTypes = ["image/jpeg", "image/png", "image/jpg"];

  const validationSchema = yup.object({
    name: yup
      .string()
      .matches(/^[a-zA-z]*$/, "Please, input your name")
      .required("Please, fill the field"),
    email: yup
      .string()
      .email("Please, enter the email in the right form")
      .required("Please, fill the field"),
    phone: yup
      .string()
      .length(12, "Phone number should have 12 digitals")
      .required("Please, fill the field"),
    avatar: yup
      .mixed()
      .required("Please, choose the file")
      .test("type", "Please, provide the right image type", (file) => {
        return file && imgTypes.some((type) => type === file?.type);
      }),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        alert("Form has submitted");
      }}
    >
      {({ setFieldValue, setFieldTouched, errors, touched, values }) => (
        <Form>
          <Input name="name" placeholder="name" />
          <Input name="email" placeholder="email" />
          <Input name="phone" placeholder="phone" />
          <input
            type="file"
            name="avatar"
            accept=".jpg, .jpeg, .png"
            className={`file-input ${
              errors.avatar && touched.avatar ? "error" : ""
            }`}
            onChange={({ target }) => {
              setFieldValue("avatar", target.files[0], true);
              setFieldTouched("avatar", true, false);
            }}
          />
          {console.log(errors, touched, values)}
          {(errors.avatar && !values) || touched.avatar ? (
            <div className="error-input">{errors.avatar}</div>
          ) : null}
          <Button
            size="large"
            variant="outlined"
            type="submit"
            sx={{
              backgroundColor: "rgb(111, 151, 192)",
              fontWeight: "bold",
            }}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};
