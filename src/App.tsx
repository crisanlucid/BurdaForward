import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Spinner } from "./components/Spinner";
import { FavMoviesProvider } from "./context/FavMovieContext";
import { Home, Login, NotFound, Signup } from "./pages";

export function App() {
  return (
    <div className="App">
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export function WrapperApp() {
  return (
    <>
      <Router>
        <FavMoviesProvider>
          <App />
        </FavMoviesProvider>
      </Router>
    </>
  );
}
