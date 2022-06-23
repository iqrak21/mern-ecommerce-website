import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-distributed">

        <div className="footer-left">
            <h3>MAKKAH<span> JEWELLERS</span></h3>

         
        </div>

        <div className="footer-center">
            <div>
                <i className="fa fa-map-marker"></i>
                <p><span>PAKISTAN</span>
                    KOHAT</p>
            </div>

            <div>
                <i className="fa fa-phone"></i>
                <p>+92-8797688999</p>
            </div>
            <div>
                <i className="fa fa-envelope"></i>
                <p><a href="mailto:sagar00001.co@gmail.com">xyz@gmail.com</a></p>
            </div>
        </div>
        <div className="footer-right">
            <p className="footer-company-about">
                <span>About the company</span>
                <strong>Sagar Developer</strong> is a Youtube channel where you can find more creative CSS Animations
                and
                Effects along with
                HTML, JavaScript and Projects using C/C++.
            </p>
            <div className="footer-icons">
                <a href="#"><i className="fa fa-facebook"></i></a>
                <a href="#"><i className="fa fa-instagram"></i></a>
                <a href="#"><i className="fa fa-linkedin"></i></a>
                <a href="#"><i className="fa fa-twitter"></i></a>
                <a href="#"><i className="fa fa-youtube"></i></a>
            </div>
        </div>
    </footer>
  );
};

export default Footer;
