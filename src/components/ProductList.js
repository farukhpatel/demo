import React, { useState, useEffect } from "react";
import API from "../Utils/ApiConstant";
import instance from "../Utils/axiosConstants"
import {useHistory} from 'react-router-dom';

const ProductList = () => {
  const [productList, setProductList] = useState([]);
  
  useEffect(() => {
    instance.get(API.PRODUCT_LIST)
    .then(function(response){
      setProductList(response.products);
    })
  }, []);
  console.log(productList[0]);
  const routerHistroy =useHistory();
  const update=(props)=>{
    routerHistroy.push(`updateProduct/${props.id}`,props)
  }
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
                      <th scope="col">Actions</th>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
