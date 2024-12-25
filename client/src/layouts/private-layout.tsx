import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PrivateLayout({ children }: { children: React.ReactNode }) {
    const [showContent , setShowContent] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        const token = Cookies.get("token");
        if (!token){
            navigate("/login");
        } else {
            setShowContent(true)
        }
    },[]);

  return showContent && <div>{children}</div>;
}

export default PrivateLayout;
