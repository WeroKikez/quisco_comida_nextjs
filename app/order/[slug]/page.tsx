import ProductCard from "@/components/products/ProductCard"
import { prisma } from "@/src/lib/prisma"

async function getProducts(slug : string) { 
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: slug
      }
    }
  })

  return products
}

export default async function OrderPage({params} : { params: { slug: string } }) {
  const products = await getProducts(params.slug)
  
  return (
    <>
    <h1 className="text-2xl my-10">Elige y Personaliza tu Pedido a Continuación</h1>

    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 items-start">
      {products.map( product => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div> 
    </>
  )
}
