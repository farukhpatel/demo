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
  SETTING_DELIVERY_SLOTS: Config.BASE_URL + "api/admin/set-delivery-slots",
  SETTING_DELIVERY_CHARGE: Config.BASE_URL + "api/admin/set-delivery-charge",
  SETTING_BANNER_IMG: Config.BASE_URL + "api/admin/set-banner",
  SETTING_TAX: Config.BASE_URL + "api/admin/set-order-tax",
  GET_SHOP_PRODUCTS: Config.BASE_URL + "api/shop/product/all",
  GET_REVIEWS: Config.BASE_URL + "api/review/all",
  UPDATE_REVIEW: Config.BASE_URL + "api/review/update",
  GET_COUPONS: Config.BASE_URL + "api/coupon/all",
  UPDATE_COUPON: Config.BASE_URL + "api/coupon/update",
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
  UPDATE_SHOP_PRODUCT: Config.BASE_URL + "api/shop/product/update",
  PRODUCT_LIST: Config.BASE_URL + "api/product/all",
  GET_LOCALITIES: Config.BASE_URL + "api/address/locality/all?is_active=1&city_id=1",
  GET_CITIES: Config.BASE_URL + "api/address/city/all?&is_active=1&with_localities=1",
};

export default API;
