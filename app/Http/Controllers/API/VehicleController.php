<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Vehicle;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Http;
use Carbon\Carbon;

class VehicleController extends Controller{

    #Prikaz liste svih vozila

    public function index(Request $request)
    {
        $query = Vehicle::query();

        $date = $request->query('date')
        ? Carbon::parse($request->query('date'))
        : Carbon::today();

        // PRETRAGA PO TEKSTU
        if ($request->filled('search')) {
            $searchTerm = $request->query('search');
            $query->where(function($q) use ($searchTerm) {
                $q->where('brand', 'LIKE', "%{$searchTerm}%")
                  ->orWhere('model', 'LIKE', "%{$searchTerm}%")
                  ->orWhere('registration_number', 'LIKE', "%{$searchTerm}%")
                  ->orWhere('color', 'LIKE', "%{$searchTerm}%");
            });
        }

        // Filtriranje
        if ($request->filled('brand')) {
            $query->where('brand', $request->query('brand'));
        }
        if ($request->filled('model')) {
            $query->where('model', $request->query('model'));
        }
        if ($request->filled('year')) {
            $query->where('year', $request->query('year'));
        }
        if ($request->filled('color')) {
            $query->where('color', $request->query('color'));
        }
        if ($request->filled('fuel_type')) {
            $query->where('fuel_type', $request->query('fuel_type'));
        }
         if ($request->filled('min_price')) {
        $query->where('daily_price', '>=', $request->query('min_price'));
        }
        if ($request->filled('max_price')) {
            $query->where('daily_price', '<=', $request->query('max_price'));
        }

        // SORTIRANJE
        $sortField = $request->query('sort_by', 'id'); // default sort po id
        $sortDirection = $request->query('sort_order', 'asc'); // default asc
        
        // Lista dozvoljenih polja za sortiranje
        $allowedSortFields = [
             'brand', 'model', 'year', 'daily_price', 
            'mileage', 'seats'
        ];
        
        if (in_array($sortField, $allowedSortFields)) {
            $query->orderBy($sortField, $sortDirection);
        }

        // Paginacija
        $perPage = $request->query('per_page', 5);

        $vehicles = $query->with(['rentals' => function ($q) use ($date) {
            $q->where('start_date', '<=', $date)
            ->where('end_date', '>=', $date);
        }])->paginate($perPage);

        
        $vehicles->getCollection()->transform(function ($vehicle) {
            $vehicle->is_available = $vehicle->rentals->isEmpty();
            unset($vehicle->rentals);
            return $vehicle;
        });

        return response()->json([
            'date' => $date->toDateString(),
            'data' => $vehicles
        ], 200);
    }
   
    #Prikaz detalja jednog vozila

    public function show($id)
    {
       // Datum za koji se proverava dostupnost (danas)
        $date = Carbon::today();
        
        $vehicle = Vehicle::with(['rentals' => function ($q) use ($date) {
            $q->where('start_date', '<=', $date)
            ->where('end_date', '>=', $date);
        }])->find($id);

        if (!$vehicle) {
            return response()->json([
                'message' => 'Vozilo nije pronađeno'
            ], 404);
        }

        // Ako nema rentiranja za danas - vozilo je slobodno
        $isAvailableToday = $vehicle->rentals->isEmpty();

        unset($vehicle->rentals);

        $key = env('API_NINJAS_KEY');

        $specs = Http::withHeaders([
            'X-Api-Key' => $key
        ])->get('https://api.api-ninjas.com/v1/cars', [
            'make'  => $vehicle->brand,
            'model' => $vehicle->model
        ])->json();

        return response()->json([
            'message' => 'Detalji o vozilu',
            'data' => [
                'vehicle' => $vehicle,
                'is_available_today' => $isAvailableToday
            ],
            'specifications' => $specs
        ], 200);
    }

    #Kreiranje novog vozila

    public function store(Request $request){

        // Validacija podataka
        $validator = Validator::make($request->all(), [
            'brand' => 'required|string|max:100',
            'model' => 'required|string|max:100',
            'registration_number' => 'required|string|max:20|unique:vehicle',
            'year' => 'required|integer|min:1900|max:' . date('Y'),
            'daily_price' => 'required|numeric|min:0',
            'color' => 'nullable|string|max:50',
            'mileage' => 'nullable|integer|min:0',
            'fuel_type' => 'required|string|in:dizel,benzin,električni,hibrid',
            'transmission' => 'required|string|in:manuelni,automatski',
            'seats' => 'required|integer|min:1',
            'status' => 'nullable|string|in:available,rented,maintenance',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Greška pri validaciji',
                'errors' => $validator->errors()
            ], 422);
        }

        // Kreiranje novog vozila sa default vrednostima za opcione kolone
        $vehicle = Vehicle::create([
            'brand' => $request->brand,
            'model' => $request->model,
            'registration_number' => $request->registration_number,
            'year' => $request->year,
            'daily_price' => $request->daily_price,
            'color' => $request->color ?? 'nepoznata',
            'mileage' => $request->mileage ?? 0,
            'fuel_type' => $request->fuel_type,
            'transmission' => $request->transmission,
            'seats' => $request->seats,
            'status' => $request->status ?? 'available',
        ]);

        return response()->json([
            'message' => 'Vozilo uspešno kreirano',
            'data' => $vehicle
        ], 201);
    }

    # Ažuriranje postojećeg vozila

    public function update(Request $request, $id)
    {
        $vehicle = Vehicle::find($id);
        if (!$vehicle) {
            return response()->json([
                'message' => 'Vozilo nije pronađeno'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'brand' => 'sometimes|string|max:100',
            'model' => 'sometimes|string|max:100',
            'registration_number' => 'sometimes|string|max:20|unique:vehicles,registration_number,' . $id,
            'year' => 'sometimes|integer|min:1900|max:' . date('Y'),
            'daily_price' => 'sometimes|numeric|min:0',
            'color' => 'nullable|string|max:50',
            'mileage' => 'nullable|integer|min:0',
            'fuel_type' => 'nullable|string|in:dizel,benzin,električni,hibrid',
            'transmission' => 'nullable|string|in:manuelni,automatski',
            'seats' => 'nullable|integer|min:1',
            'status' => 'nullable|string|in:available,rented,maintenance',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Greška pri validaciji',
                'errors' => $validator->errors()
            ], 422);
        }

        $vehicle->update($validator->validated());

        return response()->json([
            'message' => 'Vozilo uspešno ažurirano',
            'data' => $vehicle
        ], 200);
    }

    # Brisanje vozila

    public function destroy($id)
    {

        $vehicle = Vehicle::find($id);
        if (!$vehicle) {
            return response()->json([
                'message' => 'Vozilo nije pronađeno'
            ], 404);
        }

        if ($vehicle->rentals() ->where('end_date', '>=', now()) ->exists()) {
            return response()->json([
                'message' => 'Vozilo ima aktivne rente i ne može biti obrisano'
            ], 409);
        }

        $vehicle->delete();

        return response()->json([
            'message' => 'Vozilo uspešno obrisano'
        ], 200);
    }
}