<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of BugsRest
 *
 * @author Simão Neto
 */
require APPPATH.'/libraries/REST_Controller.php';
class BugsRest extends REST_Controller{
    //put your code here
    
    public function __construct() {
        parent::__construct();
        $this->load->model('bugs');
    }
    
     public function bugs_get(){
        $bugs = $this->bugs->loadAll();
        
        if ($bugs){
            $this->response($bugs, 200);
        } else {
            $this->response(array('error' => 'Bugs não existe!'), 404);
        }
    } 
    
    function index_post(){
        $data =  array(
            'idProduct' => $this->input->post('projeto'),
            'idOwner' => $this->input->post('user'),
            'idStatus' => $this->input->post('estatus'),
            'description' => $this->input->post('description')
        );      
        
        var_dump($data);
        $myDados = $this->bugs->store($data);        
        $this->response($myDados, 200);
    }
}

?>
