<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Services\TransactionService;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $transactions_for_current_user = TransactionService::getAllTransactionsForUserByCurrentMonth($request->user()->id);
        $totalTransactions = TransactionService::getTotalTransactionsSumForUserInCurrentMonth($request->user()->id);

        return Inertia::render('Transactions', [
            // Needed for modal buttons on navigation bar
            'buckets' => $request->user()->buckets,
            'transactions_with_buckets' => $transactions_for_current_user,
            'total_transactions' => $totalTransactions
        ]);
    }

    public function destroy(Request $request)
    {
        $transaction_id = $request->transaction_id;
        $user_id = $request->user()->id;

        $maybeTransaction= DB::table('transactions')
        ->join('buckets', 'buckets.id', '=', 'transactions.bucket_id')
        ->where('buckets.user_id', '=', $user_id)
        ->where('transactions.id', '=', $transaction_id)
        ->get()
        ->first();


        $transaction = Transaction::findOrFail($maybeTransaction->id);
        $transaction->delete();
    }

    public function create(Request $request)
    {
        $request->validate([
            'bucket_id' => ['required', 'exists:buckets,id'],
            'amount' => ['required', 'numeric'],
            'description' => ['max:255'],
            'date' => ['required', 'date'],
        ]);

        $bucket = $request->user()->buckets()->findOrFail($request->bucket_id);
        $bucket->transactions()->create($request->all());

        redirect()->route('dashboard');
    }

  
}
