import React, { useEffect } from "react";
import { APICall } from "../services/api.js";
import { Route, Routes, useNavigate } from "react-router-dom";

import HomePage from "../pages/home_page";
import Scroll from "../javascript/scroll"

function AllRoutes({
  stateObj,
  setStateObj,
}) {
  let navigate = useNavigate();

  useEffect(() => {
    if (stateObj.stateStatus === "initial") {
      APICall(setStateObj);
      navigate("/");
    } else if (stateObj.stateStatus === "finished_fetching_anime") {
      Scroll(stateObj.today)
    }
  }, [navigate, stateObj.stateStatus, setStateObj, stateObj.today]);

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <HomePage
            stateObj={stateObj}
            setStateObj={setStateObj}
          />
        }
      />
    </Routes>
  );
}

export default AllRoutes;
