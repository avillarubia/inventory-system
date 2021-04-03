import { useState } from "react";
import InputNumber from "./inputNumber";
import { getCurrentUser } from './../services/auth';
import { updateItem, removeItem } from "../services/item";
import moment from 'moment'

const UpdateRow = (props) => {
    const { items, rowClicked, setRowClicked, setItems } = props
    const user = getCurrentUser()

    const [_id, setId] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [quantity, setQuantity] = useState(1)

    const handleRowClick = (index, item) => {
        setId(item._id)
        setName(item.name)
        setPrice(price)
        setQuantity(quantity)
        setDescription(item.description)
        setRowClicked(index)
    }

    const handleClickUpdate = async () => {
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
        } catch (error) {

        }

        setRowClicked(null)
    }

    const handleClickRemove = async (id) => {
        try {
            await removeItem(id)

            setItems(items =>
                items.filter(item => item._id !== id)
            )
            setRowClicked(null)
        } catch (error) {

        }
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
                <td scope="row">{item._id}</td>
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
                                onClick={() => handleClickUpdate}
                            >
                                <i class="fas fa-edit"></i>
                            </button>
                            :
                            <button
                                className={'btn btn-danger'}
                                onClick={() => handleClickRemove(item._id)}
                            >
                                <i className="fas fa-trash-alt"></i>
                            </button>
                    }
                </td>
            </tr>
        )
    );
}

export default UpdateRow;