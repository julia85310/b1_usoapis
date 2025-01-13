import {useState} from 'react';

export default function AddProductsPage() {

  const emptyForm = { name: "", price: 0 };
  const [formData, setFormData] = useState(emptyForm);
  const [mensaje, setMensaje] = useState('');

  async function addProduct(e){
    e.preventDefault();
    
    if (!formData.name || !!formData.price) {
      setMensaje('Introduce nombre y precio');
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/products", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje(`Producto añadido: ${data.product.name}`);
        setFormData(emptyForm);
      } else {
        setMensaje(`Error: ${data.error}`);
      }
    } catch (error) {
      setMensaje('Error estableciendo la conexión');
    }
  }

  return (
    <div>
      <h1>Add Products</h1>
      <form onSubmit={(e) => addProduct(e)}>
        <input placeholder="Insert name" type='text' value={formData.name} onChange={(e) => setFormData({...formData, name:e.target.value})}></input>
        <input placeholder="Insert price" type='number' value={formData.price} onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}></input>
        <input type="submit" value='Add Product'></input>
      </form>
      {mensaje}
    </div>
  );
}