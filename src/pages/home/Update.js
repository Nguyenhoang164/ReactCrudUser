import { useFormik } from "formik";
import { useEffect } from "react";
import {useLocation} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import axios from 'axios';

function Update(){
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    
    const formUpdate = useFormik({
      initialValues: {
        createAt: "",
        name: "",
        avatar: "",
        password: "",
        email: ""
      },
      onSubmit: (values) => {
        // Gửi dữ liệu đến API hoặc thực hiện các xử lý khác
        axios
          .put("https://6614def02fc47b4cf27d4a71.mockapi.io/api/v1/users/" + id, values)
          .then((response) => {
            console.log("Dữ liệu đã được cập nhật thành công");
            navigate("/home");
            // Thực hiện các hoạt động khác sau khi gửi thành công
          })
          .catch((error) => {
            console.error("Đã xảy ra lỗi khi cập nhật dữ liệu:", error);
            // Xử lý lỗi hoặc hiển thị thông báo lỗi cho người dùng
          });
      }
    });
    
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://6614def02fc47b4cf27d4a71.mockapi.io/api/v1/users/" + id
        );
        const user = response.data;
        formUpdate.setValues({
          createAt: user.createAt,
          name: user.name,
          avatar: user.avatar,
          password: user.password,
          email: user.email
        });
      } catch (error) {
        console.error("Đã xảy ra lỗi khi lấy dữ liệu người dùng:", error);
        // Xử lý lỗi hoặc hiển thị thông báo lỗi cho người dùng
      }
    };
    
    useEffect(() => {
      let isFetchingData = false;
    
      const fetchDataIfNeeded = async () => {
        if (!isFetchingData) {
          isFetchingData = true;
          await fetchData();
        }
      };
    
      fetchDataIfNeeded();
    }, [id]);
    
    return(
        <form onSubmit={formUpdate.handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you share.
            </p>
  
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                  Username
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      onChange={formUpdate.handleChange}
                      autoComplete="name"
                      value={formUpdate.values.name}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="janesmith"
                    />
                  </div>
                </div>
              </div>
  
              <div className="col-span-full">
                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formUpdate.values.password}
                    onChange={formUpdate.handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="col-span-full">
                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                  Avatar
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="avatar"
                    name="avatar"
                    value={formUpdate.values.avatar}
                    onChange={formUpdate.handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="col-span-full">
                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={formUpdate.handleChange}
                    value={formUpdate.values.email}
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
        </div>
      </form>
    )
}
export default Update;