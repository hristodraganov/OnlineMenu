import React, { useContext } from "react";
import "./TableModal.css";
import { TableContext } from "../../Context/TableContext";
import translate from "../../i18n/translate";
import { FormattedMessage } from "react-intl";
import { validateNumberInput } from "../../validation/numbers";
const TableModal = () => {
  const { table, display } = useContext(TableContext);
  const [tableNumber, setTableNumber] = table;
  //eslint-disable-next-line
  const [displayModal, setDisplayModal] = display;

  return (
    <div className="modal-wrapper">
      <div className="modal-backdrop">
        <div className="modal-box">
          <h3 className="modal-header">
            {translate("Welcome to our online menu!")}
          </h3>
          <span className="modal-info">
            {translate(
              "To ensure we know your table number, please look in on of the four corners of the table to see a number. Please provide this number in the text box below so you can proceed in ordering!"
            )}
          </span>
          <div className="user-input">
            <FormattedMessage id="modal-placeholder" defaultMessage="search">
              {(placeholder) => (
                <input
                  id="table-number"
                  className="table-number-input"
                  onChange={(e) => setTableNumber(e.target.value)}
                  type="text"
                  onKeyPress={validateNumberInput}
                  placeholder={placeholder}
                />
              )}
            </FormattedMessage>
            <button
              id="table-number-button"
              className="submit-table-number"
              onClick={() =>
                tableNumber !== 0 && tableNumber > 0 && tableNumber < 21
                  ? setDisplayModal(false)
                  : null
              }
            >
              {translate("Submit table number")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableModal;
