import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as ratesActions from "./redux/actions/ratesActions";
import ratesSelector from "./redux/selectors/ratesSelector";
import RatesTable from "./components/RatesTable";
import "./App.css";

export default function App() {
  const dispatch = useDispatch();
  const rates = useSelector(ratesSelector);
  const [showDialog, setShowDialog] = useState(false);

  const toogleShowDialog = () => {
    setShowDialog(!showDialog);
  };
  const onLoadRates = () => {
    dispatch(ratesActions.loadRates());

    toogleShowDialog();
  };
  return (
    <div className="container">
      <div>Here be dragons</div>
      <button type="button" onClick={onLoadRates}>
        Load Rates
      </button>
      <RatesTable
        rates={rates}
        showDialog={showDialog}
        toogleShowDialog={toogleShowDialog}
      />
    </div>
  );
}
