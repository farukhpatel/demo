import Config from "./config";

const API = {
  // SIGNUP LOGIN API START
  SIGNUP: Config.BASE_URL + "api/auth/signup",
  LOGIN: Config.BASE_URL + "api/auth/login",
  // SIGNUP LOGIN API END

  // DASHBOARD API START
  UNASSIGNED_ORDERS:
    Config.BASE_URL + "api/order/all?order_status=1&is_active_subscription=1",
  ORDER_DETAIL: Config.BASE_URL + "api/order/all?order_id=",

  ASSIGNED_ORDERS:
    Config.BASE_URL + "api/order/all?order_status=2&is_active_subscription=1",
  PICKED:
    Config.BASE_URL + "api/order/all?order_status=3&is_active_subscription=1",
  DELIVERED:
    Config.BASE_URL + "api/order/all?order_status=4&is_active_subscription=1",
  TOTAL_ORDER_RECIEVED: Config.BASE_URL + "api/order/all?order_status=4",
  VENDOR_TOTAL_ORDER: Config.BASE_URL + "api/order/all",
  DELIVERYBOY_ORDER_DETAIL:
    Config.BASE_URL + "api/order/track-deliveries?user_id=",
  GET_DASHBOARD_DATA: Config.BASE_URL + "api/admin/dashboard?",
  GET_SETTING_TAX: Config.BASE_URL + "api/admin/get-tax",
  GET_SETTING_DELIVERY_CHARGE:
    Config.BASE_URL + "api/admin/get-delivery-charge",
  GET_SETTING_DELIVERY_SLOTS: Config.BASE_URL + "api/admin/get-delivery-slots",
  SETTING_DELIVERY_SLOTS: Config.BASE_URL + "api/admin/set-delivery-slots",
  SETTING_DELIVERY_CHARGE: Config.BASE_URL + "api/admin/set-delivery-charge",
  SETTING_BANNER_IMG: Config.BASE_URL + "api/admin/set-banner",
  GET_BANNER_IMG: Config.BASE_URL + "api/admin/get-banner",
  SETTING_TAX: Config.BASE_URL + "api/admin/set-tax",
  GET_SHOP_PRODUCTS: Config.BASE_URL + "api/shop/product/all",
  GET_REVIEWS: Config.BASE_URL + "api/review/all",
  DELETE_REVIEWS: Config.BASE_URL + "api/review/delete",
  UPDATE_REVIEW: Config.BASE_URL + "api/review/update",
  GET_COUPONS: Config.BASE_URL + "api/coupon/all?coupon_types=1",
  POST_COUPONS_CREATE: Config.BASE_URL + "api/coupon/create",
  DELETE_COUPONS: Config.BASE_URL + "api/coupon/delete",
  UPDATE_COUPON: Config.BASE_URL + "api/coupon/update",
  // DASHBOARD API START END

  USER: Config.BASE_URL + "api/user/all?role_id=3&with_address=true",
  USER_UPDATE: Config.BASE_URL + "api/user/update/",
  USER_BY_ID: Config.BASE_URL + "api/user/all?role_id=3",
  USER_REPORT_DOWNLOAD: Config.BASE_URL + "api/user/report",
  DELIVERY_BOYS: Config.BASE_URL + "api/user/all?role_id=4",
  SEARCH_DELIVERY_BOYS: Config.BASE_URL + "api/user/all?role_id=4&is_active=1",
  DELIVERY_BOYS_ADD: Config.BASE_URL + "api/user/create",
  DELIVERY_BOYS_UPDATE: Config.BASE_URL + "api/user/update",
  DELIVERY_BOYS_DELETE: Config.BASE_URL + "api/user/delete",
  DELIVERY_BOYS_ENABLE: Config.BASE_URL + "api/user/delivery-boy/update",
  ASSIGN_DELIVERY_BOY: Config.BASE_URL + "api/order/update",
  VENDOR_API: Config.BASE_URL + "api/shop/all",
  SHOP_REPORT_DOWNLOAD: Config.BASE_URL + "api/shop/report",
  VENDOR_SEARCH: Config.BASE_URL + "api/shop/active",
  VENDOR_UPDATE: Config.BASE_URL + "api/shop/update",
  VENDOR_DELETE: Config.BASE_URL + "api/shop/delete",
  IMAGE_UPLOAD: Config.BASE_URL + "api/image/upload",
  CREATE_USER: Config.BASE_URL + "api/user/create",
  CREATE_SHOP: Config.BASE_URL + "api/shop/create",
  CREATE_ADDRESS: Config.BASE_URL + "api/address/create",
  UPDATE_SHOP_ADDRESS: Config.BASE_URL + "api/address/update",
  CREATE_PRODUCT: Config.BASE_URL + "api/product/create",
  ADD_SHOP_PRODUCT: Config.BASE_URL + "api/shop/product/create",
  DELETE_SHOP_PRODUCT: Config.BASE_URL + "api/shop/product/delete",
  UPDATE_SHOP_PRODUCT: Config.BASE_URL + "api/shop/product/update",
  UPDATE_PRODUCT: Config.BASE_URL + "api/product/update",
  PRODUCT_LIST: Config.BASE_URL + "api/product/all",
  DELETE_PRODUCT: Config.BASE_URL + "api/product/delete",
  GET_LOCALITIES:
    Config.BASE_URL + "api/address/locality/all?is_active=1&city_id=1",
  GET_LOCALITIES_BY_CITY_ID:
    Config.BASE_URL + "api/address/locality/all?is_active=1",
  GET_LOCALITIES_ALL:
    Config.BASE_URL + "api/address/locality/all?is_active=1",
  GET_CITIES:
    Config.BASE_URL + "api/address/city/all?&is_active=1&with_localities=1",
  GET_CITIES_SEARCH: Config.BASE_URL + "api/address/city/all",
  CREATE_CITIES: Config.BASE_URL + "api/address/city/create",
  UPDATE_CITIES: Config.BASE_URL + "api/address/city/update",
  DELETE_CITIES: Config.BASE_URL + "api/address/city/delete",
  //locality
  GET_LOCALITY: Config.BASE_URL + "api/address/locality/all?is_active=1",
  GET_LOCALITY_SEARCH: Config.BASE_URL + "api/address/locality/all",
  POST_LOCALITY: Config.BASE_URL + "api/address/locality/create",
  PATCH_LOCALITY: Config.BASE_URL + "api/address/locality/update",
  DELETE_LOCALITY: Config.BASE_URL + "api/address/locality/delete",
  //payment api/order/sales?
  GET_TOTAL_ORDER: Config.BASE_URL + "api/order/all",
  GET_ORDER_SALES: Config.BASE_URL + "api/order/sales?",
  GET_ALL_SHOP: Config.BASE_URL + "api/shop/all",
  PATCH_ORDER_SETTLE: Config.BASE_URL + "api/order/settle",

  //notification
  GET_ALL_NOTIFICATIONS: Config.BASE_URL + "api/user/notifications/all",

  //Report download
  DOWNLOAD_SALES_REPORT: Config.BASE_URL + "api/order/sales-report",
  DOWNLOAD_SETTLEMENT_REPORT: Config.BASE_URL + "api/order/settlement-report",

  //seller wise & data wise
  SELLER_WISE: Config.BASE_URL + "api/order/sales/seller-wise",
  DATA_WISE: Config.BASE_URL + "api/order/sales/date-wise",

  //Refund api
  REFUND_API: Config.BASE_URL + "api/order/refund",
};

export default API;
