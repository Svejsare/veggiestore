import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Right } from 'react-bootstrap/lib/Media';
import EditModal from './EditModal';

export interface Vegetable {
  id: number;
  name: string;
  price: number;
}


export const Vegetables = () => {
  const [vegetables, setVegetables] = useState<Vegetable[]>([]);
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    getVegetables();
  }, [])


  const getVegetables = () => {
    fetch(
      `https://localhost:5001/vegetableinventory/ListVegetables`,
      {
        method: 'GET',
        mode: "cors",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then((data) => {
        setVegetables(data.result);
      })
  }

  const addVegetable = (name: string, price: number) => {
    fetch(
      `https://localhost:5001/vegetableinventory/AddVegetable`,
      {
        method: 'POST',
        mode: "cors",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, price: price })
      })
      .then(res => res.json())
      .then((data) => {
        setName('');
        setPrice(0);
        getVegetables();
      })
  }

  const updateVegetable = (id: number, name: string, price: number) => {
    fetch(
      `https://localhost:5001/vegetableinventory/UpdateVegetable`,
      {
        method: 'POST',
        mode: "cors",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id, name: name, price: price })
      })
      .then(res => res.json())
      .then((data) => {
        getVegetables();
      })
  }

  const deleteVegetable = (id: number) => {
    fetch(
      `https://localhost:5001/vegetableinventory/DeleteVegetable?id=${id}`,
      {
        method: 'POST',
        mode: "cors",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then((data) => {
        getVegetables();
      })
  }

  return (
    <>
      <div className="wrapper">
        <h2>
          Find your vegetables here!
        </h2>
        <div className="main">
          <table>
            <thead>
              <th>Id</th>
              <th>Name</th>
              <th>Price</th>
            </thead>
            {vegetables.map((v, index) => (
              <tbody key={index + 100}>
                <tr>
                  <td>{v.id}</td>
                  <td>{v.name}</td>
                  <td>{v.price}</td>
                  <td>
                    <EditModal vegetable={v} updateVegetable={updateVegetable}></EditModal>
                    <Button type="button" className="remove" onClick={() => deleteVegetable(v.id)}>Remove</Button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        <aside className="aside aside-1"></aside>
        <aside className="aside aside-2"></aside>
        <footer className="footer">
          <h3>
            Add a vegetable!
          </h3>
          <input
            placeholder="Name"
            value={name ?? ""}
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            placeholder="Price"
            value={price ?? ""}
            type="number"
            onChange={(e) => {
              setPrice(parseFloat(e.target.value));
            }}
          />
          <Button type="button" className="add" onClick={() => addVegetable(name, price)}>Add veggie</Button>
        </footer>
      </div>
    </>
  );
}

export default Vegetables;
function componentDidMount() {
  throw new Error('Function not implemented.');
}

