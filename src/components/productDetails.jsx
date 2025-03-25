import React, { use, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchDataThunk, fetchDetailThunk } from "../features/data/dataSlice";
import { CheckCircle, ShoppingCart, Star, XCircle } from "lucide-react";
import { Spin } from "antd";

export default function ProductDetails() {
  const dispatch = useDispatch();

  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  const [currentImage, setCurrentImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchDetailThunk(productId)).then((response) => {
      setProduct(response.payload);
      fetchRelatedProducts(response.payload.category);
    });
  }, [productId]);

  const fetchRelatedProducts = async (category) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/category/${category}`
      );
      const data = await response.json();
      setRelatedProducts(data.products);
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

  console.log("product", product);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  const RelatedProductCard = ({ product }) => (
    <div className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-2">
      <img
        src={product.thumbnail}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-2 truncate">
          {product.title}
        </h3>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1">
            {renderStars(product.rating)}
            <span className="text-xs text-gray-600">({product.rating})</span>
          </div>
          <span className="text-sm font-bold text-amber-600">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <button className="mt-3 w-full bg-blue-50 text-amber-600 py-2 rounded-lg hover:bg-amber-100 transition text-sm">
          Add to Cart
        </button>
      </div>
    </div>
  );

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < Math.floor(rating) ? "text-yellow-500" : "text-gray-300"
        }`}
        fill={index < Math.floor(rating) ? "#FFC107" : "none"}
      />
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-4">
          <div className="border rounded-lg overflow-hidden">
            <img
              src={product.images[currentImage]}
              alt={product.name}
              className="w-full h-[500px] object-cover"
            />
          </div>

          <div className="flex space-x-2">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`w-20 h-20 object-cover cursor-pointer border-2 ${
                  currentImage === index
                    ? "border-amber-500"
                    : "border-transparent"
                }`}
                onClick={() => setCurrentImage(index)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>

            <div className="flex items-center space-x-2 mb-4">
              <div className="flex">{renderStars(product.rating)}</div>
              <span className="text-gray-600">
                ({product.reviews.length} reviews)
              </span>
            </div>

            <div className="text-3xl font-semibold text-amber-600 mb-4">
              ${product.price.toFixed(2)}
            </div>

            <div className="flex items-center space-x-2 mb-4">
              {product.availabilityStatus == "In Stock" ? (
                <>
                  <CheckCircle className="text-green-500 h-6 w-6" />
                  <span className="text-green-600">
                    In Stock ({product.stockQuantity} available)
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="text-red-500 h-6 w-6" />
                  <span className="text-red-600">Out of Stock</span>
                </>
              )}
            </div>

            <p className="text-gray-700 mb-6">{product.description}</p>

            <button
              className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition flex items-center justify-center space-x-2"
              disabled={product.availabilityStatus !== "In Stock"}
            >
              <ShoppingCart className="h-5 w-5" />
              <span>
                {product.availabilityStatus == "In Stock"
                  ? "Add to Cart"
                  : "Out of Stock"}
              </span>
            </button>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
            <div className="space-y-4">
              {product.reviews.map((review, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    {renderStars(review.rating)}

                    <span className="text-gray-600">
                      {" "}
                      {review.reviewerName}{" "}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-700">{review.comment}</p>
                    <span className="text-gray-600"> {review.date} </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Similar Products
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {relatedProducts.map((relatedProduct) => (
            <Link to={`/product/${relatedProduct.id}`} key={relatedProduct.id}>
              <RelatedProductCard
                key={relatedProduct.id}
                product={relatedProduct}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
