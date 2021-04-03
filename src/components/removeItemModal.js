import { toast } from "react-toastify"
import { removeItem } from "../services/item"

const RemoveItemModal = (props) => {
    const { item, setItems, setRowClicked } = props

    const handleRemoveClick = async () => {
        try {
            await removeItem(item._id)

            setItems(items =>
                items.filter(item => item._id !== item._id)
            )
            setRowClicked(null)

            toast.success(`Item with id ${item._id} has been removed.`)
        } catch (error) {
            const { message, data } = error.response
            toast.error(message || data)
        }
    }

    return (
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            <i className="fas fa-exclamation-triangle" style={{ color: 'orange' }}></i>
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <span>
                            Are you sure you want to delete this item?
                        </span>
                        <br />
                        <span>
                            {
                                item &&
                                item.name
                            }
                        </span>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            <i className="fas fa-window-close mr-2"></i>
                            Close
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            data-bs-dismiss="modal"
                            onClick={() => handleRemoveClick()}
                        >
                            <i className="fas fa-trash-alt mr-2"></i>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RemoveItemModal;