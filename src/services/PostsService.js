import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";



class PostsService {

    async getPosts() {
        const res = await api.get("api/posts");
        logger.log("get all my posts", res.data.posts);

        AppState.posts = res.data.posts

    }
    async getPostsByProfile(profileId) {
        const res = await api.get(`api/posts/?creatorId=${profileId}`);
        logger.log('Get posts by profile', res.data,)
        AppState.posts = res.data;
    }
}


export const postsService = new PostsService();