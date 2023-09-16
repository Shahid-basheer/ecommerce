import CustomPagination from "./layouts/pagination";
import Filter from "./layouts/filters";
import ProductItem from "./productItem";


export default function ListProducts({data}){
    
return <section className="py-12">
<div className="containe p-3">
  <div className="w-full flex flex-col md:flex-row -mx-4 p-3">
    <Filter />
    <main className="px-3 w-full flex-grow">
        {data?.products?.map((product,id)=>(
        <ProductItem key={id} product={product} />
        ))}
        <CustomPagination
        resPerPage={data.resPerPage}
        filteredProductsCount={data.filteredProductsCount}
        />
    </main>
  </div>
</div>
</section>
}