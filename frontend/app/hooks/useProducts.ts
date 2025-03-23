import { useState, useEffect } from "react";
import api from "../services/apiClient";
import { Product } from "../types/items";
import { url } from "@/app/common/constants";

const useProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllProducts = () => {
    api
      .get(`${url}api/products`)
      .then((response) => {
        const allProducts = response.data;
        setProducts(allProducts);
        setLoading(false);
      })
      .catch((error) => {
        setError(
          error?.response?.data?.message ||
            error.message ||
            "Something went wrong"
        );
        setLoading(false);
      });
  };

  const fetchProductById = (id: number) => {
    api
      .get(`${url}api/products/${id}`)
      .then((response) => {
        const product = response.data;
        setProduct(product);
        setLoading(false);
      })
      .catch((error) => {
        setError(error?.response?.data?.message || error);
        setLoading(false);
      });
  };

  return {
    product,
    products,
    fetchAllProducts,
    fetchProductById,
    loading,
    error,
  };
};

export default useProduct;
