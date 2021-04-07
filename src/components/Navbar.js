import React from 'react';
// import Home from './Home';
import './SuperUser.css';

function Home() {
    return (
        <>
            {/* <input type="checkbox" id="check" />
            <label for="check">
                <i class="fas fa-bars" id="btn"></i>
                <i class="fas fa-times" id="cancel"></i>
            </label> */}
            <div class="sidebar">
                <div className="headerText">
                    <h1>Bandhify</h1>
                </div>
                <ul>
                    <li><a href="/" style={{ borderTopWidth: '1px', borderTopColor: '#fff', borderTopStyle: 'solid' }}><i class="fas fa-home"></i>Home</a></li>
                    <li><a href="/user"><i class="far fa-user"></i>User</a></li>
                    <li><a href="/vendor"><i class="fas fa-link"></i>Vendor</a></li>
                    <li><a href="/salesreport"><i class="far fa-address-book"></i>Sales Report</a></li>
                </ul>
            </div>

        </>
    );
}
export default Home;