import { useFormik } from "formik";
import { useEffect, useState } from "react";
import {useLocation} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function UpdateCategory(){
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get("email");
    const id = searchParams.get("id");
    const navigate = useNavigate();
    const userForm = useFormik(
        {
            initialValues:{
                nameUser:"",
                email:"",
                phone:"",
                address:"",
                password:""
            },
        }
    )
    const categoryForm = useFormik({
        initialValues:{
            nameCategory:"",
            descripsion:""
        },
        onSubmit:async (values) =>{
            try{
                const response = await axios.post("http://localhost:8080/api/category/add/"+ userForm.values.nameUser +"/" + userForm.values.password,values);
                console.log(response);
                alert("update category complete")
                navigate("/category?email=" + userForm.values.email);
            }catch(error){
                console.log(error);
            }
        }
    })
    useEffect(() => {
        axios.get("http://localhost:8080/api/user/findUser/" + email)
            .then(res => {
                const userData = res.data; // Assuming response is an object with user data
                console.log(userData);
                userForm.setValues(userData); // Update form values
            })
            axios.get("http://localhost:8080/api/category/findCategory/" + id).then(res=>{
                categoryForm.setValues(res.data)
        })},[])
   
    return(
        <>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={categoryForm.handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Name category
              </label>
              <div className="mt-2">
                <input
                  id="nameCategory"
                  name="nameCategory"
                  type="text"
                  autoComplete="nameCategory"
                  value={categoryForm.values.nameCategory}
                  onChange={categoryForm.handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Descripsion
              </label>
              <div className="mt-2">
                <textarea
                  id="descripsion"
                  name="descripsion"
                  type="text"
                  cols={4}
                  value={categoryForm.values.descripsion}
                  autoComplete="descripsion"
                  onChange={categoryForm.handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create
              </button>
            </div>
          </form>

        </div>
      </div>
        </>
    )
}
export default UpdateCategory;