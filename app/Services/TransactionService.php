<?php

namespace App\Services;

use App\Models\Bucket;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class TransactionService
{
  public function __construct()
  {
    // Constructor logic goes here
  }

  public static function getAllTransactionsForUser($user_id)
  {
    return DB::table('transactions')
        ->join('buckets', 'transactions.bucket_id', '=', 'buckets.id')
        ->select('transactions.*', 'buckets.name')
        ->where('buckets.user_id', '=', $user_id)
        ->orderBy('date', 'desc')
        ->get();
  }

  public static function getAllTransactionsForUserByCurrentMonth($user_id)
  {
    $startOfMonth = Carbon::now()->startOfMonth()->toDateString();
    $endOfMonth = Carbon::now()->endOfMonth()->toDateString();

    return DB::table('transactions')
        ->join('buckets', 'transactions.bucket_id', '=', 'buckets.id')
        ->select('transactions.*', 'buckets.name')
        ->where('buckets.user_id', '=', $user_id)
        ->where('date', '>=', $startOfMonth)
        ->where('date', '<=', $endOfMonth)
        ->orderBy('date', 'desc')
        ->get();
  }

  public static function getTotalTransactionsSumForUser($user_id) {
    return DB::table('transactions')
        ->join('buckets', 'transactions.bucket_id', '=', 'buckets.id')
        ->select('transactions.*', 'buckets.name')
        ->where('buckets.user_id', '=', $user_id)
        ->sum('transactions.amount');

  }

  public static function getTotalTransactionsSumForUserInCurrentMonth($user_id)
  {
    $startOfMonth = Carbon::now()->startOfMonth()->toDateString();
    $endOfMonth = Carbon::now()->endOfMonth()->toDateString();

    return DB::table('transactions')
        ->join('buckets', 'transactions.bucket_id', '=', 'buckets.id')
        ->select('transactions.*', 'buckets.name')
        ->where('buckets.user_id', '=', $user_id)
        ->where('date', '>=', $startOfMonth)
        ->where('date', '<=', $endOfMonth)
        ->sum('transactions.amount');
  }

  private static function getAllBucketsForCurrentUser($user_id)
  {
    return Bucket::all()->where('user_id', $user_id);
  }

  public static function getBucketsWithTransactionsForCurrentMonth($user_id)
  {
    $startOfMonth = Carbon::now()->startOfMonth()->toDateString();
    $endOfMonth = Carbon::now()->endOfMonth()->toDateString();

    $buckets = TransactionService::getAllBucketsForCurrentUser($user_id);

    foreach($buckets as $bucket) {
      $transaction_total = Transaction::all()
        ->where('bucket_id', $bucket->id)
        ->where('date', '>=', $startOfMonth)
       t  ->where('date', '<=', $endOfMonth)
        ->sum('amount');

      $bucket['remaining'] = $bucket['budget'] - $transaction_total;
    }

    return $buckets;
  }
}