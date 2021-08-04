
import { instanceOf } from "prop-types";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

//popup
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import DisableModal from "../Modal/DisableModal";
import API from "../Utils/ApiConstant";
import instance from '../Utils/axiosConstants'


const DeliveryManage = () => {
    const arr = [1, 2, 3, 4, 5, 6, 7];
    const [deliveryBoy, setDeliveryBoy] = useState([]);
    useEffect(() => {
        instance.get(API.DELIVERY_BOYS)
            .then(function (response) {
                setDeliveryBoy(response.users);
            })
    }, []);
    const routerHistroy = useHistory();
    const update = (props) => {
        routerHistroy.push(`updateDeliveryBoy/${props.id}`, props)
    }
    const Disable = (value) => {
        let body = {
            is_active: value?.delivery_boy?.is_active === 1 ? 0 : 1
        }
        instance.patch(`${API.DELIVERY_BOYS_ENABLE}/${value.id}`, body).then((res) => {
            toast.success(res.message);
            window.location.href = "/deliverymanage"
        })

    }
    const handleDelete = (id) => {
        instance.delete(`${API.DELIVERY_BOYS_DELETE}/${id}`)
            .then(function (response) {
                toast.success(response.message);
                window.location.href = "/deliverymanage"
            })
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

                                            <th scope="col">Disable</th>

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


                                                    <td style={{ cursor: "pointer" }}>
                                                        <button onClick={() => Disable(value)}> {value?.delivery_boy?.is_active === 1 ? 'Disable' : 'Enable'}</button>
                                                    </td>


                                                    <td>
                                                        <button
                                                            className="btn btn-link-light "
                                                            onClick={() => { update(value) }}
                                                        >
                                                            <i class="fas fa-edit"></i>
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
                                                                        Are you Sure you want to Delete this review?
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
