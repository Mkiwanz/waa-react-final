import React, { useEffect, useState } from "react";
import { Route, Navigate } from "react-router-dom";
import axios from "axios";

const PrivateRoute = ({ component, ...rest }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/check-auth");

        setIsAuthenticated(res.data.isAuthenticated);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          React.createElement(component)
        ) : (
          <Navigate
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
