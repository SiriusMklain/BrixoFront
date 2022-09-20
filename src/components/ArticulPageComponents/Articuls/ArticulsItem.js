import {Component} from "react";

class ArticulItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num: '',
            art_no: '',
            errors: []
        }
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({num: nextProps.num, art_no: nextProps.art_no, errors: nextProps.errors})
    }

    render() {
        return (
            <tr>
                <td>
                    <div className="table__td">
                        <span className="table__num gray-text">{this.state.num}</span>
                    </div>
                </td>
                <td>
                    <div className="table__td">
                        <div className="table__check check">
                            <input type="checkbox"/>
                            <label></label>
                        </div>
                        <span>{this.state.art_no}</span>
                    </div>
                </td>
                <td>
                    <div className="table__td">
                        <span>{this.state.errors}</span>
                    </div>
                </td>
            </tr>
        );
    }
}


export default ArticulItem;
