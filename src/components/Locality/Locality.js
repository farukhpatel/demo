import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Popup from "reactjs-popup";
import API from "../../Utils/ApiConstant";
import instance from "../../Utils/axiosConstants";

function Locality() {
  const [local, setLocal] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    instance
      .get(API.GET_LOCALITY)
      .then((response) => setLocal(response.localities));
  }, []);
  const routerHistroy = useHistory();
  const update = (props) => {
    routerHistroy.push(`updateLocality/${props.id}`, props);
  };
  const deleteCity = (id) => {
    instance.delete(`${API.DELETE_LOCALITY}/${id}`).then((res) => {
      toast.success(res.message);
      window.location.reload();
    });
  };
  const searchLocality = (e) => {
    e.preventDefault();
    instance
      .get(`${API.GET_LOCALITY_SEARCH}?locality_name=${search}`)
      .then(function (response) {
        if (response.localities?.length > 0) {
          toast.success(response.message);
          setLocal(response.localities);
          setSearch("");
        } else {
          toast.error("Locality not found");
        }
      });
  };
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

                    <input
                      type="text"
                      placeholder="Search..."
                      className="SearchInput"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                      type="submit"
                      onClick={(e) => {
                        searchLocality(e);
                      }}
                    >
                      Search
                    </button>
                  </div>
                </div>
                <div className="table-responsive">
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
                            <td>{locality.city_id}</td>
                            <td>{locality.locality}</td>
                            <td>{locality.code}</td>
                            <td>
                              <i
                                className={`fas fa-${
                                  locality?.is_active ? "check" : "times"
                                }-circle`}
                              ></i>
                            </td>

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
                                trigger={
                                  <button className="btn btn-link-light">
                                    <i class="fas fa-trash-alt"></i>
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
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Locality;
