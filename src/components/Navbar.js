import React from 'react';
import './SuperUser.css';
import cookie from "react-cookies";

function Home() {

    const signout = next => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            cookie.remove("Authorization")
        }
    };
    
    return (
        <>
            <div class="sidebar">
                <div className="headerText">
                    <h1>Bandhify</h1>
                </div>
                <ul>
                    <li><a href="/dashboard" style={{ borderTopWidth: '1px', borderTopColor: '#fff', borderTopStyle: 'solid' }}><i class="fas fa-home"></i>Home</a></li>
                    <li><a href="/user"><i class="far fa-user"></i>User</a></li>
                    <li><a href="/vendor"><i class="fas fa-link"></i>Vendor</a></li>
                    <li><a href="/salesreport"><i class="far fa-address-book"></i>Sales Report</a></li>
                    <li><a href="/productlist"><i class="far fa-file-alt"></i>Product List</a></li>
                    <li><a href="/deliverymanage"><i class="fas fa-tasks"></i>Delivery Management</a></li>
                    <li><a href="/paymentsettle"><i class="far fa-money-bill-alt"></i>Payment Settlement</a></li>
                    <li><a href="/banner"><i class="far fa-clone"></i>Banner</a></li>
                    <li><a href="/coupon"><i class="fas fa-tags"></i>Coupon</a></li>
                    <li><a href="/review"><i class="far fa-comment-dots"></i>Review</a></li>
                    <li><a href="/settings"><i class="fas fa-cogs"></i>Settings</a></li>
                    <li><a href="/city"><i class="fas fa-city"></i>City</a></li>
                    <li><a href="/locality"><i class="fas fa-location-arrow"></i>Locality</a></li>
                    <li onClick={signout}><a href="/login"><i class="fas fa-sign-out-alt"></i>Logout</a></li>
                </ul>
            </div>
        </>
    );
    }
    
export default Home;