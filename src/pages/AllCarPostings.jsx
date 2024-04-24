import { useEffect, useState } from "react";
import axios from "axios";

import CarList from "../Components/CarList";

const AllCarPostings = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      console.log("Search term:", searchKeyword);
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [searchKeyword]);

  const handleInputChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  useEffect(() => {
    axios
      .get("/vehicle_postings")
      .then((response) => {
        setCars(response.data.postings);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container-fluid p-5">
        <h1>Find your dream car!</h1>
      {/* Search bar */}
        <form className="search d-flex mt-3">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search for car companies"
            aria-label="Search"
            value={searchKeyword}
            onChange={handleInputChange}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      {/* Listings */}
      <div>
        {loading ? (
          <div className="d-flex justify-content-center mt-5">
            <div
              className="spinner-border text-primary"
              role="status"
              style={{ width: "3rem", height: "3rem" }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <CarList searchKeyword={searchKeyword} carsData={cars} />
        )}
      </div>
    </div>
  );
};

export default AllCarPostings;
