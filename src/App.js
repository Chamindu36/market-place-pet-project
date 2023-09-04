import { Route, Routes } from "react-router";
import { useEffect, lazy, Suspense } from 'react';
import { useDispatch } from "react-redux";

import { checkUserSession } from "./store/user/user.action";

import Navigation from "./routes/navigation/navigation.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import Spinner from "./components/spinner/spinner.component";

import { GlobalStyle } from "./global.styles";

// import Home from "./routes/home/home.component";
// import Authentication from "./routes/authentication/authentication.component";

// use dynamic imports instead of static imports
const Home = lazy(() => import("./routes/home/home.component"));
const Authentication = lazy(() => import("./routes/authentication/authentication.component"));

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Check user session dispath");
    dispatch(checkUserSession());
  }, [dispatch]);

  //Suspense is a component that allows us to wrap any part of our application that might be rendering some lazy components
  //fallback is the component to be rendered while the lazy component is loading
  return (
    <Suspense fallback={<Spinner />}>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path='checkout' element={<Checkout />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
