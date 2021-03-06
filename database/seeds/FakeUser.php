<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon as Carbon;
use Faker\Factory as Faker;

class FakeUser extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        $role = \App\Role::all()->pluck('id');

        $this->command->getOutput()->progressStart(100);

        foreach(range(1,100) as $index) {
            $user = App\User::create([
                'first_name' => $faker->firstName(),
                'last_name' => $faker->lastName(),
                'email' => $faker->freeEmail(),
                'password' => bcrypt('testpass'),
                'created_at' => $faker->dateTime($max = 'now')
            ]);

            App\UsersRoles::create([
                'user_id' => $user->id,
                'role_id' => $faker->randomElement($role->toArray())
            ]);

            $this->command->getOutput()->progressAdvance();
        }

        $this->command->getOutput()->progressFinish();
    }
}
