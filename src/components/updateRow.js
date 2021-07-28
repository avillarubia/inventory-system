import { useState } from "react";
import InputNumber from "./inputNumber";
import { getCurrentUser } from './../services/auth';
import { updateItem } from "../services/item";
import moment from 'moment'
import { toast } from "react-toastify";

const UpdateRow = (props) => {
    const { items, rowClicked, setRowClicked, setItems, setItem } = props
    const user = getCurrentUser()

    const [_id, setId] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(1)

    const handleRowClick = (index, item) => {
        setId(item._id)
        setName(name)
        setPrice(price)
        setQuantity(quantity)
        setDescription(description)
        setRowClicked(index)
    }

    const handleUpdateClick = async () => {
        const payload = {
            _id,
            name,
            description,
            quantity,
            price,
            keeper_id: user._id
        }

        try {
            await updateItem(payload)
            toast.success(`Item with id ${_id} has been successfully updated.`)
        } catch (error) {
            const { message, data } = error.response
            toast.error(message || data)
        }

        setRowClicked(null)
    }

    const handleRemoveClick = (item) => {
        setItem(item)
    }

    const renderInputText = (defaultValue, setter) => <>
        <input
            type="text"
            className="form-control"
            defaultValue={defaultValue}
            onChange={(e) => setter(e.target.value)}
        />
    </>

    const renderCellTextDisplay = (index, value, setter) => {
        return rowClicked === index ?
            renderInputText(value, setter) :
            value
    }

    const renderPriceIcon = (field) => {
        return field.toLowerCase() === 'price' &&
            <>
                <i className="fas fa-ruble-sign"></i>
                {' '}
            </>
    }

    const renderCellNumberDisplay = (field, index, value, setter) => {
        return rowClicked === index ?
            <InputNumber
                defaultValue={value}
                setter={setter}
            /> :
            <div>
                <span
                    style={{
                        padding: '3px 10px',
                        backgroundColor: field.toLowerCase() === 'price' ? '#28A745' : '#FFC107',
                        borderRadius: '10px',
                        fontSize: '20px',
                        fontWeight: '600',
                        color: 'white'
                    }}
                >
                    {renderPriceIcon(field)}
                    {value}
                </span>
            </div>
    }

    return (
        items.map((item, index) =>
            <tr onClick={() => handleRowClick(index, item)}>
                <th scope="row">{index}</th>
                <td scope="row" >
                    <p>
                        {item._id.split('').splice(item._id.length - 6, item._id.length - 1)}
                    </p>
                </td>
                <td>
                    {renderCellTextDisplay(index, item.name, setName)}
                </td>
                <td>
                    {renderCellTextDisplay(index, item.description, setDescription)}
                </td>
                <td style={{ width: '10px' }}>
                    {renderCellNumberDisplay('price', index, item.price, setPrice)}
                </td>
                <td style={{ width: '10px' }}>
                    {renderCellNumberDisplay('quantity', index, item.quantity, setQuantity)}
                </td>
                <td>{item.keeper_name}</td>
                <td>
                    <span>
                        {moment(item.date_stored).format('DD MMM yyyy')}
                    </span>
                    <br />
                    <span>
                        {moment(item.date_stored).format('hh:mm')}
                    </span>
                </td>
                <td>
                    {
                        rowClicked === index ?

                            <button
                                className={'btn btn-primary'}
                                onClick={() => handleUpdateClick()}
                            >
                                <i className="fas fa-edit"></i>
                            </button>
                            :
                            <button
                                className={'btn btn-danger '}
                                onClick={() => handleRemoveClick(item)}
                                data-bs-toggle="modal" data-bs-target="#exampleModal"
                            >
                                <i className="fas fa-trash-alt" ></i>
                            </button>
                    }
                </td>
            </tr>
        )
    );
}

export default UpdateRow;