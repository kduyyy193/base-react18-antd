import { onLCP, onINP, onCLS } from "web-vitals/attribution";

const reportWebVitals = (
  onPerfEntry?: (metric: { id: string; name: string; value: number }) => void
) => {
  if (onPerfEntry && typeof onPerfEntry === "function") {
    onLCP(onPerfEntry);
    onINP(onPerfEntry);
    onCLS(onPerfEntry);
  }
};

export default reportWebVitals;
