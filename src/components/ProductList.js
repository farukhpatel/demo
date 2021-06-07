import React, { useState, useEffect } from "react";
import { APICall } from "../Utils/CommonFunctions";
import API from "../Utils/ApiConstant";
const ProductList = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7];
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const tokenValue = localStorage.getItem("token");
    let object = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenValue}`,
      },
    };
    APICall(API.PRODUCT_LIST, object, (error, result) => {
      if (error) console.log(error);
      else if (result.status) {
        console.log(result);
        setProductList(result.products);
      } else {
        alert("Something went wrong");
        console.log(result);
      }
    });
  }, []);

  return (
    <>
      <div className="main-outer-div">
        <div className="add-product">
          <a href="/addproduct">
            <button className="btn btn-primary">Add Product</button>
          </a>
        </div>
        <div className="myorders-outer-div">
          <div className="myorders-inner-div productlist-inner-div">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  id="product-list"
                  data-bs-toggle="tab"
                  data-bs-target="#productlist"
                  type="button"
                  role="tab"
                  aria-controls="date-wise"
                  aria-selected="true"
                >
                  Product List
                </button>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade show active "
                id="productlist"
                role="tabpanel"
                aria-labelledby="product-list"
              >
                <div className="btn-position">
                  <div className="searchStyle">
                    <i class="fa fa-search" aria-hidden="true"></i>
                    <input placeholder="Search..." className="SearchInput" />
                  </div>
                  {/* <button>New sales Order</button> */}
                </div>
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Product Image</th>
                      <th scope="col">Base Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {
                                            arr.map((value, index) => {
                                                return (
                                                    <tr>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>Milk</td>
                                                        <td><img src="" alt="Milk"></img></td>
                                                        <td>5L</td>
                                                    </tr>
                                                )
                                            })
                                        } */}
                    {productList.map((value, index) => {
                      return (
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>{value?.product_name}</td>
                          <td>
                            <img
                              src={value?.product_image}
                              alt="Milk"
                              style={{ height: "120px", width: "120px" }}
                            />
                          </td>
                          <td>{value?.base_unit}</td>
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
    </>
  );
};

export default ProductList;
