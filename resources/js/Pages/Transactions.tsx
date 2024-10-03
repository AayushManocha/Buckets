import TransactionFilter from "@/Components/TransactionFilter";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";
import { useMemo, useState } from "react";

const TransactionRowDateHeader = ({ date }) => {
  return (
    <span className="w-full bg-gray-400 inline-block py-2 px-1 my-4 rounded-md col-span-full">{date}</span>
  )
}

const TransactionRow = ({ bucketName, description, amount }) => {
  return (
    <>
      <span className="font-bold">{bucketName}</span>
      <span>${amount}</span>
      <span>{description}</span>
    </>
  )
}

const Metric = ({ title, amount }) => {
  return (
    <div className="flex flex-col items-center shadow-xl border py-2 mt-2">
      <span className="font-light text-md">{title}</span>
      <span className="font-bold text-3xl">${amount}</span>
    </div>
  )
}

export default function Transactions() {
  const buckets = usePage().props.buckets
  const transactionsWithBuckets: any[] = usePage().props.transactions_with_buckets;

  const [bucketFilter, setBucketFilter] = useState<number | null>(-1)

  const totalSpend = useMemo(() => {
    return transactionsWithBuckets.reduce((sum, transaction) => {
      if (bucketFilter !== -1 ? transaction.bucket_id === bucketFilter : true) {
        return sum + transaction.amount;
      }
      return sum;
    }, 0);
  }, [transactionsWithBuckets, bucketFilter]);

  const tableComponents = useMemo(() => {
    const parsedDates: any[] = []
    return transactionsWithBuckets.filter(transaction => {
      return bucketFilter !== -1 ? transaction.bucket_id === bucketFilter : true
    })
      .map(transaction => {
        const date = new Date(transaction.date).toLocaleDateString()
        if (!parsedDates.includes(date)) {
          parsedDates.push(date)
          return (
            <>
              <TransactionRowDateHeader date={date} />
              <TransactionRow bucketName={transaction.name} description={transaction.description} amount={transaction.amount} />
            </>
          )
        }
        return <TransactionRow bucketName={transaction.name} description={transaction.description} amount={transaction.amount} />
      })

  }, [transactionsWithBuckets, bucketFilter])


  return (
    <AuthenticatedLayout>
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-8">
            <TransactionFilter
              bucketFilter={bucketFilter}
              setBucketFilter={setBucketFilter}
              buckets={buckets} />
            <Metric title="Total Spending" amount={totalSpend} />
            <div className="grid grid-cols-3">
              {tableComponents}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout >
  )
}