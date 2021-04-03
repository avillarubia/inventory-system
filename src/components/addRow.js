import { useState } from "react"
import { saveItem } from './../services/item';
import InputNumber from "./inputNumber";
import { getCurrentUser } from './../services/auth';
import { toast } from "react-toastify";

const AddRow = ({ setItems }) => {
    const user = getCurrentUser()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(1)

    const handleAddClick = async () => {
        const payload = {
            name,
            description,
            price,
            quantity,
            keeper_id: user._id,
            date_stored: new Date().toLocaleString()
        }

        try {
            const { data } = await saveItem(payload)
            setItems(items => [...items, data])

            toast.success('Item successfully added.')
        } catch (error) {
            const { message, data } = error.response
            toast.error(message || data)
        }
    }

    return (
        <tr>
            <th scope="row"></th>
            <td scope="row"></td>
            <td>
                <input
                    onChange={e => setName(e.target.value)}
                    type="text"
                    className="form-control"
                />
            </td>
            <td>
                <input
                    onChange={e => setDescription(e.target.value)}
                    type="text"
                    className="form-control"
                />
            </td>
            <td>
                <InputNumber
                    setter={setPrice}
                    defaultValue={0}
                />
            </td>
            <td>
                <InputNumber
                    setter={setQuantity}
                    defaultValue={1}
                />
            </td>
            <td>
            </td>
            <td>
            </td>
            <td>
                <button
                    className='btn btn-primary'
                    onClick={() => handleAddClick()}
                >
                    <i className="fas fa-plus-circle"></i>
                </button>
            </td>
        </tr>
    );
}

export default AddRow;