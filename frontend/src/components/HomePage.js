import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin"; // Importing ScrollToPlugin

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin); // Registering ScrollToPlugin

const images = ["/slide1.jpg", "/slide2.jpg", "/slide3.jpg", "/slide4.jpg"];

const Slideshow = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 1000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".slideshow",
      { scale: 0.8 },
      {
        scale: 1.2,
        scrollTrigger: {
          trigger: ".slideshow",
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
          onEnter: () =>
            gsap.to("body", { backgroundColor: "black", duration: 0.5 }),
          onLeaveBack: () =>
            gsap.to("body", { backgroundColor: "white", duration: 0.5 }),
        },
      }
    );
  }, []);

  return (
    <div
      className="slideshow"
      style={{
        position: "relative",
        margin: "0 auto",
        width: "80%",
        height: "500px",
        overflow: "hidden",
      }}
    >
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index + 1}`}
          style={{
            opacity: currentImage === index ? 1 : 0,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "opacity 1s ease-in-out",
          }}
        />
      ))}
    </div>
  );
};

const HomePage = () => {
  const [videoUrl, setVideoUrl] = useState(
    "https://www.youtube.com/embed/1-2Q9QigtXY"
  );
  const [textColor, setTextColor] = useState("white");

  useEffect(() => {
    gsap.from(".navbar", { duration: 1, y: -50, opacity: 0 });
    gsap.from(".content", { duration: 1, opacity: 0, delay: 0.5 });

    ScrollTrigger.create({
      trigger: ".section-two",
      start: "top 50%",
      end: "bottom 0%",
      onEnter: () => {
        gsap.to(".navbar", { duration: 1.0, backgroundColor: "black" });
      },
      onLeaveBack: () => {
        gsap.to(".navbar", { duration: 1.0, backgroundColor: "lightgreen" });
      },
    });

    const colors = ["white", "teal"];
    let index = 0;
    const interval = setInterval(() => {
      setTextColor(colors[index]);
      index = (index + 1) % colors.length;
    }, 250);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setTextColor("white");
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".contentImage",
      { scale: 0.5, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
      }
    );
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".animatedText span",
      { opacity: 0, x: -50, y: -30 },
      {
        opacity: 1,
        x: 0,
        y: 0,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: ".content p",
          start: "top 90%",
          end: "top 40%",
          scrub: true,
        },
      }
    );
  }, []);

  const scrollToTop = () => {
    gsap.to(window, { scrollTo: 0, duration: 1 });
  };

  return (
    <div>
      {/* Navbar */}
      <div
        className="navbar"
        style={{ backgroundColor: "lightgreen", padding: "10px" }}
      >
        <div
          className="title"
          style={{
            flex: 1,
            textAlign: "center",
            fontWeight: "bold",
            color: "chartreuse",
            fontSize: "80px",
            fontFamily: "-moz-initial",
          }}
        >
          PROXIFY
        </div>
        <div style={{ marginLeft: "10px",border:'none' }}>
          <button className="btn">Home</button>
          <button className="btn">About</button>
          <button className="btn">Login/Sign Up</button>
        </div>
      </div>

      {/* SVG Section */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "130vh",
          overflow: "hidden",
        }}
      >
        <img
          className="contentImage"
          src="/content.jpg"
          alt="Description"
          style={{
            width: "130%",
            height: "130%",
            position: "absolute",
            top: "-15%",
            left: "-15%",
            filter: "brightness(0.5)",
          }}
        />
        <div
          className="contentText"
          style={{
            position: "absolute",
            top: "50%",
            left: "40%",
            transform: "translate(-50%, -50%)",
            color: textColor,
            fontSize: "150px",
            textAlign: "left",
            font: "-moz-initial",
            transition: "color 0.5s ease",
          }}
        >
          SIMPLIFLYING ACCESS, ENHANCING COLLABORATION
        </div>
      </div>

      {/* Main Content */}
      <div className="content" style={{ display: "flex", marginTop: "20px" }}>
        <div
          style={{
            flex: 1,
            padding: "20px",
            fontSize: "30px",
            marginLeft: "25%",
            color: "HighlightText",
            fontFamily: "cursive",
          }}
        >
          <p className="animatedText">
            {"🔻SCROLL DOWN MORE TO GET STARTED!!!.🔻"
              .split("")
              .map((char, index) => (
                <span key={index}>{char}</span>
              ))}
          </p>
        </div>
      </div>

      {/* Slideshow Section */}
      <div style={{ marginTop: "20px" }}>
        <Slideshow />
      </div>

      {/* Toggle Buttons */}
      <div
        className="toogleButton"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "120px 0",
          maxWidth: "300px",
          marginLeft: "40%",
          gap: '50px'
        }}
      >
        <button
          onClick={() => {
            setVideoUrl("https://www.youtube.com/embed/1-2Q9QigtXY");
          }}
          style={{
            marginRight: "50px",
            scale: "1.5",
            fontWeight: "bolder",
          }}
        >
          WINDOWS
        </button>
        <button
          onClick={() => {
            setVideoUrl("https://www.youtube.com/embed/ioESXG_IXR0");
          }}
          style={{
            scale: "1.5",
            fontWeight: "bolder",
          }}
        >
          ANDROID
        </button>
      </div>

      {/* How to Use Section */}
      <div style={{ marginTop: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <iframe
            width="1080"
            height="720"
            src={videoUrl}
            title="YouTube video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{
              border: "10px solid white",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
            }}
          ></iframe>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        onMouseEnter={() => gsap.to(".backToTop", { rotation: 180, duration: 0.5 })}
        onMouseLeave={() => gsap.to(".backToTop", { rotation: 0, duration: 0.5 })}
        className="backToTop"
      >
        <img width={'50%'} height={'50%'} src="\down-arrow_11044540.png" alt="" />
      </button>
    </div>
  );
};

export default HomePage;
