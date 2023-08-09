import React from "react";
import { NavLink } from "react-router-dom";
import '../styles/Home.scss'
const Home = () => {
  return (
    <div>
      <div>
        <div>
          <div className="HeaderHome">
            <img src="assets/logo/color light 50.webp" alt="logo" />
            <h1>Mercure</h1>
            <ul>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
              <li>
                <NavLink>API</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;