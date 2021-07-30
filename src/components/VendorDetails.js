/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
//for Api
import API from "../Utils/ApiConstant";
import Popup from "reactjs-popup";
import AddProductModal from "../Modal/AddProduct";
import EditProductModal from "../Modal/EditProduct";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import instance from "../Utils/axiosConstants";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "theme.palette.background.paper",
  },
}));

function VendorDetails(props) {
  console.log(props);
  const vendorDetails = props?.location?.state?.vendor || {};
  const [products, setProducts] = useState({});

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    instance
      .get(
        `${API.GET_SHOP_PRODUCTS}?shop_id=${vendorDetails?.id}&selling_products=true&non_selling_products=true`
      )
      .then(function (response) {
        setProducts(response?.products);
      });
  }, []);
  return (
    <>
      <div className="main-outer-div">
        <div className="myorders-outer-div">
          <div className="myorders-inner-div details-outer-div">
            <div className="details-div">
              <div className="details-div-left">
                <i class="fas fa-store fa-3x" style={{ color: "#575353" }}></i>
                <div className="details-content">
                  <h2>{vendorDetails?.shop_name}</h2>
                  <p>{vendorDetails?.shop_description}</p>
                  <h5>
                    Founding Date:
                    <span
                      style={{
                        marginLeft: "2%",
                        fontWeight: "normal",
                        color: "#7c7c7c",
                      }}
                    >
                      {vendorDetails?.shop_founding_date}
                    </span>
                  </h5>

                  <h5>
                    Owner:
                    <span
                      style={{
                        marginLeft: "2%",
                        fontWeight: "normal",
                        color: "#7c7c7c",
                      }}
                    >
                      {vendorDetails?.shop_owner?.name}
                    </span>
                  </h5>

                  <h5>
                    Phone:
                    <span
                      style={{
                        marginLeft: "2%",
                        fontWeight: "normal",
                        color: "#7c7c7c",
                      }}
                    >
                      {vendorDetails?.shop_phone}
                    </span>
                  </h5>

                  <h5>
                    Licence No:
                    <span
                      style={{
                        marginLeft: "2%",
                        fontWeight: "normal",
                        color: "#7c7c7c",
                      }}
                    >
                      {vendorDetails?.shop_license_number}
                    </span>
                  </h5>

                  <h5>
                    Shop Status:
                    <button className="assign-btn">
                      {vendorDetails?.is_shop_active ? "Active" : " InActive"}
                    </button>
                  </h5>
                </div>
              </div>
            </div>

            <div className={classes.root}>
              <AppBar position="static" style={{ backgroundColor: "#3b1f47" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="simple tabs example"
                >
                  <Tab label="Non-Selling Products" {...a11yProps(0)} />
                  <Tab label="Selling Products" {...a11yProps(1)} />
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                <div
                  class="tab-pane fade show active"
                  id="ordersdetails"
                  role="tabpanel"
                  aria-labelledby="orders-details"
                >
                  <table class="table table-striped">
                    <thead>
                      <tr align="center">
                        <th scope="col">S.No</th>
                        <th scope="col">Item Name</th>
                        <th scope="col">Product Image</th>
                        <th scope="col">Base Unit</th>
                        <th scope="col">Commission</th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {products?.nonselling_products?.length > 0 &&
                        products?.nonselling_products?.map((value, index) => {
                          return (
                            <tr align="center">
                              <th scope="row">{index + 1}</th>
                              <td>{value?.product_name}</td>
                              <td>
                                <img
                                  src={value?.product_image}
                                  height="50"
                                  alt="product_image"
                                />
                              </td>
                              <td>{value?.base_unit}</td>
                              <td>
                                {value?.commission}
                                {value?.is_percentage_commission === 1 && "%"}
                              </td>
                              <Popup
                                trigger={
                                  <td style={{ cursor: "pointer" }}>
                                    <button>Add Product</button>
                                  </td>
                                }
                                position="right center"
                                modal
                              >
                                <AddProductModal
                                  shopId={vendorDetails?.id}
                                  productId={value?.id}
                                />
                              </Popup>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <div
                  class="tab-pane fade show active"
                  id="ordersdetails"
                  role="tabpanel"
                  aria-labelledby="orders-details"
                >
                  <table class="table table-striped">
                    <thead>
                      <tr align="center">
                        <th scope="col">S.No</th>
                        <th scope="col">Item Name</th>
                        <th scope="col">Original Price</th>
                        <th scope="col">Product Price</th>
                        <th scope="col">Product Daily Stock</th>
                        <th scope="col">Product Daily Stock Remaining</th>
                        <th scope="col">Base Unit</th>
                        <th scope="col">Commission</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products?.selling_products?.length > 0 &&
                        products?.selling_products?.map((value, index) => {
                          return (
                            <tr align="center">
                              <th scope="row">{index + 1}</th>
                              <td>{value?.product?.product_name}</td>
                              <td>₹{value?.original_price}</td>
                              <td>₹{value?.product_price}</td>
                              <td>{value?.product_daily_stock}</td>
                              <td>{value?.product_daily_stock_remaining}</td>
                              <td>{value?.product?.base_unit}</td>
                              <td>
                                {value?.product?.commission}
                                {value?.product?.is_percentage_commission ===
                                  1 && "%"}
                              </td>
                              
                              <Popup
                                trigger={
                                  <tr>
                                  <td style={{ cursor: "pointer" }}>
                                    <button>Edit Product</button>
                                  </td>
                                  <td style={{ cursor: "pointer" }}>
                                    <button>Delete Product</button>
                                  </td>
                                  </tr>
                                }
                                position="right center"
                                modal
                              >
                                
                                <EditProductModal
                                  shopId={vendorDetails?.id}
                                  productDetails={value}
                                  productId={value?.id}
                                />
                              </Popup>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </TabPanel>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default VendorDetails;
