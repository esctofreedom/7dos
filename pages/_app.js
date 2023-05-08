import "tailwindcss/tailwind.css";
import { Layout } from "../components/Layout";
import "../styles/globals.css";
import "@fontsource/plus-jakarta-sans";

// create a function that changes the style of body every second
// const changeBodyStyle = () => {
//   const colorArray = ["red", "blue", "green", "yellow", "purple"];
//   const body = document.querySelector("body");

//   // get random number between 0 and 4
//   body.style.backgroundColor = "red";
// };

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />;
    </Layout>
  );
}

export default MyApp;
