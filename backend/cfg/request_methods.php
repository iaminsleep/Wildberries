<?php

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
  case 'GET':
    if($type === 'goods') {
      if(isset($id)) {
        getGood($id); /* Retrieve one good by its ID */
      }
      else {
        getGoods();  /* Retrieve all of the goods */
      }
    }
    if($type === 'orders') {
      if(isset($id)) {
        getOrder($id);
      }
      else {
        getOrders();
      }
    }
    if($type === 'users') {
      if(isset($id)) {
        getUser($id);
      }
      else {
        getUsers();
      }
    }
    break;
  case 'POST':
    if($type === 'goods') {
      addGood($_POST);
    }
    if($type === 'orders') {
      placeOrder($_POST);
    }
    if($type === 'users') {
      if($_POST["req"] === 'register') registerUser($_POST);
      else if($_POST["req"] === 'login') login($_POST);
      else if(!isset($_POST["req"])) logout();
    }
    break;
  case 'PATCH':
    if($type === 'goods') {
      if(isset($id)) {
        $data = file_get_contents('php://input');
        $data = json_decode($data, true); /* преобразование json в обычный ассоциативный php массив, 
        потому что метод PATCH не поддерживает form-дату из метода POST */
        updateGood($data, $id);
      }
    }
    break;
  case 'DELETE':
    if($type === 'goods') {
      if(isset($id)) {
        deleteGood($id);
      }
    }
    break;
}