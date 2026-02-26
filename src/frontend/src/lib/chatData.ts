import { type Language } from '../components/LanguageSelector';

export interface ChatResponse {
  category: string;
  response: Record<Language, string>;
}

// Keyword-based response matching
const keywordMap: Record<string, string[]> = {
  gst: ['gst', 'tax', 'टैक्स', 'जीएसटी', 'कर', 'return', 'रिटर्न', 'invoice', 'इनवॉइस', 'जीएसटी', 'कर', 'परतावा'],
  payments: ['payment', 'upi', 'paytm', 'phonepe', 'gpay', 'digital', 'पेमेंट', 'भुगतान', 'पैसे', 'पैसा', 'पेटीएम', 'डिजिटल', 'पेमेंट', 'पैसे'],
  security: ['security', 'hack', 'password', 'safe', 'सुरक्षा', 'पासवर्ड', 'हैक', 'fraud', 'धोखा', 'सुरक्षित', 'सुरक्षा', 'पासवर्ड'],
  marketing: ['marketing', 'social media', 'whatsapp', 'facebook', 'instagram', 'customer', 'मार्केटिंग', 'ग्राहक', 'विज्ञापन', 'प्रचार', 'मार्केटिंग', 'ग्राहक'],
  accounting: ['accounting', 'account', 'profit', 'loss', 'expense', 'income', 'हिसाब', 'खाता', 'मुनाफा', 'नुकसान', 'खर्च', 'आमदनी', 'हिशोब', 'नफा'],
};

const responses: Record<string, Record<Language, string>> = {
  gst: {
    english: `📋 **GST Filing Guide**\n\nGST (Goods and Services Tax) is a tax you collect from customers and pay to the government.\n\n**Key Steps:**\n1. Register on GST portal (gst.gov.in)\n2. Collect GST from customers (add to bill)\n3. File GSTR-1 monthly (sales details)\n4. File GSTR-3B monthly (summary return)\n5. Pay tax by 20th of next month\n\n**Tip:** Keep all invoices safe. Use Tally or Vyapar app for easy tracking!\n\nAsk me more about GST registration or filing steps.`,
    hindi: `📋 **जीएसटी फाइलिंग गाइड**\n\nजीएसटी वह टैक्स है जो आप ग्राहकों से लेते हैं और सरकार को देते हैं।\n\n**मुख्य कदम:**\n1. जीएसटी पोर्टल पर रजिस्टर करें (gst.gov.in)\n2. ग्राहकों से जीएसटी लें (बिल में जोड़ें)\n3. हर महीने GSTR-1 भरें (बिक्री की जानकारी)\n4. हर महीने GSTR-3B भरें (सारांश)\n5. अगले महीने की 20 तारीख तक टैक्स भरें\n\n**सुझाव:** सभी बिल सुरक्षित रखें। आसान ट्रैकिंग के लिए Vyapar ऐप इस्तेमाल करें!\n\nजीएसटी रजिस्ट्रेशन के बारे में और पूछें।`,
    marathi: `📋 **जीएसटी फाइलिंग मार्गदर्शक**\n\nजीएसटी हा कर आहे जो तुम्ही ग्राहकांकडून घेता आणि सरकारला देता.\n\n**मुख्य पायऱ्या:**\n1. जीएसटी पोर्टलवर नोंदणी करा (gst.gov.in)\n2. ग्राहकांकडून जीएसटी घ्या (बिलात जोडा)\n3. दर महिन्याला GSTR-1 भरा (विक्रीची माहिती)\n4. दर महिन्याला GSTR-3B भरा (सारांश)\n5. पुढील महिन्याच्या 20 तारखेपर्यंत कर भरा\n\n**टीप:** सर्व बिले सुरक्षित ठेवा. सोप्या ट्रॅकिंगसाठी Vyapar अॅप वापरा!\n\nजीएसटी नोंदणीबद्दल अधिक विचारा.`,
  },
  payments: {
    english: `💳 **Digital Payments Guide**\n\nAccepting digital payments is easy and safe!\n\n**Popular Options:**\n• **UPI** - Google Pay, PhonePe, Paytm (free, instant)\n• **QR Code** - Print and display at your shop\n• **POS Machine** - For card payments\n\n**How to Start:**\n1. Download PhonePe or Google Pay\n2. Link your bank account\n3. Generate your QR code\n4. Display it at your counter\n5. Customers scan and pay instantly!\n\n**Benefits:** No change needed, safe, automatic record keeping.\n\nAsk me how to set up UPI for your shop!`,
    hindi: `💳 **डिजिटल पेमेंट गाइड**\n\nडिजिटल पेमेंट लेना आसान और सुरक्षित है!\n\n**लोकप्रिय विकल्प:**\n• **UPI** - Google Pay, PhonePe, Paytm (मुफ्त, तुरंत)\n• **QR कोड** - प्रिंट करें और दुकान पर लगाएं\n• **POS मशीन** - कार्ड पेमेंट के लिए\n\n**शुरू कैसे करें:**\n1. PhonePe या Google Pay डाउनलोड करें\n2. बैंक अकाउंट लिंक करें\n3. अपना QR कोड बनाएं\n4. काउंटर पर लगाएं\n5. ग्राहक स्कैन करके तुरंत पेमेंट करें!\n\n**फायदे:** छुट्टे की जरूरत नहीं, सुरक्षित, अपने आप रिकॉर्ड।\n\nUPI सेटअप के बारे में पूछें!`,
    marathi: `💳 **डिजिटल पेमेंट मार्गदर्शक**\n\nडिजिटल पेमेंट घेणे सोपे आणि सुरक्षित आहे!\n\n**लोकप्रिय पर्याय:**\n• **UPI** - Google Pay, PhonePe, Paytm (मोफत, त्वरित)\n• **QR कोड** - प्रिंट करा आणि दुकानात लावा\n• **POS मशीन** - कार्ड पेमेंटसाठी\n\n**सुरुवात कशी करावी:**\n1. PhonePe किंवा Google Pay डाउनलोड करा\n2. बँक खाते लिंक करा\n3. तुमचा QR कोड तयार करा\n4. काउंटरवर लावा\n5. ग्राहक स्कॅन करून लगेच पेमेंट करतात!\n\n**फायदे:** सुट्टे नको, सुरक्षित, आपोआप नोंद.\n\nUPI सेटअपबद्दल विचारा!`,
  },
  security: {
    english: `🔒 **IT Security Tips**\n\nProtect your phone and business data!\n\n**Essential Steps:**\n1. Use a strong PIN/password (not 1234!)\n2. Enable 2-step verification on WhatsApp\n3. Never share OTP with anyone\n4. Use official apps only (Play Store/App Store)\n5. Keep your phone software updated\n6. Beware of fake calls claiming to be bank/police\n\n**Warning Signs:**\n• Someone asks for OTP\n• Suspicious links in messages\n• Requests to install unknown apps\n\n**Remember:** Banks never ask for OTP or password!\n\nAsk me about securing your WhatsApp Business account.`,
    hindi: `🔒 **IT सुरक्षा टिप्स**\n\nअपना फोन और बिजनेस डेटा सुरक्षित रखें!\n\n**जरूरी कदम:**\n1. मजबूत PIN/पासवर्ड रखें (1234 नहीं!)\n2. WhatsApp पर 2-स्टेप वेरिफिकेशन चालू करें\n3. OTP किसी को भी न बताएं\n4. सिर्फ आधिकारिक ऐप्स इस्तेमाल करें\n5. फोन का सॉफ्टवेयर अपडेट रखें\n6. बैंक/पुलिस बनकर आने वाले फर्जी कॉल से सावधान\n\n**खतरे के संकेत:**\n• कोई OTP मांगे\n• संदिग्ध लिंक\n• अनजान ऐप इंस्टॉल करने का अनुरोध\n\n**याद रखें:** बैंक कभी OTP नहीं मांगता!\n\nWhatsApp Business सुरक्षा के बारे में पूछें।`,
    marathi: `🔒 **IT सुरक्षा टिप्स**\n\nतुमचा फोन आणि व्यवसाय डेटा सुरक्षित ठेवा!\n\n**आवश्यक पायऱ्या:**\n1. मजबूत PIN/पासवर्ड वापरा (1234 नाही!)\n2. WhatsApp वर 2-स्टेप व्हेरिफिकेशन चालू करा\n3. OTP कोणालाही सांगू नका\n4. फक्त अधिकृत अॅप्स वापरा\n5. फोनचे सॉफ्टवेअर अपडेट ठेवा\n6. बँक/पोलीस म्हणून येणाऱ्या बनावट कॉलपासून सावध राहा\n\n**धोक्याची चिन्हे:**\n• कोणी OTP मागत असेल\n• संशयास्पद लिंक\n• अनोळखी अॅप इन्स्टॉल करण्याची विनंती\n\n**लक्षात ठेवा:** बँक कधीही OTP मागत नाही!\n\nWhatsApp Business सुरक्षेबद्दल विचारा.`,
  },
  marketing: {
    english: `📢 **Online Marketing Ideas**\n\nGrow your business with digital marketing!\n\n**Free & Easy Options:**\n1. **WhatsApp Business** - Share offers, catalog, status updates\n2. **Google My Business** - Show up in local searches (free!)\n3. **Facebook Page** - Post daily offers and photos\n4. **Instagram** - Share product photos with hashtags\n\n**Quick Tips:**\n• Post photos of your products daily\n• Share festival offers and discounts\n• Ask happy customers for reviews\n• Use local language in posts\n• Reply to all customer messages quickly\n\n**Start Today:** Create a WhatsApp Business account - it's free!\n\nAsk me how to set up Google My Business.`,
    hindi: `📢 **ऑनलाइन मार्केटिंग आइडिया**\n\nडिजिटल मार्केटिंग से अपना बिजनेस बढ़ाएं!\n\n**मुफ्त और आसान विकल्प:**\n1. **WhatsApp Business** - ऑफर, कैटलॉग, स्टेटस शेयर करें\n2. **Google My Business** - लोकल सर्च में दिखें (मुफ्त!)\n3. **Facebook Page** - रोज ऑफर और फोटो पोस्ट करें\n4. **Instagram** - हैशटैग के साथ प्रोडक्ट फोटो शेयर करें\n\n**जल्दी टिप्स:**\n• रोज अपने प्रोडक्ट की फोटो पोस्ट करें\n• त्योहारी ऑफर और छूट शेयर करें\n• खुश ग्राहकों से रिव्यू मांगें\n• पोस्ट में स्थानीय भाषा इस्तेमाल करें\n• ग्राहकों के मैसेज का जल्दी जवाब दें\n\n**आज शुरू करें:** WhatsApp Business अकाउंट बनाएं - मुफ्त है!\n\nGoogle My Business सेटअप के बारे में पूछें।`,
    marathi: `📢 **ऑनलाइन मार्केटिंग कल्पना**\n\nडिजिटल मार्केटिंगने तुमचा व्यवसाय वाढवा!\n\n**मोफत आणि सोपे पर्याय:**\n1. **WhatsApp Business** - ऑफर, कॅटलॉग, स्टेटस शेअर करा\n2. **Google My Business** - स्थानिक शोधात दिसा (मोफत!)\n3. **Facebook Page** - रोज ऑफर आणि फोटो पोस्ट करा\n4. **Instagram** - हॅशटॅगसह उत्पादन फोटो शेअर करा\n\n**जलद टिप्स:**\n• रोज तुमच्या उत्पादनांचे फोटो पोस्ट करा\n• सणासुदीचे ऑफर आणि सवलती शेअर करा\n• आनंदी ग्राहकांकडून रिव्ह्यू मागा\n• पोस्टमध्ये स्थानिक भाषा वापरा\n• ग्राहकांच्या संदेशांना लवकर उत्तर द्या\n\n**आजच सुरू करा:** WhatsApp Business खाते तयार करा - मोफत आहे!\n\nGoogle My Business सेटअपबद्दल विचारा.`,
  },
  accounting: {
    english: `📊 **Simple Accounting Guide**\n\nTrack your money easily!\n\n**Daily Habits:**\n1. Record every sale (even small ones)\n2. Keep all receipts and bills\n3. Note daily expenses\n4. Check cash at end of day\n\n**Free Tools:**\n• **Vyapar App** - Best for small shops (Hindi support)\n• **OkCredit** - Track credit given to customers\n• **Khatabook** - Simple digital ledger\n• **Google Sheets** - Free spreadsheet\n\n**Monthly Tasks:**\n• Calculate total sales\n• Subtract expenses = Profit\n• Check if GST needs to be filed\n• Review which products sell most\n\n**Tip:** Even a simple notebook is better than no records!\n\nAsk me about using Vyapar or Khatabook app.`,
    hindi: `📊 **सरल हिसाब-किताब गाइड**\n\nआसानी से अपना पैसा ट्रैक करें!\n\n**रोज की आदतें:**\n1. हर बिक्री नोट करें (छोटी भी)\n2. सभी रसीद और बिल रखें\n3. रोज का खर्च लिखें\n4. दिन के अंत में कैश चेक करें\n\n**मुफ्त टूल्स:**\n• **Vyapar App** - छोटी दुकानों के लिए बेस्ट (हिंदी सपोर्ट)\n• **OkCredit** - ग्राहकों को दिया उधार ट्रैक करें\n• **Khatabook** - सरल डिजिटल खाता\n• **Google Sheets** - मुफ्त स्प्रेडशीट\n\n**महीने के काम:**\n• कुल बिक्री निकालें\n• खर्च घटाएं = मुनाफा\n• जांचें कि जीएसटी भरना है या नहीं\n• देखें कौन सा सामान सबसे ज्यादा बिका\n\n**सुझाव:** एक साधारण नोटबुक भी कोई रिकॉर्ड न रखने से बेहतर है!\n\nVyapar या Khatabook ऐप के बारे में पूछें।`,
    marathi: `📊 **सोपे हिशोब मार्गदर्शक**\n\nसहजपणे तुमचे पैसे ट्रॅक करा!\n\n**रोजच्या सवयी:**\n1. प्रत्येक विक्री नोंदवा (लहान असली तरी)\n2. सर्व पावत्या आणि बिले ठेवा\n3. रोजचा खर्च लिहा\n4. दिवसाच्या शेवटी रोख तपासा\n\n**मोफत साधने:**\n• **Vyapar App** - लहान दुकानांसाठी सर्वोत्तम (हिंदी सपोर्ट)\n• **OkCredit** - ग्राहकांना दिलेले उधार ट्रॅक करा\n• **Khatabook** - सोपी डिजिटल वही\n• **Google Sheets** - मोफत स्प्रेडशीट\n\n**महिन्याची कामे:**\n• एकूण विक्री काढा\n• खर्च वजा करा = नफा\n• जीएसटी भरायचे आहे का ते तपासा\n• कोणता माल सर्वाधिक विकला ते पहा\n\n**टीप:** एक साधी वही देखील कोणतीही नोंद न ठेवण्यापेक्षा चांगली आहे!\n\nVyapar किंवा Khatabook अॅपबद्दल विचारा.`,
  },
  greeting: {
    english: `👋 **Namaste! Welcome to DukanSaathi!**\n\nI'm your AI business assistant. I can help you with:\n\n📋 **GST Filing** - How to register and file returns\n💳 **Digital Payments** - UPI, QR codes, and more\n🔒 **IT Security** - Keep your phone and data safe\n📢 **Marketing** - Grow your business online\n📊 **Accounting** - Track your sales and expenses\n\nJust type your question in English, Hindi, or Marathi!\n\nExample: "How do I file GST?" or "जीएसटी कैसे भरें?"`,
    hindi: `👋 **नमस्ते! DukanSaathi में आपका स्वागत है!**\n\nमैं आपका AI बिजनेस असिस्टेंट हूं। मैं इन विषयों में मदद कर सकता हूं:\n\n📋 **जीएसटी फाइलिंग** - रजिस्ट्रेशन और रिटर्न कैसे भरें\n💳 **डिजिटल पेमेंट** - UPI, QR कोड और अधिक\n🔒 **IT सुरक्षा** - फोन और डेटा सुरक्षित रखें\n📢 **मार्केटिंग** - ऑनलाइन बिजनेस बढ़ाएं\n📊 **हिसाब-किताब** - बिक्री और खर्च ट्रैक करें\n\nहिंदी, मराठी या अंग्रेजी में अपना सवाल पूछें!\n\nउदाहरण: "जीएसटी कैसे भरें?" या "UPI कैसे शुरू करें?"`,
    marathi: `👋 **नमस्कार! DukanSaathi मध्ये आपले स्वागत आहे!**\n\nमी तुमचा AI व्यवसाय सहाय्यक आहे. मी या विषयांमध्ये मदत करू शकतो:\n\n📋 **जीएसटी फाइलिंग** - नोंदणी आणि परतावा कसा भरावा\n💳 **डिजिटल पेमेंट** - UPI, QR कोड आणि अधिक\n🔒 **IT सुरक्षा** - फोन आणि डेटा सुरक्षित ठेवा\n📢 **मार्केटिंग** - ऑनलाइन व्यवसाय वाढवा\n📊 **हिशोब** - विक्री आणि खर्च ट्रॅक करा\n\nमराठी, हिंदी किंवा इंग्रजीत तुमचा प्रश्न विचारा!\n\nउदाहरण: "जीएसटी कसे भरावे?" किंवा "UPI कसे सुरू करावे?"`,
  },
  fallback: {
    english: `🤔 I'm not sure about that specific question.\n\nI can help you with:\n• **GST** - Type "GST" or "tax"\n• **Digital Payments** - Type "UPI" or "payment"\n• **IT Security** - Type "security" or "password"\n• **Marketing** - Type "marketing" or "WhatsApp"\n• **Accounting** - Type "accounting" or "profit"\n\nPlease try asking about one of these topics!`,
    hindi: `🤔 मुझे इस सवाल का जवाब नहीं पता।\n\nमैं इन विषयों में मदद कर सकता हूं:\n• **जीएसटी** - "जीएसटी" या "टैक्स" टाइप करें\n• **डिजिटल पेमेंट** - "UPI" या "पेमेंट" टाइप करें\n• **IT सुरक्षा** - "सुरक्षा" या "पासवर्ड" टाइप करें\n• **मार्केटिंग** - "मार्केटिंग" या "WhatsApp" टाइप करें\n• **हिसाब** - "हिसाब" या "मुनाफा" टाइप करें\n\nकृपया इनमें से किसी विषय के बारे में पूछें!`,
    marathi: `🤔 मला या प्रश्नाचे उत्तर माहित नाही.\n\nमी या विषयांमध्ये मदत करू शकतो:\n• **जीएसटी** - "जीएसटी" किंवा "कर" टाइप करा\n• **डिजिटल पेमेंट** - "UPI" किंवा "पेमेंट" टाइप करा\n• **IT सुरक्षा** - "सुरक्षा" किंवा "पासवर्ड" टाइप करा\n• **मार्केटिंग** - "मार्केटिंग" किंवा "WhatsApp" टाइप करा\n• **हिशोब** - "हिशोब" किंवा "नफा" टाइप करा\n\nकृपया यापैकी एखाद्या विषयाबद्दल विचारा!`,
  },
};

const greetingKeywords = ['hello', 'hi', 'namaste', 'नमस्ते', 'नमस्कार', 'हेलो', 'help', 'मदद', 'मदत', 'start', 'शुरू', 'सुरू'];

export function getChatResponse(message: string, language: Language): string {
  const lower = message.toLowerCase();

  // Check for greetings
  if (greetingKeywords.some((kw) => lower.includes(kw))) {
    return responses.greeting[language];
  }

  // Match keywords
  for (const [category, keywords] of Object.entries(keywordMap)) {
    if (keywords.some((kw) => lower.includes(kw.toLowerCase()))) {
      return responses[category][language];
    }
  }

  return responses.fallback[language];
}
