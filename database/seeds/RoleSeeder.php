<?php

use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            ['name' => 'Super Administrator', 'description' => 'Full-Access to application.'],
            ['name' => 'Project Manager', 'description' => 'Project Manager level access.'],
            ['name' => 'Developer', 'description' => 'Developer level access.'],
            ['name' => 'Customer', 'description' => 'Customer level access.'],
            ['name' => 'Executive', 'description' => 'Executive level access.'],
            ['name' => 'Account Manager', 'description' => 'Account Manager level access.'],
            ['name' => 'Vendor', 'description' => 'Vendor level access.'],
        ];

        \App\Roles::insert($data);
    }
}
