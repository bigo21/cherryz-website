/**
 * Partner and client logos. Each file is cropped to the logo itself; width and
 * height are the display size, computed so that every logo covers about the same
 * area (wide logos get shorter, square ones taller), within a maximum height and
 * width. Clients: about 4 400 px², at most 60 px high and 168 px wide. Operators:
 * 64 px squares.
 */
export interface Logo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const OPERATOR_LOGOS: Logo[] = [
  { src: "/logos/orange.png", alt: "Orange Cameroun", width: 64, height: 64 },
  { src: "/logos/mtn.png", alt: "MTN Cameroon", width: 64, height: 64 },
  { src: "/logos/camtel.png", alt: "Camtel", width: 64, height: 64 },
];

export const CLIENT_LOGOS_ROW1: Logo[] = [
  { src: "/logos/afriland-first-bank.png", alt: "Afriland First Bank", width: 137, height: 32 },
  { src: "/logos/belgocam.png", alt: "Belgocam S.A.", width: 168, height: 26 },
  { src: "/logos/sudcam.png", alt: "Sud Cameroun Hevea (SUDCAM)", width: 116, height: 38 },
  { src: "/logos/hotel-mansel.png", alt: "Hotel Mansel", width: 86, height: 51 },
  { src: "/logos/vallee-des-princes-hotel.png", alt: "Vallée des Princes Hotel", width: 67, height: 60 },
  { src: "/logos/jouvence-international-hotel.png", alt: "Jouvence International Hotel", width: 60, height: 60 },
  { src: "/logos/star-land-hotel.png", alt: "Star Land Hotel", width: 96, height: 46 },
  { src: "/logos/kny-groupe.png", alt: "KNY Groupe", width: 47, height: 60 },
  { src: "/logos/inoni-tech.png", alt: "Inoni Tech", width: 75, height: 58 },
];

export const CLIENT_LOGOS_ROW2: Logo[] = [
  { src: "/logos/cinetpay.png", alt: "CinetPay", width: 126, height: 35 },
  { src: "/logos/kalitas.png", alt: "Kalitas", width: 128, height: 34 },
  { src: "/logos/socokem.png", alt: "Socokem", width: 95, height: 46 },
  { src: "/logos/carlcare.png", alt: "Carlcare", width: 83, height: 53 },
  { src: "/logos/best-dental.png", alt: "Best Dental", width: 111, height: 40 },
  { src: "/logos/dpg-kennel.png", alt: "DPG Kennel", width: 100, height: 44 },
  { src: "/logos/aaltelsolutions.png", alt: "AALTELSOLUTIONS", width: 83, height: 53 },
  { src: "/logos/1xbet.png", alt: "1xBet", width: 126, height: 35 },
];
