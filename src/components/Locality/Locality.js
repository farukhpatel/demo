import { Link } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../../Utils/ApiConstant';
import instance from '../../Utils/axiosConstants';

function Locality() {
    const [local, setLocal] = useState([])

    useEffect(() => {
        instance.get(API.GET_LOCALITY).then(response => setLocal(response.localities))
    },[])
    const routerHistroy =useHistory();
    const update=(props)=>{
      console.log(props);
      routerHistroy.push(`updateLocality/${props.city_id}`,props)
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
                          <th scope="col">Id</th>
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

                                    <td scope="row">{locality.id}</td>
                                    <td scope="row">{locality.city_id}</td>
                                    <td>{locality.locality}</td>
                                    <td>{locality.code}</td>
                                    <td><i className={`fas fa-${ locality?.is_active ? 'check' : 'times' }-circle`}></i></td>
                                   
                            <td>
                            <button
                              className="btn btn-link-light "
                              onClick={() => update(locality)}
                            >
                              <i class="fas fa-user-edit"></i>
                            </button>
                            <button className="btn btn-link-light"
                                     onClick={()=>{deleteCity(locality.id)}}
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

export default Locality;