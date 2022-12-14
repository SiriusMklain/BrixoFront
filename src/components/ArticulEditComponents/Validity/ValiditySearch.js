import React, {Component} from "react";

class ValiditySearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: [],
        }
        this.changeType = this.changeType.bind(this)
    }

    componentDidMount() {
        this.setState({type: this.props.type})
    }

    changeType(e) {
        this.props.funcSearchType(e.target.lastChild.data)
    }

    render() {
        return (
            <tr style={{cursor: "pointer"}}
                onClick={this.changeType}
            >
                <td style={{borderTop: 0, width: 160}}>
                    <div className="table__td">
                        <span>{this.props.type.type_name}</span>

                    </div>
                </td>
                <td style={{borderTop: 0, width: 190}}>
                    <div className="table__td">
                        <span>{this.props.type.type_engine}</span>

                    </div>
                </td>
                <td style={{borderTop: 0, width: 100}}>
                    <div className="table__td">
                        <span>{this.props.type.type_ls_ls}</span>

                    </div>
                </td>
                <td style={{borderTop: 0}}>
                    <div className="table__td">
                        <span>{this.props.type.type_year}</span>

                    </div>
                </td>

            </tr>
        );
    }
}


export default ValiditySearch;
