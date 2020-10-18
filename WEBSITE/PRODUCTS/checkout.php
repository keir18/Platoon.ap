<?php
    if(isset($_POST['submit'])) {
        $name = $_POST['firstname'];
        $customerEmail = $_POST['email'];
        $address = $_POST['address'];
        $city = $_POST['city'];
        $county = $_POST['county'];
        $zip = $_POST['zip'];

        $to='platoon.ap@gmail.com';
        $subject='New Order';
        $message="Name: ".$name."\n"."Email: ".$customerEmail."\n"."Address: ".$address."\n"."City: ".$city."\n"."County: ".$county."\n"."Postcode: ".$zip."\n";
        $headers="From Website";

        if(mail($to, $subject, $message, $headers)) {
            echo "<h1>Success</h1>";
        } else{
            echo "Something went wrong";
        }

        ini_set('display_errors',1);
        error_reporting(-1);
    }

?>