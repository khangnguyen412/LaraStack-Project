<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use OpenApi\Attributes as OA;

use App\Models\ModelsPermissions;

#[OA\Tag(name: 'Permissions', description: 'Permission management')]
class ControllerPermissions extends Controller
{
    /**
     * Display a listing of the resource.
     */
    #[OA\Get(
        path: '/api/v1/admin/permissions',
        summary: 'Get permission list',
        security: [['bearerAuth' => []]],
        tags: ['Permissions'],
        responses: [
            new OA\Response(response: 401, ref: '#/components/responses/Exception401')
        ]
    )]
    public function index()
    {
        
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
