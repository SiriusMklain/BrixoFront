function MatchingItem(props) {
    const {num, id, brand, oem, gtin, countries } = props

    return (
        <tr>
            <td>
                <div className="table__td">
                    <span className="table__num gray-text">{num}</span>
                </div>
            </td>
            <td>
                <div className="table__td">
                    <div className="table__check check">
                        <input type="checkbox"/>
                        <label></label>
                    </div>
                    <span>{id}</span>
                </div>
            </td>
            <td>
                <div className="table__td">
                    <span>{brand}</span>
                </div>
            </td>
            <td>
                <div className="table__td">
                    <span>{oem}</span>
                </div>
            </td>
            <td>
                <div className="table__td">
                    <span>{gtin}</span>
                </div>
            </td>
            <td>
                <div className="table__td">
                    <span>{countries}</span>
                </div>
            </td>
        </tr>
    );
}


export default MatchingItem;
