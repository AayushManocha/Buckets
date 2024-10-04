<?php

namespace Database\Seeders;

use App\Models\Bucket;
use App\Models\Transaction;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        $user = User::factory()->create([
            'name' => 'Aayush Manocha',
            'email' => 'aayush.manocha@gmail.com',
            'password' => 'fakepassword'
        ]);

        $leisure_bucket = Bucket::factory()->create([
            'name' => 'Leisure',
            'budget' => 350,
            'user_id' => $user->id,
        ]);

        for ($i=0; $i < 5 ; $i++) { 
            Transaction::factory()->create([
                'Description' => 'Coffee',
                'bucket_id' => $leisure_bucket->id
            ]);
        }

        $utilities_bucket = Bucket::factory()->create([
            'name' => 'Utilities',
            'budget' => 300,
            'user_id' => $user->id,
        ]);

        for ($i=0; $i < 5 ; $i++) { 
            Transaction::factory()->create([
                'Description' => 'Gas',
                'bucket_id' => $utilities_bucket->id
            ]);
        }

        $groceries_bucket = Bucket::factory()->create([
            'name' => 'Groceries',
            'budget' => 500,
            'user_id' => $user->id,
        ]);

        for ($i=0; $i < 5 ; $i++) { 
            Transaction::factory()->create([
                'description' => 'Food',
                'bucket_id' => $groceries_bucket->id
            ]);
        }
    }
}
