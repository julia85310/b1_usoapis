export default async function ProductsPage() {
  const res = await fetch("http://localhost:3000/api/products");
  const products = await res.json();

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}