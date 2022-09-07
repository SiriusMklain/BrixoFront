import axios from "axios";

const API_URL =  "http://localhost:8000"

class ApiService {
    getArticles(pages){
        const URL = `${API_URL}/api/v1/article/?pages=${pages}`;
        return axios({
            method: "GET",
            url: URL,
            headers: {
                'content-type': 'application/json',
            },
            credentials: 'include',
        }).then((response) => response.data);
    }

    getArticlesFiltersBrand(pk){
        const URL = `${API_URL}/api/v1/article/brand_filter/${pk}/`;
        return axios({
            method: "GET",
            url: URL,
            headers: {
                'content-type': 'application/json',
            },
            credentials: 'include',
        }).then((response) => response.data);
    }

    getArticlesByURL(link, direction, pages ){
        const URL = `${API_URL}${link}&direction=${direction}&pages=${pages}`;
        return axios({
            method: "GET",
            url: URL,
            headers: {
                'content-type': 'application/json',
            },
            credentials: 'include',
        }).then((response) => response.data);
    }

    editArticle(pk){
        const URL = `${API_URL}/api/v1/article/${pk}/`;
        return axios({
            method: "GET",
            url: URL,
            headers: {
                'content-type': 'application/json',
            },
            credentials: 'include',
        }).then((response) => response.data);
    }
}

export default ApiService;