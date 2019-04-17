<?php


class BookingController
{
    public function httpGetMethod(Http $http, array $queryFields)
    {
    	
    }

    public function httpPostMethod(Http $http, array $formFields)
    {
        $booking = new BookingModel();
        $booking -> addBooking($_POST);

        $http = new Http();
        $http->redirectTo('/?Booked=true');

    }
}