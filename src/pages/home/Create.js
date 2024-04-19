import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {useLocation} from "react-router-dom";
import FormData from 'form-data';
function Create(){
    const navigate = useNavigate();
    const [categorys,setCategory] = useState([])
    const [image,setImage] = useState({})
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get("email");
    const productForm = useFormik({
      initialValues:{
        nameProduct:"",
        priceBought:"",
        price:"",
        type:"",
        descripsion:"",
        status:"",
        picture:"",
        category:{
          id:""
        }
        } ,
        onSubmit: async (values) => {
          try {
            console.log(values)
            const formData = new FormData();
            formData.append("nameProduct", values.nameProduct);
            formData.append("priceBought", values.priceBought);
            formData.append("price", values.price);
            formData.append("type", values.type);
            formData.append("descripsion", values.descripsion);
            formData.append("status", values.status);
            formData.append("category", values.category.id);
            formData.append("picture", image);
            const response = await axios.post(
              `http://localhost:8080/api/products/add/${userForm.values.nameUser}/${userForm.values.password}`,
              formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
          alert("create product complete")
               navigate("/home?email=" + email);
          } catch (error) {
            alert("Error submitting form!");
            console.log(error);
          }
        }
      
      }
    )

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
    },})

  useEffect(()=>{
    axios.get("http://localhost:8080/api/user/findUser/" + email)
    .then(res => {
        const userData = res.data; // Assuming response is an object with user data
        console.log(userData);
        userForm.setValues(userData); // Update form values
    })
    axios.get("http://localhost:8080/api/category").then(res =>{
      setCategory(res.data)
    })
  },[])
    return(

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
        <form className="space-y-6" onSubmit={productForm.handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Name Product
            </label>
            <div className="mt-2">
              <input
                id="nameProduct"
                name="nameProduct"
                type="text"
                autoComplete="nameCategory"
                onChange={productForm.handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Price Bought
            </label>
            <div className="mt-2">
              <input
                id="priceBought"
                name="priceBought"
                type="text"
                autoComplete="priceBought"
                onChange={productForm.handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Price Sell
            </label>
            <div className="mt-2">
              <input
                id="price"
                name="price"
                type="text"
                autoComplete="price"
                onChange={productForm.handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Type
            </label>
            <div className="mt-2">
              <input
                id="type"
                name="type"
                type="text"
                autoComplete="type"
                onChange={productForm.handleChange}
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
                role={5}
                autoComplete="descripsion"
                onChange={productForm.handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Img
            </label>
            <div className="mt-2">
              <input
                id="picture"
                name="picture"
                type="file"
                onChange={(event) => {
                  setImage(event.currentTarget.files[0])
                }}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Category
            </label>
            <div className="mt-2">
            <select
               id="category[id]"
               name="category[id]"
               onChange={productForm.handleChange}
               required
               className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
>
             <option value="">------------------</option>
           {categorys.map(item =>(
            <option value={item.id}>{item.nameCategory}</option>
           )
           )
          }
              </select>

            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Status
            </label>
            <div className="mt-2">
            <select
           id="status"
            name="status"
          autoComplete="status"
         onChange={productForm.handleChange}
  required
  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
>
<option value="">------------------</option>
  <option value="true">Kích hoạt</option>
  <option value="false">Không kích hoạt</option>
</select>
              
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
    )
}
export default Create;