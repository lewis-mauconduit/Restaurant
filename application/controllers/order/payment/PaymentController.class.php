<?php

class PaymentController
{

    public function httpGetMethod(Http $http, array $queryFields)
    {
        
    }

    public function httpPostMethod(Http $http, array $formFields)
    {


            $orders = json_decode($_POST['orders']);

            $ordermodel = new OrderModel();
            $order_id = $ordermodel -> addOrder();

            $totalAmount = 0;

            foreach ($orders as $order){

                $mealModel = new MealModel();
                $safeSalePrice  = $mealModel -> recupSafeSalePrice($order -> mealId);
                $order -> safeSalePrice = $safeSalePrice['SalePrice'];

                $totalAmount += $safeSalePrice['SalePrice']* $order -> quantity;

   
                $ordermodel -> addOrderLine($order -> quantity, $order -> mealId, $order_id, $order -> priceU);

            }

            $ordermodel -> updateOrder($totalAmount, 0.2, $totalAmount*0.2, $order_id);

            return [
                'order_id'=>$order_id
            ];
    }
    
      
}