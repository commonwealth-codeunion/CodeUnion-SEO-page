<?include $_SERVER['DOCUMENT_ROOT'].'/seo/phpmailer/PHPMailer.php';
include $_SERVER['DOCUMENT_ROOT'].'/seo/phpmailer/SMTP.php';
include $_SERVER['DOCUMENT_ROOT'].'/seo/phpmailer/Exception.php';
if($_POST['mail']==true){
$email=$_POST['mail'];
}else{
$email='Отправитель';
};
if($_POST['name']==true){
$name=$_POST['name'];
}else{
$name='Отправитель';
};
if($_POST['phone']==true){
$phone=$_POST['phone'];
}else{
$phone='Телефон';
};
$mail=new PHPMailer\PHPMailer\PHPMailer(true);
$msg="ok";
$mail->isSMTP();
$mail->CharSet="UTF-8";
$mail->Host = 'smtp.mail.ru';  																							// Specify main and backup SMTP servers
$mail->SMTPAuth = true;
$mail->SMTPSecure = 'ssl';  
$mail->Port=465;
$mail->Username = 'pr@codeunion.kz';
$mail->Password = '9+sE5RtqOcKp';
$mail->setFrom('pr@codeunion.kz');
$mail->addAddress('seo@codeunion.kz');
$mail->isHTML(true);
$mail->Subject='Новая заявка!';
$mail->Body='<html><body>';
$mail->Body.='<h1>Новая заявка !</h1><br>';
$mail->Body.='<table rules="all" style="border-color: #666; max-width: 200px;" cellpadding="10">';
$mail->Body.="<tr style='background: #eee;'><td>
                        <strong>Имя:</strong>
                        </td><td>".strip_tags($name)."</td></tr>";
$mail->Body.="<tr><td>
                        <strong>Почта:</strong>
                        </td><td>".strip_tags($email)."</td></tr>";
$mail->Body.="<tr><td>
                        <strong>Телефон:</strong>
                        </td><td>".strip_tags($phone)."</td></tr>";
$mail->Body.="</table>";
$mail->Body.="</body></html>";
if($mail->send()){echo "Заявка успешно отправлена, в ближайшее время с вами свяжутся наши специалисты.";}
else{echo 'Произошла ошибка, попробуйте позже.';}
?>
