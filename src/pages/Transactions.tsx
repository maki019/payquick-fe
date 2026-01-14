import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchTransactions } from "../features/transactions/transactions.thunks";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import clsx from "clsx";
import { TransactionsSkeleton } from "@/components/layout/TransactionsSkeleton";
import { groupByMonth } from "@/utils/transactionsUtil";
import { useSearchParams } from "react-router-dom";
import { setPage } from "@/features/transactions/transactions.slice";

export default function Transactions() {
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get("page")) || 1;

  const [searchTerm, setSearchTerm] = useState<string>("");

  const { items, isLoading, error, currentPage, totalPages } = useAppSelector(
    (state) => state.transactions
  );

  useEffect(() => {
    dispatch(
      fetchTransactions({
        page: currentPage,
      })
    );
  }, [dispatch, currentPage, pageParam]);

  const filteredTransactions = useMemo(() => {
    if (!searchTerm) return items;
    return items.filter((tx) => {
      return (
        tx.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.currency.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.destination_id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [searchTerm, items]);

  const grouped = filteredTransactions
    ? groupByMonth(filteredTransactions)
    : {};

  const handlePrev = () => {
    if (currentPage > 1) {
      dispatch(fetchTransactions({ page: currentPage - 1 }));
      dispatch(setPage(currentPage - 1));
      setSearchParams({ page: String(currentPage - 1) });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      dispatch(fetchTransactions({ page: currentPage + 1 }));
      dispatch(setPage(currentPage + 1));
      setSearchParams({ page: String(currentPage + 1) });
    }
  };

  return (
    <div className="flex flex-col w-full h-full p-6 bg-background rounded-2xl text-[#05061E]">
      <h1 className="text-[48px] font-semibold">Transactions</h1>
      <span className="mb-4 font-light">
        View and search your transaction history
      </span>

      {/* Search placeholder */}
      <div className="mb-4 w-full flex justify-between items-center">
        <input
          type="text"
          placeholder="Search transactions..."
          className="border border-border rounded-md p-2 w-2/3"
          // disabled // functionality later

          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Loading Skeleton */}
      {isLoading && <TransactionsSkeleton />}

      {/* Error State */}
      {error && (
        <div className="text-destructive font-semibold py-4">
          {error || "Something went wrong while fetching transactions."}
        </div>
      )}

      {/* Table */}
      {!isLoading && !error && items?.length > 0 && (
        <div className="overflow-x-auto mt-5">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-100">
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Currency</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {Object.entries(grouped).map(([month, txs]) => (
                <React.Fragment key={month}>
                  {/* Month header row */}
                  <TableRow className="bg-gray-300 text-muted-foreground font-semibold">
                    <TableCell colSpan={5}>{month}</TableCell>
                  </TableRow>

                  {/* Transactions for this month */}
                  {txs.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell>
                        {format(new Date(tx.created_at), "MMM dd, yyyy")}
                      </TableCell>
                      <TableCell>{tx.type}</TableCell>
                      <TableCell>
                        {(tx.amount_in_cents / 100).toFixed(2)}
                      </TableCell>
                      <TableCell>{tx.currency}</TableCell>
                      <TableCell
                        className={clsx("font-medium", {
                          "text-green-700": tx.status === "SUCCESS",
                          "text-red-600": tx.status === "FAILED",
                        })}
                      >
                        {tx.status}
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Pagination */}
      {!isLoading && !error && (
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-md bg-[#300B57] hover:bg-[#450D78] text-white disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-md bg-[#300B57] hover:bg-[#450D78] text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
