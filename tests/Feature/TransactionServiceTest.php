<?php

use App\Models\User;
use App\Models\Bucket;
use App\Models\Transaction;
use App\Services\TransactionService;
use Database\Factories\UserFactory;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB; // Add this line

test('Transaction service can get all transactions', function () {
    // Create user, buckets, and transactions
    $user = User::factory()->create();
    $buckets = Bucket::factory()->count(3)->create([
        'user_id' => $user->id
    ]);

    foreach ($buckets as $bucket) {
        Transaction::factory()->count(3)->create([
            'bucket_id' => $bucket->id
        ]);
    }

    // Create another user

    $bad_user = User::factory()->create();
    $bad_buckets = Bucket::factory()->count(3)->create([
        'user_id' => $bad_user->id
    ]);
    foreach ($bad_buckets as $bucket) {
        Transaction::factory()->count(3)->create([
            'bucket_id' => $bucket->id
        ]);
    }

    $transactions_for_current_user = TransactionService::getAllTransactionsForUser($user->id);
    expect($transactions_for_current_user)->toHaveLength(9);
});
