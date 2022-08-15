import Select from 'react-select';
import MatchingItem from "./MatchingItem";


function MatchingNumbers() {
    const numsOfRows = [
        { value: '1', label: '10' },
        { value: '2', label: '20' },
        { value: '3', label: '30' }
    ]

    const matchings = [
        {id: 'PN0168',brand: 'Sure',oem: '56341456252',gtin: '56341456252', countries: 'RUS, GUS, TM, TJK, BY'},
        {id: 'PN0168',brand: 'Sakura',oem: '56341456252',gtin: '56341456252', countries: 'RUS, GUS, TM, TJK, BY'},
        {id: 'PN0168',brand: 'Sure',oem: '56341456252',gtin: '56341456252', countries: 'RUS, GUS, TM, TJK, BY'},
        {id: 'PN0168',brand: 'Sakura',oem: '56341456252',gtin: '56341456252', countries: 'RUS, GUS, TM, TJK, BY'},
        {id: 'PN0168',brand: 'Sure',oem: '56341456252',gtin: '56341456252', countries: 'RUS, GUS, TM, TJK, BY'},
        {id: 'PN0168',brand: 'Sakura',oem: '56341456252',gtin: '56341456252', countries: 'RUS, GUS, TM, TJK, BY'},
        {id: 'PN0168',brand: 'Sure',oem: '56341456252',gtin: '56341456252', countries: 'RUS, GUS, TM, TJK, BY'},
        {id: 'PN0168',brand: 'Sakura',oem: '56341456252',gtin: '56341456252', countries: 'RUS, GUS, TM, TJK, BY'},
        {id: 'PN0168',brand: 'Sure',oem: '56341456252',gtin: '56341456252', countries: 'RUS, GUS, TM, TJK, BY'},
        {id: 'PN0168',brand: 'Sakura',oem: '56341456252',gtin: '56341456252', countries: 'RUS, GUS, TM, TJK, BY'},
    ]

    return (
        <>
            <div className="data-block">
                <div className="data-block__head">
                    <div className="data-block__title">Соответствие OEM-номерам</div>
                </div>
                <div className="data-block__nav">
                    <div className="data-block__search search-field">
                        <input type="text" placeholder="Поиск"/>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.71 16.29L14.31 12.9C15.407 11.5025 16.0022 9.77666 16 8C16 6.41775 15.5308 4.87103 14.6518 3.55544C13.7727 2.23985 12.5233 1.21447 11.0615 0.608967C9.59966 0.00346625 7.99113 -0.15496 6.43928 0.153721C4.88743 0.462403 3.46197 1.22433 2.34315 2.34315C1.22433 3.46197 0.462403 4.88743 0.153721 6.43928C-0.15496 7.99113 0.00346625 9.59966 0.608967 11.0615C1.21447 12.5233 2.23985 13.7727 3.55544 14.6518C4.87103 15.5308 6.41775 16 8 16C9.77666 16.0022 11.5025 15.407 12.9 14.31L16.29 17.71C16.383 17.8037 16.4936 17.8781 16.6154 17.9289C16.7373 17.9797 16.868 18.0058 17 18.0058C17.132 18.0058 17.2627 17.9797 17.3846 17.9289C17.5064 17.8781 17.617 17.8037 17.71 17.71C17.8037 17.617 17.8781 17.5064 17.9289 17.3846C17.9797 17.2627 18.0058 17.132 18.0058 17C18.0058 16.868 17.9797 16.7373 17.9289 16.6154C17.8781 16.4936 17.8037 16.383 17.71 16.29ZM2 8C2 6.81332 2.3519 5.65328 3.01119 4.66658C3.67047 3.67989 4.60755 2.91085 5.7039 2.45673C6.80026 2.0026 8.00666 1.88378 9.17055 2.11529C10.3344 2.3468 11.4035 2.91825 12.2426 3.75736C13.0818 4.59648 13.6532 5.66558 13.8847 6.82946C14.1162 7.99335 13.9974 9.19975 13.5433 10.2961C13.0892 11.3925 12.3201 12.3295 11.3334 12.9888C10.3467 13.6481 9.18669 14 8 14C6.4087 14 4.88258 13.3679 3.75736 12.2426C2.63214 11.1174 2 9.5913 2 8Z" fill="#A0A1C0"/>
                        </svg>
                    </div>
                    <div className="data-block__num">
                        <div className="data-block__num-title">records per page</div>
                        <Select
                            className="data-block__num-select"
                            classNamePrefix="select"
                            isDisabled={false}
                            isLoading={false}
                            isClearable={false}
                            isRtl={false}
                            isSearchable={false}
                            name="numsOfRows"
                            options={numsOfRows}
                            defaultValue={numsOfRows[0]}
                            placeholder={''}
                        />
                    </div>
                </div>
                <div className="data-block__content">
                    <div className="table table2">
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
                                        <span>Артикул</span>
                                    </div>
                                </th>
                                <th>
                                    <div className="table__th">
                                        <span>Бренд</span>
                                    </div>
                                </th>
                                <th>
                                    <div className="table__th">
                                        <span>OEM</span>
                                    </div>
                                </th>
                                <th>
                                    <div className="table__th">
                                        <span>GTIN</span>
                                    </div>
                                </th>
                                <th>
                                    <div className="table__th">
                                        <span>Страны</span>
                                    </div>
                                </th>
                            </tr>
                            </thead>

                            <tbody>
                            {matchings.map((matching,index) =>
                                <MatchingItem
                                    key={index}
                                    num={index+1}
                                    id={matching.id}
                                    brand={matching.brand}
                                    oem={matching.oem}
                                    gtin={matching.gtin}
                                    countries={matching.countries}
                                />
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="nav">
                <div className="nav__buttons">
                    <a href="" className="nav__btn btn btn-gray">
                        <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.0557 6.4998L0.944554 6.4998M6.61122 12.0712L0.944554 6.4998L6.61122 0.92837"
                                      stroke="#232445" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                        <span>назад</span>
                    </a>
                    <a href="" className="nav__btn btn btn-red-outline">
                        <span>Далее</span>
                        <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_69_3461)">
                                <path d="M0.944336 6.50002H16.0554M10.3888 0.928589L16.0554 6.50002L10.3888 12.0714"
                                      stroke="#CA003D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            </g>
                            <defs>
                                <clipPath id="clip0_69_3461">
                                    <rect width="17" height="13" fill="white"></rect>
                                </clipPath>
                            </defs>
                        </svg>
                    </a>
                </div>
                <div className="pagination">
                    <div className="pagination__input fg">
                        <input type="text" value="1"/>
                    </div>
                    <div className="pagination__num">
                        из <span>2000</span>
                    </div>
                    <div className="pagination__buttons">
                        <button className="pagination__btn">
                            <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M7.73393 0.18995C7.43939 -0.0635499 6.96302 -0.0635499 6.6692 0.18995L0.441563 5.56165C0.30216 5.68006 0.191152 5.82233 0.115302 5.98028C0.0394518 6.13823 0.000356192 6.3086 0.000356177 6.48048C0.000356162 6.65236 0.0394517 6.82241 0.115302 6.98035C0.191152 7.1383 0.30216 7.28058 0.441563 7.39898L6.71429 12.8104C6.85665 12.9313 7.04518 12.9993 7.24158 13.0005C7.43798 13.0017 7.62754 12.9359 7.77175 12.8167C7.84319 12.7579 7.90034 12.6866 7.93969 12.6072C7.97903 12.5278 7.99972 12.4421 8.00047 12.3552C8.00122 12.2684 7.98201 12.1825 7.94405 12.1026C7.90608 12.0227 7.85017 11.9504 7.77975 11.8906L2.03866 6.93941C1.96891 6.88021 1.91336 6.80894 1.8754 6.72994C1.83744 6.65094 1.81785 6.56614 1.81785 6.48016C1.81785 6.39418 1.83744 6.30907 1.8754 6.23006C1.91336 6.15106 1.96891 6.0798 2.03866 6.02059L7.73393 1.10846C7.80367 1.04931 7.8592 0.977933 7.89715 0.898983C7.9351 0.820033 7.95468 0.735131 7.95468 0.649203C7.95468 0.563275 7.9351 0.478373 7.89715 0.399423C7.8592 0.320473 7.80367 0.2491 7.73393 0.18995"
                                      fill="#232445"></path>
                            </svg>
                        </button>
                        <button className="pagination__btn pagination__btn--next">
                            <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd"
                                      d="M0.266068 12.8101C0.560613 13.0636 1.03698 13.0636 1.3308 12.8101L7.55844 7.43835C7.69784 7.31994 7.80885 7.17767 7.8847 7.01972C7.96055 6.86177 7.99964 6.6914 7.99964 6.51952C7.99964 6.34764 7.96055 6.17759 7.8847 6.01965C7.80885 5.8617 7.69784 5.71942 7.55844 5.60102L1.28571 0.18964C1.14335 0.0687062 0.954824 0.000735296 0.758422 -0.000471958C0.562019 -0.00167921 0.372457 0.06412 0.228248 0.183293C0.15681 0.242144 0.0996551 0.31337 0.0603128 0.392765C0.0209705 0.472161 0.000282825 0.557936 -0.000467132 0.644767C-0.00121709 0.731598 0.0179853 0.817475 0.0559515 0.897404C0.0939178 0.977333 0.149833 1.04959 0.220247 1.10942L5.96134 6.06059C6.03109 6.11979 6.08664 6.19106 6.1246 6.27006C6.16256 6.34906 6.18215 6.43386 6.18215 6.51984C6.18215 6.60582 6.16256 6.69093 6.1246 6.76994C6.08664 6.84894 6.03109 6.9202 5.96134 6.97941L0.266068 11.8915C0.19633 11.9507 0.1408 12.0221 0.102849 12.101C0.0648979 12.18 0.0453203 12.2649 0.0453203 12.3508C0.0453203 12.4367 0.0648979 12.5216 0.102849 12.6006C0.1408 12.6795 0.19633 12.7509 0.266068 12.8101"
                                      fill="#232445"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}


export default MatchingNumbers;
