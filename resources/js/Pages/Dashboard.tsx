import BucketItem from '@/Components/BucketItem';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { DashboardPageProps } from '@/types';
import { Head } from '@inertiajs/react';

export default function Dashboard({ buckets }: DashboardPageProps) {
    return (
        <AuthenticatedLayout >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className='flex flex-col items-center gap-2 sm:flex-row sm:justify-around'>
                                {buckets.map((bucket) => (
                                    <BucketItem key={bucket.id} bucket={bucket} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}