export interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Layla Hassan",
    location: "Maadi, Cairo",
    rating: 5,
    text: "BLEND changed how I think about coffee. I used to drink it out of habit. Now I look forward to it the way I look forward to a good book. The Ethiopian pour-over is unlike anything I've had in this city.",
    initials: "LH",
  },
  {
    id: 2,
    name: "Omar Farouk",
    location: "Zamalek, Cairo",
    rating: 5,
    text: "The space, the service, the cup — everything at BLEND feels considered. You can tell the people behind it genuinely care. The cardamom blend is my morning ritual now.",
    initials: "OF",
  },
  {
    id: 3,
    name: "Sara El-Masry",
    location: "New Cairo",
    rating: 5,
    text: "I've been to specialty coffee shops across London and Berlin. BLEND holds its own. The cold brew is exceptional — smooth, complex, no bitterness. I order it every time.",
    initials: "SM",
  },
  {
    id: 4,
    name: "Karim Nour",
    location: "Downtown Cairo",
    rating: 5,
    text: "The rose latte was something I ordered skeptically and am now completely devoted to. The balance is perfect. BLEND manages to be creative without being gimmicky.",
    initials: "KN",
  },
  {
    id: 5,
    name: "Nadia Youssef",
    location: "Heliopolis, Cairo",
    rating: 5,
    text: "I brought my beans home and brewed them myself — and they're just as good as in the cafe. That tells you everything about the quality and freshness. BLEND is the real thing.",
    initials: "NY",
  },
];
