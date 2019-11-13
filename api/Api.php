<?php
require_once __DIR__ . '/currencyClass.php';

use library\currency_ops as curr;
//use MyLibrary\sql;


$op = new curr();
$post = json_decode(file_get_contents('php://input'), true);//Receives json,decodes it as an array and send to $post
if (json_last_error() === JSON_ERROR_NONE) {// checks if received file is a json or not

    $arr = ['aa', 'ab', 'ac', 'ad', 'ae', 'af', 'ag', 'ah', 'ai', 'aj', 'ak'];
    if (in_array($post['key'], $arr)) { //above code makes sure that its only the specified keys run 

        $result;


        /****** Api For Registration ****/

        if ($post['key'] == 'aa') {

            $amount = $post['amount'];
            $from_currency = $post['from'];
            $to_currency = $post['to'];

            $msg[0] = $op->convertCurrency($amount, $from_currency, $to_currency);
            $msg[1] = $op->country($to_currency);
            $result = $msg ? ['code' => "00", 'message' => $msg ] : ['code' => "00", 'message' => []];


        }

        if ($post['key'] == 'ab') {


            $msg = $op->countries();
            
            $result = $msg ? ['code' => "00", 'message' => [$msg] ] : ['code' => "00", 'message' => []];


        }

        if ($post['key'] == 'ac') {


            $msg = $op->countries2();
            
            $result = $msg ? ['code' => "00", 'message' => [$msg] ] : ['code' => "00", 'message' => []];


        }

        if ($post['key'] == 'ad') {

            $cur = $post['cur'];
            $msg = $op->country($cur);
            
            $result = $msg ? ['code' => "00", 'message' => [$msg] ] : ['code' => "00", 'message' => []];


        }

 
       
        echo json_encode($result);

    }
} else {
    echo "received file is not in json format";
}


?> 