'use client'

import { updateProduct } from "@/actions/update-product-action"
import { ProductSchema } from "@/src/schema"
import { useParams, useRouter } from "next/navigation"
import { ReactNode } from "react"
import { toast } from "react-toastify"


export default function EditProductForm({children} : { children : ReactNode }) {
    const router = useRouter()
    const params = useParams()
    const id = +params.id!

    const handleSubmit = async ( formData : FormData ) => {    
        const data = {
            name: formData.get('name'),
            price: formData.get('price'),
            categoryId: formData.get('categoryId'),
            image: formData.get('image')
        }
        const result = ProductSchema.safeParse(data)

        if(!result.success) return result.error.issues.forEach( issue => toast.error(issue.message) )

        const response = await updateProduct(result.data, id)  
        if(response?.errors) return response.errors.forEach( error => toast.error(error.message) )

        toast.success('Producto Actualizado Correctamente')

        router.push('/admin/products')
    }
    
  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
        <form 
            className="space-y-5"
            action={handleSubmit}
        >
            {children}

            <input 
                type="submit" 
                className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                value={"Guardar Cambios"}
            />
        </form>
    </div>
  )
}