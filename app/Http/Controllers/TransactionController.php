<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Transaction;
use App\Models\Bucket;
use App\Services\TransactionService;
use Illuminate\Container\Attributes\Auth;
use Illuminate\Support\Facades\DB;


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
