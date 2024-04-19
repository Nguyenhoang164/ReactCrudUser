import  axios  from "axios"
import {Link, useNavigate} from "react-router-dom"
import { useFormik } from "formik";
import * as Yup from 'yup';
function CreateAccount(){
    const navigate = useNavigate();
    const userForm = useFormik({
        initialValues:{
            nameUser:"",
            email:"",
            phone:"",
            address:"",
            password:""
        },
        validationSchema: Yup.object({
            nameUser: Yup.string()
                .required('Required')
                .matches(/^[a-zA-Z ]*$/, 'Name must contain only letters and spaces'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            phone: Yup.string()
                .matches(/^\d{10}$/, 'Phone number must contain 10 digits')
                .required('Required'),
            address: Yup.string()
                .required('Required'),
            password: Yup.string()
                .required('Required')
                .min(6, 'Password must be at least 6 characters')
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                await userForm.validateForm(); // Kích hoạt tính năng validate trước khi gửi dữ liệu
                const response = await axios.get("http://localhost:8080/api/user");
                const listUsers = response.data;
                const form = listUsers.filter(user => user.name === values.nameUser && user.email === values.email)
                if(form.length > 0){
                    alert("Your information already exists in the database. Please try another information.");
                }else{
                    const formData = new FormData();
                    formData.append("nameUser",values.nameUser);
                    formData.append("email",values.email);
                    formData.append("phone",values.phone);
                    formData.append("address",values.address);
                    formData.append("password",values.password);
                    await axios.post("http://localhost:8080/api/user/create" , formData);
                    alert("Create account complete. Redirecting to login page...");
                    navigate("/");
                }
            } catch (error) {
                console.error("Error creating account:", error);
            } finally {
                setSubmitting(false); // Đặt lại trạng thái submitting sau khi xử lý hoàn tất
            }
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
                        Create your own account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={userForm.handleSubmit}>
    <div>
        <label htmlFor="nameUser" className="block text-sm font-medium leading-6 text-gray-900">
            Name
        </label>
        <div className="mt-2">
            <input
                id="nameUser"
                name="nameUser"
                type="text"
                onBlur={userForm.handleBlur}
                value={userForm.values.nameUser}
                onChange={userForm.handleChange}
                autoComplete="nameUser"
                required
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    userForm.touched.nameUser && userForm.errors.nameUser ? 'border-red-500' : ''
                }`}
            />
            {userForm.touched.nameUser && userForm.errors.nameUser && (
                <p className="mt-1 text-xs text-red-500">{userForm.errors.nameUser}</p>
            )}
        </div>
    </div>
    <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email
        </label>
        <div className="mt-2">
            <input
                id="email"
                name="email"
                type="email"
                onBlur={userForm.handleBlur}
                value={userForm.values.email}
                onChange={userForm.handleChange}
                autoComplete="email"
                required
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    userForm.touched.email && userForm.errors.email ? 'border-red-500' : ''
                }`}
            />
            {userForm.touched.email && userForm.errors.email && (
                <p className="mt-1 text-xs text-red-500">{userForm.errors.email}</p>
            )}
        </div>
    </div>
    <div>
        <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
            Phone
        </label>
        <div className="mt-2">
            <input
                id="phone"
                name="phone"
                type="text"
                onBlur={userForm.handleBlur}
                value={userForm.values.phone}
                onChange={userForm.handleChange}
                required
                autoComplete="phone"
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    userForm.touched.phone && userForm.errors.phone ? 'border-red-500' : ''
                }`}
            />
            {userForm.touched.phone && userForm.errors.phone && (
                <p className="mt-1 text-xs text-red-500">{userForm.errors.phone}</p>
            )}
        </div>
    </div>
    <div>
        <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
            Address
        </label>
        <div className="mt-2">
            <input
                id="address"
                name="address"
                type="text"
                onBlur={userForm.handleBlur}
                value={userForm.values.address}
                onChange={userForm.handleChange}
                required
                autoComplete="address"
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    userForm.touched.address && userForm.errors.address ? 'border-red-500' : ''
                }`}
            />
            {userForm.touched.address && userForm.errors.address && (
                <p className="mt-1 text-xs text-red-500">{userForm.errors.address}</p>
            )}
        </div>
    </div>

    <div>
        <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
            </label>
            <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                </a>
            </div>
        </div>
        <div className="mt-2">
            <input
                id="password"
                name="password"
                type="password"
                onBlur={userForm.handleBlur}
                value={userForm.values.password}
                onChange={userForm.handleChange}
                required
                autoComplete="current-password"
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    userForm.touched.password && userForm.errors.password ? 'border-red-500' : ''
                }`}
            />
            {userForm.touched.password && userForm.errors.password && (
                <p className="mt-1 text-xs text-red-500">{userForm.errors.password}</p>
            )}
        </div>
    </div>

    <div>
        <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            disabled={userForm.isSubmitting}
        >
            {userForm.isSubmitting ? 'Creating...' : 'Create'}
        </button>
    </div>
</form>
                </div>
            </div></>
    )
}
export default CreateAccount;