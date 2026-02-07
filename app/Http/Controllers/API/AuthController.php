<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

#za pass reset
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    #register
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Greška pri validaciji',
                'errors' => $validator->errors()
            ], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => User::ROLE_REGISTERED,
        ]);

        Auth::login($user);
        $request->session()->regenerate();

        return response()->json([
            'message' => 'Korisnik uspešno registrovan',
            'user' => $user,
        ], 201);
    }

     #login
    public function login(Request $request)
    {
        $credentials = $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    //remember je true/false i stiže sa frontenda
    if (Auth::attempt($credentials, $request->boolean('remember'))) {
            $request->session()->regenerate();

        return response()->json([
            'message' => 'Uspešno prijavljivanje!',
            'user' => Auth::user(),
        ]);
    }

    return response()->json(['message' => 'Pogrešni podaci'], 401);

    }

    #logout
    public function logout(Request $request){
          $user = $request->user();
    if ($user) {
        $user->remember_token = null;
        $user->save();
    }
    
    Auth::guard('web')->logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    
    return response()->json(['message' => 'Logged out'])
        ->withCookie(cookie()->forget('laravel_session'))
        ->withCookie(cookie()->forget('remember_web_' . sha1('web')))
        ->withCookie(cookie()->forget('XSRF-TOKEN'));
    }


    public function user(Request $request)
    {
        return response()->json([
            'user' => $request->user()
        ]);
    }


    #resetovanje sifre

    #1. slanje emaila za reset
    public function sendResetLink(Request $request)
    {
     $validator = Validator::make($request->all(), [
        'email' => 'required|email|exists:users,email',
        ]);

        if ($validator->fails()) {
        return response()->json([
            'message' => 'Greška pri validaciji',
            'errors' => $validator->errors()
        ], 422);
        }

     $user = User::where('email', $request->email)->first();
     $token = Password::broker()->createToken($user);
     $resetUrl = url('/reset-password?token=' . $token . '&email=' . urlencode($user->email));

    return response()->json([
        'message' => 'Reset link generisan',
        'reset_url' => $resetUrl,
        'token' => $token,
        
    ]);
    }
    #2. reset sifre 
    public function resetPassword(Request $request) 
    {   
        $request->validate([
        'email' => 'required|email|exists:users,email',
        'password' => 'required|min:8|confirmed',
        'token' => 'required',
        ]);

        $status = Password::reset(
        $request->only('email', 'password', 'password_confirmation', 'token'),
        function ($user, $password) {
            $user->forceFill([
                'password' => Hash::make($password)
            ])->setRememberToken(Str::random(60));

            $user->save();
            event(new PasswordReset($user));
        }
    );

    return $status === Password::PASSWORD_RESET
        ? response()->json(['message' => 'Lozinka je uspešno resetovana'])
        : response()->json(['message' => 'Došlo je do greške pri resetovanju lozinke'], 500);
}

}