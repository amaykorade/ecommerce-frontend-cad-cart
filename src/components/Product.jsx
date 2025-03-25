import React, { useCallback, useEffect, useRef, useState } from "react";
import ProductCard from "./molecules/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDataThunk,
  fetchFilteredDataThunk,
  clearProducts,
} from "../features/data/dataSlice";
import { message, Select, Slider, Spin, Input } from "antd";
import { Link } from "react-router-dom";
import { Filter, ShoppingCart } from "lucide-react";

export function Product() {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [minRating, setMinRating] = useState(0);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const limit = 5;
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const allCategories = [
    { value: "beauty", label: "Beauty" },
    { value: "fragrances", label: "Fragrances" },
    { value: "furniture", label: "Furniture" },
    { value: "groceries", label: "Groceries" },
    { value: "home-decoration", label: "Home Decoration" },
    { value: "kitchen-accessories", label: "Kitchen Accessories" },
    { value: "laptops", label: "Laptops" },
    { value: "mens-shirts", label: "Men's Shirts" },
    { value: "mens-watches", label: "Men's Watches" },
    { value: "mens-shoes", label: "Men's Shoes" },
    { value: "mobile-accessories", label: "Mobile Accessories" },
    { value: "motorcycle", label: "Motorcycle" },
    { value: "skin-care", label: "Skin Care" },
    { value: "smartphones", label: "Smartphones" },
    { value: "sport-accessories", label: "Sport Accessories" },
    { value: "sunglasses", label: "Sunglasses" },
    { value: "tablets", label: "Tablets" },
    { value: "tops", label: "Tops" },
    { value: "vehicle", label: "Vehicle" },
    { value: "womens-bags", label: "Women's Bags" },
    { value: "womens-dresses", label: "Women's Dresses" },
    { value: "womens-watches", label: "Women's Watches" },
    { value: "womens-shoes", label: "Women's Shoes" },
    { value: "womens-jewellery", label: "Women's Jewellery" },
  ];

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const fetchProducts = useCallback(async () => {
    if (!hasMore || loading) return;
    setLoading(true);

    try {
      let response;
      if (category || searchTerm) {
        response = await dispatch(
          fetchFilteredDataThunk({
            category,
            minPrice: priceRange[0],
            maxPrice: priceRange[1],
            minRating,
            searchTerm,
          })
        ).unwrap();
      } else {
        response = await dispatch(
          fetchDataThunk({
            skip,
            limit,
          })
        ).unwrap();
      }

      if (response.products.length > 0) {
        setProducts((prev) => {
          const newProducts = response.products.filter(
            (newProduct) =>
              !prev.some((existing) => existing.id === newProduct.id)
          );
          return [...prev, ...newProducts];
        });
        setSkip((prev) => prev + limit);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      message.error("Failed to fetch products");
    }
    setLoading(false);
  }, [
    dispatch,
    skip,
    hasMore,
    loading,
    category,
    priceRange,
    minRating,
    searchTerm,
  ]);

  useEffect(() => {
    setProducts([]);
    setSkip(0);
    setHasMore(true);
    fetchProducts();
  }, [category, priceRange, minRating, searchTerm]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 100 &&
        !loading &&
        hasMore
      ) {
        fetchProducts();
        // const interval = setInterval(fetchProducts, 60000);
        // return () => clearInterval(interval);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchProducts]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const cartLen = JSON.parse(localStorage.getItem("cart")) || [];
  const cartSize = cartLen.length;
  console.log("cartSize", cartSize);

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Product Catalog</h1>
          <Link to="/cart" className="relative">
            <div className="bg-amber-600 text-white rounded-full p-2 hover:bg-amber-700 transition">
              <ShoppingCart className="h-6 w-6" />
              {cartSize > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-24 flex">
        <div className="w-64 pr-6 hidden md:block sticky top-24 h-fit">
          <div className="bg-white border rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
              <Filter className="mr-2 h-5 w-5" />
              Filters
            </h2>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">
                Search Products
              </label>
              <div className="relative">
                <Input
                  placeholder="Search by name or tags"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Category</label>
              <Select
                placeholder="Select Category"
                className="w-full"
                value={category}
                onChange={(value) => setCategory(value)}
                allowClear
              >
                {allCategories.map((cat) => (
                  <Select.Option key={cat.value} value={cat.value}>
                    {cat.label}
                  </Select.Option>
                ))}
              </Select>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <Slider
                range
                min={0}
                max={100000}
                step={50}
                value={priceRange}
                onChange={(value) => setPriceRange(value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                Minimum Rating: {minRating.toFixed(1)}
              </label>
              <Slider
                min={0}
                max={5}
                step={0.1}
                value={minRating}
                onChange={(value) => setMinRating(value)}
              />
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>

          {loading && (
            <div className="col-span-full text-center py-10">
              <Spin size="large" />
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500 text-lg">No products found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
