import { Outlet } from "react-router";
import Directory from "../../components/directory/directory.component";

const Home = () => {

    return (
        <div className="categories-container">
            <Outlet />
            <Directory />
        </div>

    );
}

export default Home;
