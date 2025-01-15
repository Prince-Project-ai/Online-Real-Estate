const ecommerceSystem = {
  users: [
    {
      userId: 1,
      name: "Alice",
      email: "alice@example.com",
      orders: [
        {
          orderId: 101,
          date: "2025-01-10",
          items: [
            { productId: 201, quantity: 2 },
            { productId: 202, quantity: 1 }
          ],
          total: 150.5
        },
        {
          orderId: 102,
          date: "2025-01-11",
          items: [
            { productId: 203, quantity: 1 }
          ],
          total: 45.0
        }
      ]
    },
    {
      userId: 2,
      name: "Bob",
      email: "bob@example.com",
      orders: []
    }
  ],
  products: [
    { productId: 201, name: "Laptop", price: 1000, stock: 5 },
    { productId: 202, name: "Mouse", price: 50, stock: 10 },
    { productId: 203, name: "Keyboard", price: 45, stock: 15 }
  ],
  reviews: [
    { productId: 201, userId: 1, rating: 5, comment: "Excellent product!" },
    { productId: 202, userId: 1, rating: 4, comment: "Good value for money." }
  ]
};

function addNewUser(name, email) {
  const user = {
    userId: Math.random(),
    name,
    email,
    orders: [],
  }
  ecommerceSystem.users.push(user);
}

// alice want to buy
// 3 keyboard,
// 1 mouse,

// in this case check the stock available ot not

function stockAvailablity(proId, requiresStock) {
  const products = ecommerceSystem.products;

  const availablity = products.map((product) => {
    if (product.productId === proId) {
      return product.stock < requiresStock ? "Stock Not Available" : product.stock;
    }
  });
  return availablity;
}

console.log(stockAvailablity(201, 6));
