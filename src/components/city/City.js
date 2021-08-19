import { Link } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Popup from "reactjs-popup";
import API from "../../Utils/ApiConstant";
import instance from "../../Utils/axiosConstants";

function City() {
  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    instance.get(API.GET_CITIES).then((response) => setCities(response.cities));
  }, []);
  const routerHistroy = useHistory();
  const update = (props) => {
    routerHistroy.push(`updateCity/${props.id}`, props);
  };
  const handleDelete = (id) => {
    instance.delete(`${API.DELETE_CITIES}/${id}`).then(function (response) {
      toast.success(response.message);
      window.location.reload();
    });
  };
  const SearchCity = (e) => {
    e.preventDefault();
    instance
      .get(`${API.GET_CITIES_SEARCH}?city_name=${search}`)
      .then(function (response) {
        if (response.cities?.length > 0) {
          toast.success(response.message);
          setCities(response.cities);
          setSearch("");
        } else {
          toast.error("City not found");
        }
      });
  };

  return (
    <>
      <div className="main-outer-div">
        <div className="add-vendor">
          <a href="/addcity">
            <button className="btn btn-primary" btn btn-primary>
              Add City
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
                        SearchCity(e);
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
                        <th scope="col">S No.</th>
                        <th scope="col">City Name</th>
                        <th scope="col">City Code</th>
                        <th scope="col">Is Active</th>
                        <th scope="col">Localities Count</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cities.map((city, index) => {
                        return (
                          <tr align="center" key={index}>
                            <th scope="row">{index + 1}</th>

                            <td>
                              <Link
                                to={{
                                  pathname: "/vendordetails",
                                  state: { vendor: city },
                                }}
                                style={{ color: "#0dcaf0" }}
                              >
                                <p style={{ fontWeight: "bold " }}>
                                  {city?.city}
                                </p>
                              </Link>
                            </td>
                            <td>{city?.code}</td>
                            <td>
                              <i
                                className={`fas fa-${
                                  city?.is_active ? "check" : "times"
                                }-circle`}
                              ></i>
                            </td>
                            <td>{city?.localities?.length}</td>
                            <td>
                              <button
                                className="btn btn-link-light "
                                onClick={() => update(city)}
                              >
                                <i class="fas fa-user-edit"></i>
                              </button>

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
                                      Are you Sure you want to Delete this
                                      review?
                                    </h6>
                                    <button
                                      className="btn btn-primary"
                                      onClick={() => {
                                        handleDelete(city.id);
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

export default City;
