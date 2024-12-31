// import { Menu } from "lucide-react";
// import { useState } from "react";
// import { Drawer } from "antd";

import MenuItems from "./menu-items";

function Sidebar() {
    //const [showMobileMenu, setShowMobileMenu] = useState(false);

    // Get currentUser from global store

    // Provide a default value for currentUser if it's null

    return (
        <div>
            <div className="lg:flex hidden h-full lg:w-60">
                <MenuItems />
            </div>

            {/* <div>
                <Menu size={20} color="white" onClick={() => setShowMobileMenu(!showMobileMenu)}
                    className="cursor-pointer" />
            </div>

            {showMobileMenu && (
                <Drawer open={showMobileMenu} placement="left" onClose={() => setShowMobileMenu(false)}>
                    <MenuItems/>
                </Drawer>
            )} */}
        </div>
    );
}

export default Sidebar;
