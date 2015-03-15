<?php
/*
 * php handler that deals with filling data in file
*/

$file = 'database.txt';

$postdata = file_get_contents("php://input");

file_put_contents($file, $postdata, LOCK_EX);
?>