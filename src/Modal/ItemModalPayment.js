import React from 'react'
import '../components/SuperUser.css'

function ItemModalPayment() {
    return (
        <>
            <div className="main-outer-div Modal">
                <div className="myorders-outer-div">
                    <div className="myorders-inner-div paymentsettle-inner-div">

                        <ul class="nav nav-tabs" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="item-details" data-bs-toggle="tab" data-bs-target="#itemdetails" type="button" role="tab" aria-controls="item-details" aria-selected="true">Item Details</button>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active " id="itemdetails" role="tabpanel" aria-labelledby="item-details">
                                <div className="customer-details-content-outer-div">
                                    <div className="customer-details-content-outer-div-top no-box-shadow">
                                        <div className="customer-details-content">
                                            <div className="content"><h4>Item</h4></div>
                                            <div className="content"><p>Milk</p></div>
                                        </div>
                                        <div className="customer-details-content">
                                            <div className="content"><h4>Quantity</h4></div>
                                            <div className="content"><p>5</p></div>
                                        </div>
                                        <div className="customer-details-content">
                                            <div className="content"><h4>Price</h4></div>
                                            <div className="content"><p>₹20</p></div>
                                        </div>
                                        <div className="customer-details-content">
                                            <div className="content"><h4>Delivery Boy</h4></div>
                                            <div className="content"><p>Kishore</p></div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ItemModalPayment;
