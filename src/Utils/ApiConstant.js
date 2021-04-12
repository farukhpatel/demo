import Config from './config'

const API = {
    VENDOR_API: Config.BASE_URL + 'api/shop/all',
    SIGNUP: Config.BASE_URL + 'api/auth/signup',
    LOGIN: Config.BASE_URL + 'api/auth.login',
    IMAGE_UPLOAD: Config.BASE_URL + 'api/image/upload'
}

export default API