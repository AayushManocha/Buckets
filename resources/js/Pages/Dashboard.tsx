import BucketItem from '@/Components/BucketItem';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react';

export default function Dashboard({ buckets }) {
    return (
        <AuthenticatedLayout >
            <Head title="Dashboard" />

            <div classname="py-12">
                <div classname="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className='flex gap-4 items-center'>
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