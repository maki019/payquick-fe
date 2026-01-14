import { format } from "date-fns";
import type { Transaction } from "../api/types";

function groupByMonth(transactions: Transaction[]) {
  return transactions.reduce<Record<string, Transaction[]>>((acc, tx) => {
    const month = format(new Date(tx.created_at), "MMMM yyyy");
    if (!acc[month]) acc[month] = [];
    acc[month].push(tx);
    return acc;
  }, {});
}

export { groupByMonth };
