import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import LogoutModal from "../../components/LogoutModal";
import LogModal from "../../components/LogModal";

const Root = () => {
    return (
        <>
            <Navbar />
            <LogoutModal />
            <LogModal />
            <Outlet />
            <Footer />
        </>
    );
};

export default Root;