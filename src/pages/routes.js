import React, { useEffect } from "react";
import { APICall } from "../services/api.js";
import axios from "axios";
import { Route, Routes, useNavigate } from "react-router-dom";

import HomePage from "../pages/home_page";

function AllRoutes({
  username,
  stateObj,
  setStateObj,
  serverType,
}) {
  let navigate = useNavigate();

  useEffect(() => {
    if (stateObj.stateStatus === "initial") {
      APICall(setStateObj);
      navigate("/");
    }
  }, [navigate, stateObj.stateStatus, setStateObj]);

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <HomePage
            stateObj={stateObj}
            serverType={serverType}
            axios={axios}
            anime={stateObj.anime}
            setStateObj={setStateObj}
          />
        }
      />
    </Routes>
  );
}

export default AllRoutes;
