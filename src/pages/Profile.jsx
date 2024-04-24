import { useState } from "react";
import { useAuth } from "../provider/authProvider";
import axios from "axios";

import states from "../Components/States";

const Profile = () => {
  const { user } = useAuth();

  const initialData = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    password: "",
    region: user.region,
    user_state: user.user_state,
  };

  const [formData, setFormData] = useState({ ...initialData });
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCloseModal = () => {
    setFormData({ ...initialData });
    setIsEditing(false);
  };

  const handleSave = async () => {
    setIsEditing(false);
    try {
      const response = await axios.put("/user_profile", formData);
      console.log("Update successful:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData)
  };

  return (
    <div className="container-fluid w-100">
      <section>
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4 shadow-lg rounded">
                <div className="card-body text-center">
                  <img
                    // src={currentUser.profileImageURL}
                    src={
                      "https://ui-avatars.com/api/?size=512&bold=true&background=random&name=" +
                      formData.firstName +
                      "+" +
                      formData.lastName
                    }
                    alt="avatar"
                    className="rounded-circle img-fluid"
                    style={{ width: "150px" }}
                  />
                  <h5 className="my-3">
                    {formData.firstName + " " + formData.lastName}
                  </h5>
                  <p className="text-muted mb-4">
                    {formData.region + ", " + formData.user_state}
                  </p>
                  <div className="d-flex justify-content-center mb-2"></div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card mb-4 shadow-lg rounded">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Full Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">
                        {formData.firstName + " " + formData.lastName}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0 d-flex align-items-center">
                        {formData.email}
                      </p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Password</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0  d-flex align-items-center">
                        **********************
                        <button
                          onClick={handleChange}
                          type="button"
                          className="btn ms-auto"
                        ></button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleEdit}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Modal */}
      <div
        className={`modal ${isEditing ? "show" : ""}`}
        style={{ display: isEditing ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Profile</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleCloseModal}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
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
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="city" className="form-label">
                    City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="state" className="form-label">
                    State
                  </label>
                  <select
                    className="form-select"
                    id="state"
                    name="user_state"
                    value={formData.user_state}
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
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
