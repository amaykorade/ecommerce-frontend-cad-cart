import apiClient from './apiClient';


export const getProducts = async ({ skip, limit }) => {
    try {
        const response = await apiClient.get(`/products`, {
            params: { skip, limit }
        });
        console.log("API Raw Response:", response.data); // Log API response
        return response.data || { products: [] };
    } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Failed to fetch products");
    }
};

export const getProductDetails = async (productId) => {
    try {
        const response = await apiClient.get(`/products/${productId}`);
        console.log("API Raw Response:", response.data); // Log API response
        return response.data || { products: [] };
    } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Failed to fetch products");
    }
};

// export const getProductsFilter = async ({ category, minPrice, maxPrice, minRating, searchTerm }) => {
//     try {
//         let url = category ? `/products/category/${category}` : `/products`;

//         const response = await apiClient.get(url);
//         console.log("Filtered API Response:", response.data);
//         console.log(minRating);

//         const filteredProducts = response.data.products.filter(
//             (product) => {
//                 return (!minPrice || product.price >= minPrice) &&
//                     (!maxPrice || product.price <= maxPrice) &&
//                     (!minRating || product.rating >= minRating)
//             }
//         );

//         console.log(filteredProducts);

//         return { products: filteredProducts };
//     } catch (error) {
//         console.error("Error fetching filtered products:", error);
//         throw new Error("Failed to fetch filtered products");
//     }
// };

export const getProductsFilter = async ({ category, minPrice, maxPrice, minRating, searchTerm }) => {
    try {
        let url = "/products";

        if (searchTerm != undefined) {
            url = `/products/search?q=${searchTerm}`;
        } else if (category) {
            url = `/products/category/${category}`;
        }

        const response = await apiClient.get(url);
        console.log("Filtered API Response:", response.data);

        // Filter products based on category (if searchTerm was used)
        const filteredProducts = response.data.products.filter((product) => {
            return (!category || product.category === category) &&
                (!minPrice || product.price >= minPrice) &&
                (!maxPrice || product.price <= maxPrice) &&
                (!minRating || product.rating >= minRating);
        });

        console.log(filteredProducts);

        return { products: filteredProducts };
    } catch (error) {
        console.error("Error fetching filtered products:", error);
        throw new Error("Failed to fetch filtered products");
    }
};

