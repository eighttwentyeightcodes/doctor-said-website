# Appointment Form Backend Setup Guide

## Overview
The appointment form now sends notifications via **Email** and **WhatsApp** when patients submit booking requests.

## Files Created
- `submit-appointment.php` - Backend handler for form submissions

## Setup Instructions

### 1. Email Configuration (Required)
The PHP script uses PHP's built-in `mail()` function. Ensure your server has mail configured:

**For Local Development (Mac):**
```bash
# Install and configure Postfix
sudo postfix start
```

**For Production Server:**
- Most hosting providers (cPanel, Plesk) have mail pre-configured
- Verify by testing: `php -r "mail('test@example.com', 'Test', 'Test message');"`

### 2. WhatsApp Integration Options

#### Option A: Twilio WhatsApp API (Recommended)
1. Sign up at [twilio.com](https://www.twilio.com/try-twilio)
2. Get your Account SID and Auth Token
3. Enable WhatsApp in Twilio Console
4. Update `submit-appointment.php` lines 72-90:
   ```php
   $twilio_sid = 'YOUR_TWILIO_SID';
   $twilio_token = 'YOUR_TWILIO_TOKEN';
   ```
5. Uncomment the Twilio code block

**Cost:** ~$0.005 per message

#### Option B: WhatsApp Business API
1. Apply for WhatsApp Business API access
2. Get approved by Meta
3. Integrate using their official API
4. Update the `sendWhatsAppNotification()` function

#### Option C: Third-Party Services
- **Ultramsg**: [ultramsg.com](https://ultramsg.com)
- **WATI**: [wati.io](https://www.wati.io)
- **Twilio**: [twilio.com](https://www.twilio.com)

### 3. Database Storage (Optional)
To store appointments in a database:

1. Create MySQL database:
```sql
CREATE DATABASE dr_said_appointments;

USE dr_said_appointments;

CREATE TABLE appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    preferred_date DATE NOT NULL,
    preferred_time TIME,
    contact_method VARCHAR(50),
    service VARCHAR(255),
    message TEXT,
    new_patient BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

2. Update `submit-appointment.php` lines 97-125 with your database credentials
3. Uncomment the database code block

### 4. Server Requirements
- PHP 7.4 or higher
- `mail()` function enabled
- cURL extension (for WhatsApp APIs)
- MySQL (optional, for database storage)

### 5. Testing

#### Test Email:
```bash
# Navigate to project directory
cd /Users/mac/Downloads/Personal_portfolio

# Start PHP server
php -S localhost:8000

# Open browser and submit form
# Check email at drsaidali12@gmail.com
```

#### Test Form Submission:
1. Open `http://localhost:8000`
2. Scroll to "Book an Appointment"
3. Fill out the form
4. Click "Book Appointment"
5. Check for success message
6. Verify email received

### 6. Production Deployment

#### Upload Files:
```bash
# Upload via FTP/SFTP to your web server
- index.html
- submit-appointment.php
- script.js
- style.css
- (all other files)
```

#### Set Permissions:
```bash
chmod 644 submit-appointment.php
```

#### Update Configuration:
1. Edit `submit-appointment.php`
2. Update email addresses (lines 7-8)
3. Configure WhatsApp service
4. Test thoroughly

### 7. Security Considerations

✅ **Already Implemented:**
- Input validation
- Email sanitization
- XSS protection with `htmlspecialchars()`
- CSRF protection via form origin

🔒 **Recommended Additions:**
- Add reCAPTCHA to prevent spam
- Implement rate limiting
- Use HTTPS (SSL certificate)
- Add honeypot field for bot detection

### 8. Troubleshooting

**Form not submitting:**
- Check browser console for errors
- Verify PHP file path is correct
- Ensure server supports PHP

**Email not received:**
- Check spam folder
- Verify server mail configuration
- Test with: `php -r "mail('your@email.com', 'Test', 'Test');"`

**WhatsApp not working:**
- Verify API credentials
- Check API service status
- Review error logs: `tail -f /var/log/apache2/error.log`

### 9. Current Configuration

**Email Recipient:** `drsaidali12@gmail.com`
**WhatsApp Number:** `+254 703 553 000`
**Form Action:** `submit-appointment.php`

### 10. Alternative: Email-Only Setup

If you don't want WhatsApp integration:
1. The form will still work with email notifications only
2. WhatsApp function will log messages but not send them
3. All appointment data will be emailed to you

## Support

For issues or questions:
- Check PHP error logs
- Verify server configuration
- Test with simple PHP mail script first

## Next Steps

1. ✅ Test locally with PHP server
2. ⬜ Configure email on production server
3. ⬜ Set up WhatsApp API (optional)
4. ⬜ Add database storage (optional)
5. ⬜ Deploy to production
6. ⬜ Test end-to-end
