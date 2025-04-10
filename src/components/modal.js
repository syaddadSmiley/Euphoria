import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

function CenteredModal({onConfirm, ...props}) {
    return (
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            size={props.size ? props.size : 'md'}
            style={props.style ? props.style : null}
        >

            <Modal.Body>
                <h4>{props.title ? props.title : 'Informasi'} </h4>
                <p>
                    {props.message}
                </p>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onConfirm}>Confirm</Button>
                <Button style={{backgroundColor: 'red', borderColor: 'red'}} onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CenteredModal;