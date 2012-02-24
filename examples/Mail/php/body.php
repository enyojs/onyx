<?php
require("config.php");

$box = $_REQUEST["box"];
if (!$box) {
	die("Bad box parameter.");
}

$msg = $_REQUEST["msgno"];
if ($msg < 1) {
	die("Bad msgno parameter.");
}

$mbox = imap_open($box, $user, $pass);
if (!$mbox) {
	die("Mailbox open FAILED.");
}

$body = imap_body($mbox, $msg);

imap_close($mbox);

echo $body;
?>