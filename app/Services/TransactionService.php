<?php

namespace App\Services;
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

  public static function getTotalTransactionsSumForUser($user_id) {
    return DB::table('transactions')
        ->join('buckets', 'transactions.bucket_id', '=', 'buckets.id')
        ->select('transactions.*', 'buckets.name')
        ->where('buckets.user_id', '=', $user_id)
        ->sum('transactions.amount');

  }
}