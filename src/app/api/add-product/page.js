import {useState} from 'react';

export default async function AddProductsPage() {

  const [inputName, setInputName] = useState('');
  const [inputPrice, setInputPrice] = useState('');
  const [mensaje, setMensaje] = useState('');

  function addProduct(e){
    e.preventDefault();

    if (!inputName || !inputPrice) {
      setMensaje('Both name and price are required');
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/products", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: inputName,
          price: parseFloat(inputPrice),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje(`Product added successfully: ${data.product.name}`);
        setInputName('');
        setInputPrice('');
      } else {
        setMensaje(`Error: ${data.error}`);
      }
    } catch (error) {
      setMensaje('Error connecting to the server.');
    }
  }

  return (
    <div>
      <h1>Add Products</h1>
      <form onSubmit={(e) => addProduct(e)}>
      <input placeholder="Insert name" type='text' value={inputName} onChange={(e) => setInputName(e.target.value)}></input>
      <input placeholder="Insert price" type='number' value={inputPrice} onChange={(e) => setInputPrice(e.target.value)}></input>
      <input type="submit" value='Add Product'></input>
      </form>
      {mensaje}
    </div>
  );
}