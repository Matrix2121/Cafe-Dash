import { useState, useEffect } from "react";
import customAPI from "../services/apiClient";
import { Product } from "../types/items";

const useProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllProducts = () => {
    customAPI
      .get(`api/products`)
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
    customAPI
      .get(`api/products/${id}`)
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

  const fetchAllProductByCafeteriaId = (cafeteriaId: number) => {
    customAPI
        .get(`api/products/cafeteria/${cafeteriaId}`)
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

  const fetchAllProductByOrderId = (orderId: number) => {
    customAPI
        .get(`api/products/order/${orderId}`)
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


  return {
    product,
    products,
    fetchAllProducts,
    fetchProductById,
    fetchAllProductByCafeteriaId,
    fetchAllProductByOrderId,
    loading,
    error,
  };
};

export default useProduct;
