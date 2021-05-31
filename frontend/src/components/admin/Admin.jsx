import React, { useState, useEffect } from "react";
import "./Admin.css";
import Card from "../card/Card";
import axios from "axios";
import Select from "react-select";
import { validateNumberInput } from "../../validation/numbers";
import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  TextareaAutosize,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import translate from "../../i18n/translate";
const Admin = (props) => {
  let username = "admin";
  let password = "admin1!";
  let match = false;
  if (props.username === username && props.password === password) {
    match = true;
  }
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarType, setSnackBarType] = useState("success");
  const [deleteOpt, setDeleteOpt] = useState("Product");
  const [itemToDelete, setItemToDelete] = useState({});
  const [category, setCategory] = useState({
    name: "",
    image: "",
    imageName: "",
  });
  const [subCategory, setSubCategory] = useState({
    category: "",
    name: "",
    image: "",
    imageName: "",
  });
  const [alergens, setAlergens] = useState([]);
  const [product, setProduct] = useState({
    category: "",
    subCategory: "",
    name: "",
    description: "",
    price: "",
    image: "",
    imageName: "",
  });

  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [subCategoriesOptions, setSubCategoriesOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [deleteSelectOptions, setDeleteSelectOptions] = useState([]);
  const [oldItemName, setOldItemName] = useState("");
  const [showCardImage, setShowCardImage] = useState({
    category: false,
    subCategory: false,
    product: false,
  });

  const alergenOpts = [
    { value: "Alergen 1", label: "Alergen 1" },
    { value: "Alergen 2", label: "Alergen 2" },
    { value: "Alergen 3", label: "Alergen 3" },
  ];
  useEffect(() => {
    let copy = [];
    axios.get("http://localhost:3001/category/get/names").then((res) => {
      if (res.data.status === "error") {
        updateSnackBar(res.data);
      } else {
        //eslint-disable-next-line
        res.data.data.categories.map((item) => {
          let obj = {
            value: item.name,
            label: item.name,
          };
          copy.push(obj);
        });
      }
    });
    setCategoriesOptions(copy);
  }, []);

  useEffect(() => {
    let copy = [];
    if (product.category !== "") {
      axios
        .get(`http://localhost:3001/subCategory/get/names/${product.category}`)
        .then((res) =>
          //eslint-disable-next-line
          res.data.data.sub_categories.map((item) => {
            let obj = {
              value: item.name,
              label: item.name,
            };
            copy.push(obj);
          })
        );
      setSubCategoriesOptions(copy);
    }
  }, [product.category]);

  useEffect(() => {
    let copy = [];
    if (product.subCategory !== "") {
      axios
        .get(`http://localhost:3001/product/get/names/${product.subCategory}`)
        .then((res) =>
          //eslint-disable-next-line
          res.data.data.products.map((item) => {
            let obj = {
              value: item.name,
              label: item.name,
            };
            copy.push(obj);
          })
        );
      setProductOptions(copy);
    }
  }, [product.subCategory]);

  useEffect(() => {
    axios.get(`http://localhost:3001/${deleteOpt}/get`).then((res) => {
      let copy = [];
      let keys = Object.keys(res.data.data);
      //eslint-disable-next-line
      res.data.data[keys[0]].map((item) => {
        let obj = {
          value: item.name,
          label: item.name,
        };
        copy.push(obj);
      });
      setDeleteSelectOptions(copy);
    });
  }, [deleteOpt]);

  const handleSelectChange = (selectedOpt, src, productSelectType) => {
    switch (src) {
      case "subCategory":
        setSubCategory({ ...subCategory, category: selectedOpt.value });
        break;

      case "product":
        if (productSelectType === "alergens") {
          setAlergens(selectedOpt.map((item) => item.value));
        }
        setProduct({ ...product, [productSelectType]: selectedOpt.value });
        break;
      case "delete":
        setItemToDelete({ type: productSelectType, item: selectedOpt.value });
        break;
      case "productUpdate":
        switch (productSelectType) {
          case "alergens":
            setAlergens(selectedOpt.map((item) => item.value));
            break;
          case "product":
            setOldItemName(selectedOpt.value);
            break;
          default:
            setProduct({ ...product, [productSelectType]: selectedOpt.value });
            break;
        }
        break;
      default:
        break;
    }
  };
  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  const handleRadioChange = (evt) => {
    setDeleteOpt(evt.target.value);
  };

  const handleInput = ({ target }, src) => {
    switch (src) {
      case "category":
        setCategory({ ...category, [target.name]: target.value });
        break;

      case "subCategory":
        setSubCategory({ ...subCategory, [target.name]: target.value });
        break;

      case "product":
        setProduct({ ...product, [target.name]: target.value });
        break;
      default:
        break;
    }
  };
  const handleFileInput = ({ target }, src) => {
    setShowCardImage({ ...showCardImage, [src]: true });
    switch (src) {
      case "category":
        if (target.files[0] !== undefined) {
          setCategory({
            ...category,
            image: target.files[0],
            imageName: target.files[0].name,
          });
        }
        break;
      case "subCategory":
        if (target.files[0] !== undefined) {
          setSubCategory({
            ...subCategory,
            image: target.files[0],
            imageName: target.files[0].name,
          });
        }
        break;
      case "product":
        setProduct({
          ...product,
          image: target.files[0],
          imageName: target.files[0].name,
        });
        break;
      default:
        setCategory({ ...category, fileName: "Your file was not uploaded." });
        setSubCategory({
          ...subCategory,
          fileName: "Your file was not uploaded.",
        });
        setProduct({ ...product, fileName: "Your file was not uploaded." });
        break;
    }
  };

  const fileSubmit = async (file) => {
    const fileData = new FormData();
    fileData.append("file", file);
    try {
      await axios.post("http://localhost:3001/upload", fileData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (err) {
      // if (err.response.status === 500) {
      // } else {
      // }
    }
  };
  const updateSnackBar = (data) => {
    setSnackBarType(data.status);
    setSnackBarMessage(data.data.msg);
    setOpenSnackBar(true);
  };
  const submit = async (evt, src) => {
    evt.preventDefault();
    setShowCardImage({ ...showCardImage, [src]: false });
    switch (src) {
      case "category":
        fileSubmit(category.image);
        await axios
          .post("http://localhost:3001/category/add", category)
          .then((res) => {
            updateSnackBar(res.data);
          });
        setCategory({
          name: "",
          image: "",
          imageName: "Photo",
        });
        break;
      case "subCategory":
        fileSubmit(subCategory.image);
        await axios
          .post("http://localhost:3001/subCategory/add", subCategory)
          .then((res) => {
            updateSnackBar(res.data);
          });
        setSubCategory({
          category: "",
          name: "",
          image: "",
          imageName: "Photo",
        });
        break;
      case "product":
        fileSubmit(product.image);
        await axios
          .post("http://localhost:3001/product/add", {
            product: product,
            alergens: alergens,
          })
          .then((res) => {
            updateSnackBar(res.data);
          });
        setProduct({
          category: "",
          subCategory: "",
          name: "",
          description: "",
          price: "",
          image: "",
          imageName: "Photo",
        });
        break;
      case "delete":
        await axios
          .delete(
            `http://localhost:3001/${itemToDelete.type}/delete/${itemToDelete.item}`
          )
          .then((res) => updateSnackBar(res.data));
        break;
      case "updateProduct":
        fileSubmit(product.image);
        await axios
          .put("http://localhost:3001/product/update", {
            product: product,
            alergens: alergens,
            oldProductName: oldItemName,
          })
          .then((res) => updateSnackBar(res.data));
        setProduct({
          category: "",
          subCategory: "",
          name: "",
          description: "",
          price: 0,
          image: "",
          imageName: "Photo",
        });
        break;
      default:
        break;
    }
  };

  const closeSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  return match ? (
    <section className="admin-section">
      {openSnackBar && snackBarMessage !== "" ? (
        <Snackbar open={true} autoHideDuration={6000} onClose={closeSnackBar}>
          <Alert onClose={closeSnackBar} severity={snackBarType}>
            {translate(snackBarMessage)}
          </Alert>
        </Snackbar>
      ) : null}
      <div className="spacer"></div>
      <div className="button-links">
        <Link to="/orders">
          <Button
            id="orders-button"
            style={{ margin: "1rem" }}
            variant="contained"
            color="primary"
          >
            {translate("Go to orders")}
          </Button>
        </Link>
        <Link to="/reports">
          <Button
            id="reports-button"
            style={{ margin: "1rem" }}
            variant="contained"
            color="primary"
          >
            {translate("Go to reports")}
          </Button>
        </Link>
      </div>
      <ul>
        <li className="option">
          <div className="left">
            <h1 style={{ marginLeft: "1rem" }}>{translate("Add category")}</h1>
            <div className="config">
              <div className="config-inputs">
                <TextField
                  required
                  id="outlined-basic"
                  label={translate("Name")}
                  name="name"
                  value={category.name}
                  onChange={(evt) => handleInput(evt, "category")}
                  style={{ marginLeft: "1rem", marginBottom: "1rem" }}
                />
                <div className="file-area">
                  <input
                    type="file"
                    required="required"
                    onChange={(evt) => handleFileInput(evt, "category")}
                  />
                  <div
                    className="file-dummy"
                    style={{ marginLeft: "1rem", marginBottom: "1rem" }}
                  >
                    {/* eslint-disable-next-line */}
                    <div className="success">
                      {category.imageName &&
                        category.imageName.substring(0, 35)}
                    </div>
                    {/* eslint-disable-next-line */}
                    <div className="success">
                      {category.imageName && category.imageName.substring(35)}
                    </div>
                    <div className="default">{translate("Photo")}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="right">
            <h1>{translate("Preview")}</h1>
            <Card
              orientation="vertical"
              src={
                category.image !== ""
                  ? URL.createObjectURL(category.image)
                  : `http://localhost:3001/images${category.imageName}`
              }
              text={category.name}
              showImg={showCardImage.category}
            />
            <Button
              variant="contained"
              color="default"
              onClick={(evt) => submit(evt, "category")}
            >
              {translate("Add")}
            </Button>
          </div>
        </li>
        <li className="option">
          <div className="left">
            <h1 style={{ marginLeft: "1rem" }}>
              {translate("Add subcategory")}
            </h1>
            <div className="config">
              <div className="config-inputs">
                <Select
                  className="select"
                  options={categoriesOptions}
                  onChange={(selected) =>
                    handleSelectChange(selected, "subCategory")
                  }
                  placeholder={translate("Category...")}
                />
                <TextField
                  required
                  id="outlined-basic"
                  label={translate("Name")}
                  name="name"
                  onChange={(evt) => handleInput(evt, "subCategory")}
                  style={{ marginLeft: "1rem", marginBottom: "1rem" }}
                />

                <div className="file-area">
                  <input
                    type="file"
                    required="required"
                    onChange={(evt) => handleFileInput(evt, "subCategory")}
                  />
                  <div
                    className="file-dummy"
                    style={{ marginLeft: "1rem", marginBottom: "1rem" }}
                  >
                    {/* eslint-disable-next-line */}
                    <div className="success">
                      {subCategory.imageName &&
                        subCategory.imageName.substring(0, 35)}
                    </div>
                    {/* eslint-disable-next-line */}
                    <div className="success">
                      {subCategory.imageName &&
                        subCategory.imageName.substring(35)}
                    </div>
                    <div className="default">{translate("Photo")}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="right">
            <h1>{translate("Preview")}</h1>
            <Card
              orientation="vertical"
              src={
                subCategory.image !== ""
                  ? URL.createObjectURL(subCategory.image)
                  : `http://localhost:3001/images${subCategory.imageName}`
              }
              text={subCategory.name}
              showImg={showCardImage.subCategory}
            />
            <Button
              variant="contained"
              color="default"
              onClick={(evt) => submit(evt, "subCategory")}
            >
              {translate("Add")}
            </Button>
          </div>
        </li>
        <li className="option">
          <div className="left">
            <h1 style={{ marginLeft: "1rem" }}>{translate("Add product")}</h1>
            <div className="config">
              <div className="config-inputs">
                <Select
                  required={true}
                  className="select"
                  placeholder={translate("Category...")}
                  options={categoriesOptions}
                  onChange={(selected) =>
                    handleSelectChange(selected, "product", "category")
                  }
                />
                <Select
                  required={true}
                  className="select"
                  placeholder={translate("Subcategory...")}
                  options={subCategoriesOptions}
                  onChange={(selected) =>
                    handleSelectChange(selected, "product", "subCategory")
                  }
                />
                <TextField
                  required
                  id="outlined-basic"
                  label={translate("Name")}
                  name="name"
                  onChange={(evt) => handleInput(evt, "product")}
                  style={{ marginLeft: "1rem", marginBottom: "1rem" }}
                />
                <br></br>
                <TextareaAutosize
                  style={{
                    marginLeft: "1rem",
                    marginBottom: "1rem",
                    width: "200px",
                  }}
                  name="description"
                  required
                  rowsMin={4}
                  placeholder="Description"
                  onChange={(evt) => handleInput(evt, "product")}
                />
                <Select
                  className="select"
                  placeholder={translate("Alergens...")}
                  required={true}
                  options={alergenOpts}
                  isMulti
                  onChange={(selected) =>
                    handleSelectChange(selected, "product", "alergens")
                  }
                />
                <TextField
                  required
                  id="outlined-basic"
                  label={translate("Price")}
                  name="price"
                  onChange={(evt) => handleInput(evt, "product")}
                  style={{ marginLeft: "1rem", marginBottom: "1rem" }}
                  onKeyPress={validateNumberInput}
                />

                <div className="file-area">
                  <input
                    type="file"
                    required="required"
                    onChange={(evt) => handleFileInput(evt, "product")}
                  />
                  <div
                    className="file-dummy"
                    style={{ marginLeft: "1rem", marginBottom: "1rem" }}
                  >
                    {/* eslint-disable-next-line */}
                    <div className="success">
                      {product.imageName && product.imageName.substring(0, 35)}
                    </div>
                    {/* eslint-disable-next-line */}
                    <div className="success">
                      {product.imageName && product.imageName.substring(35)}
                    </div>
                    <div className="default">{translate("Photo")}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="right">
            <h1>{translate("Preview")}</h1>
            <Card
              orientation="vertical"
              src={
                product.image !== "" && product.image !== undefined
                  ? URL.createObjectURL(product.image)
                  : `http://localhost:3001/images${product.imageName}`
              }
              text={product.name}
              showImg={showCardImage.product}
            />
            <Button
              variant="contained"
              color="default"
              onClick={(evt) => submit(evt, "product")}
            >
              {translate("Add")}
            </Button>
          </div>
        </li>
        <li className="option">
          <div className="left">
            <h1>Delete product</h1>
            <div className="config">
              <div className="config-inputs">
                <FormControl
                  component="fieldset"
                  style={{ paddingLeft: "1rem", marginBottom: "1rem" }}
                >
                  <FormLabel component="legend">Delete</FormLabel>
                  <RadioGroup
                    aria-label="delete"
                    name="delete"
                    value={deleteOpt}
                    onChange={handleRadioChange}
                  >
                    <FormControlLabel
                      value="category"
                      control={<Radio color="default" />}
                      label="Category"
                    />
                    <FormControlLabel
                      value="subCategory"
                      control={<Radio color="default" />}
                      label="Subcategory"
                    />
                    <FormControlLabel
                      value="product"
                      control={<Radio color="default" />}
                      label="Product"
                    />
                  </RadioGroup>
                </FormControl>
                <Select
                  className="select-delete"
                  placeholder="Choose what to delete..."
                  required={true}
                  options={deleteSelectOptions}
                  onChange={(selected) =>
                    handleSelectChange(selected, "delete", deleteOpt)
                  }
                />
              </div>
            </div>
            <Button
              style={{ marginLeft: "1rem", marginBottom: "1rem" }}
              variant="contained"
              color="default"
              onClick={(evt) => submit(evt, "delete")}
            >
              Delete
            </Button>
          </div>
        </li>
        <li className="option">
          <div className="left">
            <h1 style={{ marginLeft: "1rem" }}>
              {translate("Update product")}
            </h1>
            <div className="config">
              <div className="config-inputs">
                <Select
                  className="select"
                  placeholder={translate("Category...")}
                  required={true}
                  options={categoriesOptions}
                  onChange={(selected) =>
                    handleSelectChange(selected, "productUpdate", "category")
                  }
                />
                <Select
                  className="select"
                  placeholder={translate("Subcategory...")}
                  required={true}
                  options={subCategoriesOptions}
                  onChange={(selected) =>
                    handleSelectChange(selected, "productUpdate", "subCategory")
                  }
                />
                <Select
                  className="select"
                  placeholder={translate("Product...")}
                  required={true}
                  options={productOptions}
                  onChange={(selected) =>
                    handleSelectChange(selected, "productUpdate", "product")
                  }
                />

                <TextField
                  required
                  id="outlined-basic"
                  label={translate("Name")}
                  name="name"
                  onChange={(evt) => handleInput(evt, "product")}
                  style={{ marginLeft: "1rem", marginBottom: "1rem" }}
                />
                <br></br>
                <TextareaAutosize
                  style={{
                    marginLeft: "1rem",
                    marginBottom: "1rem",
                    width: "180px",
                  }}
                  required
                  name="description"
                  rowsMin={4}
                  aria-label="Description"
                  placeholder="Description"
                  onChange={(evt) => handleInput(evt, "product")}
                />
                <Select
                  className="select"
                  placeholder={translate("Alergens...")}
                  required={true}
                  options={alergenOpts}
                  isMulti
                  onChange={(selected) =>
                    handleSelectChange(selected, "productUpdate", "alergens")
                  }
                />
                <TextField
                  required
                  id="outlined-basic"
                  label={translate("Price")}
                  name="price"
                  onChange={(evt) => handleInput(evt, "product")}
                  style={{ marginLeft: "1rem", marginBottom: "1rem" }}
                  onKeyPress={validateNumberInput}
                />
                <div className="file-area">
                  <input
                    type="file"
                    required="required"
                    onChange={(evt) => handleFileInput(evt, "product")}
                  />
                  <div
                    className="file-dummy"
                    style={{ marginLeft: "1rem", marginBottom: "1rem" }}
                  >
                    {/* eslint-disable-next-line */}
                    <div className="success">
                      {product.imageName && product.imageName.substring(0, 35)}
                    </div>
                    {/* eslint-disable-next-line */}
                    <div className="success">
                      {product.imageName && product.imageName.substring(35)}
                    </div>
                    <div className="default">{translate("Photo")}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="right">
            <h1>{translate("Preview")}</h1>
            <Card
              orientation="vertical"
              src={
                product.image !== ""
                  ? URL.createObjectURL(product.image)
                  : `http://localhost:3001/images${product.imageName}`
              }
              text={product.name}
              showImg={showCardImage.product}
            />
            <Button
              variant="contained"
              color="default"
              onClick={(evt) => submit(evt, "updateProduct")}
            >
              {translate("Update")}
            </Button>
          </div>
        </li>
      </ul>
    </section>
  ) : (
    <section className="admin-section">
      <h1>{translate("Wrong data, try again please.")}</h1>
    </section>
  );
};

export default Admin;
