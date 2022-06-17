import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";



class PostsService {

    async getPosts() {
        const res = await api.get("api/posts");
        logger.log("get all my posts", res.data.posts);

        AppState.posts = res.data.posts

    }

    async createPost(postData) {
        const res = await api.post("api/posts", postData);
        logger.log(res.data);

        AppState.posts.push(res.data.posts);
    }

    async getPostsByProfile(profileId) {
        const res = await api.get(`api/posts/?creatorId=${profileId}`);
        logger.log('Get posts by profile', res.data,)
        AppState.posts = res.data.posts;
    }

    async removePost(id) {
        const res = await api.delete(`api/posts/${id}`);
        logger.log(res.data);
        AppState.posts = AppState.posts.filter((post) => post.id != id)
    }
}


export const postsService = new PostsService();