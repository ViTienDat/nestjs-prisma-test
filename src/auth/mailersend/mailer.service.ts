import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class MailerService {
  async sendOtpEmail(email: string, otp: string) {
    const apiKey = process.env.API_KEY_SEND_EMAIL;
    const url = 'https://api.mailersend.com/v1/email';
  
    const emailData = {
      from: {
        email: process.env.EMAIL_SEND,
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
