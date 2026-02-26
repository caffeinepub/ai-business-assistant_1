import { type Language } from '../components/LanguageSelector';

export interface MilestoneLabel {
  title: string;
  description: string;
}

export const milestoneLabels: Record<number, Record<Language, MilestoneLabel>> = {
  1: {
    english: {
      title: 'Create a UPI Account',
      description: 'Set up your first UPI account and start accepting digital payments from customers instantly.',
    },
    hindi: {
      title: 'UPI अकाउंट बनाएं',
      description: 'अपना पहला UPI अकाउंट बनाएं और ग्राहकों से तुरंत डिजिटल पेमेंट लेना शुरू करें।',
    },
    marathi: {
      title: 'UPI खाते तयार करा',
      description: 'तुमचे पहिले UPI खाते तयार करा आणि ग्राहकांकडून लगेच डिजिटल पेमेंट घेणे सुरू करा.',
    },
  },
  2: {
    english: {
      title: 'File Your First GST Return',
      description: 'Understand the GST filing process and submit your first return on the government portal.',
    },
    hindi: {
      title: 'पहला जीएसटी रिटर्न भरें',
      description: 'जीएसटी फाइलिंग प्रक्रिया समझें और सरकारी पोर्टल पर अपना पहला रिटर्न जमा करें।',
    },
    marathi: {
      title: 'पहिला जीएसटी परतावा भरा',
      description: 'जीएसटी फाइलिंग प्रक्रिया समजून घ्या आणि सरकारी पोर्टलवर तुमचा पहिला परतावा सादर करा.',
    },
  },
  3: {
    english: {
      title: 'Secure Your Phone',
      description: 'Learn basic IT security tips to keep your device, data, and money safe from fraud.',
    },
    hindi: {
      title: 'अपना फोन सुरक्षित करें',
      description: 'धोखाधड़ी से अपने डिवाइस, डेटा और पैसे को सुरक्षित रखने के लिए बुनियादी IT सुरक्षा टिप्स सीखें।',
    },
    marathi: {
      title: 'तुमचा फोन सुरक्षित करा',
      description: 'फसवणुकीपासून तुमचे डिव्हाइस, डेटा आणि पैसे सुरक्षित ठेवण्यासाठी मूलभूत IT सुरक्षा टिप्स शिका.',
    },
  },
  4: {
    english: {
      title: 'Create a WhatsApp Business Page',
      description: 'Step-by-step guide to setting up your business profile on WhatsApp to reach more customers.',
    },
    hindi: {
      title: 'WhatsApp Business पेज बनाएं',
      description: 'ज्यादा ग्राहकों तक पहुंचने के लिए WhatsApp पर अपना बिजनेस प्रोफाइल सेट करने की चरण-दर-चरण गाइड।',
    },
    marathi: {
      title: 'WhatsApp Business पेज तयार करा',
      description: 'अधिक ग्राहकांपर्यंत पोहोचण्यासाठी WhatsApp वर तुमचे व्यवसाय प्रोफाइल सेट करण्यासाठी चरण-दर-चरण मार्गदर्शक.',
    },
  },
  5: {
    english: {
      title: 'Track Your Sales Digitally',
      description: 'Learn how to use free digital tools like Khatabook and Vyapar to manage and track your sales.',
    },
    hindi: {
      title: 'डिजिटल तरीके से बिक्री ट्रैक करें',
      description: 'अपनी बिक्री को मैनेज और ट्रैक करने के लिए Khatabook और Vyapar जैसे मुफ्त डिजिटल टूल्स का उपयोग करना सीखें।',
    },
    marathi: {
      title: 'डिजिटल पद्धतीने विक्री ट्रॅक करा',
      description: 'तुमची विक्री व्यवस्थापित आणि ट्रॅक करण्यासाठी Khatabook आणि Vyapar सारखी मोफत डिजिटल साधने कशी वापरायची ते शिका.',
    },
  },
};
