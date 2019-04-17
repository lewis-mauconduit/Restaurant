<?php

class OrderModel {

    public function addOrder()
    { 
         
        $data = new Database();
        $order_id = $data -> executeSql('INSERT INTO `Order`(User_id, CreationTimestamp)
                                    VALUES  (?, NOW())',
                                    [
                                        $_SESSION['Id']
                                    ]);
        return  $order_id;                 
    }
    public function addOrderLine($QuantityOrdered, $Meal_Id, $Order_Id, $PriceEach)
    { 
         
        $data = new Database();
        $data -> executeSql('INSERT INTO OrderLine (QuantityOrdered, Meal_Id, Order_Id, PriceEach)
                                    VALUES  (?,?,?,?)',
                                    [
                                        $QuantityOrdered,
                                        $Meal_Id,
                                        $Order_Id,
                                        $PriceEach
                                    ]);                 
    }
    public function updateOrder($totalAmount, $rateTVA, $tvaAmount, $order_id)
    { 
         
        $data = new Database();
        $order_id = $data -> executeSql('UPDATE `Order`
                            SET TotalAmount = ?,TaxeRate = ?,TaxeAmount=?,CompleteTimestamp = NOW(),Status = "notPaid"
                            WHERE Id = ?',
                                    [
                                        $totalAmount,
                                        $rateTVA,
                                        $tvaAmount,
                                        $order_id
                                    ]);
        return $order_id; 
    }
    public function recupInfosOrder($order_id)
    { 
        $data = new Database();
        $infosOrder = $data -> queryOne('SELECT *
                                    FROM `Order`
                                    WHERE Id = ?',
                                    [
                                        $order_id
                                    ]);

        return $infosOrder;
    }
    public function updateStatus($orderId) {
        $database = new Database();

        // Insertion de la commande dans la base de donées.
        $order = $database->queryOne
        (
            'UPDATE `Order` SET Status = "payed" WHERE Id =?',
            [ $orderId ]
        );
    }
}


?>