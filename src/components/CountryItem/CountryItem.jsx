import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  const { countryName, emoji } = country;
  return (
    <li className={styles.countryItem}>
      <span>{emoji}</span>
      <span>{countryName}</span>
    </li>
  );
}

export default CountryItem;
