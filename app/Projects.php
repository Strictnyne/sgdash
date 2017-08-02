<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Projects extends Model
{
    use SoftDeletes;

    /**
     * @var array
     */
    protected $dates = ['req_eta', 'dev_eta', 'qa_eta', 'uat_eta', 'prod_eta'];

    /**
     * @var array
     */
    protected $fillable = ['code', 'name', 'acct_manager', 'trend', 'req_status', 'req_eta', 'dev_status', 'dev_eta', 'qa_status', 'qa_eta', 'uat_status',
        'uat_eta', 'prod_status', 'prod_eta'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function getStatus($id) {
        $status = ProjectStatus::where('id', $id)->first();
        return $status;
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function accountManager() {
        return $this->hasOne('App\User');
    }
}
