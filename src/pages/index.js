import ListProducts from '@/components/listProducts'
import axios from 'axios';
import queryString from 'query-string';
export const getServerSideProps = async(searchParams)=>{
  const urlParams = {
    keyword:searchParams.query.keyword,
    page:searchParams.query.page,
    category:searchParams.query.category,
    'ratings[gte]':searchParams.query.ratings,
    'price[gte]':searchParams.query.min,
    'price[lte]':searchParams.query.max
  }
 const searchQuery = queryString.stringify(urlParams)
 const {data} = await axios.get(`${process.env.API_URL}/api/products?${searchQuery}`);
 return {props:{data}}
}


export default  function Home({data}) {
  
  return (
    <main
    >
      <ListProducts data={data}/>
    </main>
  )
}
