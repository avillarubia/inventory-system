import dancingManGIF from '../images/man.gif'

const NotFound = () => {
    return (
        <div className='container'>
            <div style={{ marginTop: '100px' }} />
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <h1>Oops!</h1>
                <div className='mb-2' />
                <img src={dancingManGIF} alt={'a dancing man'} />
                <div className='mb-2' />
                <h2>404</h2>
                <p>Sorry, this page isn't here.</p>
            </div>
        </div>
    );
}

export default NotFound;