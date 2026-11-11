// Place directories keyed by article slug. An article page renders the
// PlaceDirectory component when its slug has an entry here. Phone numbers
// live only in this data: cards show a Call button (a tel: link) and never
// print the number itself, so the guide stays tap-friendly on mobile.
//
// Entries also carry "distanceKm": the approximate distance in km
// from Ojima Station (Toei Shinjuku Line), estimated from the entry's
// address (Ojima's chome blocks sit within about 0.2–2 km of the
// station, Kameido ~2 km, Funabori ~3 km, Nishikasai ~4–5 km). It is
// used only to order the cards nearest-first and is never displayed.
// Phone-only services and other entries with no fixed address carry
// distanceKm: null and sort first. Entries whose own description
// says they are pure vegetarian carry "pureVeg": true and show the
// green-dot veg mark on their card.
//
// School entries carry "levels" and clinic entries "specialties" —
// both arrays, because a place appears under every filter value it
// genuinely supports: an international school that runs kindergarten
// through junior high carries all four values, and a hospital with
// ten departments carries all ten. Clinic entries with no verified
// department list (Ojima Clinic) carry no "specialties" at all and
// stay visible under "All specialties" only.
//
// The Nishikasai guide's data lives in directory-data-nishikasai.js and is
// merged in below, so each guide's data file stays a manageable size.
import { nishikasaiDirectory } from "./directory-data-nishikasai.js";

export const directories = {
  "living-in-ojima-tokyo-guide": {
    "title": "Ojima directory — tap to call, open the map, or share a place",
    "sections": [
      {
        "title": "Clinics & hospitals",
        "entries": [
          {
            "name": "Himawari — Tokyo Metropolitan Health & Medical Information Center",
            "distanceKm": null,
            "specialties": ["other"],
            "english": true,
            "phone": "03-5285-8181",
            "website": "https://www.himawari.metro.tokyo.jp/",
            "hours": "24/7 phone support",
            "note": "English/Japanese medical information and help finding a doctor (an information service, not a clinic). Start here if you're unsure where to go.",
            "map": "https://www.google.com/maps/search/?api=1&query=Himawari%20%E2%80%94%20Tokyo%20Metropolitan%20Health%20%26%20Medical%20Information%20Center%2C%20Tokyo"
          },
          {
            "name": "Koto Hospital",
            "distanceKm": 0.1,
            "jp": "江東病院",
            "specialties": ["general", "internal", "pediatrics", "ent", "obgyn", "orthopedics", "ophthalmology", "dermatology", "urology", "mental-health"],
            "english": true,
            "address": "Ojima 6-8-5, Koto-ku, Tokyo 136-0072",
            "phone": "03-3685-2166",
            "website": "https://koto-hospital.or.jp/",
            "hours": "Mon–Sat 9:00–12:00 & 13:00–16:30; closed Sun & holidays (same number for night/holiday emergency calls)",
            "note": "Ojima's big general hospital (286 beds) with a full department list — internal medicine, surgery, pediatrics, OB/GYN, ENT, eye, skin, urology, orthopedics and more. English support is partial, via tablet devices.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E6%B1%9F%E6%9D%B1%E7%97%85%E9%99%A2%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B66-8-5"
          },
          {
            "name": "Ojima Pediatrics Clinic",
            "distanceKm": 1.2,
            "jp": "大島小児科医院",
            "specialties": ["pediatrics"],
            "english": true,
            "address": "N&H Building 1F–2F, Ojima 8-5-2, Koto-ku, Tokyo 136-0072",
            "phone": "03-5609-7631",
            "website": "http://www.oojimahospital.com/",
            "hours": "Mon–Sat 9:00–12:00; Mon/Tue/Thu/Fri 15:30–18:30, Sat 14:00–17:00 (14:30–15:30 appointment-only vaccinations/checkups); closed Wed afternoon, Sun & holidays",
            "note": "Long-established children's clinic near Higashi-Ojima with genuine English support — its own English pages and English online booking.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E5%A4%A7%E5%B3%B6%E5%B0%8F%E5%85%90%E7%A7%91%E5%8C%BB%E9%99%A2%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B68-5-2"
          },
          {
            "name": "Ojima Clinic",
            "distanceKm": 0.8,
            "address": "Ojima 3-7-1, Koto-ku, Tokyo",
            "phone": "03-5609-4112",
            "hours": "Mon–Fri 9:00–18:00",
            "note": "Japanese only.",
            "map": "https://www.google.com/maps/search/?api=1&query=Ojima%20Clinic%20Ojima%203-7-1%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Ojima Ekimae Clinic",
            "distanceKm": 0.1,
            "specialties": ["internal"],
            "address": "Ojima 5-10-10, 1F, Koto-ku, Tokyo",
            "phone": "03-5626-3777",
            "website": "https://ojima-ekimae.jp/",
            "hours": "Tue–Sat 9:00–12:15 & 14:00–17:45; closed Mon, Sun & holidays",
            "note": "Stomach-and-colon specialist clinic right by Ojima station — the director is a GI/endoscopy specialist; sedation-based painless gastroscopy and colonoscopy, including same-day stomach + colon exams. Consultations are ages 15+.",
            "map": "https://www.google.com/maps/search/?api=1&query=Ojima%20Ekimae%20Clinic%20Ojima%205-10-10%2C%201F%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Kodomo Mirai Clinic",
            "distanceKm": 0.4,
            "specialties": ["pediatrics"],
            "address": "Ojima 6-1-4-102, Koto-ku, Tokyo",
            "phone": "03-5627-7676",
            "website": "https://kodomo-mirai.net/",
            "hours": "Mon–Fri 8:30–12:30 & 14:30–18:30 (14:30–15:30 vaccination-only, by appointment); Sat, Sun & holidays 8:30–12:30 & 13:30–15:30",
            "note": "Children's clinic open every day including Sundays and holidays, with an attached sick-child childcare room. Parents can be seen together with their children; walk-ins accepted.",
            "map": "https://www.google.com/maps/search/?api=1&query=Kodomo%20Mirai%20Clinic%20Ojima%206-1-4-102%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Iwabuchi Internal Medicine & Urology Clinic",
            "distanceKm": 0.8,
            "specialties": ["internal", "urology"],
            "address": "Ojima 3-4-3, Tower Residence Nishi-Ojima 2F, Koto-ku, Tokyo",
            "phone": "03-3683-3137",
            "website": "https://iwabuchi-clinic.jp",
            "hours": "9:00–12:30 & 15:00–18:00 (closed Thu & Sun)",
            "note": "Urology-led clinic (including women's and children's urology) with internal medicine, on the 2nd floor of Tower Residence Nishi-Ojima.",
            "map": "https://www.google.com/maps/search/?api=1&query=Iwabuchi%20Internal%20Medicine%20%26%20Urology%20Clinic%20Ojima%203-4-3%2C%20Tower%20Residence%20Nishi-Ojima%202F%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Caps Clinic Nishikasai",
            "distanceKm": 4.8,
            "specialties": ["pediatrics"],
            "address": "Nishikasai 6-12-1, Sekitora Building 2, Edogawa-ku, Tokyo 134-0088",
            "phone": "03-5878-3918",
            "website": "https://caps-clinic.jp/nishikasai",
            "hours": "Open 365 days: 9:00–13:00, 15:00–18:00 & 18:00–21:00",
            "note": "Children's clinic open every day of the year including evenings, with online booking and an isolation room.",
            "map": "https://www.google.com/maps/search/?api=1&query=Caps%20Clinic%20Nishikasai%20Nishikasai%206-12-1%2C%20Edogawa-ku%2C%20Tokyo"
          },
          {
            "name": "Saigusa Maternity Clinic",
            "distanceKm": 4.8,
            "specialties": ["pediatrics", "obgyn"],
            "address": "Nishi-Kasai 3-18-1, Edogawa-ku, Tokyo 134-0088",
            "phone": "03-3680-3003",
            "website": "https://www.saigusa.or.jp/",
            "hours": "Mon–Sat 9:00–12:00; Mon/Wed/Fri 15:00–18:00, Tue/Sat 14:00–16:00 (infant checkups); closed Thu, Sun & holidays",
            "note": "Delivery-specialist maternity clinic 2 min from Nishikasai station — painless (epidural) delivery, all-private rooms, 24h phone response, vegetarian meal options.",
            "map": "https://www.google.com/maps/search/?api=1&query=Saigusa%20Maternity%20Clinic%20Nishi-Kasai%203-18-1%2C%20Edogawa-ku%2C%20Tokyo"
          },
          {
            "name": "Endo Clinic",
            "distanceKm": 4.2,
            "specialties": ["internal"],
            "address": "Nishi-Kasai 3-19-5, Edogawa-ku, Tokyo",
            "phone": "03-3675-0330",
            "hours": "Mon–Sat 9:00–11:30 & 15:30–17:00",
            "note": "Internal medicine clinic with a gastroenterology focus in Nishi-Kasai.",
            "map": "https://www.google.com/maps/search/?api=1&query=Endo%20Clinic%20Nishi-Kasai%203-19-5%2C%20Edogawa-ku%2C%20Tokyo"
          },
          {
            "name": "Tokyo Rinkai Hospital",
            "distanceKm": 4,
            "specialties": ["general", "internal", "pediatrics", "ent", "obgyn", "orthopedics", "ophthalmology", "dermatology", "urology", "mental-health"],
            "address": "Edagawa 3-4-1, Koto-ku, Tokyo",
            "phone": "03-5605-8811",
            "website": "https://tokyorinkai-hp.jp/",
            "hours": "Mon–Fri 8:30–17:00",
            "note": "Some English-speaking staff.",
            "map": "https://www.google.com/maps/search/?api=1&query=Tokyo%20Rinkai%20Hospital%20Edagawa%203-4-1%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "St. Luke's International Hospital",
            "distanceKm": 8.5,
            "specialties": ["general", "internal", "pediatrics", "ent", "obgyn", "orthopedics", "ophthalmology", "dermatology", "urology", "mental-health"],
            "english": true,
            "address": "Akashi-cho 9-1, Chuo-ku, Tokyo",
            "phone": "03-3541-5151",
            "website": "https://hospital.luke.ac.jp/eng/index.html",
            "hours": "24/7 emergency",
            "note": "English available.",
            "map": "https://www.google.com/maps/search/?api=1&query=St.%20Luke%27s%20International%20Hospital%20Akashi-cho%209-1%2C%20Chuo-ku%2C%20Tokyo"
          },
          {
            "name": "Sanno Hospital",
            "distanceKm": 10.5,
            "specialties": ["general", "internal", "pediatrics", "ent", "obgyn", "orthopedics", "ophthalmology", "dermatology", "urology", "mental-health"],
            "english": true,
            "address": "Akasaka 8-10-16, Minato-ku, Tokyo",
            "phone": "03-3402-3181",
            "website": "https://www.sannoclc.or.jp/hospital/english/",
            "hours": "Mon–Sat 9:00–17:00",
            "note": "Internationally oriented general hospital in Akasaka, especially known for obstetrics, gynaecology and fertility care, with a full English service page.",
            "map": "https://www.google.com/maps/search/?api=1&query=Sanno%20Hospital%20Akasaka%208-10-16%2C%20Minato-ku%2C%20Tokyo"
          },
          {
            "name": "Yujin Hospital",
            "distanceKm": 1.9,
            "jp": "友仁病院",
            "specialties": ["general", "internal"],
            "address": "Kameido 2-41-1, Koto-ku, Tokyo 136-0071",
            "phone": "03-3683-5661",
            "website": "https://sonodakai.jp/yujin/",
            "hours": "Outpatient reception Mon–Fri 9:00–17:00; closed Sun & holidays",
            "note": "Community general hospital in Kameido focused on lifestyle diseases (blood pressure, diabetes, lipids), back pain and dementia care, with visiting rehabilitation.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E5%8F%8B%E4%BB%81%E7%97%85%E9%99%A2%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E4%BA%80%E6%88%B82-41-1"
          },
          {
            "name": "JCHO Tokyo Joto Hospital",
            "distanceKm": 2.2,
            "jp": "JCHO東京城東病院",
            "specialties": ["general", "internal", "orthopedics"],
            "address": "Kameido 9-13-1, Koto-ku, Tokyo 136-0071",
            "phone": "03-3685-1431",
            "website": "https://joto.jcho.go.jp/",
            "hours": "Reception Mon–Fri 8:30–11:30 (afternoons appointment-only clinics); closed Sat, Sun & holidays",
            "note": "Public JCHO hospital serving Koto-ku's east side. Morning walk-in reception only — arrive early.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E6%9D%B1%E4%BA%AC%E5%9F%8E%E6%9D%B1%E7%97%85%E9%99%A2%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E4%BA%80%E6%88%B89-13-1"
          },
          {
            "name": "Ojima ENT & Allergy Clinic",
            "distanceKm": null,
            "jp": "大島耳鼻咽喉科・アレルギー科",
            "specialties": ["ent"],
            "address": "Central Plaza Ojima 4F, Ojima 5-10-10, Koto-ku, Tokyo 136-0072",
            "phone": "03-5626-1133",
            "website": "http://www.ojima-ent.com",
            "hours": "Mon–Fri 9:00–12:00 & 14:00–18:30 (Mon from 14:30); Sat 9:00–12:30 & 14:00–17:00; Sun 9:00–12:30; closed holidays",
            "note": "The ENT clinic for the Ojima station area — same building as Ojima Ekimae Clinic (1F), up on 4F. Walk-ins accepted, no appointment system.",
            "map": "https://www.google.com/maps/search/?api=1&query=Ojima%20ENT%20%26%20Allergy%20Clinic%20Central%20Plaza%20Ojima%204F%2C%20Ojima%205-10-10%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Yoshi ENT Clinic",
            "distanceKm": null,
            "jp": "よし耳鼻咽喉科",
            "specialties": ["ent"],
            "address": "Higashi-Ojima Metro Plaza 1F, Ojima 9-3-16, Koto-ku, Tokyo 136-0072",
            "phone": "03-5858-4187",
            "website": "https://www.yoshijibika.com/",
            "hours": "Mon/Tue/Wed/Fri/Sat 9:30–12:30 & 15:30–19:00; closed Thu & Sun",
            "note": "Newer ENT clinic 1 min from Higashi-Ojima station, including children's ENT and allergy care, with online queue/booking — a good second option when the Ojima station ENT is crowded.",
            "map": "https://www.google.com/maps/search/?api=1&query=Yoshi%20ENT%20Clinic%20Higashi-Ojima%20Metro%20Plaza%201F%2C%20Ojima%209-3-16%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Gonohashi Obstetrics and Gynecology",
            "distanceKm": null,
            "jp": "五の橋産婦人科",
            "specialties": ["obgyn"],
            "address": "Kameido 6-1-6, Koto-ku, Tokyo 136-0071",
            "phone": "03-3636-6000",
            "website": "https://www.gonohashi-sanfujinka.com/",
            "hours": "Mon–Thu 8:30–11:30 & 14:00–17:00; Fri 8:30–11:30; Sat 9:00–11:30; closed Fri afternoon, Sun & holidays",
            "note": "Kameido's long-established maternity hospital (founded 1958) — 19 beds, all private rooms, deliveries including painless (epidural), several full-time doctors and 20+ midwives, NIPT/prenatal testing. 5 min from Kameido station.",
            "map": "https://www.google.com/maps/search/?api=1&query=Gonohashi%20Obstetrics%20and%20Gynecology%20Kameido%206-1-6%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Gonohashi Clinic",
            "distanceKm": null,
            "jp": "五ノ橋クリニック",
            "specialties": ["internal", "orthopedics"],
            "address": "Kameido 1-28-8, Koto-ku, Tokyo 136-0071",
            "phone": "03-3681-3291",
            "website": "https://www.gonohashi-clinic.com/",
            "hours": "Mon/Tue/Wed/Fri 8:30–12:15 & 15:00–18:45; Sat 8:30–13:15; closed Thu, Sun & holidays",
            "note": "Orthopedics-led clinic since 1991 (also internal medicine, rehabilitation and on-site dentistry), with dedicated traffic-accident and osteoporosis clinics. 5 min from Kameido, 7 min from Nishi-Ojima.",
            "map": "https://www.google.com/maps/search/?api=1&query=Gonohashi%20Clinic%20Kameido%201-28-8%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Gonohashi Ladies Clinic",
            "distanceKm": null,
            "jp": "五の橋レディスクリニック",
            "specialties": ["obgyn"],
            "address": "Nittochi Kameido Building 8F, Kameido 6-26-5, Koto-ku, Tokyo 136-0071",
            "phone": "03-5836-2600",
            "website": "https://www.gonohashi-lc.jp/",
            "hours": "Mon–Sat 9:00–12:30; Mon–Fri 15:00–18:30; closed Sun & holidays",
            "note": "Fertility-focused ladies' clinic by Kameido station (gynaecology and infertility treatment including IVF; no deliveries). Web/app booking available.",
            "map": "https://www.google.com/maps/search/?api=1&query=Gonohashi%20Ladies%20Clinic%20Nittochi%20Kameido%20Building%208F%2C%20Kameido%206-26-5%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Gonohashi Children's Clinic",
            "distanceKm": null,
            "jp": "五の橋こどもクリニック",
            "specialties": ["pediatrics"],
            "address": "Toshoku Building 1F, Kameido 6-14-3, Koto-ku, Tokyo 136-0071",
            "phone": "03-5858-8011",
            "website": "https://gonohashi-kodomo.com/",
            "hours": "Mon/Tue/Thu/Fri 8:00–12:00 & 15:30–18:30; Wed 9:00–12:00 & 15:30–18:00; Sat 9:00–13:30; Sun 9:00–13:00; closed holidays (14:00–15:30 appointment-only checkups/vaccinations)",
            "note": "Children's clinic open from 8:00 on weekdays and on Sunday mornings, with LINE booking. 5 min from Kameido station.",
            "map": "https://www.google.com/maps/search/?api=1&query=Gonohashi%20Children%27s%20Clinic%20Toshoku%20Building%201F%2C%20Kameido%206-14-3%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Nishi-Ojima Atarashi Eye Clinic",
            "distanceKm": null,
            "jp": "西大島あたらし眼科",
            "specialties": ["ophthalmology"],
            "address": "Eguchi Building 2F, Ojima 3-14-17, Koto-ku, Tokyo 136-0072",
            "phone": "03-5858-8861",
            "website": "https://www.atarashi-ganka.com/",
            "hours": "Mon/Tue/Wed/Fri 9:30–13:00 & 15:00–18:30; Sat 9:30–13:00; closed Thu, Sun & holidays",
            "note": "Eye clinic 2 min from Nishi-Ojima station, run by a certified ophthalmology specialist — full exams, visual-field testing and laser treatment. Cash only.",
            "map": "https://www.google.com/maps/search/?api=1&query=Nishi-Ojima%20Atarashi%20Eye%20Clinic%20Eguchi%20Building%202F%2C%20Ojima%203-14-17%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Okada Dermatology Clinic",
            "distanceKm": null,
            "jp": "岡田皮フ科クリニック",
            "specialties": ["dermatology"],
            "address": "Bunyo Building 5F, Ojima 2-41-16, Koto-ku, Tokyo 136-0072",
            "phone": "03-3636-1241",
            "hours": "Mon/Tue/Wed/Fri 10:00–13:00 & 15:00–19:00; Sat 10:00–13:00; closed Thu, Sun & holidays",
            "note": "Skin clinic between Nishi-Ojima and Kameido with full weekday hours — the most practical dermatology option in the area.",
            "map": "https://www.google.com/maps/search/?api=1&query=Okada%20Dermatology%20Clinic%20Bunyo%20Building%205F%2C%20Ojima%202-41-16%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Ono Dermatology Clinic",
            "distanceKm": null,
            "jp": "おの皮ふ科診療所",
            "specialties": ["dermatology"],
            "address": "Ichikawa Building 1F, Ojima 1-30-14, Koto-ku, Tokyo 136-0072",
            "phone": "03-5875-2886",
            "website": "https://onohihuka.jimdofree.com",
            "hours": "A few half-days a week only — Mon morning, Wed afternoon, Fri morning, Tue afternoon (2nd & 4th weeks); sessions 9:30–12:30 / 15:00–18:00; closed Thu, Sat, Sun & holidays",
            "note": "Small dermatology practice 1 min from Nishi-Ojima station (A1 exit). It opens only a few half-days a week — check the day before going.",
            "map": "https://www.google.com/maps/search/?api=1&query=Ono%20Dermatology%20Clinic%20Ichikawa%20Building%201F%2C%20Ojima%201-30-14%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Nishi-Ojima Yoshizawa Orthopedics",
            "distanceKm": null,
            "jp": "西大島よしざわ整形外科",
            "specialties": ["orthopedics"],
            "address": "Suganuma Building 2F, Ojima 1-34-12, Koto-ku, Tokyo 136-0072",
            "phone": "03-5875-3400",
            "hours": "Tue–Fri 9:30–12:30 & 14:00–17:45; Sat 9:30–12:30 & 14:00–16:30; closed Mon, Sun & holidays",
            "note": "Orthopedics and rehabilitation clinic 2 min from Nishi-Ojima station; no appointment needed for first visits.",
            "map": "https://www.google.com/maps/search/?api=1&query=Nishi-Ojima%20Yoshizawa%20Orthopedics%20Suganuma%20Building%202F%2C%20Ojima%201-34-12%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Kasai Clinic",
            "distanceKm": null,
            "jp": "笠井クリニック",
            "specialties": ["mental-health"],
            "address": "Nishi-Ojima Wada Building 6F, Ojima 1-33-12, Koto-ku, Tokyo 136-0072",
            "phone": "03-3684-3721",
            "hours": "Mon/Tue/Wed/Fri 9:00–13:00 & 16:00–18:30; Sat 9:00–12:00 & 14:00–16:00; closed Thu, Sun & holidays",
            "note": "Psychiatry and psychosomatic medicine clinic 1 min from Nishi-Ojima station — depression, panic, OCD, dementia and developmental disorders (from elementary-school age). Strictly appointment-only, including first visits — phone ahead.",
            "map": "https://www.google.com/maps/search/?api=1&query=Kasai%20Clinic%20Nishi-Ojima%20Wada%20Building%206F%2C%20Ojima%201-33-12%2C%20Koto-ku%2C%20Tokyo"
          }
        ]
      },
      {
        "title": "Dentists",
        "entries": [
          {
            "name": "Ojima Dental Clinic",
            "distanceKm": 0.5,
            "address": "Ojima 4-8-14, Koto-ku, Tokyo",
            "phone": "03-3683-1182",
            "hours": "Mon–Sat 9:30–19:00",
            "note": "Japanese only.",
            "map": "https://www.google.com/maps/search/?api=1&query=Ojima%20Dental%20Clinic%20Ojima%204-8-14%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Wakaba Dental",
            "distanceKm": 0.5,
            "address": "Ojima 4-5-16, Naka Building 1F, Koto-ku, Tokyo",
            "phone": "03-3684-3655",
            "note": "English and Thai spoken.",
            "map": "https://www.google.com/maps/search/?api=1&query=Wakaba%20Dental%20Ojima%204-5-16%2C%20Naka%20Building%201F%2C%20Koto-ku%2C%20Tokyo"
          }
        ]
      },
      {
        "title": "Pharmacies",
        "entries": [
          {
            "name": "Sugi Pharmacy Ojima",
            "distanceKm": 0.1,
            "address": "Ojima 5-10-12, Koto-ku, Tokyo",
            "phone": "03-3685-8911",
            "hours": "Daily 9:00–21:00",
            "note": "Prescription medicines available.",
            "map": "https://www.google.com/maps/search/?api=1&query=Sugi%20Pharmacy%20Ojima%20Ojima%205-10-12%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Matsumoto Kiyoshi Ojima",
            "distanceKm": 0.5,
            "address": "Ojima 4-8-14, Koto-ku, Tokyo",
            "phone": "03-3683-1193",
            "hours": "Daily 9:00–21:00",
            "map": "https://www.google.com/maps/search/?api=1&query=Matsumoto%20Kiyoshi%20Ojima%20Ojima%204-8-14%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Ojima Drug Store",
            "distanceKm": 0.2,
            "address": "Ojima 5-11-6, Koto-ku, Tokyo",
            "phone": "03-3682-3205",
            "hours": "Mon–Sat 9:00–19:00",
            "note": "Over-the-counter medicines.",
            "map": "https://www.google.com/maps/search/?api=1&query=Ojima%20Drug%20Store%20Ojima%205-11-6%2C%20Koto-ku%2C%20Tokyo"
          }
        ]
      },
      {
        "title": "Schools & nursery",
        "entries": [
          {
            "name": "Ojima Nursery",
            "distanceKm": 0.4,
            "levels": ["nursery"],
            "jp": "大島保育園",
            "address": "Ojima 5-40-4, 1F, Koto-ku, Tokyo",
            "phone": "03-3681-9026",
            "note": "Public nursery (moved here in 2019).",
            "map": "https://www.google.com/maps/search/?api=1&query=%E5%A4%A7%E5%B3%B6%E4%BF%9D%E8%82%B2%E5%9C%92%20Ojima%205-40-4%2C%201F%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Wakaba Nursery (Koto City)",
            "distanceKm": 1.5,
            "levels": ["nursery"],
            "jp": "江東区わかば保育園",
            "address": "Ojima 9-7-8-101, Koto-ku, Tokyo 136-0072",
            "phone": "03-3682-1461",
            "hours": "7:30–18:30 (extended care to 19:30)",
            "note": "Nursery (public) — Koto City municipal licensed nursery in Ojima 9-chome, near Higashi-Ojima station.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E6%B1%9F%E6%9D%B1%E5%8C%BA%E3%82%8F%E3%81%8B%E3%81%B0%E4%BF%9D%E8%82%B2%E5%9C%92%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B69-7-8"
          },
          {
            "name": "Ojima No.2 Nursery (Koto City)",
            "distanceKm": 0.5,
            "levels": ["nursery"],
            "jp": "江東区大島第二保育園",
            "address": "Ojima 4-1-6-130, Koto-ku, Tokyo 136-0072",
            "phone": "03-3685-6059",
            "hours": "7:30–18:30 (extended care to 19:30)",
            "note": "Nursery (public) — Koto City municipal licensed nursery inside the Ojima 4-chome housing complex.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B6%E7%AC%AC%E4%BA%8C%E4%BF%9D%E8%82%B2%E5%9C%92%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B64-1-6"
          },
          {
            "name": "Ojima No.5 Nursery (Koto City)",
            "distanceKm": 0.6,
            "levels": ["nursery"],
            "jp": "江東区大島第五保育園",
            "address": "Ojima 4-21-3-101, Koto-ku, Tokyo 136-0072",
            "phone": "03-3637-0464",
            "hours": "7:30–18:30 (extended care to 20:30)",
            "note": "Nursery (public) — Koto City municipal licensed nursery; longest evening hours of the Ojima public nurseries.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B6%E7%AC%AC%E4%BA%94%E4%BF%9D%E8%82%B2%E5%9C%92%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B64-21-3"
          },
          {
            "name": "Ojima Kindergarten (Koto City)",
            "distanceKm": 0.4,
            "levels": ["kindergarten"],
            "jp": "江東区立大島幼稚園",
            "address": "Ojima 5-38-1, Koto-ku, Tokyo 136-0072",
            "phone": "03-3684-3396",
            "hours": "9:00–14:15 (Wed 9:00–11:45)",
            "note": "Kindergarten (public) — Koto City municipal kindergarten next to Ojima Elementary School, near Ojima station.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E6%B1%9F%E6%9D%B1%E5%8C%BA%E7%AB%8B%E5%A4%A7%E5%B3%B6%E5%B9%BC%E7%A8%9A%E5%9C%92%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B65-38-1"
          },
          {
            "name": "Wakaba International Nursery — Ojima",
            "distanceKm": 0.6,
            "levels": ["nursery", "international"],
            "jp": "若葉インターナショナルナーサリー大島園",
            "address": "Sunroad Core 1F, Ojima 6-22-8, Koto-ku, Tokyo 136-0072",
            "phone": "03-5858-6593",
            "note": "Nursery (private, international) — English-oriented international nursery on the Sanroad shopping street in Ojima; a foreigner-friendly option.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E8%8B%A5%E8%91%89%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%8A%E3%82%B7%E3%83%A7%E3%83%8A%E3%83%AB%E3%83%8A%E3%83%BC%E3%82%B5%E3%83%AA%E3%83%BC%E5%A4%A7%E5%B3%B6%E5%9C%92%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B66-22-8"
          },
          {
            "name": "Kagayaki Nursery",
            "distanceKm": 1,
            "levels": ["nursery"],
            "jp": "かがやき保育園",
            "address": "Ojima 7-37-13, Koto-ku, Tokyo 136-0072",
            "phone": "03-5858-9686",
            "note": "Nursery (private) — private licensed nursery in Ojima 7-chome, walking distance from Higashi-Ojima station.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E3%81%8B%E3%81%8C%E3%82%84%E3%81%8D%E4%BF%9D%E8%82%B2%E5%9C%92%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B67-37-13"
          },
          {
            "name": "Ojima Shinsei Kindergarten",
            "distanceKm": 0.9,
            "levels": ["kindergarten"],
            "jp": "大島新生幼稚園",
            "address": "Ojima 3-30-9, Koto-ku, Tokyo 136-0072",
            "phone": "03-3681-0392",
            "website": "https://shinsei-kindergarten.jp/",
            "hours": "Extended care 8:00–9:00 & until 17:30",
            "note": "Kindergarten (private) — long-established private kindergarten (Oncho Gakuen, founded 1944) in Ojima 3-chome, between Ojima and Nishi-Ojima stations.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E5%A4%A7%E5%B3%B6%E6%96%B0%E7%94%9F%E5%B9%BC%E7%A8%9A%E5%9C%92%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B63-30-9"
          },
          {
            "name": "New Little Learning (Preschool & Kindergarten)",
            "distanceKm": 0.9,
            "levels": ["kindergarten", "international"],
            "address": "Hayashi Building 101, Ojima 3-31-3, Koto-ku, Tokyo 136-0072",
            "phone": "03-5858-9171",
            "website": "http://www.newlittlelearning.com/",
            "hours": "Mon–Fri 9:30–15:00",
            "note": "Kindergarten (private) — English-medium preschool & kindergarten in Ojima 3-chome using Montessori materials, for ages 3–6.",
            "map": "https://www.google.com/maps/search/?api=1&query=New%20Little%20Learning%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B63-31-3"
          },
          {
            "name": "No.3 Ojima Kindergarten (Koto City)",
            "distanceKm": 1,
            "levels": ["kindergarten"],
            "jp": "江東区立第三大島幼稚園",
            "address": "Ojima 7-39-2-101, Koto-ku, Tokyo 136-0072",
            "phone": "03-3685-5945",
            "website": "https://3dai-yo.koto.ed.jp/",
            "note": "Kindergarten (public) — Koto City municipal kindergarten in Ojima 7-chome, near Higashi-Ojima station.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E6%B1%9F%E6%9D%B1%E5%8C%BA%E7%AB%8B%E7%AC%AC%E4%B8%89%E5%A4%A7%E5%B3%B6%E5%B9%BC%E7%A8%9A%E5%9C%92%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B67-39-2-101"
          },
          {
            "name": "Kameido Kindergarten",
            "distanceKm": 2.3,
            "levels": ["kindergarten"],
            "jp": "亀戸幼稚園",
            "address": "Kameido 4-17-3, Koto-ku, Tokyo 136-0071",
            "phone": "03-3681-5866",
            "note": "Kindergarten (private) — private kindergarten in Kameido 4-chome, a short walk from Kameido station.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E4%BA%80%E6%88%B8%E5%B9%BC%E7%A8%9A%E5%9C%92%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E4%BA%80%E6%88%B84-17-3"
          },
          {
            "name": "No.2 Kameido Kindergarten (Koto City)",
            "distanceKm": 2.5,
            "levels": ["kindergarten"],
            "jp": "江東区立第二亀戸幼稚園",
            "address": "Kameido 6-36-1, Koto-ku, Tokyo 136-0071",
            "phone": "03-3684-1894",
            "note": "Kindergarten (public) — Koto City municipal kindergarten in Kameido 6-chome, inside No.2 Kameido Elementary School.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E6%B1%9F%E6%9D%B1%E5%8C%BA%E7%AB%8B%E7%AC%AC%E4%BA%8C%E4%BA%80%E6%88%B8%E5%B9%BC%E7%A8%9A%E5%9C%92%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E4%BA%80%E6%88%B86-36-1"
          },
          {
            "name": "Kiyoshi Kindergarten",
            "distanceKm": 2.3,
            "levels": ["kindergarten"],
            "jp": "きよし幼稚園",
            "address": "Higashisuna 3-17-10, Koto-ku, Tokyo 136-0074",
            "phone": "03-3644-6809",
            "note": "Kindergarten (private) — private kindergarten in Higashisuna 3-chome, on the Higashi-Ojima station side.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E3%81%8D%E3%82%88%E3%81%97%E5%B9%BC%E7%A8%9A%E5%9C%92%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E6%9D%B1%E7%A0%823-17-10"
          },
          {
            "name": "Koto Megumi Kindergarten",
            "distanceKm": 2,
            "levels": ["kindergarten"],
            "jp": "江東めぐみ幼稚園",
            "address": "Higashisuna 2-11-3, Koto-ku, Tokyo 136-0074",
            "phone": "03-3646-2666",
            "note": "Kindergarten (private) — private kindergarten in Higashisuna 2-chome, on the Higashi-Ojima station side.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E6%B1%9F%E6%9D%B1%E3%82%81%E3%81%90%E3%81%BF%E5%B9%BC%E7%A8%9A%E5%9C%92%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E6%9D%B1%E7%A0%822-11-3"
          },
          {
            "name": "Ojima Elementary School",
            "distanceKm": 0.5,
            "levels": ["elementary"],
            "jp": "大島小学校",
            "address": "Ojima 4-1-8, Koto-ku, Tokyo",
            "phone": "03-3681-8291",
            "website": "https://www.koto.ed.jp/ojima-sho/",
            "note": "Public elementary school.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E5%A4%A7%E5%B3%B6%E5%B0%8F%E5%AD%A6%E6%A0%A1%20Ojima%204-1-8%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "No.1 Ojima Elementary School",
            "distanceKm": 1.3,
            "levels": ["elementary"],
            "jp": "江東区立第一大島小学校",
            "address": "Ojima 2-41-4, Koto-ku, Tokyo 136-0072",
            "phone": "03-3684-4312",
            "note": "Elementary school (public) — Koto City school serving Ojima 1–2 chome, 2 minutes from Nishi-Ojima station.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E6%B1%9F%E6%9D%B1%E5%8C%BA%E7%AB%8B%E7%AC%AC%E4%B8%80%E5%A4%A7%E5%B3%B6%E5%B0%8F%E5%AD%A6%E6%A0%A1%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B62-41-4"
          },
          {
            "name": "No.2 Ojima Elementary School",
            "distanceKm": 0.8,
            "levels": ["elementary"],
            "jp": "江東区立第二大島小学校",
            "address": "Ojima 3-16-2, Koto-ku, Tokyo 136-0072",
            "phone": "03-3684-4315",
            "website": "https://2dai-sho.koto.ed.jp/",
            "note": "Elementary school (public) — Koto City school serving Ojima 3-chome and part of 6-chome.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E6%B1%9F%E6%9D%B1%E5%8C%BA%E7%AB%8B%E7%AC%AC%E4%BA%8C%E5%A4%A7%E5%B3%B6%E5%B0%8F%E5%AD%A6%E6%A0%A1%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B63-16-2"
          },
          {
            "name": "No.3 Ojima Elementary School",
            "distanceKm": 1.5,
            "levels": ["elementary"],
            "jp": "江東区立第三大島小学校",
            "address": "Ojima 9-5-3, Koto-ku, Tokyo 136-0072",
            "phone": "03-3681-9204",
            "website": "http://3dai-sho.koto.ed.jp/",
            "note": "Elementary school (public) — Koto City school serving Ojima 7-chome and 9-chome (4–10 ban), near Higashi-Ojima station.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E6%B1%9F%E6%9D%B1%E5%8C%BA%E7%AB%8B%E7%AC%AC%E4%B8%89%E5%A4%A7%E5%B3%B6%E5%B0%8F%E5%AD%A6%E6%A0%A1%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B69-5-3"
          },
          {
            "name": "No.4 Ojima Elementary School",
            "distanceKm": 0.5,
            "levels": ["elementary"],
            "jp": "江東区立第四大島小学校",
            "address": "Ojima 6-7-8, Koto-ku, Tokyo 136-0072",
            "phone": "03-3681-9935",
            "website": "https://4dai-sho.koto.ed.jp/",
            "note": "Elementary school (public) — Koto City school serving part of Ojima 5-chome and Ojima 6-chome, 2 minutes from Ojima station.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E6%B1%9F%E6%9D%B1%E5%8C%BA%E7%AB%8B%E7%AC%AC%E5%9B%9B%E5%A4%A7%E5%B3%B6%E5%B0%8F%E5%AD%A6%E6%A0%A1%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B66-7-8"
          },
          {
            "name": "No.5 Ojima Elementary School",
            "distanceKm": 1.3,
            "levels": ["elementary"],
            "jp": "江東区立第五大島小学校",
            "address": "Ojima 8-40-13, Koto-ku, Tokyo 136-0072",
            "phone": "03-3681-5011",
            "website": "http://5dai-sho.koto.ed.jp/",
            "note": "Elementary school (public) — Koto City school serving Ojima 8-chome and 9-chome (1–3 ban).",
            "map": "https://www.google.com/maps/search/?api=1&query=%E6%B1%9F%E6%9D%B1%E5%8C%BA%E7%AB%8B%E7%AC%AC%E4%BA%94%E5%A4%A7%E5%B3%B6%E5%B0%8F%E5%AD%A6%E6%A0%A1%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B68-40-13"
          },
          {
            "name": "Ojima Nan'o Elementary School",
            "distanceKm": 0.6,
            "levels": ["elementary"],
            "jp": "江東区立大島南央小学校",
            "address": "Ojima 4-18-5, Koto-ku, Tokyo 136-0072",
            "phone": "03-3636-2116",
            "note": "Elementary school (public) — Koto City school serving Ojima 4-chome and part of 5-chome, near Ojima station.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E6%B1%9F%E6%9D%B1%E5%8C%BA%E7%AB%8B%E5%A4%A7%E5%B3%B6%E5%8D%97%E5%A4%AE%E5%B0%8F%E5%AD%A6%E6%A0%A1%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B64-18-5"
          },
          {
            "name": "Ojima Junior High School",
            "distanceKm": 1.2,
            "levels": ["junior-high"],
            "jp": "江東区立大島中学校",
            "address": "Ojima 8-12-22, Koto-ku, Tokyo 136-0072",
            "phone": "03-3684-4321",
            "website": "http://ohjima-chu.koto.ed.jp",
            "note": "Junior high school (public) — Koto City junior high serving Ojima 7–9 chome.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E6%B1%9F%E6%9D%B1%E5%8C%BA%E7%AB%8B%E5%A4%A7%E5%B3%B6%E4%B8%AD%E5%AD%A6%E6%A0%A1%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B68-12-22"
          },
          {
            "name": "No.2 Ojima Junior High School",
            "distanceKm": 0.9,
            "levels": ["junior-high"],
            "jp": "江東区立第二大島中学校",
            "address": "Ojima 3-27-18, Koto-ku, Tokyo 136-0072",
            "phone": "03-3685-1681",
            "website": "http://2dai-chu.koto.ed.jp",
            "note": "Junior high school (public) — Koto City junior high serving Ojima 3-chome and 6-chome.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E6%B1%9F%E6%9D%B1%E5%8C%BA%E7%AB%8B%E7%AC%AC%E4%BA%8C%E5%A4%A7%E5%B3%B6%E4%B8%AD%E5%AD%A6%E6%A0%A1%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B63-27-18"
          },
          {
            "name": "Ojima Nishi Junior High School",
            "distanceKm": 0.5,
            "levels": ["junior-high"],
            "jp": "江東区立大島西中学校",
            "address": "Ojima 4-1-23, Koto-ku, Tokyo 136-0072",
            "phone": "03-3636-4591",
            "note": "Junior high school (public) — Koto City junior high serving Ojima 1, 2, 4 and 5 chome (western Ojima).",
            "map": "https://www.google.com/maps/search/?api=1&query=%E6%B1%9F%E6%9D%B1%E5%8C%BA%E7%AB%8B%E5%A4%A7%E5%B3%B6%E8%A5%BF%E4%B8%AD%E5%AD%A6%E6%A0%A1%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B64-1-23"
          },
          {
            "name": "India International School in Japan (IISJ) — Ojima campus",
            "distanceKm": 1.6,
            "levels": ["kindergarten", "elementary", "junior-high", "international"],
            "jp": "インディア・インターナショナルスクール・イン・ジャパン",
            "address": "Ojima 1-20-20, Koto-ku, Tokyo 136-0072",
            "phone": "03-5875-5435",
            "website": "https://iisjapan.com/",
            "hours": "Mon–Fri 8:00–17:00 (school office)",
            "note": "International school (private) — Indian CBSE-curriculum K–12 school for the Indian community, with a campus right in Ojima (its other Tokyo campus is at Sengoku 3-1-4, Kameido side); English-medium, kindergarten to Grade 12.",
            "map": "https://www.google.com/maps/search/?api=1&query=India%20International%20School%20in%20Japan%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B61-20-20"
          },
          {
            "name": "Global Indian International School (GIIS) — Nishikasai campus",
            "distanceKm": 5.2,
            "levels": ["elementary", "junior-high", "international"],
            "jp": "グローバル・インディアン・インターナショナルスクール西葛西校",
            "address": "Nishikasai 8-3-13, Edogawa-ku, Tokyo 134-0088",
            "phone": "03-6631-0441",
            "website": "https://globalindianschool.org/jp/tokyo/nishikasai",
            "hours": "Mon–Fri 8:30–17:30 (school office)",
            "note": "International school (private) — Indian CBSE school in Nishikasai (Grades 3–12 at this campus; nursery/kindergarten campuses nearby at Seishincho and Kitakasai) — the main Indian-curriculum option on the Nishikasai side.",
            "map": "https://www.google.com/maps/search/?api=1&query=Global%20Indian%20International%20School%20%E8%A5%BF%E8%91%9B%E8%A5%BF%20%E6%B1%9F%E6%88%B8%E5%B7%9D%E5%8C%BA%E8%A5%BF%E8%91%9B%E8%A5%BF8-3-13"
          },
          {
            "name": "Kerria International School of Japan",
            "distanceKm": 2,
            "levels": ["nursery", "kindergarten", "international"],
            "jp": "ケリアインターナショナルスクールオブジャパン",
            "address": "Komatsugawa 3-4-1, Edogawa-ku, Tokyo",
            "phone": "03-5875-3257",
            "website": "https://kerriainternationalschool.com/",
            "hours": "Mon–Fri 9:00–17:30",
            "note": "International preschool (private) in Komatsugawa, Edogawa-ku — bilingual English/Japanese for ages 2–6, near Higashi-Ojima station; approved for the government childcare subsidy.",
            "map": "https://www.google.com/maps/search/?api=1&query=Kerria%20International%20School%20of%20Japan%20Komatsugawa%203-4-1%2C%20Edogawa-ku%2C%20Tokyo"
          },
          {
            "name": "MeiWa Kids",
            "distanceKm": 2.4,
            "levels": ["kindergarten", "international"],
            "jp": "メイワキッズ",
            "address": "Kameido 6-6-9 (Sun Height 101), Koto-ku, Tokyo",
            "phone": "070-9226-3952",
            "note": "International preschool & afterschool in Kameido (private) — English immersion plus Japanese language lessons and holiday schools, for ages roughly 3–12; walking distance from Kameido and Ojima stations.",
            "map": "https://www.google.com/maps/search/?api=1&query=MeiWa%20Kids%20Kameido%206-6-9%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Tokyo International Public School (TIPS)",
            "distanceKm": 4.6,
            "levels": ["kindergarten", "elementary", "junior-high", "international"],
            "jp": "東京インターナショナルパブリックスクール",
            "address": "Naka-Kasai 1-31-9 (Sawada Building 3F), Edogawa-ku, Tokyo 134-0083",
            "phone": "03-6808-3456",
            "website": "https://www.tipsnihon.com/",
            "hours": "Mon–Fri 9:00–15:00",
            "note": "International school (private) in Naka-Kasai, Edogawa-ku — English-medium: Montessori early years (ages 3–6) plus Cambridge Primary and Lower Secondary up to Grade 8; second campus in Nishi-Kasai (KS Building 2F, Nishikasai 5-5-18).",
            "map": "https://www.google.com/maps/search/?api=1&query=Tokyo%20International%20Public%20School%20Naka-Kasai%201-31-9%2C%20Edogawa-ku%2C%20Tokyo"
          },
          {
            "name": "Raindrops",
            "distanceKm": null,
            "levels": ["kindergarten", "international"],
            "address": "Ojima 4-1-1-103, Koto-ku, Tokyo 136-0072",
            "phone": "03-6318-7604",
            "website": "https://raindropstokyo.com/",
            "note": "International Montessori preschool (private, unlicensed) in Ojima — Montessori preschool & kindergarten near Nishi-Ojima station, for ages 3–5 (admission from 2.5). Children must be fully toilet-trained at admission.",
            "map": "https://www.google.com/maps/search/?api=1&query=Raindrops%20%E6%9D%B1%E4%BA%AC%E9%83%BD%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B64-1-1-103"
          }
        ]
      },
      {
        "title": "Restaurants",
        "entries": [
          {
            "name": "Maharani Indian Restaurant",
            "distanceKm": 0.8,
            "jp": "マハラニ",
            "address": "Ojima 3-15-29, Koto-ku, Tokyo",
            "phone": "03-5875-1564",
            "website": "http://www.maharaniojima.jp/",
            "note": "South Indian restaurant near Nishi-Ojima station — dosa, meals (thali) and biryani; plenty of vegetarian dishes, and an Indian snack shop next door.",
            "map": "https://www.google.com/maps/search/?api=1&query=Maharani%20Indian%20Restaurant%20Ojima%203-15-29%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Veg Kitchen",
            "distanceKm": 8,
            "pureVeg": true,
            "jp": "ベジキッチン",
            "address": "Taito 3-44-8, Taito-ku, Tokyo",
            "phone": "03-5817-8165",
            "website": "https://www.vegkitchen.com",
            "hours": "11:00–15:00 & 17:00–22:00",
            "note": "Pure veg Indian restaurant near Akihabara (Okachimachi) — 100% vegetarian, with vegan and Jain (no onion/garlic) dishes; South Indian dosa and North Indian curries.",
            "map": "https://www.google.com/maps/search/?api=1&query=Veg%20Kitchen%20Taito%203-44-8%2C%20Taito-ku%2C%20Tokyo"
          },
          {
            "name": "Bombay Chowpatty",
            "distanceKm": 0.5,
            "jp": "ボンベイチャウパティ（ミナミキッチン大島店）",
            "address": "Ojima 4-13-5, Koto-ku, Tokyo",
            "phone": "03-5875-0777",
            "website": "https://www.facebook.com/bombaychowpattyojima",
            "hours": "11:00–15:00 & 17:30–22:00",
            "note": "Indian restaurant in Ojima (also known as Minami Kitchen) — dosa, biryani and curries; vegetarian dishes available.",
            "map": "https://www.google.com/maps/search/?api=1&query=Bombay%20Chowpatty%20Ojima%204-13-5%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Namaste Himal",
            "distanceKm": 0.5,
            "jp": "ナマステヒマール大島店",
            "address": "Ojima 4-2-5, Koto-ku, Tokyo",
            "phone": "03-6909-8252",
            "hours": "11:00–23:00",
            "note": "Indian & Nepali restaurant in Ojima — curry and naan sets served all day; vegetarian dishes available.",
            "map": "https://www.google.com/maps/search/?api=1&query=Namaste%20Himal%20Ojima%204-2-5%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Bombay Cafe Ojima",
            "distanceKm": 0.5,
            "address": "Ojima 4-8-13, Koto-ku, Tokyo",
            "phone": "03-6681-7711",
            "hours": "Mon–Thu 11:00–15:00 & 17:00–22:30; Fri–Sun 11:00–22:30",
            "note": "Indian restaurant in Ojima — curry, naan and tandoori; vegetarian dishes available.",
            "map": "https://www.google.com/maps/search/?api=1&query=Bombay%20Cafe%20Ojima%204-8-13%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Tandoor Bar Kamal",
            "distanceKm": 2.5,
            "jp": "タンドールバル カマル",
            "address": "Kameido 6-24-8, Koto-ku, Tokyo",
            "phone": "03-3681-9911",
            "website": "https://kamal-pur.com/index-kame.html",
            "hours": "11:00–15:00 & 17:00–23:00 (Sun lunch only, to 14:30)",
            "note": "Well-known Indian restaurant near Kameido station (the Kamalpool group) — tandoori dishes and curries; vegetarian dishes available.",
            "map": "https://www.google.com/maps/search/?api=1&query=Tandoor%20Bar%20Kamal%20Kameido%206-24-8%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Spice Magic Calcutta",
            "distanceKm": 4.2,
            "jp": "スパイスマジック カルカッタ本店",
            "address": "Nishikasai 3-13-3, Edogawa-ku, Tokyo",
            "phone": "03-5567-3885",
            "hours": "11:00–14:30 & 17:00–22:00",
            "note": "One of Nishikasai's oldest Indian restaurants — North Indian home-style cooking (the south-exit branch serves South Indian food); vegetarian dishes available.",
            "map": "https://www.google.com/maps/search/?api=1&query=Spice%20Magic%20Calcutta%20Nishikasai%203-13-3%2C%20Edogawa-ku%2C%20Tokyo"
          },
          {
            "name": "OH BHAIYA!",
            "distanceKm": 4.3,
            "pureVeg": true,
            "jp": "オー バイヤ",
            "address": "Nishikasai 3-22-6, 1F, Edogawa-ku, Tokyo",
            "phone": "03-5878-1896",
            "website": "https://ohbhaiya.jp/",
            "hours": "11:30–15:00 & 17:00–22:00 (Sat & Sun 11:30–22:00; closed Tue)",
            "note": "Indian street-food restaurant in Nishikasai — chaat, chole bhature, dosa and Indo-Chinese; many vegetarian choices. Pure veg.",
            "map": "https://www.google.com/maps/search/?api=1&query=OH%20BHAIYA%21%20Nishikasai%203-22-6%2C%20Edogawa-ku%2C%20Tokyo"
          },
          {
            "name": "Tokyo Mithai Wala",
            "distanceKm": 4.7,
            "pureVeg": true,
            "jp": "東京ミタイワラ",
            "address": "Nishikasai 6-8-5, Edogawa-ku, Tokyo",
            "phone": "03-6808-0777",
            "website": "https://tokyomithaiwala.jp/",
            "note": "Indian sweets & snacks in Nishikasai — mithai, chaat and light meals to eat in or take away. Pure veg.",
            "map": "https://www.google.com/maps/search/?api=1&query=Tokyo%20Mithai%20Wala%20Nishikasai%206-8-5%2C%20Edogawa-ku%2C%20Tokyo"
          },
          {
            "name": "Sharma's Mithaiwale",
            "distanceKm": 0.5,
            "pureVeg": true,
            "jp": "シャルマズミタイワレ",
            "address": "Ojima 6-8-16, 2F, Koto-ku, Tokyo",
            "phone": "070-8849-5384",
            "website": "http://shrishyamsweets.square.site/",
            "hours": "Tue–Sun 11:00–15:00 & 17:00–22:00 (closed Mon)",
            "note": "Pure veg Indian restaurant & sweets shop — Sharma's restaurant on the 2nd floor, directly above Sharma's Groceries on the 1st floor (1F grocery, 2F restaurant): South Indian snacks, chaat, Indo-Chinese dishes and mithai, all vegetarian.",
            "map": "https://www.google.com/maps/search/?api=1&query=Sharma%27s%20Mithaiwale%20Ojima%206-8-16%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Bombay Bazar Cafe and Restaurant",
            "distanceKm": 0.5,
            "jp": "ボンベイ バザール カフェ アンド レストラン",
            "address": "Ojima 6-12-6, Koto-ku, Tokyo",
            "phone": "080-7949-7867",
            "hours": "11:30–15:00 & 17:00–21:30 (closed Wed)",
            "note": "Indian cafe & restaurant alongside the Bombay Bazaar grocery in Ojima — home-style Mumbai & Bengali dishes by the owner couple; vegetarian dishes available.",
            "map": "https://www.google.com/maps/search/?api=1&query=Bombay%20Bazar%20Cafe%20and%20Restaurant%20Ojima%206-12-6%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Jashn Halal Indian Restaurant",
            "distanceKm": 0.7,
            "jp": "ジャシュン ハラールインドレストラン",
            "address": "Ojima 6-29-8, Koto-ku, Tokyo",
            "phone": "03-4360-3693",
            "website": "http://www.jashntokyo.com/",
            "hours": "11:00–14:30 & 17:00–22:30 (closed Tue)",
            "note": "100% halal Indian restaurant in Ojima — biryani, mutton mandi, tandoori and kothu parotta; veg biryani and other vegetarian dishes available.",
            "map": "https://www.google.com/maps/search/?api=1&query=Jashn%20Halal%20Indian%20Restaurant%20Ojima%206-29-8%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Jaggu Dhaba",
            "distanceKm": 0.6,
            "jp": "ジャグダバ",
            "address": "Ojima 6-22-6, Koto-ku, Tokyo",
            "phone": "03-6807-0284",
            "hours": "11:00–22:00",
            "note": "Dhaba-style Indian restaurant in Ojima run by Patna-born Jaggu (opened November 2025) — pani puri, samosa chaat, dahi bhalla and Bihari & North Indian dishes; vegetarian dishes available.",
            "map": "https://www.google.com/maps/search/?api=1&query=Jaggu%20Dhaba%20Ojima%206-22-6%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Asian Dining Shiva Mahal",
            "distanceKm": 0.1,
            "jp": "アジアンダイニング SHIVA MAHAL",
            "address": "Ojima 6-8-22, Nakamura Building 2F, Koto-ku, Tokyo 136-0072",
            "phone": "03-5875-4575",
            "hours": "Mon–Fri 10:30–15:00 & 18:00–23:00; Sat, Sun & holidays 10:30–23:00",
            "note": "Indian and Nepali curry dining one minute from Ojima Station.",
            "map": "https://www.google.com/maps/search/?api=1&query=Asian%20Dining%20Shiva%20Mahal%20Ojima%206-8-22%2C%20Nakamura%20Building%202F%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "KRIPA INDIAN DINING",
            "distanceKm": 1.2,
            "jp": "キルパ インドダイニング",
            "address": "Ojima 8-4-3, Ito Building, Koto-ku, Tokyo 136-0072",
            "phone": "03-3681-8055",
            "hours": "Daily 11:00–15:00 & 17:00–22:30",
            "note": "Indian curry restaurant a short walk from Ojima Station.",
            "map": "https://www.google.com/maps/search/?api=1&query=KRIPA%20INDIAN%20DINING%20Ojima%208-4-3%2C%20Ito%20Building%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Indian Palace Ojima Branch",
            "distanceKm": 1.3,
            "jp": "インディアンパレス 大島支店",
            "address": "Ojima 8-33-14, Hynes Higashi-Oshima 1F, Koto-ku, Tokyo 136-0072",
            "phone": "03-5609-5466",
            "website": "https://indianpalace-ojima.foodre.jp/",
            "hours": "Daily 10:00–23:00",
            "note": "Indian restaurant near Higashi-Ojima Station, also serving Turkish kebab.",
            "map": "https://www.google.com/maps/search/?api=1&query=Indian%20Palace%20Ojima%20Branch%20Ojima%208-33-14%2C%20Hynes%20Higashi-Oshima%201F%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Habibi Halal Restaurant",
            "distanceKm": 0.5,
            "jp": "ハビビ ハラル レストラン",
            "address": "Ojima 4-1-2, Ojima 4-chome danchi Building 2 Room 107, Koto-ku, Tokyo 136-0072",
            "phone": "03-5875-5075",
            "hours": "Daily 11:00–15:00 & 17:00–22:30",
            "note": "100% halal Pakistani restaurant 3 minutes from Nishi-Ojima Station — no alcohol or pork, and it has a prayer room.",
            "map": "https://www.google.com/maps/search/?api=1&query=Habibi%20Halal%20Restaurant%20Ojima%204-1-2%2C%20Ojima%204-chome%20danchi%20Building%202%20Room%20107%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Fulbari Kameido",
            "distanceKm": 2,
            "jp": "フルバリ 亀戸店",
            "address": "Kameido 9-6-19, Mitomi Building 1F, Koto-ku, Tokyo 136-0071",
            "phone": "03-3685-5307",
            "hours": "Daily 11:00–15:00 & 17:00–22:30",
            "note": "Indian curry and Asian restaurant in Kameido, on the Higashi-Ojima side.",
            "map": "https://www.google.com/maps/search/?api=1&query=Fulbari%20Kameido%20Kameido%209-6-19%2C%20Mitomi%20Building%201F%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Andhra Cafe",
            "distanceKm": 2.4,
            "jp": "アーンドラ・カフェ",
            "address": "Komatsugawa 2-4-3, Pal Plaza Komatsugawa Building 3 1F, Edogawa-ku, Tokyo 132-0034",
            "phone": "03-5627-1158",
            "hours": "Weekdays 11:15–14:30 & 17:00–22:00; weekends 11:30–14:30 & 17:00–21:00",
            "note": "Traditional South Indian (Andhra) food in Komatsugawa, about 12 minutes from Higashi-Ojima Station — a Tabelog award pick.",
            "map": "https://www.google.com/maps/search/?api=1&query=Andhra%20Cafe%20Komatsugawa%202-4-3%2C%20Pal%20Plaza%20Komatsugawa%20Building%203%201F%2C%20Edogawa-ku%2C%20Tokyo"
          },
          {
            "name": "Grace Kitchen",
            "distanceKm": 3,
            "jp": "グレースキッチン",
            "address": "Funabori 3-5-19, Casa Shida B1F, Edogawa-ku, Tokyo 134-0091",
            "phone": "070-8517-6767",
            "website": "https://www.instagram.com/grace_kitchen_rc",
            "hours": "Daily 11:00–15:00 & 17:00–23:00",
            "note": "South Indian restaurant and cafe 3 minutes from Funabori Station — dosa, biryani and Kerala meals.",
            "map": "https://www.google.com/maps/search/?api=1&query=Grace%20Kitchen%20Funabori%203-5-19%2C%20Casa%20Shida%20B1F%2C%20Edogawa-ku%2C%20Tokyo"
          },
          {
            "name": "BINITA (Malika International)",
            "distanceKm": 3.4,
            "jp": "ビニタ",
            "address": "Funabori 7-13-20, Tatsumi Building, Edogawa-ku, Tokyo 134-0091",
            "phone": "03-5605-3088",
            "website": "https://binita.jp/",
            "note": "Indian restaurant in Funabori.",
            "map": "https://www.google.com/maps/search/?api=1&query=BINITA%20%28Malika%20International%29%20Funabori%207-13-20%2C%20Tatsumi%20Building%2C%20Edogawa-ku%2C%20Tokyo"
          },
          {
            "name": "Mumbai Palace Indian Restaurant",
            "distanceKm": 4.6,
            "jp": "ムンバイパレス",
            "address": "Nishikasai 5-8-19, Excellent Building 1F, Edogawa-ku, Tokyo 134-0088",
            "phone": "03-5658-4028",
            "hours": "Daily 11:00–15:00 & 17:00–22:30",
            "note": "Indian restaurant in Nishikasai known for Indo-Chinese dishes and biryani; sister shop of Mumbai Kitchen.",
            "map": "https://www.google.com/maps/search/?api=1&query=Mumbai%20Palace%20Indian%20Restaurant%20Nishikasai%205-8-19%2C%20Excellent%20Building%201F%2C%20Edogawa-ku%2C%20Tokyo"
          },
          {
            "name": "Mumbai Kitchen",
            "distanceKm": 4.8,
            "jp": "ムンバイキッチン",
            "address": "Nishikasai 6-12-9, Eggs 23 Building 1F, Edogawa-ku, Tokyo 134-0088",
            "phone": "03-3878-4088",
            "hours": "Daily 11:00–15:00 & 17:00–22:30",
            "note": "Indian restaurant 3 minutes from Nishikasai Station's south exit; sister shop of Mumbai Palace.",
            "map": "https://www.google.com/maps/search/?api=1&query=Mumbai%20Kitchen%20Nishikasai%206-12-9%2C%20Eggs%2023%20Building%201F%2C%20Edogawa-ku%2C%20Tokyo"
          },
          {
            "name": "Indiyumm NishiKasai",
            "distanceKm": 4.7,
            "jp": "インディヤム 西葛西",
            "address": "Nishikasai 6-5-17, Edogawa-ku, Tokyo 134-0088",
            "phone": "03-6324-7911",
            "website": "http://www.indiyumm.com/",
            "hours": "Lunch 10:30–15:00; dinner 17:30–22:00 (Sat–Sun to 23:00)",
            "note": "West Indian dishes and chaat in Nishikasai — 'the yummy side of India'.",
            "map": "https://www.google.com/maps/search/?api=1&query=Indiyumm%20NishiKasai%20Nishikasai%206-5-17%2C%20Edogawa-ku%2C%20Tokyo"
          },
          {
            "name": "Indiyumm",
            "distanceKm": 4,
            "jp": "インディヤム",
            "address": "Edogawa 6-28-17, Edogawa-ku, Tokyo 134-0013",
            "phone": "03-6760-5763",
            "website": "http://indiyumm.com/",
            "hours": "11:00–15:00 & 17:30–21:30 (closed Mon)",
            "note": "The original Indiyumm — West Indian restaurant between Kasai and Funabori stations.",
            "map": "https://www.google.com/maps/search/?api=1&query=Indiyumm%20Edogawa%206-28-17%2C%20Edogawa-ku%2C%20Tokyo"
          },
          {
            "name": "Delhi Host Cafe & Curry",
            "distanceKm": 4.6,
            "jp": "デリーホスト",
            "address": "Nishikasai 5-9-6, Nishikasai House 1F-A, Edogawa-ku, Tokyo 134-0088",
            "phone": "090-8808-1786",
            "hours": "11:00–15:00 & 17:00–23:00 (closed Tue)",
            "note": "Indian curry cafe a few minutes from Nishikasai Station.",
            "map": "https://www.google.com/maps/search/?api=1&query=Delhi%20Host%20Cafe%20%26%20Curry%20Nishikasai%205-9-6%2C%20Nishikasai%20House%201F-A%2C%20Edogawa-ku%2C%20Tokyo"
          },
          {
            "name": "Indian Restaurant & Bar Munal",
            "distanceKm": 4.2,
            "jp": "ムナル",
            "address": "Nishikasai 3-6-14, 1F, Edogawa-ku, Tokyo 134-0088",
            "phone": "03-3686-4590",
            "hours": "Daily 11:00–15:00 & 17:00–22:30",
            "note": "Indian and Nepali restaurant and bar in Nishikasai, with spicy izakaya-style dishes.",
            "map": "https://www.google.com/maps/search/?api=1&query=Indian%20Restaurant%20%26%20Bar%20Munal%20Nishikasai%203-6-14%2C%201F%2C%20Edogawa-ku%2C%20Tokyo"
          },
          {
            "name": "TAAJ PALACE",
            "distanceKm": 4,
            "jp": "タージパレス",
            "address": "Nishikasai 1-12-20, Heights Yamahide 1F, Edogawa-ku, Tokyo 134-0088",
            "phone": "03-5696-0540",
            "hours": "11:00–15:00 & 17:00–22:30",
            "note": "Punjabi-focused Indian restaurant and dining bar, about 10 minutes from Nishikasai Station.",
            "map": "https://www.google.com/maps/search/?api=1&query=TAAJ%20PALACE%20Nishikasai%201-12-20%2C%20Heights%20Yamahide%201F%2C%20Edogawa-ku%2C%20Tokyo"
          },
          {
            "name": "Amudhasurabhi",
            "distanceKm": 4.5,
            "jp": "アムダスラビー",
            "address": "Nishikasai 5-1-5, Sun City Nishikasai B1F, Edogawa-ku, Tokyo 134-0088",
            "phone": "03-5605-2107",
            "hours": "Daily 11:00–15:00 & 17:00–22:00",
            "note": "Tamil Chettinad South Indian restaurant by Nishikasai Station, running since 2014 — weekend lunch buffet.",
            "map": "https://www.google.com/maps/search/?api=1&query=Amudhasurabhi%20Nishikasai%205-1-5%2C%20Sun%20City%20Nishikasai%20B1F%2C%20Edogawa-ku%2C%20Tokyo"
          },
          {
            "name": "Rekha Kasai Honten",
            "distanceKm": 5,
            "jp": "カフェと印度家庭料理 レカ 葛西本店",
            "address": "Higashi-Kasai 6-23-11, Edogawa-ku, Tokyo 134-0084",
            "phone": "03-6676-0941",
            "hours": "11:30–15:00 & 18:00–21:00 (closed Mon)",
            "note": "Maharashtrian home-style Indian cooking near Kasai Station, next to the Edogawa India Culture Center.",
            "map": "https://www.google.com/maps/search/?api=1&query=Rekha%20Kasai%20Honten%20Higashi-Kasai%206-23-11%2C%20Edogawa-ku%2C%20Tokyo"
          },
          {
            "name": "Jamuna Curry",
            "distanceKm": 4.6,
            "jp": "ジャムナカレー",
            "address": "Naka-Kasai 3-29-12, Edogawa-ku, Tokyo 134-0083",
            "phone": "03-6661-3541",
            "hours": "11:00–23:00",
            "note": "Indo-Nepali Asian dining near Kasai Station, known for its all-you-can-eat sets.",
            "map": "https://www.google.com/maps/search/?api=1&query=Jamuna%20Curry%20Naka-Kasai%203-29-12%2C%20Edogawa-ku%2C%20Tokyo"
          }
        ]
      },
      {
        "title": "Groceries & Indian stores",
        "entries": [
          {
            "name": "Sharma's Groceries",
            "distanceKm": 0.5,
            "address": "Ojima 6-8-16, 1F, Koto-ku, Tokyo",
            "phone": "070-1576-7259",
            "website": "http://www.indojin.com/",
            "hours": "10:00–13:00 & 14:00–20:00 (closed Mon)",
            "note": "Indian grocery in Ojima (the indojin.com / Apna Bazar shop) — spices, atta, rice, dals and ready-to-eat foods; also delivers Japan-wide by online order.",
            "map": "https://www.google.com/maps/search/?api=1&query=Sharma%27s%20Groceries%20Ojima%206-8-16%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Ganesh Mart",
            "distanceKm": 0.5,
            "address": "Ojima 5-45-2, Koto-ku, Tokyo",
            "phone": "080-7412-1101",
            "website": "https://ganeshmart.jp/",
            "hours": "10:00–20:00",
            "note": "Indian grocery store in Ojima — spices, rice, snacks, frozen foods and puja items.",
            "map": "https://www.google.com/maps/search/?api=1&query=Ganesh%20Mart%20Ojima%205-45-2%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Bombay Bazaar",
            "distanceKm": 0.5,
            "address": "Ojima 6-12-11, Koto-ku, Tokyo",
            "phone": "03-5858-9595",
            "website": "https://www.facebook.com/bbojima/",
            "hours": "10:00–22:00",
            "note": "Indian grocery in Ojima — spices plus fresh Indian vegetables and fruit imported from India.",
            "map": "https://www.google.com/maps/search/?api=1&query=Bombay%20Bazaar%20Ojima%206-12-11%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Bazar Maharani",
            "distanceKm": 0.8,
            "address": "Ojima 3-15-29, Koto-ku, Tokyo",
            "phone": "090-1798-1786",
            "website": "http://www.maharaniojima.com/",
            "hours": "9:00–22:00",
            "note": "Indian food shop next to Maharani in Ojima — snacks, spices and sweets that are hard to find elsewhere in Tokyo.",
            "map": "https://www.google.com/maps/search/?api=1&query=Bazar%20Maharani%20Ojima%203-15-29%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Spice Route",
            "distanceKm": 1.7,
            "address": "Komatsugawa 1-5-2, Edogawa-ku, Tokyo",
            "phone": "070-8994-4359",
            "hours": "10:00–20:30",
            "note": "Indian grocery in Komatsugawa, about 1 minute from Higashi-Ojima station — spices, rice and Indian staples.",
            "map": "https://www.google.com/maps/search/?api=1&query=Spice%20Route%20Komatsugawa%201-5-2%2C%20Edogawa-ku%2C%20Tokyo"
          },
          {
            "name": "Desi Mart",
            "distanceKm": 4.2,
            "jp": "デシマート",
            "address": "Nishikasai 3-13-5, Edogawa-ku, Tokyo",
            "note": "Indian mini-supermarket in Nishikasai (opened 2023) — Indian vegetables, rice, drinks and snacks imported from India.",
            "map": "https://www.google.com/maps/search/?api=1&query=Desi%20Mart%20Nishikasai%203-13-5%2C%20Edogawa-ku%2C%20Tokyo"
          },
          {
            "name": "Star Bazaar",
            "distanceKm": 1.2,
            "jp": "スター・バザール",
            "address": "Ojima 8-22-7, Koto-ku, Tokyo 136-0072",
            "phone": "03-6802-9371",
            "hours": "Tue–Sun 11:00–20:00 (closed Mon)",
            "note": "Indian grocery right in Ojima, about 4 minutes from Ojima Station — spices, lentils, rice, snacks and frozen foods from the Star Indo Grocery group.",
            "map": "https://www.google.com/maps/search/?api=1&query=Star%20Bazaar%20Ojima%208-22-7%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Star Bazaar Funabori",
            "distanceKm": 3.2,
            "jp": "スター・バザール",
            "address": "Matsue 5-18-3, 1F, Edogawa-ku, Tokyo 132-0025",
            "phone": "03-5878-0731",
            "hours": "Tue–Sun 11:00–20:00 (closed Mon)",
            "note": "The Funabori branch of Star Bazaar — the same Indian grocery range near Funabori Station.",
            "map": "https://www.google.com/maps/search/?api=1&query=Star%20Bazaar%20Funabori%20Matsue%205-18-3%2C%201F%2C%20Edogawa-ku%2C%20Tokyo"
          },
          {
            "name": "Bharat Bazaar Japan",
            "distanceKm": 1.5,
            "address": "Kitasuna 4-1-14, Takahashi Building 102, Koto-ku, Tokyo 136-0073",
            "phone": "080-6238-2298",
            "website": "https://bharatbazaar.co.jp/",
            "hours": "10:00–20:00 (closed Wed)",
            "note": "Indian grocery in Kitasuna, just south of Ojima — it also runs a Japan-wide online store, so anything missing on the shelf can be ordered.",
            "map": "https://www.google.com/maps/search/?api=1&query=Bharat%20Bazaar%20Japan%20Kitasuna%204-1-14%2C%20Takahashi%20Building%20102%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Madhu's Indian Grocery and Indian Vegetables",
            "distanceKm": 0.7,
            "address": "Ojima 6-30-13, Seki Building 1F, Koto-ku, Tokyo 136-0072",
            "phone": "03-5875-0045",
            "hours": "Mon–Fri & Sun 10:00–20:30; Sat 11:00–20:30",
            "note": "Indian grocery in Ojima that specialises in fresh Indian vegetables, alongside the usual spices, rice and staples.",
            "map": "https://www.google.com/maps/search/?api=1&query=Madhu%27s%20Indian%20Grocery%20and%20Indian%20Vegetables%20Ojima%206-30-13%2C%20Seki%20Building%201F%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "TMVS Foods",
            "distanceKm": 4.6,
            "jp": "TMVSフーズ",
            "address": "Nishikasai 5-8-5, Edogawa-ku, Tokyo 134-0088",
            "phone": "03-6808-6011",
            "website": "http://www.tmvsfoods.jp/",
            "hours": "Daily 10:00–21:00",
            "note": "Bills itself as 'The Indian Supermarket' — a large Indian grocery on the north side of Nishikasai Station.",
            "map": "https://www.google.com/maps/search/?api=1&query=TMVS%20Foods%20Nishikasai%205-8-5%2C%20Edogawa-ku%2C%20Tokyo"
          },
          {
            "name": "Swagat Indian Bazaar",
            "distanceKm": 4.6,
            "jp": "スワガット インディアン バザール",
            "address": "Nishikasai 5-11-10, Noguchi Building, Edogawa-ku, Tokyo 134-0088",
            "phone": "080-3123-2290",
            "hours": "Daily 10:00–21:00",
            "note": "One of the oldest Indian groceries in Nishikasai, at its new address — a wide range of spices, snacks and frozen foods.",
            "map": "https://www.google.com/maps/search/?api=1&query=Swagat%20Indian%20Bazaar%20Nishikasai%205-11-10%2C%20Noguchi%20Building%2C%20Edogawa-ku%2C%20Tokyo"
          },
          {
            "name": "Bappu Bazaar",
            "distanceKm": 4.1,
            "jp": "バップ バザール",
            "address": "Nishikasai 3-2-14, Edogawa-ku, Tokyo 134-0088",
            "phone": "03-6663-8876",
            "hours": "Tue–Sun 11:00–21:00 (closed Mon)",
            "note": "Indian and Asian grocery in Nishikasai, also listed in halal-shop directories.",
            "map": "https://www.google.com/maps/search/?api=1&query=Bappu%20Bazaar%20Nishikasai%203-2-14%2C%20Edogawa-ku%2C%20Tokyo"
          },
          {
            "name": "Ambika Veg & Vegan Shop Nishikasai",
            "distanceKm": 5,
            "pureVeg": true,
            "address": "Seishincho 1-3-6, Edogawa-ku, Tokyo 134-0087",
            "phone": "03-6808-8927",
            "website": "https://shop.ambikajapan.com/en",
            "hours": "Daily 10:00–20:00",
            "note": "Fully vegetarian and vegan Indian grocery, about 10 minutes from Nishikasai Station — the Ambika chain's own spices, ready foods and sweets.",
            "map": "https://www.google.com/maps/search/?api=1&query=Ambika%20Veg%20%26%20Vegan%20Shop%20Nishikasai%20Seishincho%201-3-6%2C%20Edogawa-ku%2C%20Tokyo"
          },
          {
            "name": "Ambika Veg & Vegan Shop Sunny Mall",
            "distanceKm": 4.4,
            "pureVeg": true,
            "address": "Nishikasai 4-2-28, Sunny Mall Nishikasai 2F, Edogawa-ku, Tokyo 134-0088",
            "phone": "03-6808-6676",
            "website": "https://shop.ambikajapan.com/en",
            "hours": "Daily 10:00–20:00",
            "note": "Ambika's second Nishikasai-area store, inside Sunny Mall — fully vegetarian and vegan Indian groceries.",
            "map": "https://www.google.com/maps/search/?api=1&query=Ambika%20Veg%20%26%20Vegan%20Shop%20Sunny%20Mall%20Nishikasai%204-2-28%2C%20Sunny%20Mall%20Nishikasai%202F%2C%20Edogawa-ku%2C%20Tokyo"
          }
        ]
      },
      {
        "title": "Post office, ward office & official help",
        "entries": [
          {
            "name": "Ojima Post Office",
            "distanceKm": 0.5,
            "jp": "大島郵便局",
            "address": "Ojima 4-6-8, Koto-ku, Tokyo",
            "phone": "03-3685-5338",
            "website": "https://map.japanpost.jp/p/search/dtl/300101212000/",
            "note": "Mail, parcels and a Japan Post Bank ATM.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E5%A4%A7%E5%B3%B6%E9%83%B5%E4%BE%BF%E5%B1%80%20Ojima%204-6-8%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Koto City Ojima Branch Office",
            "distanceKm": 0.5,
            "address": "Ojima 4-5-6, Koto-ku, Tokyo",
            "phone": "03-3682-1211",
            "note": "Residence paperwork and administrative services.",
            "map": "https://www.google.com/maps/search/?api=1&query=Koto%20City%20Ojima%20Branch%20Office%20Ojima%204-5-6%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Edogawa City Office",
            "distanceKm": 6.5,
            "address": "Central 4-1, Edogawa-ku, Tokyo",
            "phone": "03-3652-1151",
            "hours": "Mon–Fri 8:30–17:00",
            "note": "City office for the Nishikasai side.",
            "map": "https://www.google.com/maps/search/?api=1&query=Edogawa%20City%20Office%20Central%204-1%2C%20Edogawa-ku%2C%20Tokyo"
          },
          {
            "name": "Koto-ku Multicultural Center",
            "distanceKm": 3.5,
            "address": "Toyo 2-2-17, Koto-ku, Tokyo",
            "phone": "03-5602-9628",
            "note": "Japanese/English support for foreign residents.",
            "map": "https://www.google.com/maps/search/?api=1&query=Koto-ku%20Multicultural%20Center%20Toyo%202-2-17%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Tokyo Public Law Office (Koto branch)",
            "distanceKm": 3.5,
            "address": "Toyo 2-7-7, Koto-ku, Tokyo",
            "phone": "03-5632-6150",
            "website": "https://www.t-pblo.jp/office/koto/",
            "note": "Legal consultation; English available.",
            "map": "https://www.google.com/maps/search/?api=1&query=Tokyo%20Public%20Law%20Office%20%28Koto%20branch%29%20Toyo%202-7-7%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Koto Navi — Koto City official app",
            "distanceKm": null,
            "note": "City information, alerts and events on your phone."
          },
          {
            "name": "Koto-ku Welfare Center",
            "distanceKm": 0.5,
            "address": "Ojima 4-7-1, Koto-ku, Tokyo",
            "phone": "03-3684-6342",
            "website": "https://www.city.koto.lg.jp/kurashi/fukushi/",
            "note": "Support and advice for elderly residents and childcare.",
            "map": "https://www.google.com/maps/search/?api=1&query=Koto-ku%20Welfare%20Center%20Ojima%204-7-1%2C%20Koto-ku%2C%20Tokyo"
          }
        ]
      },
      {
        "title": "Banks & ATMs",
        "entries": [
          {
            "name": "Mizuho Bank ATM, Ojima",
            "distanceKm": 0.5,
            "address": "Ojima 4-10-8, Koto-ku, Tokyo",
            "phone": "0120-324-274",
            "note": "ATM only. (The Ojima Post Office above also has a Japan Post Bank ATM.)",
            "map": "https://www.google.com/maps/search/?api=1&query=Mizuho%20Bank%20ATM%2C%20Ojima%20Ojima%204-10-8%2C%20Koto-ku%2C%20Tokyo"
          }
        ]
      },
      {
        "title": "Utilities & home help",
        "entries": [
          {
            "name": "Tokyo Gas Customer Center",
            "distanceKm": 1.2,
            "address": "Ojima 2-8-2, Koto-ku, Tokyo",
            "phone": "0570-002211",
            "hours": "Mon–Sat 9:00–19:00",
            "note": "Also for gas emergencies.",
            "map": "https://www.google.com/maps/search/?api=1&query=Tokyo%20Gas%20Customer%20Center%20Ojima%202-8-2%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "TEPCO (electricity)",
            "distanceKm": null,
            "phone": "0120-995-113",
            "hours": "Mon–Sat 9:00–17:00",
            "note": "Electricity supply."
          },
          {
            "name": "Tokyo Waterworks",
            "distanceKm": null,
            "phone": "03-5326-1101",
            "hours": "Mon–Fri 8:30–17:00",
            "note": "Water supply."
          },
          {
            "name": "Koto-ku Waste Management",
            "distanceKm": 1.2,
            "address": "Ojima 2-9-1, Koto-ku, Tokyo",
            "phone": "03-3647-9191",
            "website": "https://www.city.koto.lg.jp/kurashi/gomi/",
            "note": "Garbage separation rules and the collection calendar.",
            "map": "https://www.google.com/maps/search/?api=1&query=Koto-ku%20Waste%20Management%20Ojima%202-9-1%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Koto-ku Disaster Prevention Center",
            "distanceKm": 1.2,
            "address": "Ojima 2-9-1, Koto-ku, Tokyo",
            "phone": "03-3647-8811",
            "website": "https://www.city.koto.lg.jp/kurashi/bosai/",
            "note": "Disaster information and alerts.",
            "map": "https://www.google.com/maps/search/?api=1&query=Koto-ku%20Disaster%20Prevention%20Center%20Ojima%202-9-1%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Docomo Shop Ojima",
            "distanceKm": 0.5,
            "address": "Ojima 4-3-4, Koto-ku, Tokyo",
            "phone": "03-5609-0111",
            "website": "https://www.nttdocomo.co.jp/",
            "note": "Phones, SIM cards, support.",
            "map": "https://www.google.com/maps/search/?api=1&query=Docomo%20Shop%20Ojima%20Ojima%204-3-4%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "PC Support Ojima",
            "distanceKm": 0.5,
            "address": "Ojima 6-10-8, Koto-ku, Tokyo",
            "phone": "03-3681-8899",
            "hours": "Mon–Fri 10:00–18:00",
            "note": "Home visits possible.",
            "map": "https://www.google.com/maps/search/?api=1&query=PC%20Support%20Ojima%20Ojima%206-10-8%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Koto-ku Plumbing Cooperative",
            "distanceKm": 0.5,
            "address": "Ojima 6-11-2, Koto-ku, Tokyo",
            "phone": "03-3681-1171",
            "note": "Water leaks and plumbing.",
            "map": "https://www.google.com/maps/search/?api=1&query=Koto-ku%20Plumbing%20Cooperative%20Ojima%206-11-2%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Key Station Ojima (locksmith)",
            "distanceKm": 0.5,
            "address": "Ojima 4-9-9, Koto-ku, Tokyo",
            "phone": "03-3682-6949",
            "note": "Emergency lock opening.",
            "map": "https://www.google.com/maps/search/?api=1&query=Key%20Station%20Ojima%20%28locksmith%29%20Ojima%204-9-9%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Ojima Laundry",
            "distanceKm": 0.2,
            "address": "Ojima 5-11-6, Koto-ku, Tokyo",
            "phone": "03-3682-3205",
            "note": "Coin laundry & dry cleaning.",
            "map": "https://www.google.com/maps/search/?api=1&query=Ojima%20Laundry%20Ojima%205-11-6%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Yamada Denki, Kameido",
            "distanceKm": 1.9,
            "address": "Kameido 2-11-1, Koto-ku, Tokyo",
            "phone": "03-5628-5811",
            "hours": "10:00–20:00",
            "note": "Electronics sales and repairs.",
            "map": "https://www.google.com/maps/search/?api=1&query=Yamada%20Denki%2C%20Kameido%20Kameido%202-11-1%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Hard Off, Kameido",
            "distanceKm": 1.8,
            "address": "Kameido 1-44-8, Koto-ku, Tokyo",
            "phone": "03-5628-0511",
            "website": "https://www.hardoff.co.jp/",
            "note": "Second-hand goods, electronics and furniture.",
            "map": "https://www.google.com/maps/search/?api=1&query=Hard%20Off%2C%20Kameido%20Kameido%201-44-8%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Art Moving Center (Ojima)",
            "distanceKm": 0.8,
            "address": "Ojima 3-10-11, Koto-ku, Tokyo",
            "phone": "0120-0123-33",
            "website": "https://www.the0123.com/",
            "note": "English support possible.",
            "map": "https://www.google.com/maps/search/?api=1&query=Art%20Moving%20Center%20%28Ojima%29%20Ojima%203-10-11%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Fukuhara Moving",
            "distanceKm": null,
            "website": "https://fukuhara-move.com/eng/",
            "note": "English support available."
          },
          {
            "name": "Times Parking Ojima 5-chome",
            "distanceKm": 0.1,
            "address": "Ojima 5-10-11, Koto-ku, Tokyo",
            "phone": "0120-77-8924",
            "website": "https://times-info.net/",
            "note": "Paid parking.",
            "map": "https://www.google.com/maps/search/?api=1&query=Times%20Parking%20Ojima%205-chome%20Ojima%205-10-11%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Tokyo MK Taxi",
            "distanceKm": null,
            "phone": "03-5547-5551",
            "website": "https://www.tokyomk.com/",
            "note": "English available."
          },
          {
            "name": "AC servicing — Tamano San",
            "distanceKm": null,
            "phone": "090-4085-5689",
            "note": "Community contact from the Ojima directory."
          },
          {
            "name": "AC servicing — Chris",
            "distanceKm": null,
            "phone": "080-5051-4064",
            "note": "Community contact from the Ojima directory."
          }
        ]
      },
      {
        "title": "Parks, library & community",
        "entries": [
          {
            "name": "Ojima Komatsugawa Park",
            "distanceKm": 1.5,
            "jp": "大島小松川公園",
            "address": "Ojima 9-3, Koto-ku, Tokyo",
            "phone": "03-3636-9365",
            "note": "The big riverside park — the neighbourhood's green heart.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E5%A4%A7%E5%B3%B6%E5%B0%8F%E6%9D%BE%E5%B7%9D%E5%85%AC%E5%9C%92%20Ojima%209-3%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Ojima Library",
            "distanceKm": 0.5,
            "jp": "大島図書館",
            "address": "Ojima 4-5-6, Koto-ku, Tokyo",
            "phone": "03-3683-6841",
            "website": "https://www.koto-lib.tokyo.jp/",
            "map": "https://www.google.com/maps/search/?api=1&query=%E5%A4%A7%E5%B3%B6%E5%9B%B3%E6%9B%B8%E9%A4%A8%20Ojima%204-5-6%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Ojima Kominkan (community center)",
            "distanceKm": 0.5,
            "address": "Ojima 4-5-10, Koto-ku, Tokyo",
            "phone": "03-3683-7331",
            "website": "https://www.city.koto.lg.jp/kurashi/kominkan/ojima/",
            "note": "Multipurpose community space.",
            "map": "https://www.google.com/maps/search/?api=1&query=Ojima%20Kominkan%20%28community%20center%29%20Ojima%204-5-10%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Ojima Hachiman Shrine",
            "distanceKm": 0.5,
            "address": "Ojima 6-7-14, Koto-ku, Tokyo",
            "phone": "03-3681-2595",
            "map": "https://www.google.com/maps/search/?api=1&query=Ojima%20Hachiman%20Shrine%20Ojima%206-7-14%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Koto-ku Tourism Association",
            "distanceKm": 0.5,
            "address": "Ojima 4-5-18, Koto-ku, Tokyo",
            "phone": "03-3647-4961",
            "website": "https://koto-kanko.jp/",
            "note": "Local events and festivals.",
            "map": "https://www.google.com/maps/search/?api=1&query=Koto-ku%20Tourism%20Association%20Ojima%204-5-18%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Tipness Kameido (gym)",
            "distanceKm": 1.9,
            "address": "Kameido 2-27-7, Koto-ku, Tokyo",
            "phone": "03-5628-3531",
            "website": "https://tip.tipness.co.jp/shop_info/SHP017/",
            "note": "Large fitness center near Ojima.",
            "map": "https://www.google.com/maps/search/?api=1&query=Tipness%20Kameido%20%28gym%29%20Kameido%202-27-7%2C%20Koto-ku%2C%20Tokyo"
          }
        ]
      }
    ]
  },
  ...nishikasaiDirectory
};
