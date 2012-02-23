<?php
require("config.php");

$mbox = imap_open($mail, $user, $pass);
if (!$mbox) {
	die("Mailbox open FAILED.");
}

$boxes = imap_list($mbox, $mail, "*");
echo json_encode($boxes);
?>