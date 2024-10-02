<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TransactionController extends Controller
{
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
