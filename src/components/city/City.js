import { Link } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../../Utils/ApiConstant';
import instance from '../../Utils/axiosConstants';

function City() {
    const [cities, setCities] = useState([])

    useEffect(() => {
        instance.get(API.GET_CITIES).then(response => setCities(response.cities))
    },[])
    const routerHistroy =useHistory();
    const update=(props)=>{
      console.log(props);
      routerHistroy.push(`updateCity/${props.id}`,props)
    }
   const deleteCity=(props)=>{
     console.log(props);
     let bool=window.confirm("Are you sure to delete");
     if(bool){
       console.log("deleled part work");
     }
     else{
       console.log("Not deleted");
       window.location.href="/city"
     }
   }
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
                        <input placeholder="Search..." className="SearchInput" />
                      </div>
                    </div>
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
                                        style={{color:"#0dcaf0"}}
                                        >
                                        <p style={{ fontWeight: "bold " }}>
                                            {city?.city}
                                        </p>
                                        </Link>
                                    </td>
                                    <td>{city?.code}</td>
                                    <td><i className={`fas fa-${ city?.is_active ? 'check' : 'times' }-circle`}></i></td>
                                    <td>{city?.localities?.length}</td>
                                    <td>
                            <button
                              className="btn btn-link-light "
                              onClick={() => update(city)}
                            >
                              <i class="fas fa-user-edit"></i>
                            </button>
                            <button className="btn btn-link-light"
                                     onClick={()=>{deleteCity(city.id)}}
                            >
                              <i class="fas fa-trash-alt"></i>
                            </button>
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

export default City