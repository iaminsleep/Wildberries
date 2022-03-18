<?php

require_once 'config.php';
use \Firebase\JWT\JWT;

function sendReply($responseCode, $dataRes) {
  http_response_code($responseCode);
  echo json_encode($dataRes); 
  die;
}

/************************ GOODS ********************/
/************************ GOODS ********************/
/************************ GOODS ********************/
/************************ GOODS ********************/

function getGoods() {
  $mysqli = DataBase::getInstance();
  
  $stmt = $mysqli->prepare("SELECT * FROM `goods`;");
  $stmt->execute();
  $result = $stmt->get_result();

  $goodsList = [];

  while($good = $result->fetch_assoc()) {
    $goodsList[] = $good;
  }

  echo json_encode($goodsList); /* Данные переводятся в JSON формат */
}

function getGood($id) {
  $mysqli = DataBase::getInstance();

  $stmt = $mysqli->prepare("SELECT * FROM `goods` WHERE `id` = (?);");
  $stmt->bind_param('i', $id);
  $stmt->execute();
  $good = $stmt->get_result();
  
  if(mysqli_num_rows($good) === 0) {
    $res = [
      "status" => false,
      "message" => "Good wasn't found!",
    ];
    sendReply(404, $res);
  }
  else {
    $good = $good->fetch_assoc(); /* Преобразование в обычный ассоциативный массив */
    echo json_encode($good);
  }
}

function addGood($db, $data) {

  $name = $data["name"] ? $data["name"] : "Name";
  $description = $data["description"] ? $data["description"] : "Description";
  $category = $data["category"] ? $data["category"] : "Category";
  $gender = $data["gender"] ? $data["gender"] : "Gender";
  $price = $data["price"] ? $data["price"] : 0;
  $img = $data["img"] ? $data["img"] : "img/no-image.png";
  $label = $data["label"] ? $data["label"] : "";
  $offer = $data["offer"] ? $data["offer"] : 0;

  if(mysqliQuery($db, "INSERT INTO `goods` (`id`, `name`, `description`, `category`, `gender`, `price`, `img`, `label`, `offer`) VALUES (NULL, '$name', '$description', '$category', '$gender', '$price', '$img', '$label', '$offer');")) 
  {
    http_response_code(201); /* ответ 201 - Created */
    $res = [
      "status" => true,
      "good_id" => mysqli_insert_id($db)
    ];
  }

  else {
    http_response_code(401); /* Bad request */
    $res = [
      "status" => false,
      "message" => "Bad Request!"
    ];
  }

  echo json_encode($res);
}

function updateGood($db, $data, $goodId) {

  $name = $data["name"] ? $data["name"] : "Name";
  $description = $data["description"] ? $data["description"] : "Description";
  $category = $data["category"] ? $data["category"] : "Category";
  $gender = $data["gender"] ? $data["gender"] : "Gender";
  $price = $data["price"] ? $data["price"] : 0;
  $img = $data["img"] ? $data["img"] : "Img";
  $label = $data["label"] ? $data["label"] : "Label";
  $offer = $data["offer"] ? $data["offer"] : 0;

  if(mysqliQuery($db, "UPDATE `goods` SET `name` = '$name', `description` = '$description', `category` = '$category', `gender` = '$gender', `price` = '$price', `img` = '$img', `label` = '$label', `offer` = '$offer' WHERE `goods`.`id` = '$goodId';")) 
  {
    http_response_code(200); /* ответ 204 работает также как и ответ 200, но при этом ничего не возвращает (работает как return и всё что после не работает) */
    $res = [
      "status" => true,
      "message" => "The good has been successfully updated.",
    ];
  }

  else {
    http_response_code(401); /* Bad request */
    $res = [
      "status" => false,
      "message" => "Bad Request!"
    ];
  }
  
  echo json_encode($res);
}

function deleteGood($db, $goodId) {
  if(mysqliQuery($db, "DELETE FROM `goods` WHERE `goods`.`id` = '$goodId';")) 
  {
    http_response_code(200); /* ответ 204 работает также как и ответ 200, но при этом ничего не возвращает (работает как return и всё что после не работает) */
    $res = [
      "status" => true,
      "message" => "Good was successfully deleted."
    ];
  }

  else {
    http_response_code(403); /* Bad request */
    $res = [
      "status" => false,
      "message" => "Forbidden!"
    ];
  }

  echo json_encode($res);
}

/************************ USERS ********************/
/************************ USERS ********************/
/************************ USERS ********************/
/************************ USERS ********************/

function isAuth() {
  $headers = apache_request_headers();
  return isset($headers['Authorization']);
}

function getUserData() {
  $headers = apache_request_headers();
  $jwt = $headers['Authorization'];
  $secret_key = "authkey456";
  $decoded_data = JWT::decode($jwt, $secret_key, array('HS512'));
}

function getUsers() {
  $mysqli = DataBase::getInstance();

  $stmt = $mysqli->prepare("SELECT * FROM `users`;");
  $stmt->execute();
  $result = $stmt->get_result();

  $usersList = [];

  while($user = $result->fetch_assoc()) {
    $usersList[] = $user;
  }

  echo json_encode($usersList);
}

function registerUser($postData) {
  $mysqli = DataBase::getInstance();
 
  $email = mysqli_real_escape_string($mysqli, $postData["email"]);
  $password = mysqli_real_escape_string($mysqli, $postData["password"]);
  $confirm_password = mysqli_real_escape_string($mysqli, $postData["confirm_password"]);

  if(empty($postData) || !isset($email) || empty($email) || !isset($password) || empty($password) 
  || !isset($confirm_password) || empty($confirm_password)) return false;

  if($password !== $confirm_password) {
    $res = [
      "status" => false,
      "message" => "Passwords don't match!",
    ];
    sendReply(403, $res);
  }

  $stmt = $mysqli->prepare("SELECT * FROM `users` WHERE `email` = (?);");
  $stmt->bind_param('s', $email);
  $stmt->execute();
  $user = $stmt->get_result();

  if(mysqli_num_rows($user) > 0) {
    $res = [
      "status" => false,
      "message" => 'User with such email already exists!',
    ];
    sendReply(422, $res);
  };

  $date = date("Y-m-d H:i:s");
  $hashPass = password_hash($password, PASSWORD_DEFAULT);
  $nameFromEmail = strstr($email, '@', true);
  
  $stmt = $mysqli->prepare("INSERT INTO `users` (`email`, `password`, `registered_at`, `name`) 
  VALUES (?, ?, ?, ?);");
  $stmt->bind_param('ssss', $email, $hashPass, $date, $nameFromEmail);

  if($stmt->execute()) {
    $res = [
      "status" => true,
      "user_id" => mysqli_insert_id($mysqli),
    ];
    sendReply(201, $res);
  }

  else {
    $res = [
      "status" => false,
      "message" => 'Bad Request!',
    ];
    sendReply(401, $res);
  }
}

function login($postData) {
  $mysqli = DataBase::getInstance();
 
  $email = mysqli_real_escape_string($mysqli, $postData["email"]);
  $password = mysqli_real_escape_string($mysqli, $postData["password"]);

  if(empty($postData) || !isset($email) || empty($email) || !isset($password) || empty($password)) return false;

  $stmt = $mysqli->prepare("SELECT * FROM `users` WHERE `email` = (?);");
  $stmt->bind_param('s', $email);
  $stmt->execute();
  $result = $stmt->get_result();

  if(mysqli_num_rows($result) > 0) {
    $data = $result->fetch_assoc();
    $isValid = password_verify($password, $data["password"]);

    if(!$isValid) {
      $res = [
        "status" => false,
        "message" => "Invalid username or password!",
      ];
      sendReply(403, $res);
    } 

    else {
      $secret_key = 'authkey456';
      $iat = time();
      $exp = $iat + 60 * 60;
      $user_data = [
        "id" => $data["id"],
        "email" => $data["email"],
      ];

      $payload_info = array(
        'iss' => 'http://willberries-api.com/',
        'aud' => 'http://localhost:3000/',
        // 'iss' => 'https://willberries-api.herokuapp.com/',
        // 'aud' => 'https://willberries.herokuapp.com/',
        'iat' => $iat,
        'exp' => $exp,
        'data' => $user_data,
      );
      
      $jwt = JWT::encode($payload, $secret_key, 'HS512');
      header('Authorization: Bearer '.$jwt);

      $res = [
        "status" => true,
        "user_id" => $data["id"],
        "token" => $jwt,
        "expires" => $exp,
      ];   
      sendReply(200, $res);
    }
  }

  else {
    $res = [
      "status" => false,
      "message" => 'User with email '.$postData['email'].' was not found!',
    ];
    sendReply(404, $res);
  }
}

function logout() {
  if(isAuth()) {
    try {
      header_remove('Authorization');

      $res = [
        "status" => true,
        "message" => "You have been logged out",
      ];
      
      sendReply(200, $res);
    }
    catch(Exception $ex) {
      $res = [
        "status" => false,
        "message" => $ex->getMessage(),
      ];
      sendReply(500, $res); // error 500 - internal server error
    }
  }
  else {
    $res = [
      "status" => false,
      "message" => "You are not logged in!",
    ];
      
    sendReply(401, $res);
  }

  die;
}

/************************ ORDERS ********************/
/************************ ORDERS ********************/
/************************ ORDERS ********************/
/************************ ORDERS ********************/

function placeOrder($db, $data) {
  $personName = $data["name"];
  $email = $data["email"];
  $phone = $data["phone"];
  $goods = $data["goods"];

  // foreach($goods as $good) {
  //   mysqliQuery($db, "INSERT INTO `orders` (`good_id`, `user_id`, `email`, `price`, `date`) VALUES (`$good['id']`, ")
  // }
  // if(mysqliQuery($db, "INSERT INTO `goods` (`id`, `name`, `description`, `category`, `gender`, `price`, `img`, `label`, `offer`) VALUES (NULL, '$name', '$description', '$category', '$gender', '$price', '$img', '$label', '$offer');")) 
  // {
  //   http_response_code(201); /* ответ 201 - Created */
  //   $res = [
  //     "status" => true,
  //     "good_id" => mysqli_insert_id($db)
  //   ];
  // }

  // else {
  //   http_response_code(401); /* Bad request */
  //   $res = [
  //     "status" => false,
  //     "message" => "Bad Request!"
  //   ];
  // }

  // echo json_encode($res);
}

function getOrders($db) {
  $orders = mysqliQuery($db, "SELECT * FROM `orders`;");

  $ordersList = [];

  while($order = mysqli_fetch_assoc($orders)) {
    $ordersList[] = $order;
  }

  echo json_encode($ordersList); /* Данные переводятся в JSON формат */
}

function getOrder($db, $id) {
  $order = mysqliQuery($db, "SELECT * FROM `orders` WHERE `id` = '$id';");
  
  if(mysqli_num_rows($order) === 0) {
    http_response_code(404);
    $res = [
      "status" => false,
      "message" => "Order wasn't found!"
    ];
    echo json_encode($res);
  }
  else {
    $order = mysqli_fetch_assoc($order); /* Преобразование в обычный ассоциативный массив */
    echo json_encode($order);
  }
}