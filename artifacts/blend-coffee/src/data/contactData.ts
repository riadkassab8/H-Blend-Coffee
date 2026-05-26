export interface Branch {
  name: string;
  nameAr: string;
  address: string;
  addressAr: string;
  phone: string;
}

export const branches: Branch[] = [
  {
    name: "Maadi",
    nameAr: "المعادي",
    address: "12 Road 9, Maadi, Cairo",
    addressAr: "١٢ طريق ٩، المعادي، القاهرة",
    phone: "+20 100 111 2233",
  },
  {
    name: "Zamalek",
    nameAr: "الزمالك",
    address: "4 Hassan Sabri St, Zamalek",
    addressAr: "٤ شارع حسن صبري، الزمالك",
    phone: "+20 100 111 2244",
  },
  {
    name: "Downtown",
    nameAr: "وسط البلد",
    address: "22 Talaat Harb, Downtown Cairo",
    addressAr: "٢٢ طلعت حرب، وسط البلد، القاهرة",
    phone: "+20 100 111 2255",
  },
];

export const openingHours = {
  en: [
    "Monday – Friday: 7:00 AM – 11:00 PM",
    "Saturday: 8:00 AM – 11:00 PM",
    "Sunday: 8:00 AM – 10:00 PM",
  ],
  ar: [
    "الإثنين – الجمعة: ٧:٠٠ صباحاً – ١١:٠٠ مساءً",
    "السبت: ٨:٠٠ صباحاً – ١١:٠٠ مساءً",
    "الأحد: ٨:٠٠ صباحاً – ١٠:٠٠ مساءً",
  ],
};
