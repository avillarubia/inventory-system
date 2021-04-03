import Table from "../components/table"

const Dashboard = ({ setItem, items, setItems, rowClicked, setRowClicked }) => {
    return <>
        <div className='container'>
            <div className='mt-5' />
            <Table
                setItem={setItem}
                items={items}
                setItems={setItems}
                rowClicked={rowClicked}
                setRowClicked={setRowClicked}
            />
        </div>
    </>
}

export default Dashboard;