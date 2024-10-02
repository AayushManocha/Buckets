<?php

use App\Http\Controllers\BucketController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransactionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $buckets = auth()->user()->buckets;
    for ($i = 0; $i < count($buckets); $i++) {
        $buckets[$i]->total_spent = $buckets[$i]->transactions->sum('amount');
        $buckets[$i]->remaining = $buckets[$i]->budget - $buckets[$i]->total_spent;
    }
    return Inertia::render('Dashboard', [
        'buckets' => auth()->user()->buckets,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::post('/bucket', [BucketController::class, 'create'])->name('bucket.create');
Route::get('/bucket/{bucketId}', [BucketController::class, 'show'])->name('bucket.show');

Route::post('/transaction', [TransactionController::class, 'create'])->name('transaction.create');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
