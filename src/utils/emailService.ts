import { LeadItem } from './leadsManager';

export interface EmailSendResult {
  success: boolean;
  message: string;
}

const RECIPIENT_EMAILS = [
  'saielkharote98@gmail.com',
  'info@pinfratech.com',
];

/**
 * Dispatches form submission notifications to executive emails completely separately
 * (no CC header) so neither recipient sees or knows about the other recipient.
 */
export async function sendEmailNotification(lead: LeadItem): Promise<EmailSendResult> {
  const payload = {
    _subject: `⚡ [PIPL New Lead] ${lead.id} - ${lead.fullName} (${lead.division})`,
    _template: 'table',
    _captcha: 'false',
    _replyto: lead.email,
    Reference_ID: lead.id,
    Customer_Name: lead.fullName,
    Company_Or_Society: lead.company || 'N/A (Individual / Residential)',
    Phone_Number: lead.phone,
    Email_Address: lead.email,
    Engineering_Division: lead.division,
    Client_Sector: lead.sector,
    Project_Scale: lead.projectScale,
    Site_Location: lead.location,
    Technical_Notes: lead.notes || 'No specific notes entered.',
    Submitted_Timestamp: new Date(lead.createdAt).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
    Source: lead.source || 'Website RFP Quote Form',
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500); // 3.5 sec fast timeout

    // Send completely separate independent requests for each recipient with zero CC
    const results = await Promise.allSettled(
      RECIPIENT_EMAILS.map((email) =>
        fetch(`https://formsubmit.co/ajax/${email}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        })
      )
    );

    clearTimeout(timeoutId);

    const anySuccess = results.some(
      (res) => res.status === 'fulfilled' && res.value.ok
    );

    if (anySuccess) {
      return {
        success: true,
        message: 'Notification sent successfully to executive inboxes',
      };
    } else {
      return {
        success: false,
        message: 'Form service returned an error status.',
      };
    }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.warn('Email dispatch warning (handled gracefully):', errorMsg);
    return {
      success: false,
      message: errorMsg,
    };
  }
}

/**
 * Dispatches a password reset OTP code completely separately to executive emails
 * (no CC header) so neither recipient sees or knows about the other recipient.
 */
export async function sendPasswordResetOtpEmail(otpCode: string): Promise<EmailSendResult> {
  const payload = {
    _subject: `🔐 [PIPL Security] Portal Password Reset Verification Code: ${otpCode}`,
    _template: 'table',
    _captcha: 'false',
    Verification_OTP: otpCode,
    Action: 'Password Reset Request',
    Notice: 'Use this 6-digit verification code to reset your Portal password. If you did not request this, please disregard.',
    Requested_At: new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    }),
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000);

    // Send completely separate independent requests for each recipient with zero CC
    const results = await Promise.allSettled(
      RECIPIENT_EMAILS.map((email) =>
        fetch(`https://formsubmit.co/ajax/${email}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            ...payload,
            _replyto: email,
          }),
          signal: controller.signal,
        })
      )
    );

    clearTimeout(timeoutId);

    const anySuccess = results.some(
      (res) => res.status === 'fulfilled' && res.value.ok
    );

    if (anySuccess) {
      return {
        success: true,
        message: 'Verification code dispatched to executive inboxes',
      };
    } else {
      return {
        success: false,
        message: 'Could not dispatch email. Please use Master Key or try again.',
      };
    }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      message: errorMsg,
    };
  }
}
