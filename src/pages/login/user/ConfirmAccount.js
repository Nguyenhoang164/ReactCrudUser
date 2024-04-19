import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

function ConfirmAccount(){
    const navigate = useNavigate();
    const postForm = useFormik({
        initialValues:{
            postcode:""
        },
        onSubmit: (values) =>{
            console.log(values);
            axios.get("http://localhost:8080/api/user/confirmCode/" + values.postcode).then(response =>{
               try{
            
                alert("your will be create account")
                navigate("/createUser")
               }catch(error){
                console.log(error)
               }
                
            })
        }
    })
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
                        Confirm to create account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={postForm.handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Post code here
                            </label>
                            <div className="mt-2">
                                <input
                                    id="postcode"
                                    name="postcode"
                                    type="text"
                                    onChange={postForm.handleChange}
                                    autoComplete="postcode"

                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>


                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Check
                            </button>
                        </div>
                    </form>
                </div>
            </div></>
    )
}
export default ConfirmAccount;