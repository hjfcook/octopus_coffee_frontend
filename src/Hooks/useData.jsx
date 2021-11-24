import { useState, useCallback, useEffect } from "react";

function useData(dataType) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortingField, setSortingField] = useState("");
  const [ascending, setAscending] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const dataRead = await (
      await fetch(`http://localhost:3000/api/${dataType}`, {
        credentials: "include",
      })
    ).json();
    setIsLoading(false);
    if (dataRead.status === "success") {
      setData(dataRead.data);
    }
    console.log(dataRead);
    return dataRead;
  }, [dataType]);

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
    setData((prevProducts) => [...prevProducts].sort(comparison));
  }, [sortingField, ascending]);

  useEffect(() => {
    productSort();
  }, [productSort]);

  return [
    data,
    setData,
    isLoading,
    setIsLoading,
    sortingField,
    setSortingField,
    ascending,
    setAscending,
    fetchData,
  ];
}

export default useData;
