import Config from "./config";

const API = {
  // SIGNUP LOGIN API START
  SIGNUP: Config.BASE_URL + "api/auth/signup",
  LOGIN: Config.BASE_URL + "api/auth/login",
  // SIGNUP LOGIN API END

  // DASHBOARD API START
  ASSIGNED_ORDERS: Config.BASE_URL + "api/order/all?order_status=1",
  OUT_FOR_DELIVERY: Config.BASE_URL + "api/order/all?order_status=1",
  NOT_PICKED: Config.BASE_URL + "api/order/all?order_status=1",
  TOTAL_ORDER_RECIEVED: Config.BASE_URL + "api/order/all?order_status=4",
  UNASSIGNED_ORDERS: Config.BASE_URL + "api/order/all?order_status=1",
  // DASHBOARD API START END

  USER: Config.BASE_URL + "api/user/all?role_id=3",
  VENDOR_API: Config.BASE_URL + "api/shop/all",
  IMAGE_UPLOAD: Config.BASE_URL + "api/image/upload",
  CREATE_USER: Config.BASE_URL + "api/user/create",
  CREATE_SHOP: Config.BASE_URL + "api/shop/create",
  PRODUCT_LIST: Config.BASE_URL + "api/product/all",
};

export default API;
