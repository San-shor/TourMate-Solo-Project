import "./home.css";
const Home = () => {
  return (
    <>
      <div className="main-content">
        <h1>
          Lifelong memories just a<dd>few seconds away</dd>
        </h1>
        <div className="cta-container">
          <p>Let’s start your journey with us, your dream will come true</p>
          <a className="btn" href="#">
            Explore Destination
          </a>
        </div>
        <div className="cta-background">
          <div className="car-running">
            <img
              src="https://preview.colorlib.com/theme/tralive/assets/img/hero/car.png.webp"
              alt="car"
            />
          </div>
        </div>
        <div className="bg-image"></div>
      </div>
    </>
  );
};

export default Home;
