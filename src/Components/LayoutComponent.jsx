import { Outlet } from "react-router-dom";
import NavBar from "../pages/NavBar";
import Footer from "./Footer";

const LayoutComponent = () => {

  return (
    <div className="min-vh-100 w-100 d-flex flex-column justify-content align-items">
      {/* <header>Header Content</header> */}
      <NavBar />
      <main className="container-fluid w-100 flex-fill d-flex justify-content align-items p-0">
        <Outlet /> {/* Nested routes render here */}
      </main>
      <Footer />
    </div>
  );
};

export default LayoutComponent;
