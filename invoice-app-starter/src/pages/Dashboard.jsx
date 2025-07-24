import { useInvoiceContext } from "../context/InvoiceContext";

function Dashboard() {
  const { invoices, dispatch } = useInvoiceContext();

  return (
    <div className="container">
      <h1>Invoices</h1>
      {invoices.length === 0 ? (
        <p>No invoices yet.</p>
      ) : (
        invoices.map((inv) => (
          <div className="card" key={inv.id}>
            <h3>{inv.client}</h3>
            <p>Amount: ₹{inv.amount}</p>
            <p>Status: {inv.status}</p>
            <button onClick={() => dispatch({ type: "DELETE_INVOICE", payload: inv.id })}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
