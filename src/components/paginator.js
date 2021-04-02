import { useState } from "react";

const Paginator = (props) => {
    const { groupedItems, pageNo, setPageNo } = props

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item">
                    <a
                        className="page-link"
                        href="#"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setPageNo(pageNo - 1)}
                    >
                        Previous
                    </a>
                </li>
                {
                    groupedItems.map((group, index) => <>
                        <li className="page-item">
                            <a
                                className="page-link"
                                href="#"
                                style={{ cursor: 'pointer' }}
                                onClick={() => setPageNo(index + 1)}
                            >
                                {index + 1}
                            </a>
                        </li>
                    </>)
                }

                <li className="page-item">
                    <a
                        className="page-link"
                        href="#"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setPageNo(pageNo + 1)}
                    >
                        Next
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Paginator;