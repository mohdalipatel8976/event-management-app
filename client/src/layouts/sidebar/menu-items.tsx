import { Home, User, List, BarChart, LogOut, UsersRound } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { message } from "antd";
import usersGlobalStore, { UsersStoreType } from "../../store/users-store"; // Import global store

function MenuItems() {
    const iconSize = 16;
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;

    // Get currentUser from global store and type it correctly
    const { currentUser }: UsersStoreType = usersGlobalStore() as UsersStoreType;

    // Define the menus
    const userMenu = [
        { name: "Home", path: "/", icon: <Home size={iconSize} />, isActive: false, },
        { name: "Bookings", path: "/bookings", icon: <List size={iconSize} /> },
        { name: "Reports", path: "/reports", icon: <BarChart size={iconSize} /> },
        { name: "Logout", path: "/logout", icon: <LogOut size={iconSize} /> }
    ];

    const adminMenu = [
        { name: "Home", path: "/", icon: <Home size={iconSize} />, isActive: false, },
        { name: "Events", path: "/admin/events", icon: <Home size={iconSize} />, isActive: false, },
        { name: "Bookings", path: "/bookings", icon: <List size={iconSize} /> },
        { name: "Reports", path: "/reports", icon: <BarChart size={iconSize} /> },
        { name: "Users", path: "/admin/users", icon: <UsersRound size={iconSize} /> }
    ];

    // Render menu based on user role (check if role is 'admin')
    const menuToRender = currentUser?.role === 'admin' ? adminMenu : userMenu;

    // Logout handler
    const onLogout = () => {
        Cookies.remove("token");
        navigate("/login");
        message.success("Logged out successfully");
    };

    return (
        <div className="lg:bg-gray-200 h-full p-5 w-full">
            <div className="flex flex-col gap-1 mt-5">
                <h1 className="text-2xl font-bold text-info">
                    Planaroma
                    <b className="text-primary font-bold pl-2">Events</b>
                </h1>
                <span className="text-sm text-gray-600">{currentUser?.name}</span>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col gap-4 mt-10">
                {menuToRender?.map((item) => (
                    <div
                        key={item.name}
                        className={`cursor-pointer px-5 py-3 rounded flex items-center text-sm ${currentPath === item.path ? "bg-primary text-white" : "text-gray-700"}`}
                        onClick={() => navigate(item.path)}
                    >
                        {item.icon}
                        <span className="ml-3">{item.name}</span>
                    </div>
                ))}
                {/* Logout Option */}
                <div
                    className="cursor-pointer px-5 py-3 rounded flex items-center text-sm text-red-500"
                    onClick={onLogout}
                >
                    <LogOut size={iconSize} />
                    <span className="ml-3">Logout</span>
                </div>
            </div>
        </div>
    );
}

export default MenuItems;
