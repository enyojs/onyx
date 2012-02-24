<?php
require("config.php");

$box = $_REQUEST["box"];
if (!$box) {
	die("Bad folder parameter.");
}

$mbox = imap_open($box, $user, $pass);
if (!$mbox) {
	die("Mailbox open FAILED.");
}

$mc = imap_check($mbox);
$last = min(10, $mc->Nmsgs);
$info = imap_fetch_overview($mbox, "1:$last", 0);

foreach ($info as $msg) {
	$body = imap_body($mbox, $msg->msgno, FT_PEEK);
	$msg->blurb = substr($body, 0, 32);
}

imap_close($mbox);

// make more

$more = array_slice($info, 0);
$info = array_merge($info, $more);

/*
$more = array_slice($info, 0);
$info = array_merge($info, $more);

$more = array_slice($info, 0);
$info = array_merge($info, $more);

$more = array_slice($info, 0);
$info = array_merge($info, $more);

$more = array_slice($info, 0);
$info = array_merge($info, $more);
*/

echo json_encode($info);
?>