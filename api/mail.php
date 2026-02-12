<?php
/**
 * BACKEND MAIL EUROPCAPITAL - CONFIGURATION HOSTINGER
 * Ce fichier doit être placé dans le dossier /api/ de votre serveur Hostinger.
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Gestion de la pré-vérification CORS (Pre-flight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

// Récupération des données POST
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

if (!$input || !isset($input['to'][0]['email']) || !isset($input['subject'])) {
    echo json_encode(["status" => "error", "message" => "Données manquantes"]);
    exit;
}

$to = $input['to'][0]['email'];
$subject = $input['subject'];
$message = $input['html'];

/**
 * CONFIGURATION SMTP HOSTINGER
 * Note: Sur un hébergement mutualisé Hostinger, la fonction mail() utilise l'adresse locale.
 * Pour une fiabilité maximale, l'expéditeur DOIT être contact@europcapital.com
 */
$from = "contact@europcapital.com";
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: Europcapital <" . $from . ">" . "\r\n";
$headers .= "Reply-To: " . $from . "\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Tentative d'envoi via le serveur Hostinger
$success = mail($to, $subject, $message, $headers);

if ($success) {
    echo json_encode(["status" => "success", "message" => "Email envoyé avec succès"]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Le serveur n'a pas pu envoyer l'email"]);
}
?>