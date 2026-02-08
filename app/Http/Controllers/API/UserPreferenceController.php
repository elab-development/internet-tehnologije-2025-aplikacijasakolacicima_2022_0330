<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\UserPreference;

class UserPreferenceController extends Controller
{
    #Prikaz preferenci ulogovanog korisnika

    public function show()
    {
        $preferences = auth()->user()->preferences;

        return response()->json([
            'data' => $preferences
        ]);
    }

    # Azuriranje kolacica

    public function update(Request $request)
    {
        $data = $request->validate([
            'cookies_accepted' => 'nullable|boolean',
            'language' => 'nullable|string|max:10',
            'theme' => 'nullable|in:light,dark',
        ]);

        if (!isset($data['cookies_accepted'])) {
            $data['cookies_accepted'] = true;
        }

        $preferences = UserPreference::updateOrCreate(
            ['user_id' => auth()->id()],
            array_filter($data)
        );

        //ako su kolacici odbijeni
        if (!$data['cookies_accepted']) {
            return response()->json([
                'message' => 'Kolačići nisu prihvaćeni, ostaju podrazumešane vrednosti',
                'data' => $preferences
            ]);
        }

        // ako su kolacici prihvaceni
        $preferences->update($data);

        return response()->json([
            'message' => 'Preference uspešno ažurirane',
            'data' => $preferences
        ]);
    }
}
