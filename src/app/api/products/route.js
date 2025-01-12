let products = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Smartphone", price: 600 },
  { id: 3, name: "Tablet", price: 400 },
];

export async function GET() {
  return new Response(JSON.stringify(products), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newProduct = {
      id: products.length + 1,
      ...body,
    };

    if (!newProduct.name || !newProduct.price) {
      return new Response(
        JSON.stringify({ error: "Name and price are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    products.push(newProduct);
    return new Response(
      JSON.stringify({ message: "Product added successfully", product: newProduct }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Invalid request" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
}

    
