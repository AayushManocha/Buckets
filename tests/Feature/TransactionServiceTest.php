<?php

use App\Models\User;
use App\Models\Bucket;
use App\Models\Transaction;
use App\Services\TransactionService;
use Carbon\Carbon;
use Database\Factories\UserFactory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB; // Add this line

uses(RefreshDatabase::class);

test('Transaction service can get all transactions', function () {
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

test('bucket service can get all buckets with remaining field', function() {
    $user = User::factory()->create();
    $buckets = Bucket::factory()->count(3)->create([
        'user_id' => $user->id,
        'budget' => 100
    ]);

    foreach ($buckets as $bucket) {
        Transaction::factory()->count(3)->create([
            'bucket_id' => $bucket->id,
            "amount" => 12
        ]);
    }

    // Expect each bucket to have a remaining balance of 100 - (3*12) = 64for the month
    $buckets = TransactionService::getBucketsWithTransactionsForCurrentMonth($user->id);

    expect($buckets)->toHaveLength((3));
    expect($buckets[0]['remaining'])->toEqual(64);
    expect($buckets[1]['remaining'])->toEqual(64);
    expect($buckets[2]['remaining'])->toEqual(64);
});

test('bucket service calculates remaining property only with transactions for the current month', function() {
    $user = User::factory()->create();
    $buckets = Bucket::factory()->count(3)->create([
        'user_id' => $user->id,
        'budget' => 100
    ]);

    // Create transactions for Jan 1 (should be included)
    foreach ($buckets as $bucket) {
        Transaction::factory()->count(3)->create([
            'bucket_id' => $bucket->id,
            'date' => '2024-01-01',
            "amount" => 12
        ]);
    }

    // Create transactions for Feb 1 (should NOT be included)
    foreach ($buckets as $bucket) {
        Transaction::factory()->count(3)->create([
            'bucket_id' => $bucket->id,
            'date' => '2024-02-01',
            "amount" => 12
        ]);
    }

    // Mock Carbon so that the system thinks it's Jan
    Carbon::setTestNow(Carbon::create(2024, 01, 01, 0, 0));

    // Expect each bucket to have a remaining balance of 100 - (3*12) = 64for the month
    $buckets = TransactionService::getBucketsWithTransactionsForCurrentMonth($user->id);

    expect($buckets)->toHaveLength((3));
    expect($buckets[0]['remaining'])->toEqual(64);
    expect($buckets[1]['remaining'])->toEqual(64);
    expect($buckets[2]['remaining'])->toEqual(64);
});