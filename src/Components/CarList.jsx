import { useState } from "react";
import PropTypes from "prop-types";
import UpdateCarForm from "./UpdateCarForm";
import axios from "axios";

import SuccessModal from "./SuccessModal";

const CarList = (props) => {
  const [cars, setCars] = useState(props.carsData);
  const [visibleCars, setVisibleCars] = useState(9); // Initial number of cars to display
  const [selectedCar, setSelectedCar] = useState(null); // Track the selected car for modal display
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State for showing success modal
  const loadMoreCars = () => {
    setVisibleCars((prevVisibleCars) => prevVisibleCars + 9); // Load 9 more cars
  };

  const handleViewDetails = (car) => {
    setSelectedCar(car);
  };

  const handleCloseModal = () => {
    setSelectedCar(null);
  };

  const handleUpdate = (updatedCar) => {
    const updatedCars = cars.map((car) =>
      car.id === updatedCar.id ? updatedCar : car
    );
    setCars(updatedCars);
  };

  const handleDelete = async (id) => {
    try {
      await axios.post("/delete_vehicle_posting", { id });
      console.log("Car deleted successfully");
      const updatedCars = cars.filter((car) => car.id !== id);
      setCars(updatedCars);
      setShowSuccessModal(true); // Show success modal
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  // Filter cars based on searchKeyword
  const filteredCars = cars.filter((car) =>
    `${car.year} ${car.manufacturer} ${car.vehicle_model}`
      .toLowerCase()
      .includes(props.searchKeyword.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <div className="row">
        {filteredCars.slice(0, visibleCars).map((car) => (
          <div className="col-md-4 mb-4" key={car.id}>
            <div className="card">
              <img
                src={"https://loremflickr.com/640/480/" + car.manufacturer}
                className="card-img-top"
                alt={car.manufacturer}
              />
              <div className="card-body">
                <h5 className="card-title">
                  {car.year} {car.manufacturer} {car.vehicle_model}
                </h5>
                <p className="card-text">Price: ${car.price}</p>
                <p className="card-text">Condition: {car.condition}</p>
                <div className="d-flex justify-content-around">
                  {props.isEditable && (
                    <>
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => {
                          handleViewDetails(car);
                          setIsUpdateModalOpen(true);
                        }}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(car.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                  <button
                    className="btn btn-primary"
                    onClick={() => handleViewDetails(car)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {visibleCars < filteredCars.length && (
        <div className="text-center my-3">
          <button className="btn btn-primary" onClick={loadMoreCars}>
            Load More
          </button>
        </div>
      )}
      {/* Success Modal */}
      <SuccessModal
        show={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message="Car deleted successfully!"
      />

      {/* Modal */}
      {selectedCar && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          {isUpdateModalOpen ? (
            <UpdateCarForm
              carData={selectedCar}
              onClose={handleCloseModal}
              onUpdate={handleUpdate}
            />
          ) : (
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {selectedCar.year} {selectedCar.manufacturer}{" "}
                    {selectedCar.vehicle_model}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    onClick={handleCloseModal}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-4">
                        <div
                          className="card text-center"
                          style={{ backgroundColor: "#FFB6C1" }}
                        >
                          <div className="card-body mx-auto">
                            <div
                              className="rounded-circle bg-secondary"
                              style={{ width: "120px", height: "120px" }}
                            >
                              <img
                                src={
                                  "https://ui-avatars.com/api/?size=512&bold=true&background=random&name=" + // src={currentUser.profileImageURL}
                                  selectedCar.first_name +
                                  "+" +
                                  selectedCar.last_name
                                }
                                alt="avatar"
                                className="rounded-circle img-fluid"
                                style={{ width: "150px" }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div
                          className="card"
                          style={{ backgroundColor: "#f8f9fa" }}
                        >
                          <div className="card-body">
                            <h6 className="card-title">User</h6>
                            <p>
                              {selectedCar.first_name} {selectedCar.last_name}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div
                          className="card"
                          style={{ backgroundColor: "#f8f9fa" }}
                        >
                          <div className="card-body">
                            <h6 className="card-title">Contact</h6>
                            <p>{selectedCar.user_email}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-4">
                        <div
                          className="card"
                          style={{ backgroundColor: "#e9ecef" }}
                        >
                          <div className="card-body">
                            <h6 className="card-title">VIN</h6>
                            <p>{selectedCar.VIN}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div
                          className="card"
                          style={{ backgroundColor: "#e9ecef" }}
                        >
                          <div className="card-body">
                            <h6 className="card-title">Cylinders</h6>
                            <p>{selectedCar.cylinders}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div
                          className="card"
                          style={{ backgroundColor: "#e9ecef" }}
                        >
                          <div className="card-body">
                            <h6 className="card-title">Drive</h6>
                            <p>{selectedCar.drive}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-4">
                        <div
                          className="card"
                          style={{ backgroundColor: "#e9ecef" }}
                        >
                          <div className="card-body">
                            <h6 className="card-title">Fuel</h6>
                            <p>{selectedCar.fuel}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div
                          className="card"
                          style={{ backgroundColor: "#e9ecef" }}
                        >
                          <div className="card-body">
                            <h6 className="card-title">Odometer</h6>
                            <p>{selectedCar.odometer} miles</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div
                          className="card"
                          style={{ backgroundColor: "#e9ecef" }}
                        >
                          <div className="card-body">
                            <h6 className="card-title">Paint Color</h6>
                            <p>{selectedCar.paint_color}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-4">
                        <div
                          className="card"
                          style={{ backgroundColor: "#e9ecef" }}
                        >
                          <div className="card-body">
                            <h6 className="card-title">Posting Date</h6>
                            <p>{selectedCar.posting_date}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div
                          className="card"
                          style={{ backgroundColor: "#e9ecef" }}
                        >
                          <div className="card-body">
                            <h6 className="card-title">Size</h6>
                            <p>{selectedCar.size}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div
                          className="card"
                          style={{ backgroundColor: "#e9ecef" }}
                        >
                          <div className="card-body">
                            <h6 className="card-title">Title Status</h6>
                            <p>{selectedCar.title_status}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      {/* Condition */}
                      <div className="col-md-4">
                        <div
                          className="card"
                          style={{ backgroundColor: "#e9ecef" }}
                        >
                          <div className="card-body">
                            <h6 className="card-title">Condition</h6>
                            <p>{selectedCar.condition}</p>
                          </div>
                        </div>
                      </div>
                      {/* Transmission */}
                      <div className="col-md-4">
                        <div
                          className="card"
                          style={{ backgroundColor: "#e9ecef" }}
                        >
                          <div className="card-body">
                            <h6 className="card-title">Transmission</h6>
                            <p>{selectedCar.transmission}</p>
                          </div>
                        </div>
                      </div>
                      {/* Type */}
                      <div className="col-md-4">
                        <div
                          className="card"
                          style={{ backgroundColor: "#e9ecef" }}
                        >
                          <div className="card-body">
                            <h6 className="card-title">Type</h6>
                            <p>{selectedCar.type}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-12">
                        <div
                          className="card"
                          style={{ backgroundColor: "#e9ecef" }}
                        >
                          <div className="card-body">
                            <h6 className="card-title">Description</h6>
                            <p>{selectedCar.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Add more cards for additional information */}
                  </div>
                </div>
                <div className="modal-footer d-flex justify-content-between">
                  <p className="text-muted">Price: ${selectedCar.price}</p>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Props validation using PropTypes
CarList.propTypes = {
  searchKeyword: PropTypes.string.isRequired,
  carsData: PropTypes.array.isRequired,
};

export default CarList;
