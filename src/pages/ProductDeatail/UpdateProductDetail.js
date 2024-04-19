import  axios  from "axios"
import { useEffect, useState } from "react"
import {Link, useNavigate} from "react-router-dom"
import {useLocation} from "react-router-dom";
import { useFormik } from "formik";
function UpdateProductDetail(){
        const navigate = useNavigate();
        const location = useLocation();
        const searchParams = new URLSearchParams(location.search);
        const email = searchParams.get("email");
        const idProduct = searchParams.get("id");
        const productDetailFormUpdate = useFormik({
            initialValues:{
              size:"",
              parameter:"",
              descripsion:""
            },
            onSubmit:async(values) =>{
                axios.put("http://localhost:8080/api/products/updateProductDetail/" + idProduct + "/" + userForm.values.nameUser + "/" + userForm.values.password,values).then(res =>{
                    alert("update product detail complete");
                    navigate("/productDetail?email=" + email +"&id=" + idProduct)
                })
            }
          })
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
        useEffect(() => {
            axios.get("http://localhost:8080/api/user/findUser/" + email).then(res => {
              userForm.setValues(res.data);
              console.log(userForm);
            });
          
            axios.get("http://localhost:8080/api/products/showProductDetail/" + idProduct).then(res => {
              productDetailFormUpdate.setValues(res.data);
            });
          }, []);
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
              <form className="space-y-6" onSubmit={productDetailFormUpdate.handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Size
                  </label>
                  <div className="mt-2">
                    <input
                      id="size"
                      name="size"
                      type="text"
                      value={productDetailFormUpdate.values.size}
                      onChange={productDetailFormUpdate.handleChange}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
    
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Parameter
                  </label>
                  <div className="mt-2">
                    <input
                      id="parameter"
                      name="parameter"
                      type="text"
                      value={productDetailFormUpdate.values.parameter}
                      onChange={productDetailFormUpdate.handleChange}
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
                      rows={6}
                      cols={12}
                      value={productDetailFormUpdate.values.descripsion}
                      onChange={productDetailFormUpdate.handleChange}
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
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div></>
        
    )
}
export default UpdateProductDetail;