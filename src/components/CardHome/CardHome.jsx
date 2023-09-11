import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/actionsUsers";
import { formatCurrency } from "../../../utils/format";
import Detail from "./../../views/Detail/Detail";

export const Card = ({ producto }) => {
  const dispatch = useDispatch();
  const [productoEnCarrito, setProductoEnCarrito] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToCart = () => {
    setProductoEnCarrito(producto, () => {
      console.log("Producto agregado al carrito:", productoEnCarrito);
    });
    dispatch(addToCart({ producto, quantity }));
    window.alert("Se ha agregado el producto al carrito exitosamente");
  };

  return (
    <div className="mt-16 p-2 bg-transparent relative duration-1000 flex flex-col justify-center items-center h-[300px] max-w-[16rem] group">
      <div className="flex flex-col bg-white w-full h-auto border-2 rounded-lg shadow-xl items-center text-center transition-transform transform-gpu group-hover:scale-105 group-hover:rotate-2">
        <button onClick={() => setIsModalOpen(true)}>
          <img
            className="my-6 w-28 h-28"
            src={producto.Images[2]?.url || producto.Images[0]?.url}
            alt={producto.nombre}
          />
        </button>
        <p className="text-black text-7 font-semibold h-20 pt-4 text-sm">
          {producto.nombre}
        </p>
        <h5 className="mb-4 h-4 text-xl text-blue-700">
          $ {formatCurrency(Math.floor(producto.precio))}
        </h5>
      </div>
      <button
        className="mt-4 bg-blue-700 hover:bg-blue-500 animate-pulse text-white font-bold py-2 px-4 rounded-full"
        onClick={handleAddToCart}
      >
        AGREGAR AL CARRITO
      </button>
      {isModalOpen && (
        <Detail
          key={producto.id_producto}
          setOpen={setIsModalOpen}
          producto={producto}
        />
      )}
    </div>
  );
};
