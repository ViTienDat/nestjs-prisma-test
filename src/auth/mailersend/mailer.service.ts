import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class MailerService {
  async sendOtpEmail(email: string, otp: string) {
    const apiKey = 'mlsn.8110c7a367eedfd6bef7bb6f618a3c6e9f5a3b549f120314dea851cbd4645673';
    const url = 'https://api.mailersend.com/v1/email';
  
    const emailData = {
      from: {
        email: 'MS_86AnVb@trial-3zxk54v0kr6gjy6v.mlsender.net',
        name: 'test'
      },
      to: [
        {
          email: email,
          name: 'Recipient Name'
        }
      ],
      subject: 'Your OTP Code',
      html: `<p>Your OTP code is <strong>${otp}</strong></p>`
    };

    try {
      const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(emailData)
    });

    return response;
    } catch (error) {
      throw new HttpException('error email', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
