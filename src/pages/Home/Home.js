import Articuls from "../../components/ArticulPageComponents/Articuls/Articuls";
import MatchingNumbers from "../../components/ArticulPageComponents/MatchingNumbers/MatchingNumbers";
import Header from "../../components/Header/Header";
import React, {Component} from "react";
import ApiService from "../../util/ApiService";

const apiService = new ApiService();

class Home extends  Component{
    constructor(props) {
        super(props);
        this.state = {
            articles_filter: []
        }
        this.setBrand = this.setBrand.bind(this)
    }

    setBrand(e) {
        apiService.getArticlesFiltersBrand(e.target.firstElementChild.value).then((result) => {
                this.setState({articles_filter: result.article})
            }
        )
    }

    render() {
        return (
        <div className="home-page">
            <div className="container">
                <Header
                    setBrandFunction={this.setBrand}
                />
                <div className="home-page__title display2">Список и поиск артикулов</div>
                <Articuls/>
                <MatchingNumbers
                articles_filter={this.state.articles_filter}
                />

            </div>
        </div>
    );
    }
}


export default Home;
