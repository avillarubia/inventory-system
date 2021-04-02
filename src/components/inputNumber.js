const InputNumber = (props) => {
    const { defaultValue, setter } = props

    return (
        <input
            type="number"
            defaultValue={defaultValue}
            className="form-control"
            min="0"
            max="100000"
            style={{ width: '100px' }}
            onChange={e => setter(e.target.value)}
            onKeyDown={e => setter(e.target.value)}
        />
    );
}

export default InputNumber;