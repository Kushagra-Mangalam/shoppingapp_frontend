import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { useMyContext } from "../context/Mycontext";

const ProfilePage = () => {
  const { setCount } = useMyContext();
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState(-1);

  const getData = async () => {
    try {
      const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products`, {
        method: "GET",
      });
      const result = await resp.json();
      console.log("Result-->", result);
      setProducts(result.data.products);
    } catch (err) {
      console.log("error while getting products-->", err.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const title = e.target.title.value;
      const price = e.target.price.value;
      const description = e.target.description.value;
      const quantity = e.target.quantity.value;

      const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products`, {
        method: "POST",
        body: JSON.stringify({
          title: title,
          price: price,
          description,
          quantity,
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      if (resp.status == "201") {
        alert("Product added");
        getData();
        console.log(resp);
      } else {
        const result = await resp.json();
        alert(`invalid data : ${result.message}`);
      }
    } catch (err) {
      console.log("cannot create product----->", err.message);
      alert(`cannot create rpodict:${err.message}`);
    }
  };

  const handleEditProduct = async (productID) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/products/${productID}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            price: updatedPrice,
          }),
          headers: { "content-type": "application/json" },
        }
      );

      if (res.status === 200) {
        alert("product updated");
        setEditId("");
        getData();
      } else {
        const result = await res.json();
        alert("error while updating product:", result.message);
      }
    } catch (err) {
      alert("cannot update:", err.message);
      console.log("cannot update product", err.message);
    }
  };

  return (
    <div>
      <Navbar />

      <div>
        <form
          onSubmit={handleSubmit}
          className="mx-auto   flex flex-col gap-5 p-6 bg-blue-200 max-w-150"
        >
          <div className="flex gap-4">
            <label>Title:</label>
            <input
              name="title"
              type="text"
              className="border-1 py-1 px-2 rounded-md justify-between"
            ></input>
          </div>
          <div className="flex gap-4">
            <label>Price:</label>
            <input
              name="price"
              type="number"
              className="border-1 py-1 px-2 rounded-md "
            ></input>
          </div>
          <div className="flex gap-4">
            <label>Description:</label>
            <input
              name="description"
              type="text"
              className="border-1 py-1 px-2 rounded-md "
            ></input>
          </div>
          <div className="flex gap-4">
            <label>Quantity:</label>
            <input
              name="quantity"
              type="number"
              className="border-1 py-1 px-2 rounded-md "
            ></input>
          </div>
          <button className="border-1 py-1 px-2 rounded-md">Add product</button>
        </form>
      </div>

      <div className="flex flex-wrap gap-6 justify-center">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-gradient-to-r from-emerald-400 to-amber-700 shadow-md rounded-lg p-6 w-64 flex flex-col items-center transition-transform hover:scale-105"
          >
            <div className="text-lg font-semibold mb-2">{product.title}</div>
            {product._id === editId ? (
              <>
                <input
                  value={updatedPrice}
                  onChange={(e) => {
                    setUpdatedPrice(e.target.value);
                  }}
                  className="py-1 px-2 border-1 rounded-md"
                ></input>
                <button
                  onClick={() => {
                    setEditId("");
                  }}
                  className="py-1 px-2 border-1 rounded-md"
                >
                  cancel
                </button>
                <button
                  onClick={() => {
                    handleEditProduct(product._id);
                  }}
                >
                  Update
                </button>
              </>
            ) : (
              <>
                <div className="text-gray-700 mb-4">Rs.{product.price}</div>
                <div className="text-gray-700 mb-4">{product.description}</div>
                <button
                  onClick={() => {
                    setEditId(product._id);
                    setUpdatedPrice(product.price);
                  }}
                  className="py-1 px2 border-1 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setCount((prev) => prev + 1);
                  }}
                  className="py-1 px2 border-1 rounded-md"
                >
                  ++
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export { ProfilePage };
