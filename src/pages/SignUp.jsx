import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import states from "../Components/States";
import anime from "animejs/lib/anime.es.js";

const SignUp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    anime({
      targets: ".card",
      translateY: [-20, 0],
      opacity: [0, 1],
      easing: "easeInOutSine",
      delay: anime.stagger(100),
    });
  }, []);

  const [formData, setFormData] = useState({
    email: "john.doe44@example.com",
    first_name: "John",
    last_name: "Doe",
    password: "securePassword123",
    city: "Bloomington",
    state: "IN",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/signup", formData);
      if (response.status === 201) {
        // Successful sign up, you can redirect or show a success message
        navigate("/login");
      } else {
        console.error("Sign Up failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error during sign up:", error);
    }
  };

  return (
    <div className="card rounded p-4 m-4 w-50 h-50 align-self-center m-auto shadow-lg border-5 border-dark">
      <h1 className="text-center mb-4">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <label htmlFor="state" className="form-label">
              State
            </label>
            <select
              className="form-select"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.code} value={state.code}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
