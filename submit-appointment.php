<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Configuration
$DOCTOR_EMAIL = 'drsaidali12@gmail.com';
$DOCTOR_PHONE = '254703553000'; // WhatsApp number (without +)
$ADMIN_EMAIL = 'drsaidali12@gmail.com'; // Email to receive notifications

// Function to send email notification
function sendEmailNotification($data) {
    global $DOCTOR_EMAIL, $ADMIN_EMAIL;
    
    $to = $ADMIN_EMAIL;
    $subject = "New Appointment Request - " . $data['name'];
    
    $message = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #3d5a80; color: white; padding: 20px; text-align: center; }
            .content { background: #f4f4f4; padding: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #3d5a80; }
            .value { margin-left: 10px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>New Appointment Request</h2>
            </div>
            <div class='content'>
                <div class='field'>
                    <span class='label'>Name:</span>
                    <span class='value'>" . htmlspecialchars($data['name']) . "</span>
                </div>
                <div class='field'>
                    <span class='label'>Phone:</span>
                    <span class='value'>" . htmlspecialchars($data['phone']) . "</span>
                </div>
                <div class='field'>
                    <span class='label'>Email:</span>
                    <span class='value'>" . htmlspecialchars($data['email']) . "</span>
                </div>
                <div class='field'>
                    <span class='label'>Preferred Date:</span>
                    <span class='value'>" . htmlspecialchars($data['date']) . "</span>
                </div>
                <div class='field'>
                    <span class='label'>Preferred Time:</span>
                    <span class='value'>" . htmlspecialchars($data['time']) . "</span>
                </div>
                <div class='field'>
                    <span class='label'>Contact Method:</span>
                    <span class='value'>" . htmlspecialchars($data['contact-method']) . "</span>
                </div>
                <div class='field'>
                    <span class='label'>Service:</span>
                    <span class='value'>" . htmlspecialchars($data['service']) . "</span>
                </div>
                <div class='field'>
                    <span class='label'>Message:</span>
                    <span class='value'>" . nl2br(htmlspecialchars($data['message'])) . "</span>
                </div>
                <div class='field'>
                    <span class='label'>New Patient:</span>
                    <span class='value'>" . (isset($data['new-patient']) ? 'Yes' : 'No') . "</span>
                </div>
            </div>
            <div class='footer'>
                <p>This appointment request was submitted from your website.</p>
                <p>Please respond to the patient as soon as possible.</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: Dr. Said Website <noreply@drsaid.com>" . "\r\n";
    $headers .= "Reply-To: " . $data['email'] . "\r\n";
    
    return mail($to, $subject, $message, $headers);
}

// Function to send WhatsApp notification (using WhatsApp Business API or third-party service)
function sendWhatsAppNotification($data) {
    global $DOCTOR_PHONE;
    
    // Format message for WhatsApp
    $message = "🦷 *NEW APPOINTMENT REQUEST*\n\n";
    $message .= "👤 *Name:* " . $data['name'] . "\n";
    $message .= "📞 *Phone:* " . $data['phone'] . "\n";
    $message .= "📧 *Email:* " . $data['email'] . "\n";
    $message .= "📅 *Date:* " . $data['date'] . "\n";
    $message .= "🕐 *Time:* " . $data['time'] . "\n";
    $message .= "💬 *Contact via:* " . $data['contact-method'] . "\n";
    $message .= "🏥 *Service:* " . $data['service'] . "\n";
    if (!empty($data['message'])) {
        $message .= "📝 *Message:* " . $data['message'] . "\n";
    }
    $message .= "🆕 *New Patient:* " . (isset($data['new-patient']) ? 'Yes' : 'No') . "\n";
    
    // Option 1: Using Twilio WhatsApp API
    // Get your credentials from: https://console.twilio.com/
    $twilio_sid = 'YOUR_TWILIO_ACCOUNT_SID';  // Replace with your Twilio Account SID
    $twilio_token = 'YOUR_TWILIO_AUTH_TOKEN'; // Replace with your Twilio Auth Token
    $twilio_whatsapp = 'whatsapp:+14155238886'; // Twilio Sandbox number (or your approved number)
    $to_whatsapp = 'whatsapp:+' . $DOCTOR_PHONE;
    
    // Only attempt to send if credentials are configured
    if ($twilio_sid !== 'YOUR_TWILIO_ACCOUNT_SID' && $twilio_token !== 'YOUR_TWILIO_AUTH_TOKEN') {
        try {
            $url = "https://api.twilio.com/2010-04-01/Accounts/$twilio_sid/Messages.json";
            $post_data = array(
                'From' => $twilio_whatsapp,
                'To' => $to_whatsapp,
                'Body' => $message
            );
            
            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post_data));
            curl_setopt($ch, CURLOPT_USERPWD, "$twilio_sid:$twilio_token");
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
            
            $response = curl_exec($ch);
            $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);
            
            if ($http_code == 201) {
                error_log("WhatsApp sent successfully via Twilio");
                return true;
            } else {
                error_log("WhatsApp send failed: " . $response);
                return false;
            }
        } catch (Exception $e) {
            error_log("WhatsApp error: " . $e->getMessage());
            return false;
        }
    }
    
    // If Twilio not configured, log the message for manual follow-up
    error_log("WhatsApp notification (not sent - configure Twilio): " . $message);
    return true; // Return true so email still works
}

// Function to save appointment to database (optional)
function saveToDatabase($data) {
    // Configure your database connection
    /*
    $servername = "localhost";
    $username = "your_db_username";
    $password = "your_db_password";
    $dbname = "your_db_name";
    
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    if ($conn->connect_error) {
        return false;
    }
    
    $stmt = $conn->prepare("INSERT INTO appointments (name, phone, email, preferred_date, preferred_time, contact_method, service, message, new_patient, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())");
    $new_patient = isset($data['new-patient']) ? 1 : 0;
    $stmt->bind_param("ssssssssi", 
        $data['name'], 
        $data['phone'], 
        $data['email'], 
        $data['date'], 
        $data['time'], 
        $data['contact-method'], 
        $data['service'], 
        $data['message'], 
        $new_patient
    );
    
    $result = $stmt->execute();
    $stmt->close();
    $conn->close();
    
    return $result;
    */
    
    return true;
}

// Main processing
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get POST data
    $data = array(
        'name' => $_POST['name'] ?? '',
        'phone' => $_POST['phone'] ?? '',
        'email' => $_POST['email'] ?? '',
        'date' => $_POST['date'] ?? '',
        'time' => $_POST['time'] ?? '',
        'contact-method' => $_POST['contact-method'] ?? '',
        'service' => $_POST['service'] ?? '',
        'message' => $_POST['message'] ?? '',
        'new-patient' => isset($_POST['new-patient']) ? $_POST['new-patient'] : null,
        'consent' => $_POST['consent'] ?? ''
    );
    
    // Validate required fields
    if (empty($data['name']) || empty($data['phone']) || empty($data['email']) || 
        empty($data['date']) || empty($data['contact-method']) || empty($data['service'])) {
        echo json_encode([
            'success' => false,
            'message' => 'Please fill in all required fields.'
        ]);
        exit;
    }
    
    // Validate email
    if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        echo json_encode([
            'success' => false,
            'message' => 'Please provide a valid email address.'
        ]);
        exit;
    }
    
    // Send notifications
    $emailSent = sendEmailNotification($data);
    $whatsappSent = sendWhatsAppNotification($data);
    $savedToDb = saveToDatabase($data);
    
    if ($emailSent) {
        echo json_encode([
            'success' => true,
            'message' => 'Thank you! Your appointment request has been received. We will contact you shortly to confirm.'
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'There was an error submitting your request. Please try again or call us directly.'
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method.'
    ]);
}
?>
