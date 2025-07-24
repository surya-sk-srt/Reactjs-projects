import { createContext, useContext, useReducer, useEffect } from "react";

const InvoiceContext = createContext();

const initialState = JSON.parse(localStorage.getItem("invoices")) || [];

function invoiceReducer(state, action) {
  switch (action.type) {
    case "ADD_INVOICE":
      return [...state, action.payload];
    case "DELETE_INVOICE":
      return state.filter((inv) => inv.id !== action.payload);
    default:
      return state;
  }
}

export function InvoiceProvider({ children }) {
  const [invoices, dispatch] = useReducer(invoiceReducer, initialState);

  useEffect(() => {
    localStorage.setItem("invoices", JSON.stringify(invoices));
  }, [invoices]);

  return (
    <InvoiceContext.Provider value={{ invoices, dispatch }}>
      {children}
    </InvoiceContext.Provider>
  );
}

export function useInvoiceContext() {
  return useContext(InvoiceContext);
}
