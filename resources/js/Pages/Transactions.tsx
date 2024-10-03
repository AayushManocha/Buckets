import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";
import { ReactElement, JSXElementConstructor, ReactNode } from "react";
import { JSX } from "react/jsx-runtime";

const TransactionRowDateHeader = ({ date }) => {
  return (
    <span className="w-full bg-gray-400 inline-block py-2 px-1 mb-4 rounded-md">{date}</span>
  )
}

const TransactionRow = ({ bucketName, description, amount }) => {
  return (
    <div className="flex flex-row gap-x-4 mb-2">
      <span className="font-bold">{bucketName}</span>
      <span>${amount}</span>
      <span>{description}</span>
    </div>
  )
}

export default function Transactions() {
  const transactionsWithBuckets: any[] = usePage().props.transactions_with_buckets;

  const parsedDates: any[] = []
  const tableComponents: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | JSX.Element[] | null | undefined = []

  transactionsWithBuckets.forEach(item => {
    const date = new Date(item.date).toLocaleDateString()
    if (!parsedDates.includes(date)) {
      tableComponents.push(<TransactionRowDateHeader date={date} />)
      parsedDates.push(date)
      tableComponents.push(
        <TransactionRow bucketName={item.name} description={item.description} amount={item.amount} />
      )

    } else {
      tableComponents.push(
        <TransactionRow bucketName={item.name} description={item.description} amount={item.amount} />
      )
    }
  })


  return (
    <AuthenticatedLayout>
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-8">
            {tableComponents}
          </div>
        </div>
      </div>
    </AuthenticatedLayout >
  )
}