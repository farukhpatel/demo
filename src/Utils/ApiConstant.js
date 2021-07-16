import Config from "./config";

const API = {
  // SIGNUP LOGIN API START
  SIGNUP: Config.BASE_URL + "api/auth/signup",
  LOGIN: Config.BASE_URL + "api/auth/login",
  // SIGNUP LOGIN API END

  // DASHBOARD API START
  UNASSIGNED_ORDERS: Config.BASE_URL + "api/order/all?order_status=1",
  ASSIGNED_ORDERS: Config.BASE_URL + "api/order/all?order_status=2",
  PICKED: Config.BASE_URL + "api/order/all?order_status=3",
  DELIVERED: Config.BASE_URL + "api/order/all?order_status=4",
  TOTAL_ORDER_RECIEVED: Config.BASE_URL + "api/order/all?order_status=4",
  GET_DASHBOARD_DATA: Config.BASE_URL + "api/admin/dashboard",
  GET_SHOP_PRODUCTS: Config.BASE_URL + "api/shop/product/all",
  // DASHBOARD API START END

  USER: Config.BASE_URL + "api/user/all?role_id=3",
  DELIVERY_BOYS: Config.BASE_URL + "api/user/all?role_id=4",
  ASSIGN_DELIVERY_BOY: Config.BASE_URL + "api/order/update",
  VENDOR_API: Config.BASE_URL + "api/shop/all",
  IMAGE_UPLOAD: Config.BASE_URL + "api/image/upload",
  CREATE_USER: Config.BASE_URL + "api/user/create",
  CREATE_SHOP: Config.BASE_URL + "api/shop/create",
  CREATE_ADDRESS: Config.BASE_URL + "api/address/create",
  CREATE_PRODUCT: Config.BASE_URL + "api/product/create",
  ADD_SHOP_PRODUCT: Config.BASE_URL + "api/shop/product/create",
  PRODUCT_LIST: Config.BASE_URL + "api/product/all",
  GET_LOCALITIES: Config.BASE_URL + "api/address/locality/all?is_active=1&city_id=1",
  GET_CITIES: Config.BASE_URL + "api/address/city/all?&is_active=1&with_localities=1",
};

export default API;
