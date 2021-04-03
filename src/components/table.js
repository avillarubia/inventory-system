import { useEffect, useState } from "react";
import _ from 'lodash'
import AddRow from "./addRow";
import Paginator from "./paginator";
import UpdateRow from "./updateRow";
import { getItems } from './../services/item';
import { toast } from "react-toastify";

const Table = ({ setItem, items, setItems, rowClicked, setRowClicked }) => {
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
        try {
            const { data } = await getItems()
            setItems(data)
            setGroupedItems(_.chunk(data, rowLimiter))
        } catch (error) {
            const { message, data } = error.response
            toast.error(message || data)
        }
    }

    return (
        <>
            <Paginator
                groupedItems={groupedItems}
                pageNo={pageNo}
                setPageNo={setPageNo}
            />
            <div style={{ overflowX: 'scroll' }}>
                <table className="table" style={{ borderTop: 0 }}>
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
                            setItem={setItem}
                        />
                        <AddRow setItems={setItems} />
                    </tbody>
                </table>
            </div>
            <div className='mt-3' />
        </>
    );
}

export default Table;