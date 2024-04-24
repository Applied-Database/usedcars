import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";

const Logout = () => {
  const { setToken, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken();
    setUser();
    navigate("/", { replace: true });
  };

  //   setTimeout(() => {
  //     handleLogout();
  //   }, 3 * 1000);

  return (
    <div className="container-fluid d-flex flex-column justify-content align-items my-4 text-center">
      <h1 className="m-5">Logout Page</h1>
      <button className="w-25 m-auto" onClick={handleLogout}>Click to Logout</button>
    </div>
  );
};

export default Logout;
