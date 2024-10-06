export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};


export type Bucket = {
    id: number;
    name: string;
    budget: name;
    user_id: numebr
    remaining?: number
}

export type Transaction = {
    id: number;
    description: string | null
    amount: number
    date: string

    bucket_id: number
}

export type DashboardPageProps = {
    buckets: Bucket[]
};

export type TransactionPageProps = {
    buckets: Bucket[]
    transactionsWithBuckets?: (Transaction & { name: string })[]
}
