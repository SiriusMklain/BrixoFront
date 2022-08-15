import ArticulItem from "./ArticulsItem";

function Articuls() {
    const articuls = [
        {id: 'FN0017',reason: 'Пустые характеристики, не указан GTIN'},
        {id: 'BL1059',reason: 'Нет соответстия ни одному OEM-номеру'},
        {id: 'BL1062',reason: 'Не прописаны страны использования'},
    ]

    return (
        <div className="data-block">
            <div className="data-block__head">
                <div className="data-block__title">Требующие внимания</div>
            </div>
            <div className="data-block__content">
                <div className="table table1">
                    <table>
                        <thead>
                            <tr>
                            <th>
                                <div className="table__th">
                                    <span className="table__num">№</span>
                                    <button className="table__sort">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M4 0L0 2.91517L1.13934 4.54264L3.01991 3.17209V10H4.98009V3.17209L6.86066 4.54264L8 2.91517L4 0Z" fill="#CA003D"/>
                                            <path fillRule="evenodd" clipRule="evenodd" d="M12 16L16 13.0848L14.8607 11.4574L12.9801 12.8279L12.9801 5.99998L11.0199 5.99998L11.0199 12.8279L9.13934 11.4574L8 13.0848L12 16Z" fill="#BBBCD1"/>
                                        </svg>
                                    </button>
                                </div>
                            </th>
                            <th>
                                <div className="table__th">
                                    <div className="table__check check">
                                        <input type="checkbox"/>
                                        <label></label>
                                    </div>
                                    <span>Номер</span>
                                </div>
                            </th>
                            <th>
                                <div className="table__th">
                                    <span>Причина</span>
                                </div>
                            </th>
                        </tr>
                        </thead>

                        <tbody>
                        {articuls.map((articul,index) =>
                        <ArticulItem
                            key={index}
                            num={index+1}
                            id={articul.id}
                            reason={articul.reason}
                        />
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
}


export default Articuls;
