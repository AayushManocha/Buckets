import { router } from "@inertiajs/react";
import AddTransactionButton from "./AddTransactionButton";
import { Bucket } from "@/types";

type BucketItemProps = {
  bucket: Bucket
}

export default function BucketItem({ bucket }: BucketItemProps) {

  const handleNavigation = () => {
    console.log('Navigating to bucket', bucket.id);
    router.visit(route('bucket.show', bucket.id));
  }

  return (
    <div className="bg-white shadow-md sm:rounded-md p-6 w-52 h-52 flex flex-col justify-between flex-1 max-w-64">
      <div>
        <span onClick={handleNavigation} className="text-md font-semibold text-gray-500">{bucket.name}</span>
        <p className="text-2xl text-gray-900">${bucket.remaining}</p>
      </div>
      <AddTransactionButton bucketId={bucket.id} />
    </div>
  )
}