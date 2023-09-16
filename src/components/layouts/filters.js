import { getPriceQueryParams } from "@/helpers/helpers";
import { useRouter } from "next/navigation";
import { useState } from "react";
import StarRatings from "react-star-ratings";

export default function Filter() {
    const [min, setMin] = useState('')
    const [max, setMax] = useState('')
    const router = useRouter()
    let queryParams;
    function handleClick(checkBox) {
        if (typeof window !== "undefined") {
            queryParams = new URLSearchParams(window.location.search);
        }
        const checkBoxes = document.getElementsByName(checkBox.name)
        checkBoxes.forEach((item) => {
            if (item !== checkBox) item.checked = false;
        })
        if (checkBox.checked === false) {
            queryParams.delete(checkBox.name)
        } else {
            if (queryParams.has(checkBox.name)) {
                queryParams.set(checkBox.name, checkBox.value)
            } else {
                queryParams.append(checkBox.name, checkBox.value)
            }
        }
        const path = window.location.pathname + "?" + queryParams.toString();
        router.push(path);
    }
    function handleButtonClick() {
        if (typeof window !== 'undefined') {
            queryParams = new URLSearchParams(window.location.search)
            queryParams = getPriceQueryParams(queryParams, 'min', min)
            queryParams = getPriceQueryParams(queryParams, 'max', max)
            const path = window.location.pathname + "?" + queryParams.toString();
            router.push(path);
        }
    }
    function checkHandler(checkBoxType, checkBoxValue) {
        if (typeof window !== "undefined") {
            queryParams = new URLSearchParams(window.location.search);
        }

        if (typeof window !== "undefined") {
            const value = queryParams.get(checkBoxType);
            if (checkBoxValue === value) return true;
            return false;
        }
    }
    return <div className="w-[100%] md:w-[25rem]"><aside>
        <a
            className="md:hidden mb-5  w-full text-center px-4 py-2 inline-block text-lg text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-600"
            href="#"
        >
            Filter by
        </a>
        <div className="hidden md:block px-6 py-4 border border-gray-200 bg-white rounded shadow-sm">
            <h3 className="font-semibold mb-2">Price (&#8377;)</h3>
            <div className="grid md:grid-cols-3 gap-x-2">
                <div className="mb-4">
                    <input
                        name="min"
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        type="number"
                        placeholder="Min"
                        value={min}
                        onChange={(e)=>setMin(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <input
                        name="max"
                        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
                        type="number"
                        placeholder="Max"
                        value={max}
                        onChange={(e)=>setMax(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <button onClick={handleButtonClick} className="px-1 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
                        Go
                    </button>
                </div>
            </div>
        </div>

        <div className="hidden md:block px-6 py-4 border border-gray-200 bg-white rounded shadow-sm">
            <h3 className="font-semibold mb-2">Category</h3>

            <ul className="space-y-1">
                <li>
                    <label className="flex items-center">
                        <input
                            name="category"
                            type="checkbox"
                            value="Electronics"
                            className="h-4 w-4"
                            defaultChecked={checkHandler("category", "Electronics")}
                            onClick={(e) => handleClick(e.target)}
                        />
                        <span className="ml-2 text-gray-500"> Electronics </span>
                    </label>
                </li>
                <li>
                    <label className="flex items-center">
                        <input
                            name="category"
                            type="checkbox"
                            value="Laptops"
                            className="h-4 w-4"
                            defaultChecked={checkHandler("category", "Laptops")}
                            onClick={(e) => handleClick(e.target)}
                        />
                        <span className="ml-2 text-gray-500"> Laptops </span>
                    </label>
                </li>
                <li>
                    <label className="flex items-center">
                        <input
                            name="category"
                            type="checkbox"
                            value="Toys"
                            className="h-4 w-4"
                            defaultChecked={checkHandler("category", "Toys")}
                            onClick={(e) => handleClick(e.target)}
                        />
                        <span className="ml-2 text-gray-500"> Toys </span>
                    </label>
                </li>
                <li>
                    <label className="flex items-center">
                        <input
                            name="category"
                            type="checkbox"
                            value="Office"
                            className="h-4 w-4"
                            defaultChecked={checkHandler("category", "Office")}
                            onClick={(e) => handleClick(e.target)}
                        />
                        <span className="ml-2 text-gray-500"> Office </span>
                    </label>
                </li>
                <li>
                    <label className="flex items-center">
                        <input
                            name="category"
                            type="checkbox"
                            value="Beauty"
                            className="h-4 w-4"
                            defaultChecked={checkHandler("category", "Beauty")}
                            onClick={(e) => handleClick(e.target)}
                        />
                        <span className="ml-2 text-gray-500"> Beauty </span>
                    </label>
                </li>
            </ul>

            <hr className="my-4" />

            <h3 className="font-semibold mb-2">Ratings</h3>
            <ul className="space-y-1">
                <li>
                    {[5, 4, 3, 2, 1].map((rating) => (
                        <label key={rating} className="flex items-center">
                            <input
                                name="ratings"
                                type="checkbox"
                                value={rating}
                                className="h-4 w-4"
                                defaultChecked={checkHandler("ratings", `${rating}`)}
                                onClick={(e) => handleClick(e.target)}
                            />
                            <span className="ml-2 text-gray-500">
                                {" "}
                                <StarRatings
                                    rating={rating}
                                    starRatedColor="#ffb829"
                                    numberOfStars={5}
                                    starDimension="20px"
                                    starSpacing="2px"
                                    name="rating"
                                />{" "}
                            </span>
                        </label>
                    ))}
                </li>
            </ul>
        </div>
    </aside></div>
}