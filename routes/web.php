<?php

use App\Http\Controllers\BucketController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransactionController;
use App\Services\TransactionService;
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
    $buckets = TransactionService::getBucketsWithTransactionsForCurrentMonth(auth()->user()->id);
    return Inertia::render('Dashboard', [
        'buckets' => auth()->user()->buckets,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/bucket', [BucketController::class, 'create'])->name('bucket.create');
    Route::get('/bucket/{bucketId}', [BucketController::class, 'show'])->name('bucket.show');

    Route::get('/transaction', [TransactionController::class, 'index'])->name('transaction.index');
    Route::post('/transaction', [TransactionController::class, 'create'])->name('transaction.create');
});

require __DIR__ . '/auth.php';
