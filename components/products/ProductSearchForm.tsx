'use client'

import { SearchSchema } from "@/src/schema"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

export default function ProductSearchForm() {
  const router = useRouter()

  const handleSearchForm = (formData : FormData) => {
    
    const data = {
      search: formData.get('search')
    }
    
    const result = SearchSchema.safeParse(data)
    
    if(!result.success) return result.error.issues.forEach( issue => toast.error(issue.message) )
      
    router.push(`/admin/products/search?search=${result.data.search}`)
  }  
    
  return (
      <form
      action={handleSearchForm}
        className="flex items-center" 
    >
        <input 
            type="text" 
            placeholder="Buscar Producto"
            className="p-2 placeholder-gray-400 w-full"
            name="search"
        />

        <input 
            type="submit" 
            value={'Buscar'}
            className="bg-indigo-600 p-2 uppercase text-white font-bold cursor-pointer"
        />

    </form>
  )
}