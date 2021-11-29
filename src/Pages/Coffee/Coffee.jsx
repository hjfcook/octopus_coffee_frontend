import styles from "./Coffee.module.css";
import Header from "../../Components/Header/Header.jsx";
import CoffeeSlot from "../../Components/CoffeeSlot/CoffeeSlot.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import CoffeeSpotlight from "../../Components/CoffeeSpotlight/CoffeeSpotlight.jsx";

// import {useState, useEffect, useCallback} from 'react';
import { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import useCoffee from "../../Hooks/useCoffee";
import logo from "../../Images/logo.png";

function CoffeePage() {
  // const [
  //   coffeeProducts, setCoffeeProducts,
  //   isLoading, setIsLoading,
  //   sortingField, setSortingField,
  //   ascending, setAscending,
  //   fetchData,
  // ] = useCoffee();
  const [
    coffeeProducts,
    setCoffeeProducts,
    isLoading,
    ,
    ,
    setSortingField,
    ,
    setAscending,
    fetchData,
  ] = useCoffee();

  const [productBackup, setProductBackup] = useState([]);

  function sortAToZ() {
    setSortingField("name");
    setAscending(true);
  }

  function sortZToA() {
    setSortingField("name");
    setAscending(false);
  }

  function sortLowToHigh() {
    setSortingField("price");
    setAscending(true);
  }

  function sortHighToLow() {
    setSortingField("price");
    setAscending(false);
  }

  function productFilter(category, value) {
    const filteredProducts = productBackup.filter(
      (coffee) =>
        coffee[category.toLowerCase()].toLowerCase() === value.toLowerCase()
    );
    setCoffeeProducts(filteredProducts);
  }

  const sortOptions = [
    { text: "Name (A - Z)", action: sortAToZ },
    { text: "Name (Z - A)", action: sortZToA },
    { text: "Price (low to high)", action: sortLowToHigh },
    { text: "Price (high to low)", action: sortHighToLow },
  ];

  const filterOptions = [
    {
      text: "Continent",
      subOptions: ["Africa", "Americas", "Asia"],
      action: productFilter,
    },
    {
      text: "Process",
      subOptions: ["Honey", "Natural", "Pulped Natural", "Washed"],
      action: productFilter,
    },
    {
      text: "Roast",
      subOptions: ["Light", "Medium", "Medium-dark", "Dark"],
      action: productFilter,
    },
  ];

  useEffect(() => {
    let isMounted = true;
    fetchData().then((res) => {
      if (isMounted && res.status === "success") {
        setProductBackup(res.data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [fetchData]);

  return (
    <div className={styles.coffeePage}>
      <div className={styles.banner}>
        <img src={logo} alt="Octopus Coffee Roasters" width="130"></img>
      </div>
      <Switch>
        <Route exact path="/coffee">
          <Header sortOptions={sortOptions} filterOptions={filterOptions} />
          <div className={styles.coffeeSelection}>
            {isLoading ? (
              <div className={styles.loading}>loading...</div>
            ) : (
              coffeeProducts.map((coffee) => (
                <CoffeeSlot key={coffee._id} coffee={coffee} />
              ))
            )}
          </div>
        </Route>
        {coffeeProducts.map((coffee) => (
          <Route
            path={`/coffee/${coffee.name.toLowerCase().replace(/ /g, "-")}`}
            key={coffee._id}
          >
            <Header />
            <CoffeeSpotlight name={coffee.name} coffee={coffee} />
          </Route>
        ))}
        {/* <Route path="/coffee/*">
          <Redirect to="/coffee" />
        </Route> */}
      </Switch>
      <Footer />
    </div>
  );
}

export default CoffeePage;
