import { useState, useEffect } from "react";

export default function Shoppingcompo() {
  const [category, setcategory] = useState([]);
  const [product, setproduct] = useState([]);
  const [cartItems, setcartItems] = useState([]);
  const [itemsCount, setItemsCount] = useState([]);

  function LoadCategory() {
    fetch("https://fakestoreapi.com/products/categories")
      .then((response) => response.json())
      .then((data) => {
        data.unshift("all");
        setcategory(data);
      });
  }
  function LoadProduct(url) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setproduct(data);
      });
  }
  useEffect(() => {
    LoadCategory();
    LoadProduct("http://fakestoreapi.com/products");
  }, [cartItems.length]);
  function handleCategoryChange(e) {
    if (e.product.value == "all") {
      LoadProduct("http://fakestoreapi.com/products");
    } else {
      LoadProduct(
        `https://fakestoreapi.com/products/category/${e.target.value}`
      );
    }
  }
  function handleAddtocart(e) {
    fetch(`http://fakestoreapi.com/products/ ${e.target.id}`)
      .then((response) => response.json())
      .then((data) => {
        cartItems.push(data);
        GetCartItemsCount();
      });
    function GetCartItemsCount() {
      setItemsCount(cartItems.length);
    }
  }
  return (
    <div className="container-fluid">
      <header className="bg-danger text-white text-center p-2">
        <h1>
          <span className="bi bi-cart"></span> Shopping Home
        </h1>
      </header>
      <section className="row mt-3  ">
        <nav className="col-2">
          <div>
            <label> select a category</label>
            <div>
              <select onChange={handleCategoryChange} className="form-select">
                {category.map((category) => (
                  <option value={category} key={category}>
                    {category.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </nav>
        <main
          className="col-8 d-flex flex-wrap overflow-auto"
          style={{ height: "600px" }}
        >
          {product.map((product) => (
            <div key={product.id} className="card m-2 p-2 w-25">
              <img src={product.image} className="card-img-top" height="150" />
              <div className="card-header" style={{ height: "160px" }}>
                <p>{product.title}</p>
              </div>
              <div className="card-body">
                <dl>
                  <dt>Price</dt>
                  <dd>{product.price}</dd>
                  <dt>Rating</dt>
                  <dd>
                    <span className="bi bi-star-fill text-success"></span>
                    {product.rating.rate} <span>[{product.rating.count}]</span>
                  </dd>
                </dl>
              </div>
              <div className="card-footer">
                <button
                  id={product.id}
                  onClick={handleAddtocart}
                  className="btn btn-danger w-100"
                >
                  <span className="bi bi-cart4"></span> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </main>
        <aside className="clo-2">
          <button className="btn btn-danger w-100">
            <span className="bi bi-cart3"> </span>[{itemsCount}] Your cart Items
          </button>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Preview</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>
                    <img src={item.image} width="50" height="50" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </aside>
      </section>
    </div>
  );
}
