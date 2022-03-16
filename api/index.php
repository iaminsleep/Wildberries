<?php

header("Access-Control-Allow-Origin: https://willberries.herokuapp.com");
// header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Credentials: true");

header("Content-Type: application/json");

require_once 'cfg/config.php';
require_once 'cfg/functions.php';
require_once 'cfg/get_parameter.php';
require_once 'cfg/request_methods.php';

?>