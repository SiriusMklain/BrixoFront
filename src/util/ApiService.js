import axios from "axios";

const API_URL = "http://localhost:8000"

class ApiService {
    getArticles(pages) {
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

    getArticlesFiltersBrand(pk) {
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

    getArticlesByURL(link, direction, pages) {
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

    saveArticle(pk, art_no, brand, countries, trades, quant_unit, quant_per_unit, art_stat, status_dat, gtin, gen_art_no, supers) {
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
                // "reference": [
                //     {
                //         "art_no_id": 41509,
                //         "man_no_id": {
                //             "man_no": 36,
                //             "short_name": "FORD",
                //             "term_plain": "FORD"
                //         },
                //         "ref_no": "1704765",
                //         "country_code": "GUS"
                //     },
                //     {
                //         "art_no_id": 20758,
                //         "man_no_id": {
                //             "man_no": 80,
                //             "short_name": "NISSA",
                //             "term_plain": "NISSAN"
                //         },
                //         "ref_no": "16546AW300",
                //         "country_code": "TM"
                //     }
                // ],
                // "doc_no_id": [
                //     {
                //         "doc_no": 437800001,
                //         "doc_name": "A0001-1",
                //         "lang_no": 255,
                //         "doc_type": 1,
                //         "doc_term_no": 5,
                //         "doc_type_one": 1
                //     }
                // ]

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

    saveReferences(pk, art_no) {
        const URL = `${API_URL}/api/v1/references/${pk}/`;
        const data = JSON.stringify(
            {
                "reference": [
                    {
                        "art_no": art_no,
                        "art_no_id": 41509,
                        "man_no_id": {
                            "man_no": 36,
                            "short_name": "FORD",
                            "term_plain": "FORD"
                        },
                        "ref_no": "1704765",
                        "country_code": "GUS"
                    },
                    {
                        "art_no_id": 20758,
                        "man_no_id": {
                            "man_no": 80,
                            "short_name": "NISSA",
                            "term_plain": "NISSAN"
                        },
                        "ref_no": "16546AW300",
                        "country_code": "TM"
                    }
                ],
                "doc_no_id": [
                    {
                        "doc_no": 437800001,
                        "doc_name": "A0001-1",
                        "lang_no": 255,
                        "doc_type": 1,
                        "doc_term_no": 5,
                        "doc_type_one": 1
                    }
                ]

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
}

export default ApiService;