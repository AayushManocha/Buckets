import { useMemo } from "react"

export default function TransactionFilter({ bucketFilter, setBucketFilter, buckets }) {
  const allBuckets = useMemo(() => {
    return [
      ...buckets,
      { name: 'All Buckets', id: -1 }
    ]
  }, [buckets])

  return (
    <select
      id="bucket-select"
      value={bucketFilter}
      onChange={(e) => setBucketFilter(parseInt(e.target.value))}
      className="mb-4 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
    >
      {allBuckets.map((bucket) => (
        <option key={bucket.id} value={bucket.id}>
          {bucket.name}
        </option>
      ))}
    </select>
  )
}