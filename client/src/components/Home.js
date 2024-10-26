import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import "../components/Home.css";
import { useNavigate } from "react-router-dom";

const JSON_SERVER_URL = "http://localhost:3001/users";

const Home = () => {
  const { user } = useContext(UserContext)||{};
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get(`${JSON_SERVER_URL}?username= ${user}`);

        if (response.data.length === 1) {
          const userData = response.data[0];
          // Set isAdmin to true only if the user has "admin" role
          setIsAdmin(userData.role === "admin");
        } else {
          console.log("User not found or multiple users found");
        }
      } catch (error) {
        console.log("Error fetching user role:", error);
      }
      setLoading(false);
    };

    fetchUserRole();
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!isAdmin) {
    return null; // Render nothing if user is not an admin
  }

  return (
    <>
      <div className="home">
        <div className="admin-section">
          <div className="cards">
            <div className="card">
              <h2 style={{ color: "black" }}>My Leaves</h2>
              <button
                onClick={() => {
                  navigate("/MyLeaves");
                }}
              >
                View Leaves
              </button>
            </div>
            <div className="card">
              <h2 style={{ color: "black" }}>Team Leaves</h2>
              <button
                onClick={() => {
                  navigate("/Leaves");
                }}
              >
                View Leaves
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;