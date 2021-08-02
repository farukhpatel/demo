import React, { useState, useEffect } from "react";
import API from "../Utils/ApiConstant";
import instance from "../Utils/axiosConstants"
import {useHistory} from 'react-router-dom';
import Popup from "reactjs-popup";
import { toast } from "react-toastify";

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
  const handleDelete=(id)=>{
    instance.delete(`${API.DELETE_PRODUCT}/${id}`)
    .then(function(response){
       toast.success(response.message);
       window.location.href="/productlist"
    })
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
                  <thead style={{textAlign:'center'}}>
                    <tr>
                      <th scope="col">S.No</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Product Image</th>
                      <th scope="col">Base Unit</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody style={{textAlign:'center'}}>
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
                    { productList?.length > 0 ? productList.map((value, index) => {
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
                              <i class="fas fa-edit"></i>
                            </button>
                            
                            <Popup
                          className="my-popup"
                          trigger={
                            <button className="btn btn-link-light">
                              <i class="fas fa-trash-alt">
                              </i>
                            </button>
                          }
                          position="right center"
                          modal
                        >
                           {(close) => (
                            <div className="ReviewSure-text">
                              <h6
                                style={{
                                  marginBottom: "1rem",
                                  marginTop: "2rem",
                                }}
                              >
                                Are you Sure you want to Delete this?
                              </h6>
                              <button
                                className="btn btn-primary"
                                onClick={() => {
                                  handleDelete(value.id);
                                  close();
                                }}
                              >
                                Yes
                              </button>
                              <button
                                className="btn btn-primary"
                                  onClick={() => {
                                    close();
                                  }}
                              >
                                No
                              </button>
                            </div>
                          )}
                        </Popup>
                            
                          </td>
                        </tr>
                      );
                    }) :  <> <tr> <td colSpan="5" > <h2> No record found </h2> </td> </tr>  </>}
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
