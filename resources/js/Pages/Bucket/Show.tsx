import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Bucket, Transaction } from "@/types";
import { usePage } from "@inertiajs/react";

export default function BucketShow() {
  const bucket = usePage().props.bucket as Bucket;
  const transactions = usePage().props.transactions as Transaction[];
  const totalSpend = usePage().props.total_spen as number;
  const remaining = usePage().props.remaining as number;

  return (
    <AuthenticatedLayout>
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg flex flex-col items-center">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-semibold text-gray-900">{bucket.name}</span>
              <span className="text-xl font-semibold text-gray-600">${totalSpend} spent this month</span>
              <span className="text-xl font-semibold text-gray-600">${remaining} remaining</span>
            </div>

            {transactions.length === 0 && (
              <div className="text-gray-500 text-center mt-4">
                No transactions yet
              </div>
            )}

            {transactions.length > 0 && (
              <table className="w-full">
                <td>
                  <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Description</th>
                  </tr>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{new Date(transaction.date).toLocaleDateString()}</td>
                      <td>${transaction.amount}</td>
                      <td>{transaction.description}</td>
                    </tr>
                  ))}
                </td>
              </table>
            )}


          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}