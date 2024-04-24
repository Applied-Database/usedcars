// import { Link } from "react-router-dom";
import anime from "animejs/lib/anime.es.js";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    anime({
      targets: ".card",
      translateX: [-500, 0],
      opacity: [0, 1],
      easing: "easeInOutSine",
      delay: anime.stagger(100),
    });

    anime({
      targets: ".search",
      translateY: [-100, 0],
      opacity: [0, 1],
      easing: "easeInOutSine", // Adjust easing for desired effect
      delay: anime.stagger(100),
    });
    anime({
      targets: ".webname",
      opacity: [0, 1],
      easing: "easeInOutSine", // Adjust easing for desired effect
      delay: anime.stagger(100),
    });
  }, []);

  return (
    <div className="container-fluid p-0">
      <div className="container-fluid position relative p-0">
        <h1
          className="webname position-absolute start-50 translate-middle mx-auto my-5 p=5"
          style={{
            fontFamily: "Lobster",
            fontWeight: "400",
            fontStyle: "normal",
            color: "transparent", // Make text invisible for rainbow effect (optional)
            background:
              "linear-gradient(to right, #f08080, #ff4000, #ff0000, #c00000)",
            backgroundClip: "text", // Ensure gradient applies to text
            textFillColor: "transparent", // Ensure gradient colors are used
            fontSize: "6rem", // Increased font size
          }}
        >
          CarConnect
        </h1>
        <img
          src="https://lp-auto-assets.s3.amazonaws.com/preowned/M4/header.jpg"
          className="img-fluid w-100 p-0 m-0"
          alt="Responsive image"
        ></img>
      </div>
    </div>
  );
};

export default Home;
