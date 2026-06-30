import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates a pre-filled WhatsApp link based on the booking form data
 */
export function generateWhatsAppLink(data: {
  name: string;
  guests: number | string;
  checkIn: string;
  checkOut: string;
  purpose: string;
  message?: string;
}): string {
  const whatsappNumber = '919876543210'; // Mauli Farms Business Phone
  
  const text = `Hello Mauli Farms,

I would like to inquire about booking the villa. Here are the details:
- *Name:* ${data.name}
- *Number of Guests:* ${data.guests}
- *Check-in Date:* ${data.checkIn}
- *Check-out Date:* ${data.checkOut}
- *Purpose:* ${data.purpose}
${data.message ? `- *Additional Message:* ${data.message}` : ''}

Please confirm availability and sharing pricing details.`;

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
}
