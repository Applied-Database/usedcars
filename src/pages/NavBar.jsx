import { Link } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import Logo from  "../assets/Logo.png"

const NavBar = () => {
  const { token, user } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100 my-0 p-0">
      <div className="container my-0">
        <Link className="navbar-brand" to="/">
          <img src={Logo} alt="Logo" className="object-fit-scale " width="75" height="50"/>
          <span className="m-2">CarConnect</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#basicNavbarNav"
          aria-controls="basicNavbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-between"
          id="basicNavbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link fs-5" to="/">
                Home
              </Link>
            </li>
            {token ? (<li className="nav-item">
              <Link className="nav-link fs-5" to="/postings">
                All Postings
              </Link>
            </li>) : (<></>)}
            {token ? (<li className="nav-item">
              <Link className="nav-link fs-5" to="/add-posting">
                Add Posting
              </Link>
            </li>) : (<></>)}
            <li className="nav-item">
              <Link className="nav-link fs-5" to="/about-us">
                About Us
              </Link>
            </li>
          </ul>
          {token ? (
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle d-flex align-items-center justify-content-center"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                    <span className="fs-5 mx-2">
                      {user ? user.firstName : ""} {user ? user.lastName : ""}
                    </span>
                    <img
                      src="https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png"
                      alt="User"
                      className="rounded-circle"
                      style={{
                        width: "30px",
                        height: "30px",
                        marginRight: "5px",
                      }}
                    />
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/logout">
                      Logout
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link fs-5" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fs-5" to="/signup">
                  Sign Up
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
