import axios from "axios";

const API_URL =  "http://localhost:8000"

class ApiService {
    getArticles(){
        const URL = `${API_URL}/api/v1/article/`;
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