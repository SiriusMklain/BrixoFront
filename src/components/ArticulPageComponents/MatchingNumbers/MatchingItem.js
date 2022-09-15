import {Component} from "react";
import MainData from "../../ArticulEditComponents/MainData/MainData";

class MatchingItem extends Component {
    constructor(props) {
        super(props);
        const {num, id, brand, art_no, gtin, countries} = props
        this.num = num
        this.id = id
        this.art_no = art_no
        this.brand = brand
        this.gtin = gtin
        this.countries = countries
        this.state = {
            articles: [],
        }

    }

    componentDidMount() {
        this.setState({articles: this.props.articles})
    }

    componentWillReceiveProps(nextProps) {
        this.setState({articles: nextProps.articles});
    }

    shouldComponentUpdate(nextProps) {
        return this.state.articles !== nextProps.articles;
    }

    goToEdit = () => {
        window.location.href = '/edit/?id=' + this.state.articles.id
    }

    getCountry = () => {
        try{
            return this.state.articles.country_id.map((country) => country.country_code + ', ')
        }catch (e) {
        }
    }

    getBrand() {
        try{
            return this.state.articles.brand_no_id.name
        }catch (e) {
        }
    }

    render() {
        return (

            <tr onClick={this.goToEdit}>
                <td>
                    <div className="table__td">
                        <span className="table__num gray-text">{this.num}</span>
                    </div>
                </td>
                <td>
                    <div className="table__td">
                        <div className="table__check check">
                            <input type="checkbox"/>
                            <label></label>
                        </div>
                        <span>{this.state.articles.art_no}</span>
                    </div>
                </td>
                <td>
                    <div className="table__td">
                        <span>{this.getBrand()}</span>
                    </div>
                </td>
                <td>
                    <div className="table__td">
                        <span>{this.state.articles.gtin}</span>
                    </div>
                </td>
                <td>
                    <div className="table__td">
                        <span>{this.getCountry()}</span>
                    </div>
                </td>
            </tr>

        );
    }
}

export default MatchingItem;
