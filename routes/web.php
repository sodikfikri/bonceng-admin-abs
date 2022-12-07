<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Controller;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', [Controller::class, 'login']);
Route::get('/dashboard', [Controller::class, 'dashboard']);
Route::get('/absen', [Controller::class, 'absen']);
Route::get('/cuti', [Controller::class, 'cuti']);
Route::get('/karyawan', [Controller::class, 'karyawan']);
Route::get('/divisi', [Controller::class, 'divisi']);
