<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'bucket_id',
        'amount',
        'description',
        'date',
    ];

    public function setDateAttribute($value)
    {
        $this->attributes['date'] = Carbon::parse($value);
    }

    public function bucket()
    {
        return $this->belongsTo(Transaction::class);
    }
}
