import { useState, useEffect } from "react";
import axios from "axios";

const ModelDropdown = (props) => {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");

  useEffect(() => {
    // Fetch available models from the API endpoint
    axios
      .get("/vehicle_models")
      .then((response) => {
        setModels(response.data);
      })
      .catch((error) => {
        console.error("Error fetching models:", error);
      });
  }, []);

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedModel(selectedValue);
    props.setFormData((prevFormData) => ({
      ...prevFormData,
      model: selectedValue,
    }));
  };

  return (
    <div className="mb-3">
      <label className="form-label">Model</label>
      <select
        className="form-select"
        value={selectedModel}
        onChange={handleChange}
      >
        <option value="">Select Model</option>
        {models.map((model, index) => (
          <option key={index} value={model}>
            {model}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ModelDropdown;
