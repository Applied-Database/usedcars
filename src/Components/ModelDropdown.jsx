import { useState, useEffect } from "react";
import axios from "axios";

const ModelDropdown = (props) => {
  const [models, setModels] = useState([]);

  useEffect(() => {
    console.log("the use effect")
    // Fetch available models from the API endpoint
    axios
      .get("/vehicle_models")
      .then((response) => {
        setModels(response.data);
        // Ensure that the selectedModel is initially set if props.selectedModel exists and is valid
        if (props.selectedModel && response.data.includes(props.selectedModel)) {
          props.setFormData(prevFormData => ({
            ...prevFormData,
            model: props.selectedModel
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching models:", error);
      });
  }, [props.selectedModel]); // Listening to changes in props.selectedModel

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    console.log("selectedValue", selectedValue);

    props.setFormData(prevFormData => ({
      ...prevFormData,
      model: selectedValue,


    }));
    console.log("prevFormData", prevFormData);
  };

  return (
    <div className="mb-3">
      <label className="form-label">Model</label>
      <select
        className="form-select"
        value={props.selectedModel}
        onChange={handleChange}
      >
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
