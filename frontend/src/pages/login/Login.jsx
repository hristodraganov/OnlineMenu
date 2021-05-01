import React, { useState } from "react";
import "./Login.css";
import Admin from "../../components/admin/Admin";
import { FaHamburger } from "react-icons/fa";
import { Button, TextField } from "@material-ui/core";
import translate from "../../i18n/translate";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    switch (e.target.type) {
      case "text":
        setUsername(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username !== "" && password !== "") {
      setLogged(true);
    }
  };

  return logged ? (
    <Admin username={username} password={password} />
  ) : (
    <section className="login-section">
      <div className="spacer"></div>
      <div className="container">
        <div className="row">
          <div className="login-box">
            <div className="login-key">
              <FaHamburger style={{ color: "#fff", marginTop: "2rem" }} />
            </div>
            <div className="login-title">{translate("Admin")}</div>

            <form onSubmit={handleSubmit}>
              <TextField
                id="standard-basic"
                label={translate("USERNAME")}
                onChange={handleChange}
              />
              <TextField
                id="standard-password-input"
                label={translate("PASSWORD")}
                type="password"
                onChange={handleChange}
              />
              <Button
                style={{ marginTop: "2rem" }}
                variant="contained"
                color="default"
                type="submit"
              >
                {translate("LOGIN")}
              </Button>
            </form>
          </div>
        </div>
        <div className="col-lg-3 col-md-2"></div>
      </div>
    </section>
  );
};

export default Login;
