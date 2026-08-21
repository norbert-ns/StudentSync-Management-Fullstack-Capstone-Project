/* 
React codes for AllStudents page will go here
path: frontend/src/pages/Home.jsx
*/

// Hero/culture/gallery content. Please find it in src/pages/Home.jsx
import { Link } from "react-router-dom";
import "./Home.css";

import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import commemoration from "../assets/commemoration.png";
import volleyball from "../assets/volleyball.png";
import icon1 from "../assets/icon1.png";
import icon2 from "../assets/icon2.png";
import icon3 from "../assets/icon3.png";

function Home() {
  return (
    <div className="app">
      <main>
        {/* ================= HERO SECTION ================= */}
        <section className="hero container" id="home">
          <div className="hero-text">
            <p className="green-small-title">Students management platform</p>

            <h1>
              STUDENTSYNC
              <br />
              MANAGEMENT WEB APP
            </h1>

            <p className="academic-year">
              Students for the Academic Year 2025/2026
            </p>

            <div className="hero-buttons">
              <a href="#about" className="outline-button">
                Learn More
              </a>

              <Link to="/students" className="green-button">
                All Students
              </Link>
            </div>
          </div>

          <div className="hero-images">
            <img src={image1} alt="Students" className="hero-main-image" />

            <div className="small-images">
              <img src={image2} alt="Students" />
              <img src={image3} alt="Students" />
              <img src={image4} alt="Students" />
            </div>
          </div>
        </section>

        {/* ================= CULTURE SECTION ================= */}
        <section className="culture container" id="about">
          <p className="section-label">Vibrant Culture</p>
          <h2>Kepler College Students management</h2>

          <div className="culture-cards">
            <div className="culture-card">
              <img
                src={icon1}
                alt="Digital transformation"
                className="card-icon"
              />
              <h3>Digital transformation</h3>
              <p>
                Digital transformation empowers students with tools and skills
                that extend beyond technical proficiency, fostering a learning
                environment where ethical digital citizenship and proper online
                conduct become the bedrock of their future success in an
                increasingly connected world.
              </p>
            </div>

            <div className="culture-card purple-card">
              <img
                src={icon2}
                alt="Disciplined and Productive"
                className="card-icon"
              />
              <h3>Disciplined and Productive</h3>
              <p>
                Discipline in time, as well as discipline in all matters and
                possessions. Organized and able to manage their
                agenda/activities so that all their time can be valuable and
                beneficial.
              </p>
            </div>

            <div className="culture-card">
              <img
                src={icon3}
                alt="Race Towards Goodness"
                className="card-icon"
              />
              <h3>Race Towards Goodness</h3>
              <p>
                Competing and striving in goodness. Having speed and accuracy in
                doing good deeds. Trained to act swiftly in matters, completing
                tasks quickly and efficiently.
              </p>
            </div>
          </div>
        </section>

        {/* ================= GALLERY SECTION ================= */}
        <section className="gallery container">
          <p className="section-label">Gallery</p>
          <h2>Kepler College Students Lifestyle</h2>

          <div className="gallery-tabs">
            <button>All</button>
            <button>Foundations period</button>
            <button>Sports Culture</button>
            <button>Projects phase</button>
          </div>

          <div className="gallery-images">
            <div className="gallery-item">
              <img src={image4} alt="Students celebrating" />
            </div>

            <div className="gallery-item featured-gallery">
              <img src={volleyball} alt="Students at sports event" />
              <div className="image-overlay">
                <span>👁️</span>
                <strong>Sports Culture</strong>
              </div>
            </div>

            <div className="gallery-item">
              <img src={commemoration} alt="Commemoration" />
            </div>
          </div>

          <div className="more-pictures">
            <a href="#gallery">More pictures →</a>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;


