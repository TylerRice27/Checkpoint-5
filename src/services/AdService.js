import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";






class AdService {

    async getAd() {
        const res = await api.get("api/ads")
        logger.log('get my ads from the api', res.data)
        AppState.ads = res.data
    }
}


export const adService = new AdService()