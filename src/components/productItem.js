import { useCartStateValue } from "@/context/cartContext";
import Image from "next/image";
import Link from "next/link";
import StarRatings from "react-star-ratings";

export default function ProductItem({ product }) {
  let instock = product.stock >= 1;
  const { addItemToCart } = useCartStateValue()
  const addToCartHandler = () => {
    addItemToCart({
      product: product._id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      image: product.images[0]?.url,
      seller: product.seller
    })
  }
  return <div><article className="border border-gray-200 overflow-hidden bg-white shadow-sm rounded mb-5">
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/4 flex p-3">
        <div
          style={{
            width: "80%",
            height: "70%",
            position: "relative",
          }}
        >
          <Image
            src={
              product?.images[0]
                ? product?.images[0].url
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2t6m3Xlz6rWk1AqrRgcu9B0bDOSlChlMHI1kpaJfWqMTnauZe81JrrIr_PJMjOC2tYpA&usqp=CAU"
            }
            alt="product name"
            height="240"
            width="240"
          />
        </div>
      </div>
      <div className="md:w-2/4">
        <div className="p-4">
          <Link
            href={`/product/${product._id}`}
            className="hover:text-blue-600"
          >
            {product.name}
          </Link>
          <div className="flex flex-wrap items-center space-x-2 mb-2">
            <div className="ratings">
              <div className="my-1">
                <StarRatings
                  rating={product?.ratings}
                  starRatedColor="#ffb829"
                  numberOfStars={5}
                  starDimension="18px"
                  starSpacing="1px"
                  name="rating"
                />
              </div>
            </div>
            <b className="text-gray-300">•</b>
            <span className="ml-1 text-yellow-500">{product?.ratings}</span>
          </div>
          <p className="text-gray-500 mb-2">
            {product?.description.substring(0, 150)}...
          </p>
          {product?.stock > 0 ? <p className="text-green-500 mb-2">In stock</p> : <p className="text-red-500 mb-2">Out of stock</p>}
        </div>
      </div>
      <div className="md:w-1/4 border-t lg:border-t-0 lg:border-l border-gray-200">
        <div className="p-5">
          <span className="text-xl font-semibold text-black">
          &#8377;{product?.price}
          </span>

          <p className="text-green-500">Free Shipping</p>
          <div className="my-3">
            <a  style={{ pointerEvents: !instock ? 'none' : ''}} onClick={addToCartHandler} className="px-4 py-2 inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 cursor-pointer">
              {" "}
              Add to Cart{" "}
            </a>
          </div>
        </div>
      </div>
    </div>
  </article></div>
}