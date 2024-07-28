import EditProductForm from "@/components/products/EditProductForm"
import ProductForm from "@/components/products/ProductForm"
import GoBackButton from "@/components/ui/GoBackButton"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import { notFound } from "next/navigation"


async function getProductById(id : number) {
    const product = await prisma.product.findUnique({
        where: {
            id: id
        }
    })

    return product
}

export default async function EditProductPage({params} : { params: { id: string }}) {
  const product = await getProductById(+params.id)
  
  if(!product) notFound()

  return (
    <>

    <Heading><span className="font-black">Editar Producto:</span> {product.name}</Heading>

    <GoBackButton />

    <EditProductForm>
        <ProductForm
            product={product}
        />
    </EditProductForm>
    </>
  )
}