import axios from "axios";

const API_URL = "http://localhost:8000"

class Applicability {
    getApplicability(brand_no) {
        const URL = `${API_URL}/api/v1/vehicles/20772/`;
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

export default Applicability;




