import { Home, User, List, BarChart, LogOut, UsersRound } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { message } from "antd";
import usersGlobalStore, { UsersStoreType } from "../../store/users-store";
function MenuItems() {
    const iconSize = 16;
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;
    const { currentUser }: UsersStoreType = usersGlobalStore() as UsersStoreType;

    // Define the menus
    const userMenu = [
        { name: "Home", path: "/", icon: <Home size={iconSize} />, isActive: currentPath === "/", },
        { name: "Profile", path: "/profile", icon: <User size={iconSize} />, isActive: currentPath === "/profile", },
        { name: "Bookings", path: "/bookings", icon: <List size={iconSize} />, isActive: currentPath === "/bookings" },
        { name: "Reports", path: "/reports", icon: <BarChart size={iconSize} />, isActive: currentPath === "/reports" },
    ];

    const adminMenu = [
        { name: "Home", path: "/", icon: <Home size={iconSize} />, isActive: currentPath.includes("/") },
        { name: "Events", path: "/admin/events", icon: <Home size={iconSize} />, isActive: currentPath.includes("/admin/events"), },
        { name: "Bookings", path: "/admin/bookings", icon: <List size={iconSize} />, isActive: currentPath.includes("/admin/bookings"), },
        { name: "Reports", path: "/admin/reports", icon: <BarChart size={iconSize} />, isActive: currentPath.includes("/admin/reports"), },
        { name: "Users", path: "/admin/users", icon: <UsersRound size={iconSize} />, isActive: currentPath.includes("/admin/users"), }
    ];

    // Render menu based on user role (check if role is 'admin')
    const menuToRender = currentUser?.isAdmin ? adminMenu : userMenu;

    // Logout handler
    const onLogout = () => {
        Cookies.remove("token");
        navigate("/login");
        message.success("Logged out successfully");
    };

    return (
        <div className="lg:bg-gray-200 h-full p-5">
            <div className="flex flex-col gap-1 mt-5">
                <h1 className="text-2xl font-bold text-info">
                    Planaroma
                    <b className="text-primary font-bold pl-2">Events</b>
                </h1>
                <span className="text-sm text-gray-600">{currentUser?.name}</span>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col gap-4 mt-10">
                {menuToRender?.map((item: any) => (
                    <div
                        className={`cursor-pointer px-5 py-3 rounded flex items-center text-sm ${item.isActive ? 'bg-info text-white' : ''}`}

                        key={item.name}
                        onClick={() => navigate(item.path)}
                    >
                        <span>{item.icon}</span>
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
