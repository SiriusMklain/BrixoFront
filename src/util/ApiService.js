import axios from "axios";

const API_URL = "http://localhost:8000"

class ApiService {
    getArticles(brand_no, chunk, next, prev, page_from, page_to) {
        const URL = `${API_URL}/api/v1/article/?brand_no=${brand_no}&chunk=${chunk}&next=${next}&prev=${prev}&page_from=${page_from}&page_to=${page_to}`;
        return axios({
            method: "GET",
            url: URL,
            headers: {
                'content-type': 'application/json',
            },
            credentials: 'include',
        }).then((response) => response.data);
    }

    createArticle() {
        const URL = `${API_URL}/api/v1/article/`;
        return axios({
            method: "POST",
            url: URL,
            headers: {
                'content-type': 'application/json',
            },
            credentials: 'include',
        }).then((response) => response.data);
    }

    getArticlesBrand() {
        const URL = `${API_URL}/api/v1/article/brand_filter/`;
        return axios({
            method: "GET",
            url: URL,
            headers: {
                'content-type': 'application/json',
            },
            credentials: 'include',
        }).then((response) => response.data);
    }

    getArticlesFiltersBrand(brand, chunk) {
        const URL = `${API_URL}/api/v1/article/brand_filter/?brand=${brand}&chunk=${chunk}`;
        return axios({
            method: "PUT",
            url: URL,
            headers: {
                'content-type': 'application/json',
            },
            credentials: 'include',
        }).then((response) => response.data);
    }

    getArticlesByURL(link, direction, brand_no, chunk, page_from, page_to) {
        const URL = `${API_URL}${link}&direction=${direction}&brand_no=${brand_no}&chunk=${chunk}&page_from=${page_from}&page_to=${page_to}`;
        return axios({
            method: "GET",
            url: URL,
            headers: {
                'content-type': 'application/json',
            },
            credentials: 'include',
        }).then((response) => response.data);
    }

    editArticle(pk) {
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

    updateArticle(pk, art_no, brand, countries, trades, quant_unit, quant_per_unit,
                  art_stat, status_dat, gtin, gen_art_no, supers) {
        const URL = `${API_URL}/api/v1/article/${pk}/`;
        const data = JSON.stringify(
            {
                "art_no": art_no,
                "brand_no_id": {"name": brand},
                "gen_art_no": gen_art_no,
                "gtin": gtin,
                "quant_unit": quant_unit,
                "quant_per_unit": quant_per_unit,
                "art_stat": art_stat,
                "status_dat": status_dat,
                "country_id": countries,
                "supers_id": supers,
                "trade_id": trades,

            }
        )
        return axios({
            method: "PUT",
            url: URL,
            headers: {
                'content-type': 'application/json',
            },
            credentials: 'include',
            data: data
        }).then((response) => response.data);
    }

    deleteArticle(pk) {
        const URL = `${API_URL}/api/v1/article/${pk}/`;
        return axios({
            method: "DELETE",
            url: URL,
            headers: {
                'content-type': 'application/json',
            },
            credentials: 'include',
        }).then((response) => response.data);
    }


    updateCrit(art_no_id, old_name, name, old_criteria, criteria) {

        const URL = `${API_URL}/api/v1/crit/${art_no_id}/`;
        const data = JSON.stringify(
            {
                "crit": {
                    "name": old_name,
                    "crit_val": old_criteria
                },
                "new_crit": {
                    "new_name": name,
                    "new_crit_val": criteria
                }
            }
        )
        return axios({
            method: "PUT",
            url: URL,
            headers: {
                'content-type': 'application/json',
            },
            credentials: 'include',
            data: data
        }).then((response) => response.data);
    }

    createCrit(art_no_id, name, criteria) {

        const URL = `${API_URL}/api/v1/crit/${art_no_id}/`;
        const data = JSON.stringify(
            {
                "crit": {
                    "name": name,
                    "crit_val": criteria
                }
            }
        )
        return axios({
            method: "POST",
            url: URL,
            headers: {
                'content-type': 'application/json',
            },
            credentials: 'include',
            data: data
        }).then((response) => response.data);
    }

    deleteCrit(art_no_id, crit) {
        const URL = `${API_URL}/api/v1/crit/${art_no_id}/`;
        const data = JSON.stringify(
            {
                "crit_no_id": {
                    "crit_no": crit.crit_no_id.crit_no
                },
                "crit_val": crit.crit_val
            }
        )
        return axios({
            method: "DELETE",
            url: URL,
            headers: {
                'content-type': 'application/json',
            },
            credentials: 'include',
            data: data
        }).then((response) => response.data);
    }

    deleteReference(art_no_id, reference) {

        const URL = `${API_URL}/api/v1/references/${art_no_id}/`;
        const data = JSON.stringify(
            {
                "short_name": reference.man_no_id.short_name,
                "ref_no": reference.ref_no,
            }
        )
        return axios({
            method: "DELETE",
            url: URL,
            headers: {
                'content-type': 'application/json',
            },
            credentials: 'include',
            data: data
        }).then((response) => response.data);
    }

    saveReferences(art_no_id, reference, country, maker) {
        const URL = `${API_URL}/api/v1/references/${art_no_id}/`;
        const data = JSON.stringify(
            {
                "short_name": maker,
                "ref_no": reference,
                "country_code": country
            }
        )
        return axios({
            method: "POST",
            url: URL,
            headers: {
                'content-type': 'application/json',
            },
            credentials: 'include',
            data: data
        }).then((response) => response.data);
    }

    searchArticles(lexem, type) {
        const URL = `${API_URL}/api/v1/article/search/?lexem=${lexem}&type=${type}`;
        return axios({
            method: "GET",
            url: URL,
            headers: {
                'content-type': 'application/json',
            },
            credentials: 'include',
        }).then((response) => response.data);
    }

    searchMakers(lexem) {
        const URL = `${API_URL}/api/v1/manufacture_search/${lexem}/`;
        return axios({
            method: "GET",
            url: URL,
            headers: {
                'content-type': 'application/json',
            },
            credentials: 'include',
        }).then((response) => response.data);
    }

    searchReferences(lexem) {
        const URL = `${API_URL}/api/v1/reference_search/${lexem}/`;
        return axios({
            method: "GET",
            url: URL,
            headers: {
                'content-type': 'application/json',
            },
            credentials: 'include',
        }).then((response) => response.data);
    }

    getImages(art_no_id) {
        const URL = `${API_URL}/api/v1/document/${art_no_id}/`;
        return axios({
            method: "GET",
            url: URL,
            headers: {
                'content-type': 'application/json',
            },
            credentials: 'include',
        }).then((response) => response.data);
    }

    getErrors() {
        const URL = `${API_URL}/api/v1/errors/`;
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