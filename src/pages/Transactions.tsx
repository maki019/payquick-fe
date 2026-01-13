import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchTransactions } from "../features/transactions/transactions.thunks";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/auth.slice";

export default function Transactions() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // redirect to login page
  };

  console.info({ authReducer: useAppSelector((state) => state.auth) });

  const { items, isLoading, error, currentPage, totalPages } = useAppSelector(
    (state) => state.transactions
  );

  useEffect(() => {
    dispatch(fetchTransactions({ page: currentPage }));
  }, [dispatch, currentPage]);

  const grouped = items.reduce((acc: Record<string, typeof items>, txn) => {
    const month = format(new Date(txn.created_at), "MMMM yyyy");
    if (!acc[month]) acc[month] = [];
    acc[month].push(txn);
    return acc;
  }, {});

  const handlePrev = () => {
    if (currentPage > 1) {
      dispatch(fetchTransactions({ page: currentPage - 1 }));
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      dispatch(fetchTransactions({ page: currentPage + 1 }));
    }
  };

  return (
    <div className="p-6">
      {
        //todo: add a header component later and move this there
      }

      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>

      <h1 className="text-2xl font-bold mb-4">Transactions</h1>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!isLoading &&
        !error &&
        Object.entries(grouped).map(([month, txns]) => (
          <div key={month} className="mb-6">
            <h2 className="text-lg font-semibold">{month}</h2>
            <ul>
              {txns.map((txn) => (
                <li key={txn.id} className="border-b py-2 flex justify-between">
                  <span>
                    {txn.type} → {txn.destination_id}
                  </span>
                  <span>
                    {(txn.amount_in_cents / 100).toFixed(2)} {txn.currency}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
