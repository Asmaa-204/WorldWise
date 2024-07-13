import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function usePosition() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return [lat, lng];
}

export { usePosition };
