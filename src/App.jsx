import { BrowserRouter, Routes } from "react-router-dom";
import { renderRoutes } from "@routes";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <Routes>{renderRoutes()}</Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        closeOnClick={false}
        draggable={false}
        hideProgressBar={false}
        newestOnTop
        pauseOnHover
        pauseOnFocusLoss={false}
        limit={2}
        theme="colored"
      />
    </BrowserRouter>
  );
}

export default App;
