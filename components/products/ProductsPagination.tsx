import Link from "next/link";

type ProductsPaginationProps = {
    page: number,
    totalPages: number
}

export default function ProductsPagination({page, totalPages} : ProductsPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)      

  return (
    <nav className="flex justify-center py-10">
        {page > 1 && (
            <Link
                href={`/admin/products?page=${page - 1}`}
                className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
            >&laquo;</Link>
        )}

        {pages.map( currentPage => (
            <Link
                key={currentPage}
                className={`${currentPage === page ? 'font-black bg-amber-400 text-white' : 'bg-white text-black'} px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
                href={`/admin/products?page=${currentPage}`}
            >{currentPage}</Link>
        ))}

        {page < totalPages && (
            <Link
                href={`/admin/products?page=${page + 1}`}
                className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0"
            >&raquo;</Link>
        )}
    </nav>
  )
}