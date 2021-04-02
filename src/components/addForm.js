const AddForm = () => {
    return (
        <div className='col-5'>
            <form className="p-5 shadow-sm rounded">
                <div className="form-group">
                    <label >Item name</label>
                    <input type="text" className="form-control mb-3" placeholder="Javascript for Dummies" />
                </div>
                <div className="form-group">
                    <label >Description</label>
                    <input type="text" className="form-control mb-3" placeholder="book" />
                </div>
                <div className="form-group">
                    <label >Price</label>
                    <input type="text" className="form-control mb-3" placeholder="price" />
                </div>
                <div className="form-group">
                    <label >Quantity</label>
                    <input type="number" className="form-control mb-3" min="1" max="100000" placeholder="quantity" />
                </div>
                <div>
                    <label ></label>
                    <button type="submit" className="btn btn-primary mb-3 float-end">Add</button>
                </div>
            </form>
        </div>
    );
}

export default AddForm;