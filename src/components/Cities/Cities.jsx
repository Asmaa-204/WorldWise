import React from "react";
import styles from "./Cities.module.css";
import CityItem from "../CityItem/CityItem";
import Spinner from "../Spinner/Spinner";
import Message from "../Message/Message";
import { useCities } from "../../contexts/CitiesProvider";

export default function City() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return <Message>Add your first city by clicking on the map</Message>;
  return (
    <ul className={styles.city}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
