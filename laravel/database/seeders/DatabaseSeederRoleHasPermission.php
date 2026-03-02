<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeederRoleHasPermission extends Seeder {
    protected $roleID = 1;
    protected $permissionIDs = [1,2,3,4,5,6,7,8,9,10,11,12];

    /**
     * Run the database seeds.
     */
    public function run(): void {
        //
        $roleID = $this->roleID;
        $permissionIDs = $this->permissionIDs;

        $data = [];
        foreach($permissionIDs as $permissionID){
            $data[] = [
                "role_id" => $roleID,
                "permission_id" => $permissionID,
            ];
        }

        DB::table("roles_has_permissions")->insert($data);
    }

    /**
     * Down the database seeds.
     */
    public function down(): void {
        //
        $roleID = $this->roleID;
        DB::table("roles_has_permissions")->where("role_id",$roleID)->delete();
    }
}
