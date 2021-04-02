import AddForm from "../components/addForm";
import Table from "../components/table"

const Dashboard = () => {
    return <>
        <div className='container'>
            <h1>Dashboard</h1>
            <AddForm />
            <Table />
        </div>
    </>
}

export default Dashboard;