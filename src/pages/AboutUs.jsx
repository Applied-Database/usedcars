import anime from "animejs/lib/anime.es.js";
import { useEffect } from "react";

const AboutUs = () => {
  useEffect(() => {
    anime({
      targets: ".card",
      translateX: [-500, 0],
      opacity: [0, 1],
      easing: "easeInOutSine",
      delay: anime.stagger(100),
    });
  }, []);
  return (
    <>
      {/* Random information in colorful cards */}
      <div className="container-fluid p-5 d-flex flex-column">
        <div className="card bg-primary text-white shadow-lg mb-4">
          <div className="card-body">
            <h3>Why Choose Us?</h3>
            <ul>
              <li>Wide selection of quality used cars</li>
              <li>Competitive pricing</li>
              <li>Transparent buying process</li>
            </ul>
          </div>
        </div>
        <div className="card bg-success text-white shadow-lg mb-4">
          <div className="card-body">
            <h3>Benefits of Buying Used Cars</h3>
            <ul>
              <li>Lower depreciation</li>
              <li>Potential cost savings</li>
              <li>Reduced insurance costs</li>
            </ul>
          </div>
        </div>
        <div className="card bg-info text-white shadow-lg mb-4">
          <div className="card-body">
            <h3>Our Services</h3>
            <ul>
              <li>Car inspections and certifications</li>
              <li>Finance options available</li>
              <li>Trade-in options</li>
            </ul>
          </div>
        </div>
        <div className="card bg-warning text-dark shadow-lg mb-4">
          <div className="card-body">
            <h3>Customer Satisfaction</h3>
            <p>
              We prioritize customer satisfaction and strive to make your car
              buying experience smooth and enjoyable.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
