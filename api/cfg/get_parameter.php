<?php

$query = $_GET['q'];

$params = explode('/', $query); /* Запрос к определённому товару как в REST API, например goods/2 */

$type = $params[0];
$id = $params[1];