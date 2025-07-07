import React from "react";
import StyleFooter from "../Footer/Footer.module.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={StyleFooter.footer}>
      <div className={StyleFooter.container}>
        <div className={StyleFooter.top_section}>
          <div className={StyleFooter.logo_container}>
            <img
              src={`http://localhost:5000/api/images/Logo.svg`}
              className={StyleFooter.logo_style}
            />
            <p className={StyleFooter.logo_text}>
              Discover the world of movies!
            </p>
          </div>
          <div className={StyleFooter.link_section}>
            <div className={StyleFooter.grid_section}>
              <p>About us</p>
              <Link to="/">Our Story</Link>
              <Link to="/">Meet the Team</Link>
              <Link to="/">Contact Us</Link>
            </div>

            <div className={StyleFooter.grid_section}>
              <p>developers</p>
              <Link to="/">API Documentation</Link>
              <Link to="/">Join Our Team</Link>
              <Link to="/">Open Source</Link>
            </div>

            <div className={StyleFooter.grid_section}>
              <p>Explore</p>
              <Link to="/">Trending Movies</Link>
              <Link to="/">Browse by Genre</Link>
              <Link to="/">Latest Reviews</Link>
            </div>

            <div className={StyleFooter.grid_section}>
              <p>Support</p>
              <Link to="/">FAQ</Link>
              <Link to="/">Privacy Policy</Link>
              <Link to="/">Terms of Service</Link>
            </div>
          </div>
        </div>

        <div className={StyleFooter.bottom_section}>
          <p className={StyleFooter.bottom_text}>
            © 2025 MovieLand. All rights reserved.
          </p>
          <div className={StyleFooter.socials}>
            <Link to="/">Built on React</Link>
            <Link to="/">API</Link>
            <Link to="/">Contact us</Link>
            <Link to="/">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// add more for footer
