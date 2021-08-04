import { Link } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Popup from 'reactjs-popup';
import API from '../../Utils/ApiConstant';
import instance from '../../Utils/axiosConstants';

function Locality() {
  const [local, setLocal] = useState([])

  useEffect(() => {
    instance.get(API.GET_LOCALITY).then(response => setLocal(response.localities))
  }, [])
  const routerHistroy = useHistory();
  const update = (props) => {
    routerHistroy.push(`updateLocality/${props.id}`, props)
  }
  const deleteCity = (id) => {
    instance.delete(`${API.DELETE_LOCALITY}/${id}`).then((res) => {
      toast.success(res.message);
      window.location.reload();
    })
  }
  return (
    <>
      <div className="main-outer-div">
        <div className="add-vendor">
          <a href="/addLocalities">
            <button className="btn btn-primary" btn btn-primary>
              Add Locality
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
                      <th scope="col">S.No</th>
                      <th scope="col">City Id</th>
                      <th scope="col">Locality</th>
                      <th scope="col">Code</th>
                      <th scope="col">Is active</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {local.map((locality, index) => {
                      return (
                        <tr align="center" key={index}>

                          <th scope="row">{index + 1}</th>
                          <td scope="row">{locality.city_id}</td>
                          <td>{locality.locality}</td>
                          <td>{locality.code}</td>
                          <td><i className={`fas fa-${locality?.is_active ? 'check' : 'times'}-circle`}></i></td>

                          <td>
                            <button
                              className="btn btn-link-light "
                              onClick={() => update(locality)}
                            >
                              <i class="fas fa-user-edit"></i>
                            </button>
                            {/* <button className="btn btn-link-light"
                              onClick={() => { deleteCity(locality.id) }}
                            >
                              <i class="fas fa-trash-alt"></i>
                            </button> */}

                            <Popup
                              className="my-popup"

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
                                      deleteCity(locality.id);
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
                      )
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
}

export default Locality;