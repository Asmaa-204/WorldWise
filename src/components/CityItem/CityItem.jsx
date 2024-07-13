import React from "react";

import { Link } from "react-router-dom";

import styles from "./CityItem.module.css";
import { useCities } from "../../contexts/CitiesProvider";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

export default function CityItem({ city }) {
  const { cityName, date, emoji, id, position } = city;
  const { deleteCity, currentCity } = useCities();

  function handleDelete(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span>{emoji}</span> <h3 className={styles.name}>{cityName}</h3>{" "}
        <time className={styles.date}>{formatDate(date)}</time>
        <button onClick={handleDelete} className={styles.deleteBtn}>
          &times;
        </button>
      </Link>
    </li>
  );
}
