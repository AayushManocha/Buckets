<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class BucketController extends Controller
{
    public function create(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'budget' => ['required', 'integer'],
        ]);

        $bucket = $request->user()->buckets()->create($request->all());

        return redirect()->route('dashboard');
    }

    public function show(Request $request, $bucketId)
    {
        // TODO Filter transactions by current month

        $bucket = $request->user()->buckets()->findOrFail($bucketId);
        $totalSpent = $bucket->transactions->sum('amount');
        $remaining = $bucket->budget - $totalSpent;

        return Inertia::render('Bucket/Show', [
            'bucket' => $bucket,
            'transactions' => $bucket->transactions,
            'total_spent' => $totalSpent,
            'remaining' => $remaining,

            // Needed for modal buttons on navigation bar
            'buckets' => $request->user()->buckets,
        ]);
    }
}
