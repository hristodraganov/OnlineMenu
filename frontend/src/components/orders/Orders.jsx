import React, { useEffect, useState } from "react";
import "./Orders.css";
import Order from "../order/Order";
import translate from "../../i18n/translate";
import axios from "axios";
import "date-fns";
import Select from "react-select";

import DateFnsUtils from "@date-io/date-fns";
import { Button } from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
const Orders = (props) => {
  const [orders, setOrders] = useState([]);
  /*eslint-disable*/
  const [from, setFrom] = useState(new Date(Date.now()));
  const [to, setTo] = useState(new Date(Date.now()));
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
        .get(`http://localhost:3001/orders/get/byDate/${from}/${to}`)
        .then((res) => setOrders(res.data.data.orders));
    } catch (err) {}
  };
  const handleChangeFrom = (evt) => {
    setFrom(evt.toISOString());
  };
  const handleChangeTo = (evt) => {
    setTo(evt.toISOString());
  };
  const handleTableChange = (selectedOpt) => {
    let num = selectedOpt.value.match(/\d+/)[0];
    setTable(parseInt(num));
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
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                style={{ margin: "10px" }}
                disableToolbar
                InputProps={{ readOnly: true }}
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
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
                value={to}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
          <Button
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
            className="select-table"
            placeholder={translate("Table...")}
            required={true}
            options={tableOpts}
            onChange={handleTableChange}
          />

          <Button
            style={{ marginTop: "1vh" }}
            variant="contained"
            color="default"
            onClick={findByTable}
          >
            {translate("Search")}
          </Button>
          <Button
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
