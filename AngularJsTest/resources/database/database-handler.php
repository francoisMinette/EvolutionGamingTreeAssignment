<?php
/*
 * php handler that deals with filling data in file.
 * the data will note be saved / loaded if the test is not done on a server
*/

$file = 'database.txt';

$postdata = file_get_contents("php://input");

file_put_contents($file, $postdata, LOCK_EX);
?>