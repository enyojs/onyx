<?php
require("config.php");

$folder = $_REQUEST["folder"];
if (!$folder) {
	die("Bad folder parameter.");
}

$mbox = imap_open($mail.$folder, $user, $pass);
if (!$mbox) {
	die("Mailbox open FAILED.");
}

$info = imap_mailboxmsginfo($mbox);
echo json_encode($info);
?>