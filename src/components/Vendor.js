import React, { useState, useEffect } from "react";
import API from "../Utils/ApiConstant";
import { Link, Router, useHistory } from "react-router-dom";
import "./SuperUser.css";
import instance from "../Utils/axiosConstants";
import { Modal } from "@material-ui/core";

function Vendor() {
  const arr = [1, 2, 3, 4, 5, 6, 7];
  const routerHistroy =useHistory();
  const [vendors, setVendors] = useState([]);
  const [open, setOpen] = useState(false);

  const update = (prop) => {
    routerHistroy.push("/updatevendor",prop)
  };
  const closeModal = () => setOpen(true);

  useEffect(() => {
    instance.get(API.VENDOR_API).then(function (response) {
      setVendors(response.shop);
    });
  }, []);
  
  return (
    <>
      <div className="main-outer-div">
        <div className="add-vendor">
          <a href="/addvendor">
            <button className="btn btn-primary" btn btn-primary>
              Add Vendor
            </button>
          </a>
        </div>
        <div className="myorders-outer-div">
          <div className="myorders-inner-div vendor-inner-div">
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade show active "
                id="currentorders"
                role="tabpanel"
                aria-labelledby="current-orders"
              >
                <div className="btn-position">
                  <div className="searchStyle">
                    <i class="fa fa-search" aria-hidden="true"></i>
                    <input placeholder="Search..." className="SearchInput" />
                  </div>
                </div>
                <table class="table table-striped">
                  <thead>
                    <tr align="center">
                      <th scope="col">S No.</th>
                      <th scope="col">Owner Name</th>
                      <th scope="col">Dairy Name</th>
                      <th scope="col">Dairy Address</th>
                      <th scope="col">Status</th>
                      <th scope="col">Shop Founding Date</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendors.map((value, index) => {
                      
                      return (
                        <tr align="center" key={index}>
                          <th scope="row">{index + 1}</th>

                          <td>
                            <Link
                              to={{
                                pathname: "/vendordetails",
                                state: { vendor: value },
                              }}
                              style={{ color: "#0dcaf0" }}
                            >
                              <p style={{ fontWeight: "bold " }}>
                                {value?.shop_owner?.name}
                              </p>
                            </Link>
                          </td>
                          <td>
                            <p style={{ fontWeight: "bold " }}>
                              {value?.shop_name}
                            </p>
                          </td>
                          <td>address</td>
                          <td>{value?.shop_approval}</td>
                          <td>{value?.shop_founding_date}</td>
                          <td>
                            <button
                              className="btn btn-link-light "
                              onClick={() => update(value)}
                            >
                              <i class="fas fa-user-edit"></i>
                            </button>
                            <button className="btn btn-link-light">
                              <i class="fas fa-trash-alt"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div
                class="tab-pane fade"
                id="previousorders"
                role="tabpanel"
                aria-labelledby="previous-orders"
              >
                <div className="btn-position">
                  <div className="searchStyle">
                    <i className="fa fa-search" aria-hidden="true"></i>
                    <input placeholder="Search..." className="SearchInput" />
                  </div>
                  <button>New Sales Order</button>
                </div>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Order Id</th>
                      <th scope="col">Company Name</th>
                      <th scope="col">Status</th>
                      <th scope="col">Total</th>
                      <th scope="col">Created On</th>
                      <th scope="col">Last Updated</th>
                    </tr>
                  </thead>

                  <tbody>
                    {arr.map((value, index) => {
                      return (
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>Shubham Kumar</td>
                          <td>
                            <p style={{ fontWeight: "bold" }}>
                              Panchamrat Dairy
                            </p>
                          </td>
                          <td>302BF 27 Sica School Road</td>
                          <td style={{ color: "red" }}>Offline</td>
                          <td>
                            <button>Disabled</button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={{transform:`translate(-50% -50%)`,backgroundColor:"white"}}>
        </div>
      </Modal>
    </>
  );
}

export default Vendor;
