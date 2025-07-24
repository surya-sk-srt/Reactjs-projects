import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { InvoiceProvider } from "./context/InvoiceContext";
import Dashboard from "./pages/Dashboard";
import NewInvoice from "./pages/NewInvoice";

function App() {
  return (
    <InvoiceProvider>
      <BrowserRouter>
        <nav className="navbar">
          <h2>InvoiceApp</h2>
          <div>
            <Link to="/">Dashboard</Link>
            <Link to="/new">New Invoice</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/new" element={<NewInvoice />} />
        </Routes>
      </BrowserRouter>
    </InvoiceProvider>
  );
}

export default App;
