import axios from "axios";
import React, { useState } from "react";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import MuiAlert from "@material-ui/lab/Alert";
import moment from "moment";
import momentUtils from "@date-io/moment";
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
  const [data, setData] = useState([]);
  const [xyData, setXyData] = useState([]);
  const [date, setDate] = useState({
    productFrom: moment().format("DD/MM/YYYY"),
    productTo: moment().format("DD/MM/YYYY"),
    tableFrom: moment().format("DD/MM/YYYY"),
    tableTo: moment().format("DD/MM/YYYY"),
  });
  let weekAgo = moment().subtract(7, "d").format("YYYY-MM-DD");

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
      .get(
        `http://localhost:3001/statistics/get/products/${moment(
          date.productFrom,
          "DD/MM/YYYY"
        ).format()}/${moment(date.productTo, "DD/MM/YYYY").format()}/`
      )
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
      .get(
        `http://localhost:3001/statistics/get/tables/${moment(
          date.tableFrom,
          "DD/MM/YYYY"
        ).format()}/${moment(date.tableTo, "DD/MM/YYYY").format()}`
      )
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
  const handleChangeDate = (evt, value, src) => {
    setDate({ ...date, [src]: value });
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
          <MuiPickersUtilsProvider utils={momentUtils}>
            <KeyboardDatePicker
              style={{ margin: "10px" }}
              disableToolbar
              inputValue={date.productFrom}
              variant="inline"
              format="DD/MM/YYYY"
              margin="normal"
              minDate={weekAgo}
              maxDate={moment(date.productTo, "DD/MM/YYYY").format(
                "YYYY-MM-DD"
              )}
              id="date-picker-inline"
              label={translate("From")}
              value={date.productFrom}
              onChange={(evt, value) =>
                handleChangeDate(evt, value, "productFrom")
              }
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <KeyboardDatePicker
              style={{ margin: "10px" }}
              disableToolbar
              variant="inline"
              onChange={(evt, value) =>
                handleChangeDate(evt, value, "productTo")
              }
              format="DD/MM/YYYY"
              margin="normal"
              id="date-picker-inline"
              label={translate("To")}
              minDate={moment(date.productFrom, "DD/MM/YYYY").format(
                "YYYY-MM-DD"
              )}
              maxDate={date.productTo}
              value={date.productTo}
              inputValue={date.productTo}
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
          <MuiPickersUtilsProvider utils={momentUtils}>
            <KeyboardDatePicker
              style={{ margin: "10px" }}
              disableToolbar
              variant="inline"
              format="DD/MM/YYYY"
              margin="normal"
              minDate={weekAgo}
              maxDate={moment(date.tableTo, "DD/MM/YYYY").format("YYYY-MM-DD")}
              id="date-picker-inline"
              label={translate("From")}
              value={date.tableFrom}
              inputValue={date.tableFrom}
              onChange={(evt, value) =>
                handleChangeDate(evt, value, "tableFrom")
              }
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            {console.log()}
            <KeyboardDatePicker
              style={{ margin: "10px" }}
              disableToolbar
              variant="inline"
              onChange={(evt, value) => handleChangeDate(evt, value, "tableTo")}
              format="DD/MM/YYYY"
              margin="normal"
              id="date-picker-inline"
              label={translate("To")}
              minDate={moment(date.tableFrom, "DD/MM/YYYY").format(
                "YYYY-MM-DD"
              )}
              maxDate={moment().format("DD/MM/YYYY")}
              value={date.tableTo}
              inputValue={date.tableTo}
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
