import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { getCurrentUser } from "../api-services/users-services";
//import { message, Slider } from "antd";
//import usersGlobalStore, { UsersStoreType } from "../store/users-store";
import Sidebar from "./sidebar";

function PrivateLayout({ children }: { children: React.ReactNode }) {
    const [showContent , setShowContent] = useState(false);
    const navigate = useNavigate();

//    const {setCurrentUser, currentUser} : UsersStoreType = usersGlobalStore() as UsersStoreType
    // const getData = async () => {
    //     try {
    //         const response = await getCurrentUser();
    //         setCurrentUser(response.data);
    //     } catch(error: any) {
    //         message.error(error.response.data.message || error.message);
    //     }
    // };


    useEffect(() => {

        const token = Cookies.get("token");
        if (!token){
            navigate("/login");
        } else {
            setShowContent(true)
        }
    },[]);

  return showContent && 
    <div className="flex lg:flex-row flex-col gap-5 h-screen">
        <Sidebar/>
        <div className="flex-1">{children}</div>
    </div>
}

export default PrivateLayout;
