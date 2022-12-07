<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;

class Controller extends BaseController
{
    // use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function login(Request $request) {
        return view('login');
    }

    public function dashboard(Request $request) {
        return view('dashboard');
    }

    public function absen(Request $request) {
        return view('absen');
    }

    public function cuti(Request $request) {
        return view('cuti');
    }

    public function karyawan(Request $request) {
        return view('karyawan');
    }

    public function divisi(Request $request) {
        return view('divisi');
    }
}
