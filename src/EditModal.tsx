import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Vegetable } from "./Vegetables";


export interface EditProps {
    vegetable: Vegetable;
    updateVegetable: (id: number, name: string, price: number) => void;
}


const EditModal = (props: EditProps) => {
    const [showModal, setShowModal] = useState(false);
    const [price, setPrice] = useState(0);
    const [name, setName] = useState("");
    const handleClose = () => setShowModal(false);

    const handleOnOpen = () => {
        setPrice(props.vegetable.price);
        setName(props.vegetable.name);
        setShowModal(true);
    };
    return (
        <>
            <Button type="button" className="edit" onClick={handleOnOpen}>
                Edit
             </Button>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Edit {props.vegetable.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <li>
                        <label style={{width: "60px"}}><strong>Name:</strong>&nbsp;</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="Name"
                        ></input>
                    </li>
                    <li>
                        <label style={{width: "60px"}}><strong>Price:</strong>&nbsp;</label>
                        <input
                            type="number"
                            placeholder="Price"
                            value={price}
                            onChange={(event) => setPrice(parseFloat(event.target.value))}
                        ></input>
                    </li>
                </Modal.Body>
                <Modal.Footer>
                    <button className="update" onClick={() => {props.updateVegetable(props.vegetable.id, name, price); handleClose();}}>
                        Update
                     </button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EditModal;
