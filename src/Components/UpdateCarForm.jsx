import { useState } from "react";
import axios from "axios";
import ModelDropdown from "./ModelDropdown";

const UpdateCarForm = (props) => {
  const [formData, setFormData] = useState({
    id: props.carData.id,
    url: props.carData.url,
    price: props.carData.price,
    condition: props.carData.condition,
    odometer: props.carData.odometer,
    title_status: props.carData.title_status,
    VIN: props.carData.VIN,
    paint_color: props.carData.paint_color,
    image_url: props.carData.image_url,
    description: props.carData.description,
    posting_date: props.carData.posting_date,
    model: props.carData.model,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log(formData)
    e.preventDefault();
    try {
      await axios.put("/update_vehicle_posting", formData);
      console.log("Car updated successfully");
      props.onUpdate(formData); // Update the car data in the parent component
      props.onClose(); // Close the update form modal
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  return (
    <div className="modal-dialog modal-lg" role="document">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div className="modal-header">
            <h5 className="modal-title">Update Form</h5>
            <button type="button" className="close" onClick={props.onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={formData.price}
                onChange={handleChange}
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
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            {/* Model Dropdown */}
            <ModelDropdown
              selectedModel={formData.model}
              setFormData={setFormData}
            />
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-primary">
              Update Car
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={props.onClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCarForm;
