import { router } from "@inertiajs/react";

export default function BucketItem({ bucket }) {

  const handleNavigation = () => {
    console.log('Navigating to bucket', bucket.id);
    router.visit(route('bucket.show', bucket.id));
  }

  return (
    <div className="bg-white shadow-md sm:rounded-md p-6 w-60 h-60" onClick={handleNavigation}>
      <div className="flex justify-between items-center">
        <div>
          <span className="text-md font-semibold text-gray-500">{bucket.name}</span>
          <p className="text-2xl text-gray-900">${bucket.remaining}</p>
        </div>
      </div>
    </div>
  )
}