<?php


class MealController
{
    public function httpGetMethod(Http $http, array $queryFields)
    {
    	$data = new MealModel();
        $dataMeal = $data -> showDetailsMeal();
        
        echo json_encode($dataMeal);
        exit();
    }

    public function httpPostMethod(Http $http, array $formFields)
    {
    	
    }
}


?>
