<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Statement extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $fillable = ['bank_account', 'statement_date', 'type', 'particulars', 'amount'];
}
