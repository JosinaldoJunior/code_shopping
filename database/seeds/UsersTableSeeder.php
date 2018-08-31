<?php

use Illuminate\Database\Seeder;
use CodeShopping\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Database\Eloquent\Model;
use CodeShopping\Models\UserProfile;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \File::deleteDirectory(UserProfile::photosPath(), true);
        factory(User::class, 1)
            ->create([
                'email' => 'admin@user.com',
                'role' => User::ROLE_SELLER
            ])->each(function($user){
                Model::reguard();
                $user->updateWithProfile([
                    'phone_number' => '+16505551234',
                    'photo' => $this->getAdminPhoto()
                ]);
                Model::unguard();
            });
            
        factory(User::class, 1)
            ->create([
                'email' => 'cliente@user.com',
                'role' => User::ROLE_CUSTOMER
            ])->each(function($user){
                Model::reguard();
                $user->updateWithProfile([
                    'phone_number' => '+16505551235'
                ]);
                Model::unguard();
            });
            
        
        factory(User::class, 50)
            ->create([
                'role' => User::ROLE_CUSTOMER
            ]);
    }
    
    public function getAdminPhoto(){
        return new UploadedFile(
                        storage_path('app/faker/users/1624_mod.jpg'), 
                        str_random(16) . '.jpg'
            );
        
    }
}
