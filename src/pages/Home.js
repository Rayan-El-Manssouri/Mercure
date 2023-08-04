import React, { useEffect } from "react";
import Majax from "../components/Majax/Majax";

const Home = () => {
  useEffect(() => {
    const fetchData = async () => {
      const majax = new Majax();
      try {
        await majax.init("http://localhost:8000/ConnecteServer", "apikey");
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>
        <div className="message">
          <p>Bienvenue sur Mercure!</p>
        </div>
      </div>
    </div>
  );
};

export default Home;