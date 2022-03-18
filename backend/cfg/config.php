<?php

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

// Development connection
// const DB_HOST = "127.0.0.1";
// const DB_USER = "root";
// const DB_PASS = "";
// const DB_NAME = "api_willberries";

// Remote connection
const DB_HOST = "remotemysql.com";
const DB_USER = "YcesJcRre4";
const DB_PASS = "aQuK5wq3m3";
const DB_NAME = "YcesJcRre4";

class DataBase
{
  /* variable (storing db connection) is static */
  private static $mysqli;

  /* constructor function is private (cannot be called) (final that cannot be overridden) */
  final private function __construct() {}

  /* function returning object is static as well (usually function getInstance as here) */
  public static function getInstance()
  {
    if (!is_object(self::$mysqli)) self::$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    return self::$mysqli;
  }

  /* destructor function __destruct is called by garbage collector and should finalize state */
  private function __destruct()
  {
    if (self::$mysqli) self::$mysqli->close();
  }

  /* cloning of singleton classes is not allowed so __clone() function must be empty */
  private function __clone() {}
}

// session_set_cookie_params(array(
//     'lifetime' => 86400,
//     'path' => '/',
//     'domain' => $_SERVER['HTTP_HOST'],
//     'secure' => false,
//     'httponly' => false,
// ));

session_start();