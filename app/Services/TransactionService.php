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
        ->where('buckets.user_id', '=', $user_id)->get();
  }
}