package com.pilot.watchstore.services.impl.emailServiceAndModel;
import com.pilot.watchstore.services.impl.emailServiceAndModel.EmailModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;

import org.springframework.stereotype.Service;

import javax.mail.BodyPart;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.internet.*;

@Service
public class EmailService {


    @Autowired
    JavaMailSender mailSender;

    public JavaMailSender getMailSender() {
        return mailSender;
    }

    public void setMailSender(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendMail(EmailModel mail) throws MessagingException {
        System.out.println(mail.getContent());
        System.out.println("from " + mail.getFrom());
        System.out.println("to " + mail.getTo());

        MimeMessage message = mailSender.createMimeMessage();
        message.setFrom(mail.getFrom());
        message.setRecipient(MimeMessage.RecipientType.TO, new InternetAddress(mail.getTo()));
        message.setSubject(mail.getSubject());

        Multipart multipart = new MimeMultipart();
        BodyPart messageBodyPart = new MimeBodyPart();
        messageBodyPart.setContent(mail.getContent(), "text/html; charset=utf-8");
        multipart.addBodyPart(messageBodyPart);
        message.setContent(multipart);
        System.setProperty("https.protocols", "TLSv1.1");
        mailSender.send(message);
    }


}
