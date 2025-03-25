import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProductDetails, getProducts, getProductsFilter } from "../../services/dataApi";

export const fetchDataThunk = createAsyncThunk(
    "data/fetchAllProducts",
    async ({ skip, limit, category, minPrice, maxPrice, minRating }, { rejectWithValue }) => {
        try {
            const response = await getProducts({ skip, limit });

            // if (category) {
            //     response = await getProductsFilter({ category });

            //     if (!response || !Array.isArray(response.products)) {
            //         return rejectWithValue("Invalid API response format");
            //     }

            //     // Apply filtering **AFTER** fetching category products
            //     response.products = response.products.filter(
            //         (product) =>
            //             (!minPrice || product.price >= minPrice) &&
            //             (!maxPrice || product.price <= maxPrice) &&
            //             (!minRating || product.rating >= minRating)
            //     );
            // } else {
            //     response = await getProducts({ skip, limit });
            // }

            // if (!response || !Array.isArray(response.products)) {
            //     return rejectWithValue("Invalid API response format");
            // }

            return response;
        } catch (error) {
            return rejectWithValue(error.message || "Failed to fetch products");
        }
    }
);


export const fetchDetailThunk = createAsyncThunk(
    "data/fetchProductDetail",
    async (productId, { rejectWithValue }) => {
        try {
            const response = await getProductDetails(productId);

            return response;
        } catch (error) {
            return rejectWithValue(error.message || "Failed to fetch products");
        }
    }
);

export const fetchFilteredDataThunk = createAsyncThunk(
    "data/fetchFilteredProducts",
    async ({ category, minPrice, maxPrice, minRating, searchTerm }, { rejectWithValue }) => {
        try {
            const response = await getProductsFilter({ category, minPrice, maxPrice, minRating, searchTerm });

            if (!response || !Array.isArray(response.products)) {
                return rejectWithValue("Invalid API response format");
            }

            return response;
        } catch (error) {
            return rejectWithValue(error.message || "Failed to fetch filtered products");
        }
    }
);



const dataSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearProducts: (state) => {
            state.products = [];
            state.loading = false;
            state.error = null;
            state.page = 1;
            state.hasMore = true;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all products
            .addCase(fetchDataThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDataThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products || [];
            })
            .addCase(fetchDataThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message || "Failed to fetch products";
            })

            .addCase(fetchFilteredDataThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFilteredDataThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products || [];
            })
            .addCase(fetchFilteredDataThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message || "Failed to fetch filtered products";
            });
    },
});

export const { clearProducts } = dataSlice.actions;
export default dataSlice.reducer;
