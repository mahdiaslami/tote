<?php

$email = $_POST['email'];
$database = $_POST['database'];
$data = $_POST['data'];

file_put_contents(__DIR__ . "/storage/$email-$database.json", $data);
