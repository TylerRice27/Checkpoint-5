import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";



class PostsService {

    async getPosts() {
        const res = await api.get("api/posts");
        logger.log("get all my posts", res.data.posts);

        AppState.posts = res.data.posts
        AppState.nextPage = res.data.older
        AppState.previousPage = res.data.newer

    }

    async createPost(postData) {
        const res = await api.post("api/posts", postData);
        logger.log(res.data);

        AppState.posts.unshift(res.data);
    }

    async getPostsByProfile(profileId) {
        const res = await api.get(`api/posts/?creatorId=${profileId}`);
        logger.log('Get posts by profile', res.data,)
        AppState.posts = res.data.posts;
    }

    async changePage(url) {
        const res = await api.get(url)
        logger.log(res.data)
        AppState.posts = res.data.posts
        AppState.nextPage = res.data.older
        AppState.previousPage = res.data.newer
        AppState.currentPage = res.data.page
    }


    async like(postId) {
        const res = await api.post(`api/posts/${postId}/like`)
        logger.log('get a like', res.data)
    }

    // async changeProfilePage(profileId) {
    //     const res = await api.get(`api/posts/?creatorId=${profileId}`);
    //     logger.log('change page on profile', res.data)
    //     AppState.posts = res.data.posts
    //     AppState.nextPage = res.data.older
    //     AppState.previousPage = res.data.newer
    //     AppState.currentPage = res.data.page
    // }

    // this is for changing my page number
    // async previousPage(pageNumber) {
    //     const res = await api.get(`api/posts?page=${pageNumber}`)
    //     AppState.posts = res.data.posts
    //     AppState.currentPage -= 1
    //     AppState.totalPages = res.data.totalPages
    // }

    async removePost(id) {
        const res = await api.delete(`api/posts/${id}`);
        logger.log(res.data);
        AppState.posts = AppState.posts.filter((post) => post.id != id)
    }
}


export const postsService = new PostsService();