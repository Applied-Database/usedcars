import { useAuth } from "../provider/authProvider";
import axios from "axios";
import { useState, useEffect } from "react";
import CarList from "../Components/CarList";

const UserDashboard = () => {
  const { user } = useAuth();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const [carsData, setCarsData] = useState([]);

  useEffect(() => {
    const fetchUserPostings = async () => {
      try {
        const response = await axios.post("/user_postings", {
          email: user.email,
        });
        const data = response.data.postings; // Assuming response contains an array of postings
        return data;
      } catch (error) {
        console.error("Error fetching user postings:", error);
        return []; // Return empty array in case of error
      }
    };

    const loadUserPostings = async () => {
      setLoading(true);
      const postingsData = await fetchUserPostings();
      setCarsData(postingsData);
      setLoading(false);
    };

    loadUserPostings();
  }, [user.email]); // Trigger effect on user email change

  const handleSearch = () => {
    // Perform search action here
    console.log("Search keyword:", searchKeyword);
  };

  return (
    <div className="container-fluid d-flex flex-column">
      <div className="m-5">
        <h1>My Postings</h1>
        {/* Search input */}
        <div className="input-group mb-3 mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search for postings"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <button className="btn btn-primary" type="button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      {/* Show spinner while loading */}
      {loading ? (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <CarList searchKeyword={searchKeyword} carsData={carsData} isEditable="True"/>
      )}
    </div>
  );
};

export default UserDashboard;
