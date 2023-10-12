<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Places extends Model
{
    use HasFactory;

    protected $fillable = ['place_name'];

    public function users()
    {
        return $this->belongsToMany(User::class, 'users_places', 'place_id', 'user_id');
    }
}
