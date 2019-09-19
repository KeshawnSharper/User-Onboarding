import React, { useState } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";


const Login = ({values,errors,touched}) =>{
    
      return (
        <Form>
        <div>
        {errors.name && touched.name && <p>{errors.name}</p>}
        <Field type="text" name="name" placeholder="name" />
        </div>
        <div>
        {errors.password && touched.password &&  <p>{errors.password}</p>}
        <Field type="password" name="password" placeholder="password"/>
        </div>
        <div>
        {errors.email && touched.email && <p>{errors.email}</p>}
        <Field type="email" name="email" placeholder="email" />
        </div>
         <label>
        <Field type="checkbox" name="tos" checked={values.tos} />
        Accept TOS
      </label>
        <button>Submit</button>
        </Form>
      )

}

export default withFormik({
    mapPropsToValues: (values) => {
      return {
        name:values.name || "",
        password:values.password || "",
        tos:values.tos || false,
        email:values.email || ""
      }
    },
    validationSchema: Yup.object().shape({
       name:  Yup.string()
            .required("User name required"),
        password: Yup.string()
          .min(6,"your password must be longer than 6 characters")
          .required("Your password is required"),
          email: Yup.string()
          .required("hi"),
          tos: Yup.boolean()
          .required()

      }),

      handleSubmit(values, {resetForm}) {
        
          axios
            .post("https://reqres.in/api/users", values)
            .then(res => {
              console.log(res); // Data was created successfully and logs to console
            resetForm();
              
            })
            .catch(err => {
              console.log(err); // There was an error creating the data and logs to console
            });
        }
  
    })(Login);
