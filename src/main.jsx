import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import StarRating from "./Components/StarRating.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    {/* <StarRating
      // maxRating={7}
      messages={["tribble", "bad", "okay", "good", "amazing"]}
    />
    <StarRating maxRating={7} /> */}
  </StrictMode>
);
