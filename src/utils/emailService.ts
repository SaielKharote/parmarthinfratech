import { LeadItem } from './leadsManager';

export interface EmailSendResult {
  success: boolean;
  message: string;
}

const PRIMARY_NOTIFICATION_EMAIL = 'SAIELKHAROTE219@gmail.com';
const CC_EMAIL = 'info@pinfratech.com';

/**
 * Dispatches form submission notification to the designated executive email
 * using FormSubmit AJAX endpoint.
 */
export async function sendEmailNotification(lead: LeadItem): Promise<EmailSendResult> {
  const endpoint = `https://formsubmit.co/ajax/${PRIMARY_NOTIFICATION_EMAIL}`;

  const payload = {
    _subject: `⚡ [PIPL New Lead] ${lead.id} - ${lead.fullName} (${lead.division})`,
    _template: 'table',
    _captcha: 'false',
    _replyto: lead.email,
    _cc: CC_EMAIL,
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
    const timeoutId = setTimeout(() => controller.abort(), 9000); // 9 sec timeout

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      return {
        success: true,
        message: `Notification sent successfully to ${PRIMARY_NOTIFICATION_EMAIL}`,
      };
    } else {
      const data = await response.json().catch(() => null);
      return {
        success: false,
        message: data?.message || 'Form service returned an error status.',
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
