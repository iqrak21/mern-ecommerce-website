import React from 'react';
import bg1 from "../../images/bg1.jpg";
import bg2 from "../../images/bg2.jpg";
import b1 from "../../images/b1.jpg";
import bg5 from "../../images/bg5.jpg";


const Curosel = () => {
  return (
      <>
    <div id="demo" className="carousel slide" data-ride="carousel">
    <ul className="carousel-indicators">
      <li data-target="#demo" data-slide-to="0" className="active"></li>
      <li data-target="#demo" data-slide-to="1"></li>
      <li data-target="#demo" data-slide-to="2"></li>
      <li data-target="#demo" data-slide-to="3"></li>
    </ul>
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img src={bg1} alt="First" width="1800" height="500"/>
        <div className="carousel-caption">
          <h2>Jewellery</h2>
          <p>We had such a great time in LA!</p>
        </div>   
      </div>
      <div className="carousel-item">
        <img src={b1} alt="Second" width="1800" height="500"/>
        <div className="carousel-caption">
          <h2>Jewellery</h2>
          <p>Thank you, Jewellery!</p>
        </div>   
      </div>
      <div className="carousel-item">
        <img src={bg2} alt="Third" width="1800" height="500"/>
        <div className="carousel-caption">
          <h2>Jewellery</h2>
          <p>Best Quality!</p>
        </div>   
      </div>
      <div className="carousel-item">
        <img src={bg5} alt="Third" width="1800" height="500"/>
        <div className="carousel-caption">
          <h2>Jewellery</h2>
          <p>Best Quality!</p>
        </div>   
      </div>
      
    </div>
    <a className="carousel-control-prev" href="#demo" data-slide="prev">
      <span className="carousel-control-prev-icon"></span>
    </a>
    <a className="carousel-control-next" href="#demo" data-slide="next">
      <span className="carousel-control-next-icon"></span>
    </a>
  </div>
  </>
  )
}

export default Curosel