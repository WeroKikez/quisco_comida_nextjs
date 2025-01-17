'use client'

import { useStore } from "@/src/store"
import ProductDetails from "./ProductDetails"
import { useMemo } from "react"
import { formatCurrency } from "@/src/utils"
import { createOrder } from "@/actions/create-order-action"
import { OrderSchema } from "@/src/schema"
import { toast } from "react-toastify"

export default function OrderSummary() {
  const order = useStore(state => state.order)
  const clearOrder = useStore(state => state.clearOrder)

  const total = useMemo(() => order.reduce( (total, item) => total + (item.quantity * item.price), 0 ), [order])

  const handleCreateOrder = async (formData : FormData) => {
    const data = {
      name: formData.get('name'),
      total,
      order
    }

    // Validación del cliente
    const result = OrderSchema.safeParse(data)
    if(!result.success) return result.error.issues.forEach( (issue) => toast.error(issue.message) )
    
    // Validación del server
    const response = await createOrder(data)
    if(response?.errors) return response.errors.forEach( (error) => toast.error(error.message) )

    toast.success('Pedido Creado Correctamente')
    clearOrder()
  }

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-54 lg:w-96 p-5">
      <h1 className="text-4xl font-black text-center">Mi Pedido</h1>

      {order.length === 0 ? (
        <p className="text-center mt-10">El Pedido Vacio</p>
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

          <form
            className="w-full mt-10 space-y-5"
            action={handleCreateOrder}
          >
            <input 
              type="text" 
              placeholder="Tu Nombre"
              className="bg-white border border-gray-100 p-2 w-full"
              name="name"
            />

            <input 
              type="submit"
              className="py-2 rounded uppercase text-white bg-black w-full text-center cursor-pointer font-bold"
              value={'Confirmar Pedido'}
            />
          </form>
        </div>
      )}
    </aside>
  )
}