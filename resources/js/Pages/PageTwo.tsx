import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function PageTwo() {
  return (
    <AuthenticatedLayout >
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Page Two</h1>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}