import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useInvoiceContext } from "../context/InvoiceContext";

function NewInvoice() {
  const [client, setClient] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("unpaid");
  const clientRef = useRef();
  const { dispatch } = useInvoiceContext();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({
      type: "ADD_INVOICE",
      payload: {
        id: Date.now(),
        client,
        amount,
        status,
      },
    });
    navigate("/");
  }

  return (
    <div className="container">
      <h1>New Invoice</h1>
      <form onSubmit={handleSubmit}>
        <input
          ref={clientRef}
          type="text"
          placeholder="Client Name"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="unpaid">Unpaid</option>
          <option value="paid">Paid</option>
        </select>
        <button type="submit">Save Invoice</button>
      </form>
    </div>
  );
}

export default NewInvoice;
