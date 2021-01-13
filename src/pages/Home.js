import { Cards } from "../components/Cards";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CreateProduct } from "../components/CreateProduct";
import { useSelector } from "react-redux";

export default function Home() {
  const [openCreateForm, setCreateForm] = useState(false);

  const { products } = useSelector((state) => state.home);
  
  const handleCreateForm = () => {
    setCreateForm(true);
  };

  return (
    <div className="flex w-full flex-col items-center bg-gray-200 md:bg-gray-100">
      {openCreateForm && <CreateProduct setCreateForm={setCreateForm} />}

      <ul className="mt-14 flex w-full flex-col items-center justify-evenly sm:flex-row sm:justify-evenly sm:flex-wrap sm:px-14">
        {products.map((product) => {
          return (
            <li key={product.id}>
              <Link to={`products/?pr=${product.id}`}>
                <Cards {...product} />
              </Link>
            </li>
          );
        })}
      </ul>

      <button
        onClick={handleCreateForm}
        className="rounded-full bg-gray-800 grid place-items-center fixed bottom-2 right-2 w-10 h-10 text-white shadow-lg outline-none md:bottom-6 md:right-6 md:w-14 md:h-14 md:text-xl"
      >
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
}
