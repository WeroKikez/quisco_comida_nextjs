import { completeOrder } from "@/actions/complete-order-action"
import { formatCurrency } from "@/src/lib/utils"
import { OrderWithProducts } from "@/src/types"

type OrderCardProps = {
    order: OrderWithProducts
}

export default function OrderCard({ order } : OrderCardProps) {
    return (
        <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6  lg:mt-0 lg:p-8 space-y-4 flex flex-col justify-between"
        >
            <div>
                <p className='text-2xl font-medium text-gray-900'><span className="font-black">Cliente:</span> {order.name}</p>
                <p className='text-lg font-medium text-gray-900'>Productos Ordenados: </p>
                <dl className="mt-6 space-y-4">
                    {order.orderProducts.map ( product => (
                        <div key={product.id} 
                            className="flex items-center border-t border-gray-200 pt-4 last-of-type:border-b last-of-type:pb-4"
                        >
                            <dt className="flex items-center text-sm text-gray-600">
                                <span className="font-black">({product.quantity}) </span>
                            </dt>
                            <dd className="text-sm font-medium text-gray-900">{product.product.name}</dd>
                        </div>
                    ))}
                </dl>
            </div>

            <div>
                <div className="flex items-center justify-between pt-4">
                    <dt className="text-base font-medium text-gray-900">Total a Pagar: {formatCurrency(order.total)}</dt>
                    <dd className="text-base font-medium text-gray-900">{}</dd>
                </div>
                <form action={completeOrder}>
                    <input 
                        type="hidden"
                        value={order.id}
                        name="order_id"
                    />

                    <input
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer "
                        value='Marcar Orden Completada'
                    />
                </form>
            </div>                    
        </section>
    )
}