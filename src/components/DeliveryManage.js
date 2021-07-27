
import { instanceOf } from "prop-types";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

//popup
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import DisableModal from "../Modal/DisableModal";
import API from "../Utils/ApiConstant";
import instance from '../Utils/axiosConstants'

// const PopupExample = () => (
//     <Popup trigger={<button> Trigger</button>} position="right center">
//         <div>Popup content here !!</div>
//     </Popup>
// );
const DeliveryManage = () => {
    const arr = [1, 2, 3, 4, 5, 6, 7];
    const [deliveryBoy, setDeliveryBoy] = useState([]);
    useEffect(() => {
        instance.get(API.DELIVERY_BOYS)
            .then(function (response) {
                console.log(response.users);
                setDeliveryBoy(response.users);
            })
    }, []);
    const routerHistroy=useHistory();
    const update=(props)=>{
        routerHistroy.push(`updateDeliveryBoy/${props.id}`,props)
    }

    return (
        <>
            {/* <PopupExample /> */}
            <div className="main-outer-div">
                <div className="add-delivery-boy">
                    <a href="/adddeliveryboy">
                        <button className="btn btn-primary">Add Delivery Boy</button>
                    </a>
                </div>
                <div className="myorders-outer-div">
                    <div className="myorders-inner-div deliveryboy-inner-div">
                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button
                                    class="nav-link active"
                                    id="deliveryboy-list"
                                    data-bs-toggle="tab"
                                    data-bs-target="#deliveryboylist"
                                    type="button"
                                    role="tab"
                                    aria-controls="deliveryboy-list"
                                    aria-selected="true"
                                >
                                    Delivery Boy Details
                                </button>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div
                                class="tab-pane fade show active "
                                id="deliveryboylist"
                                role="tabpanel"
                                aria-labelledby="deliveryboy-list"
                            >
                                <div className="btn-position">
                                    <div className="searchStyle">
                                        <i class="fa fa-search" aria-hidden="true"></i>
                                        <input placeholder="Search..." className="SearchInput" />
                                    </div>
                                </div>
                                <table class="table table-striped">
                                    <thead style={{ textAlign: 'center' }}>
                                        <tr>
                                            <th scope="col">S.No</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Phone</th>
                                            <th scope="col">Available</th>
                                            <th scope="col">Disable</th>
                                            <th scope="col">Block</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody style={{ textAlign: 'center' }}>
                                        {deliveryBoy.length > 0 ? deliveryBoy.map((value, index) => {
                                            return (
                                                <tr>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{value.name}</td>
                                                    <td>{value.phone}</td>
                                                    <td>Yes</td>
                                                    <Popup
                                                        trigger={
                                                            <td style={{ cursor: "pointer" }}>
                                                                <button>Disable</button>
                                                            </td>
                                                        }
                                                        position="right center"
                                                        modal
                                                    >
                                                        <DisableModal />
                                                    </Popup>
                                                    <td>
                                                        <button>Block</button>
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn btn-link-light "
                                                            onClick={()=>{update(value)}}                         
                                                        >
                                                            <i class="fas fa-user-edit"></i>
                                                        </button>
                                                        <button className="btn btn-link-light">
                                                            <i class="fas fa-trash-alt"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        }) : <> <tr> <td colSpan="6" > <h2> No record found </h2> </td> </tr>  </>}
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

export default DeliveryManage;
