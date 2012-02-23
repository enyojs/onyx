<?php
require("config.php");

function boxes() {
	global $mail, $user, $pass;
	//
	$mbox = imap_open($mail, $user, $pass);
	if (!$mbox) {
		die("boxes: mailbox open FAILED.");
	}
	//
	$boxes = imap_list($mbox, $mail, "*");
	//
	imap_close($mbox);
	return $boxes;
}

function info($inBox) {
	global $user, $pass;
	//
	$mbox = imap_open($inBox, $user, $pass);
	if (!$mbox) {
		die("Mailbox open FAILED.");
	}
	//
	$info = imap_mailboxmsginfo($mbox);
	//
	imap_close($mbox);
	return $info;
}

$records = array();

$boxes = boxes();
foreach ($boxes as $box) {
	$record = array(
		"name" => $box,
		"info" => info($box)
	);
	array_push($records, $record);
};

echo json_encode($records);

?>