'use client'

import { useStore } from "@/src/store"
import ProductDetails from "./ProductDetails"

export default function OrderSummary() {
  const order = useStore(state => state.order)

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-54 lg:w-96 p-5">
      <h1 className="text-4xl font-black text-center">Mi Pedido</h1>

      {order.length === 0 ? (
        <p className="text-center mt-10">Carrito Vacio</p>
      ) : (
        <div className="mt-5">
          {order.map( item => (
            <ProductDetails
              key={item.id} 
              item={item}
            />
          ))}
        </div>
      )}
    </aside>
  )
}