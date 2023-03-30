package org.backendmealplan.backendmealplan.bl;


import org.backendmealplan.backendmealplan.beans.Mail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;

@Service
public class EmailBL  {

    private JavaMailSender mailSender;
    private SpringTemplateEngine templateEngine;


    @Autowired
    public EmailBL(JavaMailSender mailSender, SpringTemplateEngine templateEngine){
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
    }


    public void send(Mail mail) {
        try {
            MimeMessage mimeMessage =mailSender.createMimeMessage();
            MimeMessageHelper helper =new MimeMessageHelper(mimeMessage,
                    MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());

            Context context = new Context();

            context.setVariables(mail.getModel());
            String html = templateEngine.process("send-email",context);
            helper.setTo(mail.getTo());
            helper.setFrom(mail.getFrom());
            helper.setSubject(mail.getSubject());
            helper.setText(html,true);
            mailSender.send(mimeMessage);
            System.out.println("Email sent successfully to: " + mail.getTo());

        }catch (MessagingException e){
            e.printStackTrace();
        }

    }
}
