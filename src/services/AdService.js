const { AppState } = require("../AppState");
const { logger } = require("../utils/Logger");
const { api } = require("./AxiosService");






class AdService {

    async getAd() {
        const res = await api.get('api/ads/')
        logger.log('get my ads from the api', res.data)
        AppState.ads = res.data
    }
}