<?php
namespace library;

class currency_ops
{
   
    public function convertCurrency(int $amount,string $from_currency,string $to_currency):string
    {
        $apikey = '5385ce551cabfd8ec15e';

        $from_Currency = urlencode($from_currency);
        $to_Currency = urlencode($to_currency);
        $query = "{$from_Currency}_{$to_Currency}";

        // change to the free URL if you're using the free version

        $obj = json_decode(file_get_contents("https://free.currconv.com/api/v7/convert?q={$query}&compact=ultra&apiKey={$apikey}"), true);

        $val = floatval($obj["$query"]);

        $total = $val * $amount;
        return number_format($total, 3, '.', '');
    }

    public function exchangeRates()
    {
        $apikey = '884efd29f340324459fcaddcdfaff16c';

        $rates = json_decode(utf8_encode(file_get_contents("http://www.apilayer.net/api/live?access_key={$apikey}&format=1")), true);
        if (json_last_error() === JSON_ERROR_NONE) {
            if ($rates['success']) {
                return $rates['quotes'];
            }else{
                return [];
            }

        } else {
            return 'Error Decoding Json Data';
        }

    }

    public function countries2()
    {   
        $apikey = '5385ce551cabfd8ec15e';

        $countries = json_decode(utf8_encode(file_get_contents("https://restcountries.eu/rest/v2/region/africa")), true);
        if (json_last_error() === JSON_ERROR_NONE) {
            if ($countries) {
                return $countries;
            }else{
                return [];
            }

        } else {
            return 'Error Decoding Json Data';
        }

    }
    public function countries()
    {   
        $apikey = '5385ce551cabfd8ec15e';

        $countries = json_decode(file_get_contents("https://free.currconv.com/api/v7/countries?apiKey={$apikey}"), true);
        if (json_last_error() === JSON_ERROR_NONE) {
            if ($countries['results']) {
                return $countries;
            }else{
                return [];
            }

        } else {
            return 'Error Decoding Json Data';
        }

    }


    public function country(string $code)
    {   
        $apikey = '5385ce551cabfd8ec15e';

        $countries = json_decode(file_get_contents("https://free.currconv.com/api/v7/countries?apiKey={$apikey}"), true);
        if (json_last_error() === JSON_ERROR_NONE) {
            if ($countries['results']) {
                $countries = $countries['results'];
                // for ($i = 0;$i < count($countries); $i += 1){
                //     return $countries["$code"];
                    // if ($code == $countries["$i"]["$code"]) {
                    //   return $countries["$i"]["$code"];
                    // }
                // }
                foreach ($countries as $key => $value) {
                     if ($code == $countries["$key"]["currencyId"]) {
                      return $countries["$key"];
                    }
                }
            }else{
                return [];
            }

        } else {
            return 'Error Decoding Json Data';
        }

    }

}

//$obje = new currency_ops();
//echo $obje->convertCurrency(30,'USD','NGN');
//var_export($obje->exchangeRates());
//var_export($obje->country('NGN'));
