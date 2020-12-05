<?php
$nameArea = htmlspecialchars($_POST['nameArea'], ENT_QUOTES, 'UTF-8');
$mailArea = htmlspecialchars($_POST['mailArea'], ENT_QUOTES, 'UTF-8');
$commentArea = htmlspecialchars($_POST['commentArea'], ENT_QUOTES, 'UTF-8');

// 文字コードの指定
header('Content-Type: text/html; charset=UTF-8');
mb_language('japanese');
mb_internal_encoding('utf-8');

// 自分のメールアドレス
$mailaddress = 'sho.softtennis47@icloud.com';
// メールタイトル(ユーザへのメール)
$mailtitle1 = 'SHO EGAMIへのお問い合わせが完了しました';
// メールタイトル(自分へのメール)
$mailtitle2 = 'ポートフォリオからお問い合わせがありました';
//ユーザが入力したメールアドレス
$mail_to = $mailArea;

//自動返信メール本文
$usermessage .= "繪上 翔（エガミ ショウ）へのお問い合わせありがとうございます。\n";
$usermessage .= "お問い合わせ内容を確認させていただき、後ほどご回答をさせていただきます。\n";
$usermessage .= "\n";
$usermessage .= "─登録内容の確認──────────────\n";
$usermessage .= "\n";
$usermessage .= "お名前: ".$nameArea."\n";
$usermessage .= "メールアドレス: ".$mailArea."\n";
$usermessage .= "お問い合わせ内容: \n";
$usermessage .= $commentArea."\n";
$usermessage .= "\n";
$usermessage .= "──────────────────────\n";
$usermessage .= "\n";
$usermessage .= "======================================\n";
$usermessage .= "このメールは自動送信です。\n";
$usermessage .= "お心当たりのない方は、お手数をおかけいたしますが、\n";
$usermessage .= "下記メールアドレスまでご連絡ください。\n";
$usermessage .= "======================================\n";
$usermessage .= "\n";
$usermessage .= "\n";
$usermessage .= "━━━━━━━━━━━━━━━━━━━━━━━\n";
$usermessage .= "　繪上 翔（エガミ ショウ）\n";
$usermessage .= "　E-mail：sho.softtennis47@icloud.com\n";
$usermessage .= "━━━━━━━━━━━━━━━━━━━━━━━\n";

// 自分への確認メッセージ
$adminmessage .= "ポートフォリオからお問い合わせがありました。\n";
$adminmessage .= "\n";
$adminmessage .= "─登録内容の確認──────────────\n";
$adminmessage .= "\n";
$adminmessage .= "お名前: ".$nameArea."\n";
$adminmessage .= "メールアドレス: ".$mailArea."\n";
$adminmessage .= "お問い合わせ内容: \n";
$adminmessage .= $commentArea."\n";
$adminmessage .= "\n";
$adminmessage .= "──────────────────────\n";

// ユーザへのメールの送信
mb_send_mail($mail_to, $mailtitle1, $usermessage, 'From:'.$mailaddress);
// 自分へのメールの送信
mb_send_mail($mailaddress, $mailtitle2, $adminmessage, 'From:'.$mail_to);

header('Content-type: application/json');
echo json_encode('');
?>
