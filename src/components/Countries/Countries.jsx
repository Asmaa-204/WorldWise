import React from "react";

import Spinner from "../Spinner/Spinner";
import Message from "../Message/Message";
import CountryItem from "../CountryItem/CountryItem";
import styles from "./Countries.module.css";
import { useCities } from "../../contexts/CitiesProvider";

export default function Countries() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message>Add your first Country by clicking on the map</Message>;

  const countries = cities.reduce((arr, curr) => {
    if (!arr.map((city) => city.country).includes(curr.country)) {
      return [...arr, { country: curr.country, emoji: curr.emoji }];
    } else {
      return arr;
    }
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country, index) => (
        <CountryItem country={country} key={index} />
      ))}
    </ul>
  );
}
