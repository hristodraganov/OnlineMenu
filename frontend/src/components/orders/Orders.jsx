import React, { useEffect, useState } from "react";
import "./Orders.css";
import Order from "../order/Order";
import translate from "../../i18n/translate";
import axios from "axios";
import Select from "react-select";
import moment from "moment";
import momentUtils from "@date-io/moment";
import { Button } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  /*eslint-disable*/
  const [date, setDate] = useState({
    from: moment().format("DD/MM/YYYY"),
    to: moment().format("DD/MM/YYYY"),
  });
  const [reloadAllOrders, setReloadAllOrders] = useState(false);
  /*eslint-disable*/
  const [table, setTable] = useState(0);
  const tableOpts = [
    { value: "Table 1", label: "Table 1" },
    { value: "Table 2", label: "Table 2" },
    { value: "Table 3", label: "Table 3" },
    { value: "Table 4", label: "Table 4" },
    { value: "Table 5", label: "Table 5" },
    { value: "Table 6", label: "Table 6" },
    { value: "Table 7", label: "Table 7" },
    { value: "Table 8", label: "Table 8" },
    { value: "Table 9", label: "Table 9" },
    { value: "Table 10", label: "Table 10" },
  ];

  useEffect(() => {
    try {
      axios
        .get("http://localhost:3001/orders/get/all")
        .then((res) => setOrders(res.data.data.orders));
    } catch (err) {}
  }, [reloadAllOrders]);

  const findByTable = () => {
    try {
      axios
        .get(`http://localhost:3001/orders/get/byTable/${table}`)
        .then((res) => setOrders(res.data.data.orders));
    } catch (err) {}
  };
  const findByDate = () => {
    try {
      axios
        .get(
          `http://localhost:3001/orders/get/byDate/${moment(
            date.from,
            "DD/MM/YYYY"
          ).format()}/${moment(date.to, "DD/MM/YYYY").format()}`
        )
        .then((res) => setOrders(res.data.data.orders));
    } catch (err) {}
  };
  const handleTableChange = (selectedOpt) => {
    let num = selectedOpt.value.match(/\d+/)[0];
    setTable(parseInt(num));
  };
  const handleChangeDate = (evt, value, src) => {
    setDate({ ...date, [src]: value });
  };
  return (
    <div>
      <div className="spacer"></div>
      <div className="calendar">
        <div className="left-calendar"></div>

        <div className="right-calendar"></div>
      </div>

      <div className="query-control">
        <div className="date-query">
          <h2 style={{ fontWeight: "bold", marginBottom: "1vh" }}>
            {translate("Find by date")}
          </h2>

          <div className="calendar-controls">
            <MuiPickersUtilsProvider utils={momentUtils}>
              <KeyboardDatePicker
                style={{ margin: "10px" }}
                disableToolbar
                variant="inline"
                format="DD/MM/YYYY"
                margin="normal"
                id="date-from"
                label={translate("From")}
                value={date.from}
                inputValue={date.from}
                maxDate={moment(date.to, "DD/MM/YYYY").format("YYYY-MM-DD")}
                onChange={(evt, value) => handleChangeDate(evt, value, "from")}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <KeyboardDatePicker
                style={{ margin: "10px" }}
                disableToolbar
                variant="inline"
                format="DD/MM/YYYY"
                margin="normal"
                id="date-to"
                label={translate("To")}
                minDate={moment(date.from, "DD/MM/YYYY").format("YYYY-MM-DD")}
                value={date.to}
                inputValue={date.to}
                onChange={(evt, value) => handleChangeDate(evt, value, "to")}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
          <Button
            id="search-by-date"
            style={{ marginTop: "1vh" }}
            variant="contained"
            color="default"
            onClick={findByDate}
          >
            {translate("Search")}
          </Button>
        </div>
        <div className="table-query">
          <h2 style={{ fontWeight: "bold" }}>{translate("Find by table")}</h2>

          <Select
            inputId="table-number"
            className="select-table"
            placeholder={translate("Table...")}
            required={true}
            options={tableOpts}
            onChange={handleTableChange}
          />

          <Button
            id="search-by-table-number"
            style={{ marginTop: "1vh" }}
            variant="contained"
            color="default"
            onClick={findByTable}
          >
            {translate("Search")}
          </Button>
          <Button
            id="show-all"
            style={{ marginTop: "1.5rem" }}
            variant="contained"
            color="default"
            onClick={() => setReloadAllOrders(!reloadAllOrders)}
          >
            {translate("Show all")}
          </Button>
        </div>
      </div>
      <ul className="orders">
        {orders.map((order) => (
          <li className="table-order">
            <ul>
              <h3 className="table-number">
                {translate("Table")}: {order.order.table_number}
              </h3>
              <h3>
                {translate("Date: ")}
                {order.order.created_at.replace("T", " ").slice(0, -5)}
              </h3>
              {order.orderProducts.map((singleOrder, index) => (
                <div className="single-order-wrapper">
                  <li className="single-order">
                    <Order
                      name={singleOrder.prod_name}
                      price={singleOrder.prod_price}
                      quantity={singleOrder.prod_quantity}
                    />
                  </li>
                  {singleOrder[index + 1] ? <hr></hr> : null}
                </div>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
