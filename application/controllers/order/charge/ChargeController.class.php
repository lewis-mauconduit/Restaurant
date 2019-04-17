<?php

class ChargeController
{

    public function httpGetMethod(Http $http, array $queryFields)
    {
        $http = new Http();
        $http->redirectTo('/order');
    }

    public function httpPostMethod(Http $http, array $formFields)
    {
        $order_id = $_GET['order_id'];

        $orderModel = new OrderModel();
        $infosOrder = $orderModel -> recupInfosOrder($order_id);

        $totalTTC = floatval($infosOrder['TotalAmount']) + floatval($infosOrder['TaxeAmount']);
        try {
            
            require_once('vendor/autoload.php');

            \Stripe\Stripe::setApiKey('sk_test_IrDBAub4WHKLbdsoErkjyfD1');

            $POST = filter_var_array($_POST, FILTER_SANITIZE_STRING);

            $first_name = $_POST['first_name'];
            $last_name = $_POST['last_name'];
            $email = $_POST['email'];
            $token = $_POST['stripeToken'];

            // create customer 

            $customer = \Stripe\Customer::create(array(
                "email" => $email,
                "source" => $token
            ));

            //payment

            $charge = \Stripe\Charge::create(array(
                "amount" => $totalTTC*100, //en centimes
                "currency" => "eur",
                "description" => "Commande numéro: ".$infosOrder['Id'],
                "customer" => $customer->id
            ));

            $orderModel->updateStatus($order_id);

            $http = new Http();
            $http->redirectTo('/order/success?tid='.$charge->id.'&product='.$charge->description);
            

        }
        catch(Exception $error) {

            var_dump('paiement échoué');
        }
    }
      
}