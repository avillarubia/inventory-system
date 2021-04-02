import { useEffect, useState } from "react";
import _ from 'lodash'
import AddRow from "./addRow";
import Paginator from "./paginator";
import UpdateRow from "./updateRow";
import { getItems } from './../services/item';

const Table = () => {
    const [rowClicked, setRowClicked] = useState(null)
    const [items, setItems] = useState([])
    const [groupedItems, setGroupedItems] = useState([])
    const [pageNo, setPageNo] = useState(1)
    const rowLimiter = 10

    useEffect(() => {
        fetchItems()
    }, [rowClicked])

    useEffect(() => {
        setGroupedItems(_.chunk(items, rowLimiter))
    }, [items.length])

    async function fetchItems() {
        const { data } = await getItems()
        setItems(data)
        setGroupedItems(_.chunk(data, rowLimiter))
    }

    return (
        <>
            <div className='overflow-scroll'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col" style={{ width: '10px' }}>Price</th>
                            <th scope="col" style={{ width: '10px' }}>Quantity</th>
                            <th scope="col">Keeper</th>
                            <th scope="col">Date Stored</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <UpdateRow
                            items={groupedItems[pageNo - 1] || []}
                            rowClicked={rowClicked}
                            setRowClicked={setRowClicked}
                            setItems={setItems}
                        />
                        <AddRow setItems={setItems} />
                    </tbody>
                </table>
            </div>
            <div className='mt-3' />
            <Paginator
                groupedItems={groupedItems}
                pageNo={pageNo}
                setPageNo={setPageNo}
            />
        </>
    );
}

export default Table;