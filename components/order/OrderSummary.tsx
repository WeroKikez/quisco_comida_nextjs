'use client'

import { useStore } from "@/src/store"
import ProductDetails from "./ProductDetails"
import { useMemo } from "react"
import { formatCurrency } from "@/src/lib/utils"

export default function OrderSummary() {
  const order = useStore(state => state.order)
  const total = useMemo(() => order.reduce( (total, item) => total + (item.quantity * item.price), 0 ), [order])

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

          <p className="text-2xl mt-20 text-center">
            Total a Pagar: {''}
            <span className="font-bold">{formatCurrency(total)}</span>
          </p>
        </div>
      )}
    </aside>
  )
}