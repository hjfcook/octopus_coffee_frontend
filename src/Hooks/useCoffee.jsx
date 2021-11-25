import { useState, useCallback, useEffect } from "react";

function useCoffee() {
  const [coffeeProducts, setCoffeeProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortingField, setSortingField] = useState("");
  const [ascending, setAscending] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    // const dataRead = await (await fetch('http://localhost:3000/api/coffee')).json();
    const dataRead = await (
      await fetch("http://192.168.0.23:3000/api/coffee")
    ).json();
    setIsLoading(false);
    if (dataRead.status === "success") {
      setCoffeeProducts(dataRead.data);
    }
    return dataRead;
  }, []);

  const productSort = useCallback(() => {
    function comparison(a, b) {
      if (a[sortingField] < b[sortingField]) {
        return ascending ? -1 : 1;
      }
      if (a[sortingField] > b[sortingField]) {
        return ascending ? 1 : -1;
      }
      return 0;
    }
    setCoffeeProducts((prevProducts) => [...prevProducts].sort(comparison));
  }, [sortingField, ascending]);

  useEffect(() => {
    productSort();
  }, [productSort]);

  return [
    coffeeProducts,
    setCoffeeProducts,
    isLoading,
    setIsLoading,
    sortingField,
    setSortingField,
    ascending,
    setAscending,
    fetchData,
  ];
}

export default useCoffee;
