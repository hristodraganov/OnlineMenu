import axios from "axios";
import React, { useState } from "react";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import MuiAlert from "@material-ui/lab/Alert";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Snackbar,
} from "@material-ui/core";
import "./Statistics.css";
import Pie from "./Charts/Pie";
import XYChart from "./Charts/XYChart";
import translate from "../../i18n/translate";

const Statistics = () => {
  let fromInitial = new Date(Date.now());
  let toInitial = new Date(Date.now());
  const [xyTitle, setXyTitle] = useState({
    x: "",
    y: "",
  });

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarType, setSnackBarType] = useState("success");
  const [xyType, setXyType] = useState("");
  const [xyCategory, setXyCategory] = useState("");
  const [xyValue, setXyValue] = useState("");
  const [overAll, setOverAll] = useState("");
  const [pieType, setPieType] = useState("");
  const [pieCategory, setPieCategory] = useState("");
  const [pieValue, setPieValue] = useState("");
  const [from, setFrom] = useState(fromInitial.toISOString());
  const [data, setData] = useState([]);
  const [xyData, setXyData] = useState([]);
  const [to, setTo] = useState(toInitial.toISOString());
  var now = new Date();
  now = now.setDate(now.getDate());
  var weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const handleChangeFrom = (evt) => {
    setFrom(evt.toISOString());
  };
  const handleChangeTo = (evt) => {
    setTo(evt.toISOString());
  };
  const handleRadioChange = (evt) => {
    setOverAll(evt.target.value);
  };
  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };
  const updateSnackBar = (data) => {
    setSnackBarType(data.status);
    setSnackBarMessage(data.data.msg);
    setOpenSnackBar(true);
  };
  const findByDateProduct = () => {
    setPieType("products");
    setPieCategory("name");
    setPieValue("quantity");

    axios
      .get(`http://localhost:3001/statistics/get/products/${from}/${to}/`)
      .then((res) => {
        setData(res.data.data.info);
        if (res.data.data.status === "error") {
          updateSnackBar(res.data);
        }
      });
  };
  const findByDateTable = () => {
    setPieType("tables");
    setPieCategory("table");
    setPieValue("timesUsed");
    axios
      .get(`http://localhost:3001/statistics/get/tables/${from}/${to}/`)
      .then((res) => {
        setData(res.data.data.tables);
        if (res.data.data.status === "error") {
          updateSnackBar(res.data);
        }
      });
  };
  const findOverallByDate = () => {
    if (overAll === "Products") {
      setXyType("products");
      setXyCategory("name");
      setXyValue("income");
      setXyTitle({ x: "Products", y: "Income" });

      axios
        .get(`http://localhost:3001/statistics/get/overall/product/income`)
        .then((res) => {
          setXyData(res.data.data.products);
          if (res.data.data.status === "error") {
            updateSnackBar(res.data);
          }
        });
    } else {
      setXyType("overall");
      setXyCategory("name");
      setXyValue("sold");
      setXyTitle({ x: "Sub Categories", y: "Sold" });

      axios
        .get(`http://localhost:3001/statistics/get/overall/${overAll}`)
        .then((res) => {
          setXyData(res.data.data.info);
          if (res.data.data.status === "error") {
            updateSnackBar(res.data);
          }
        });
    }
  };
  const closeSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };
  return (
    <section className="statistics">
      <div className="spacer"></div>
      {openSnackBar && snackBarMessage !== "" ? (
        <Snackbar open={true} autoHideDuration={6000} onClose={closeSnackBar}>
          <Alert onClose={closeSnackBar} severity={snackBarType}>
            {snackBarMessage}
          </Alert>
        </Snackbar>
      ) : null}
      <h3>{translate("Most sold products")}</h3>
      <div className="controls-wrapper">
        <div className="calendar-controls">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              style={{ margin: "10px" }}
              disableToolbar
              InputProps={{ readOnly: true }}
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              minDate={weekAgo}
              id="date-picker-inline"
              label={translate("From")}
              value={from}
              onChange={handleChangeFrom}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <KeyboardDatePicker
              style={{ margin: "10px" }}
              disableToolbar
              InputProps={{ readOnly: true }}
              variant="inline"
              onChange={handleChangeTo}
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label={translate("To")}
              minDate={from}
              maxDate={to}
              value={to}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
          <Button
            style={{ marginTop: "1vh" }}
            variant="contained"
            color="default"
            onClick={findByDateProduct}
          >
            {translate("Search")}
          </Button>
          <h3>{translate("Most popular tables")}</h3>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              style={{ margin: "10px" }}
              disableToolbar
              InputProps={{ readOnly: true }}
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              minDate={weekAgo}
              id="date-picker-inline"
              label={translate("From")}
              value={from}
              onChange={handleChangeFrom}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <KeyboardDatePicker
              style={{ margin: "10px" }}
              disableToolbar
              InputProps={{ readOnly: true }}
              variant="inline"
              onChange={handleChangeTo}
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label={translate("To")}
              minDate={from}
              maxDate={now}
              value={to}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
          <Button
            style={{ marginTop: "1vh" }}
            variant="contained"
            color="default"
            onClick={findByDateTable}
          >
            {translate("Search")}
          </Button>
        </div>
      </div>
      <Pie
        data={data}
        type={pieType}
        dataFieldsCategory={pieCategory}
        dataFieldsValue={pieValue}
      />
      <h3>{translate("Overall")}</h3>
      <FormControl
        component="fieldset"
        style={{ paddingLeft: "1rem", marginBottom: "1rem" }}
      >
        <RadioGroup
          aria-label="findForXY"
          name="findForXY"
          value={overAll}
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value="Food"
            control={<Radio color="default" />}
            label={translate("Food")}
          />
          <FormControlLabel
            value="Drinks"
            control={<Radio color="default" />}
            label={translate("Drinks")}
          />
          <FormControlLabel
            value="Products"
            control={<Radio color="default" />}
            label={translate("Income by products")}
          />
        </RadioGroup>
      </FormControl>

      <Button
        style={{ marginTop: "1vh" }}
        variant="contained"
        color="default"
        onClick={findOverallByDate}
      >
        {translate("Search")}
      </Button>
      <XYChart
        data={xyData}
        type={xyType}
        dataFieldsCategory={xyCategory}
        dataFieldsValue={xyValue}
        title={xyTitle}
      />
    </section>
  );
};

export default Statistics;
