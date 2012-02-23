<?php
require("config.php");

$mbox = imap_open($mail, $user, $pass);
if (!$mbox) {
	die("boxes: mailbox open FAILED.");
}

$records = array();
$boxes = imap_list($mbox, $mail, "*");
foreach ($boxes as $box) {
	$names = explode("}", $box);
	$record = array(
		"box" => $box,
		"name" => $names[1],
		"info" => imap_status($mbox, $box, SA_ALL)
	);
	array_push($records, $record);
};
echo json_encode($records);

?>