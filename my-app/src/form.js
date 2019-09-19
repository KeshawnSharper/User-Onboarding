import React, { useState,useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";


const Login = ({values,errors,touched,status}) =>{
 const [users,setUsers] = useState([])
useEffect(() => 
{if (status){
  setUsers([...users,status])
}},[status]
)
      return (

        <div>
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
      {users.map(user=>
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
      </div>
      )
        }
        
        </div>
      )

}

export default withFormik(
  
  {
 
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

      handleSubmit(values, {setStatus,setErrors,resetForm}) {
        if (values.email === "waffle@syrup.com") {
          setErrors({ email: "That email is already taken" });
        } else {
          axios
            .post("https://reqres.in/api/users", values)
            .then(res => {
              setStatus(res.data)
            // Data was created successfully and logs to console
           
              resetForm()
              
            })
            .catch(err => {
              console.log(err); // There was an error creating the data and logs to console
            });}
        },
        
  
    })(Login);
