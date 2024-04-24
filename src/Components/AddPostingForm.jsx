import { useState } from "react";
import { useAuth } from "../provider/authProvider";
import ModelDropdown from "./ModelDropdown";
import axios from "axios";

const AddPostingForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    url: "url",
    price: "",
    condition: "",
    odometer: "",
    title_status: "",
    VIN: "",
    paint_color: "",
    image_url: "image",
    description: "",
    posting_date: new Date().toISOString().slice(0, 10), // Current date
    model: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false); // State for success modal

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/add_vehicle_posting", {
        email: user.email,
        ...formData,
      });
      console.log("Posting added:", response.data);
      setShowSuccessModal(true);
      // Reset form data after successful submission
      setFormData({
        url: "",
        price: "",
        condition: "",
        odometer: "",
        title_status: "",
        VIN: "",
        paint_color: "",
        image_url: "",
        description: "",
        posting_date: new Date().toISOString().slice(0, 10),
        model: "",
      });
    } catch (error) {
      console.error("Error adding posting:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Condition</label>
          <select
            className="form-select"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            required
          >
            <option value="">Select Condition</option>
            <option value="excellent">Excellent</option>
            <option value="fair">Fair</option>
            <option value="good">Good</option>
            <option value="like new">Like New</option>
            <option value="new">New</option>
            <option value="salvage">Salvage</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Odometer</label>
          <input
            type="number"
            className="form-control"
            name="odometer"
            value={formData.odometer}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Title Status</label>
          <select
            className="form-select"
            name="title_status"
            value={formData.title_status}
            onChange={handleChange}
            required
          >
            <option value="">Select Title Status</option>
            <option value="clean">Clean</option>
            <option value="lien">Lien</option>
            <option value="missing">Missing</option>
            <option value="parts only">Parts Only</option>
            <option value="rebuilt">Rebuilt</option>
            <option value="salvage">Salvage</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">VIN</label>
          <input
            type="text"
            className="form-control"
            name="VIN"
            value={formData.VIN}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Paint Color</label>
          <input
            type="text"
            className="form-control"
            name="paint_color"
            value={formData.paint_color}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <ModelDropdown setFormData={setFormData} />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Posting
        </button>
      </form>
      {/* Success Modal */}
      <div
        className={`modal fade ${showSuccessModal ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: showSuccessModal ? "block" : "none" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Success</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowSuccessModal(false)} // Close modal on button click
              ></button>
            </div>
            <div className="modal-body">
              <p>Your posting has been added successfully!</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setShowSuccessModal(false)} // Close modal on button click
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End of Success Modal */}
    </>
  );
};

export default AddPostingForm;
