// Place directories keyed by article slug. An article page renders the
// PlaceDirectory component when its slug has an entry here. Phone numbers
// live only in this data: cards show a Call button (a tel: link) and never
// print the number itself, so the guide stays tap-friendly on mobile.
export const directories = {
  "living-in-ojima-tokyo-guide": {
    "title": "Ojima directory — tap to call, open the map, or share a place",
    "sections": [
      {
        "title": "Clinics & hospitals",
        "entries": [
          {
            "name": "Himawari — Tokyo Metropolitan Health & Medical Information Center",
            "phone": "03-5285-8181",
            "website": "https://www.himawari.metro.tokyo.jp/",
            "hours": "24/7 phone support",
            "note": "English/Japanese medical information and help finding a doctor (an information service, not a clinic). Start here if you're unsure where to go.",
            "map": "https://www.google.com/maps/search/?api=1&query=Himawari%20%E2%80%94%20Tokyo%20Metropolitan%20Health%20%26%20Medical%20Information%20Center%2C%20Tokyo"
          },
          {
            "name": "Koto Hospital",
            "jp": "江東病院",
            "address": "Ojima 6-8-5, Koto-ku, Tokyo 136-0072",
            "phone": "03-3685-2166",
            "website": "https://koto-hospital.or.jp/",
            "hours": "Mon–Sat 9:00–12:00 & 13:00–16:30; closed Sun & holidays (same number for night/holiday emergency calls)",
            "note": "General hospital — Ojima's main general hospital, 1 minute from Ojima station: internal medicine, surgery, orthopedics, pediatrics, gynecology, eye, ENT, dermatology and more; the local emergency hospital for the area.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E6%B1%9F%E6%9D%B1%E7%97%85%E9%99%A2%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B66-8-5"
          },
          {
            "name": "Ojima Pediatrics Clinic",
            "jp": "大島小児科医院",
            "address": "N&H Building 1F–2F, Ojima 8-5-2, Koto-ku, Tokyo 136-0072",
            "phone": "03-5609-7631",
            "website": "http://www.oojimahospital.com/",
            "hours": "Mon, Tue, Thu, Fri 9:00–12:00 & 15:00–19:00; Wed 9:00–12:00; Sat 9:00–12:00 & 14:00–17:00; closed Sun & holidays",
            "note": "Pediatric clinic — children-focused clinic in Ojima (pediatrics, allergy, internal medicine), 2 minutes from Ojima station; its official website has an English 'In an Emergency' page.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E5%A4%A7%E5%B3%B6%E5%B0%8F%E5%85%90%E7%A7%91%E5%8C%BB%E9%99%A2%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B68-5-2"
          },
          {
            "name": "Ojima Clinic",
            "address": "Ojima 3-7-1, Koto-ku, Tokyo",
            "phone": "03-5609-4112",
            "hours": "Mon–Fri 9:00–18:00",
            "note": "Japanese only.",
            "map": "https://www.google.com/maps/search/?api=1&query=Ojima%20Clinic%20Ojima%203-7-1%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Ojima Ekimae Clinic",
            "address": "Ojima 5-10-10, 1F, Koto-ku, Tokyo",
            "phone": "03-3684-1181",
            "website": "https://ojima-ekimae.jp/",
            "hours": "Mon–Sat 9:00–18:00",
            "note": "Japanese only.",
            "map": "https://www.google.com/maps/search/?api=1&query=Ojima%20Ekimae%20Clinic%20Ojima%205-10-10%2C%201F%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Kodomo Mirai Clinic",
            "address": "Ojima 6-1-4-102, Koto-ku, Tokyo",
            "phone": "03-5627-7676",
            "website": "https://kodomo-mirai.net/",
            "hours": "Typically Mon–Sat 9:00–17:00",
            "note": "Children's clinic. Japanese only.",
            "map": "https://www.google.com/maps/search/?api=1&query=Kodomo%20Mirai%20Clinic%20Ojima%206-1-4-102%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Iwabuchi Internal Medicine & Urology Clinic",
            "address": "Ojima 3-4-3, Tower Residence Nishi-Ojima 2F, Koto-ku, Tokyo",
            "phone": "03-3683-3137",
            "website": "https://iwabuchi-clinic.jp",
            "hours": "9:00–12:30 & 15:00–18:00 (closed Thu & Sun)",
            "note": "Internal medicine & urology. A little English.",
            "map": "https://www.google.com/maps/search/?api=1&query=Iwabuchi%20Internal%20Medicine%20%26%20Urology%20Clinic%20Ojima%203-4-3%2C%20Tower%20Residence%20Nishi-Ojima%202F%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Caps Clinic Nishikasai",
            "address": "Nishikasai 6-24-4, Edogawa-ku, Tokyo",
            "phone": "03-6808-5222",
            "website": "https://caps-clinic.jp/nishikasai",
            "hours": "Mon–Sat 9:00–18:00",
            "note": "Children's clinic. English available.",
            "map": "https://www.google.com/maps/search/?api=1&query=Caps%20Clinic%20Nishikasai%20Nishikasai%206-24-4%2C%20Edogawa-ku%2C%20Tokyo"
          },
          {
            "name": "Saigusa Maternity Clinic",
            "address": "Nishikasai 6-24-8, Edogawa-ku, Tokyo",
            "phone": "03-3689-3281",
            "website": "https://www.saigusa.or.jp/",
            "hours": "Mon–Sat 9:00–18:00",
            "note": "Gynaecology / maternity. English available.",
            "map": "https://www.google.com/maps/search/?api=1&query=Saigusa%20Maternity%20Clinic%20Nishikasai%206-24-8%2C%20Edogawa-ku%2C%20Tokyo"
          },
          {
            "name": "Endo Clinic",
            "address": "Nishi-Kasai 3-19-5, Edogawa-ku, Tokyo",
            "phone": "03-3675-0330",
            "hours": "Mon–Sat 9:00–11:30 & 15:30–17:00",
            "note": "Gastroenterology. English spoken.",
            "map": "https://www.google.com/maps/search/?api=1&query=Endo%20Clinic%20Nishi-Kasai%203-19-5%2C%20Edogawa-ku%2C%20Tokyo"
          },
          {
            "name": "Tokyo Rinkai Hospital",
            "address": "Edagawa 3-4-1, Koto-ku, Tokyo",
            "phone": "03-5605-8811",
            "website": "https://tokyorinkai-hp.jp/",
            "hours": "Mon–Fri 8:30–17:00",
            "note": "Some English-speaking staff.",
            "map": "https://www.google.com/maps/search/?api=1&query=Tokyo%20Rinkai%20Hospital%20Edagawa%203-4-1%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "St. Luke's International Hospital",
            "address": "Akashi-cho 9-1, Chuo-ku, Tokyo",
            "phone": "03-3541-5151",
            "website": "https://hospital.luke.ac.jp/eng/index.html",
            "hours": "24/7 emergency",
            "note": "English available.",
            "map": "https://www.google.com/maps/search/?api=1&query=St.%20Luke%27s%20International%20Hospital%20Akashi-cho%209-1%2C%20Chuo-ku%2C%20Tokyo"
          },
          {
            "name": "Sanno Hospital",
            "address": "Akasaka 8-10-16, Minato-ku, Tokyo",
            "phone": "03-3402-3181",
            "website": "https://www.sannoclc.or.jp/hospital/english/",
            "hours": "Mon–Sat 9:00–17:00",
            "note": "English-speaking staff, all specialties.",
            "map": "https://www.google.com/maps/search/?api=1&query=Sanno%20Hospital%20Akasaka%208-10-16%2C%20Minato-ku%2C%20Tokyo"
          },
          {
            "name": "Yujin Hospital",
            "jp": "友仁病院",
            "address": "Kameido 2-41-1, Koto-ku, Tokyo 136-0071",
            "phone": "03-3683-5661",
            "website": "https://sonodakai.jp/yujin/",
            "hours": "Mon–Fri 8:30–13:00 & 14:00–17:00; Sat 8:30–15:00",
            "note": "General hospital — mid-size general hospital on the Kameido side (internal medicine, surgery, pediatrics, orthopedics, psychosomatic medicine), serving western Ojima/Nishi-Ojima residents.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E5%8F%8B%E4%BB%81%E7%97%85%E9%99%A2%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E4%BA%80%E6%88%B82-41-1"
          },
          {
            "name": "JCHO Tokyo Joto Hospital",
            "jp": "JCHO東京城東病院",
            "address": "Kameido 9-13-1, Koto-ku, Tokyo 136-0071",
            "phone": "03-3685-1431",
            "website": "https://joto.jcho.go.jp/",
            "hours": "Reception Mon–Fri 8:30–11:30; closed Sat, Sun & holidays (same number day & night)",
            "note": "General hospital — public (JCHO) general hospital 8 minutes from Higashi-Ojima station: internal medicine, surgery, orthopedics, rehabilitation and more.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E6%9D%B1%E4%BA%AC%E5%9F%8E%E6%9D%B1%E7%97%85%E9%99%A2%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E4%BA%80%E6%88%B89-13-1"
          }
        ]
      },
      {
        "title": "Dentists",
        "entries": [
          {
            "name": "Ojima Dental Clinic",
            "address": "Ojima 4-8-14, Koto-ku, Tokyo",
            "phone": "03-3683-1182",
            "hours": "Mon–Sat 9:30–19:00",
            "note": "Japanese only.",
            "map": "https://www.google.com/maps/search/?api=1&query=Ojima%20Dental%20Clinic%20Ojima%204-8-14%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Wakaba Dental",
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
            "address": "Ojima 5-10-12, Koto-ku, Tokyo",
            "phone": "03-3685-8911",
            "hours": "Daily 9:00–21:00",
            "note": "Prescription medicines available.",
            "map": "https://www.google.com/maps/search/?api=1&query=Sugi%20Pharmacy%20Ojima%20Ojima%205-10-12%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Matsumoto Kiyoshi Ojima",
            "address": "Ojima 4-8-14, Koto-ku, Tokyo",
            "phone": "03-3683-1193",
            "hours": "Daily 9:00–21:00",
            "map": "https://www.google.com/maps/search/?api=1&query=Matsumoto%20Kiyoshi%20Ojima%20Ojima%204-8-14%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Ojima Drug Store",
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
            "level": "nursery",
            "jp": "大島保育園",
            "address": "Ojima 5-40-4, 1F, Koto-ku, Tokyo",
            "phone": "03-3681-9026",
            "note": "Public nursery (moved here in 2019).",
            "map": "https://www.google.com/maps/search/?api=1&query=%E5%A4%A7%E5%B3%B6%E4%BF%9D%E8%82%B2%E5%9C%92%20Ojima%205-40-4%2C%201F%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Wakaba Nursery (Koto City)",
            "level": "nursery",
            "jp": "江東区わかば保育園",
            "address": "Ojima 9-7-8-101, Koto-ku, Tokyo 136-0072",
            "phone": "03-3682-1461",
            "hours": "7:30–18:30 (extended care to 19:30)",
            "note": "Nursery (public) — Koto City municipal licensed nursery in Ojima 9-chome, near Higashi-Ojima station.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E6%B1%9F%E6%9D%B1%E5%8C%BA%E3%82%8F%E3%81%8B%E3%81%B0%E4%BF%9D%E8%82%B2%E5%9C%92%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B69-7-8"
          },
          {
            "name": "Ojima No.2 Nursery (Koto City)",
            "level": "nursery",
            "jp": "江東区大島第二保育園",
            "address": "Ojima 4-1-6-130, Koto-ku, Tokyo 136-0072",
            "phone": "03-3685-6059",
            "hours": "7:30–18:30 (extended care to 19:30)",
            "note": "Nursery (public) — Koto City municipal licensed nursery inside the Ojima 4-chome housing complex.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B6%E7%AC%AC%E4%BA%8C%E4%BF%9D%E8%82%B2%E5%9C%92%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B64-1-6"
          },
          {
            "name": "Ojima No.5 Nursery (Koto City)",
            "level": "nursery",
            "jp": "江東区大島第五保育園",
            "address": "Ojima 4-21-3-101, Koto-ku, Tokyo 136-0072",
            "phone": "03-3637-0464",
            "hours": "7:30–18:30 (extended care to 20:30)",
            "note": "Nursery (public) — Koto City municipal licensed nursery; longest evening hours of the Ojima public nurseries.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B6%E7%AC%AC%E4%BA%94%E4%BF%9D%E8%82%B2%E5%9C%92%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B64-21-3"
          },
          {
            "name": "Ojima Kindergarten (Koto City)",
            "level": "kindergarten",
            "jp": "江東区立大島幼稚園",
            "address": "Ojima 5-38-1, Koto-ku, Tokyo 136-0072",
            "phone": "03-3684-3396",
            "hours": "9:00–14:15 (Wed 9:00–11:45)",
            "note": "Kindergarten (public) — Koto City municipal kindergarten next to Ojima Elementary School, near Ojima station.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E6%B1%9F%E6%9D%B1%E5%8C%BA%E7%AB%8B%E5%A4%A7%E5%B3%B6%E5%B9%BC%E7%A8%9A%E5%9C%92%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B65-38-1"
          },
          {
            "name": "Wakaba International Nursery — Ojima",
            "level": "nursery",
            "jp": "若葉インターナショナルナーサリー大島園",
            "address": "Sunroad Core 1F, Ojima 6-22-8, Koto-ku, Tokyo 136-0072",
            "phone": "03-5858-6593",
            "note": "Nursery (private, international) — English-oriented international nursery on the Sanroad shopping street in Ojima; a foreigner-friendly option.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E8%8B%A5%E8%91%89%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%8A%E3%82%B7%E3%83%A7%E3%83%8A%E3%83%AB%E3%83%8A%E3%83%BC%E3%82%B5%E3%83%AA%E3%83%BC%E5%A4%A7%E5%B3%B6%E5%9C%92%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B66-22-8"
          },
          {
            "name": "Kagayaki Nursery",
            "level": "nursery",
            "jp": "かがやき保育園",
            "address": "Ojima 7-37-13, Koto-ku, Tokyo 136-0072",
            "phone": "03-5858-9686",
            "note": "Nursery (private) — private licensed nursery in Ojima 7-chome, walking distance from Higashi-Ojima station.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E3%81%8B%E3%81%8C%E3%82%84%E3%81%8D%E4%BF%9D%E8%82%B2%E5%9C%92%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B67-37-13"
          },
          {
            "name": "Ojima Shinsei Kindergarten",
            "level": "kindergarten",
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
            "level": "kindergarten",
            "address": "Hayashi Building 101, Ojima 3-31-3, Koto-ku, Tokyo 136-0072",
            "phone": "03-5858-9171",
            "website": "http://www.newlittlelearning.com/",
            "hours": "Mon–Fri 9:30–15:00",
            "note": "Kindergarten (private) — English-medium preschool & kindergarten in Ojima 3-chome using Montessori materials, for ages 3–6.",
            "map": "https://www.google.com/maps/search/?api=1&query=New%20Little%20Learning%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B63-31-3"
          },
          {
            "name": "No.3 Ojima Kindergarten (Koto City)",
            "level": "kindergarten",
            "jp": "江東区立第三大島幼稚園",
            "address": "Ojima 7-39-2-101, Koto-ku, Tokyo 136-0072",
            "phone": "03-3685-5945",
            "website": "https://3dai-yo.koto.ed.jp/",
            "note": "Kindergarten (public) — Koto City municipal kindergarten in Ojima 7-chome, near Higashi-Ojima station.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E6%B1%9F%E6%9D%B1%E5%8C%BA%E7%AB%8B%E7%AC%AC%E4%B8%89%E5%A4%A7%E5%B3%B6%E5%B9%BC%E7%A8%9A%E5%9C%92%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B67-39-2-101"
          },
          {
            "name": "Kameido Kindergarten",
            "level": "kindergarten",
            "jp": "亀戸幼稚園",
            "address": "Kameido 4-17-3, Koto-ku, Tokyo 136-0071",
            "phone": "03-3681-5866",
            "note": "Kindergarten (private) — private kindergarten in Kameido 4-chome, a short walk from Kameido station.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E4%BA%80%E6%88%B8%E5%B9%BC%E7%A8%9A%E5%9C%92%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E4%BA%80%E6%88%B84-17-3"
          },
          {
            "name": "No.2 Kameido Kindergarten (Koto City)",
            "level": "kindergarten",
            "jp": "江東区立第二亀戸幼稚園",
            "address": "Kameido 6-36-1, Koto-ku, Tokyo 136-0071",
            "phone": "03-3684-1894",
            "note": "Kindergarten (public) — Koto City municipal kindergarten in Kameido 6-chome, inside No.2 Kameido Elementary School.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E6%B1%9F%E6%9D%B1%E5%8C%BA%E7%AB%8B%E7%AC%AC%E4%BA%8C%E4%BA%80%E6%88%B8%E5%B9%BC%E7%A8%9A%E5%9C%92%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E4%BA%80%E6%88%B86-36-1"
          },
          {
            "name": "Kiyoshi Kindergarten",
            "level": "kindergarten",
            "jp": "きよし幼稚園",
            "address": "Higashisuna 3-17-10, Koto-ku, Tokyo 136-0074",
            "phone": "03-3644-6809",
            "note": "Kindergarten (private) — private kindergarten in Higashisuna 3-chome, on the Higashi-Ojima station side.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E3%81%8D%E3%82%88%E3%81%97%E5%B9%BC%E7%A8%9A%E5%9C%92%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E6%9D%B1%E7%A0%823-17-10"
          },
          {
            "name": "Koto Megumi Kindergarten",
            "level": "kindergarten",
            "jp": "江東めぐみ幼稚園",
            "address": "Higashisuna 2-11-3, Koto-ku, Tokyo 136-0074",
            "phone": "03-3646-2666",
            "note": "Kindergarten (private) — private kindergarten in Higashisuna 2-chome, on the Higashi-Ojima station side.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E6%B1%9F%E6%9D%B1%E3%82%81%E3%81%90%E3%81%BF%E5%B9%BC%E7%A8%9A%E5%9C%92%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E6%9D%B1%E7%A0%822-11-3"
          },
          {
            "name": "Ojima Elementary School",
            "level": "elementary",
            "jp": "大島小学校",
            "address": "Ojima 4-1-8, Koto-ku, Tokyo",
            "phone": "03-3681-8291",
            "website": "https://www.koto.ed.jp/ojima-sho/",
            "note": "Public elementary school.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E5%A4%A7%E5%B3%B6%E5%B0%8F%E5%AD%A6%E6%A0%A1%20Ojima%204-1-8%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "No.1 Ojima Elementary School",
            "level": "elementary",
            "jp": "江東区立第一大島小学校",
            "address": "Ojima 2-41-4, Koto-ku, Tokyo 136-0072",
            "phone": "03-3684-4312",
            "note": "Elementary school (public) — Koto City school serving Ojima 1–2 chome, 2 minutes from Nishi-Ojima station.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E6%B1%9F%E6%9D%B1%E5%8C%BA%E7%AB%8B%E7%AC%AC%E4%B8%80%E5%A4%A7%E5%B3%B6%E5%B0%8F%E5%AD%A6%E6%A0%A1%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B62-41-4"
          },
          {
            "name": "No.2 Ojima Elementary School",
            "level": "elementary",
            "jp": "江東区立第二大島小学校",
            "address": "Ojima 3-16-2, Koto-ku, Tokyo 136-0072",
            "phone": "03-3684-4315",
            "website": "https://2dai-sho.koto.ed.jp/",
            "note": "Elementary school (public) — Koto City school serving Ojima 3-chome and part of 6-chome.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E6%B1%9F%E6%9D%B1%E5%8C%BA%E7%AB%8B%E7%AC%AC%E4%BA%8C%E5%A4%A7%E5%B3%B6%E5%B0%8F%E5%AD%A6%E6%A0%A1%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B63-16-2"
          },
          {
            "name": "No.3 Ojima Elementary School",
            "level": "elementary",
            "jp": "江東区立第三大島小学校",
            "address": "Ojima 9-5-3, Koto-ku, Tokyo 136-0072",
            "phone": "03-3681-9204",
            "website": "http://3dai-sho.koto.ed.jp/",
            "note": "Elementary school (public) — Koto City school serving Ojima 7-chome and 9-chome (4–10 ban), near Higashi-Ojima station.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E6%B1%9F%E6%9D%B1%E5%8C%BA%E7%AB%8B%E7%AC%AC%E4%B8%89%E5%A4%A7%E5%B3%B6%E5%B0%8F%E5%AD%A6%E6%A0%A1%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B69-5-3"
          },
          {
            "name": "No.4 Ojima Elementary School",
            "level": "elementary",
            "jp": "江東区立第四大島小学校",
            "address": "Ojima 6-7-8, Koto-ku, Tokyo 136-0072",
            "phone": "03-3681-9935",
            "website": "https://4dai-sho.koto.ed.jp/",
            "note": "Elementary school (public) — Koto City school serving part of Ojima 5-chome and Ojima 6-chome, 2 minutes from Ojima station.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E6%B1%9F%E6%9D%B1%E5%8C%BA%E7%AB%8B%E7%AC%AC%E5%9B%9B%E5%A4%A7%E5%B3%B6%E5%B0%8F%E5%AD%A6%E6%A0%A1%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B66-7-8"
          },
          {
            "name": "No.5 Ojima Elementary School",
            "level": "elementary",
            "jp": "江東区立第五大島小学校",
            "address": "Ojima 8-40-13, Koto-ku, Tokyo 136-0072",
            "phone": "03-3681-5011",
            "website": "http://5dai-sho.koto.ed.jp/",
            "note": "Elementary school (public) — Koto City school serving Ojima 8-chome and 9-chome (1–3 ban).",
            "map": "https://www.google.com/maps/search/?api=1&query=%E6%B1%9F%E6%9D%B1%E5%8C%BA%E7%AB%8B%E7%AC%AC%E4%BA%94%E5%A4%A7%E5%B3%B6%E5%B0%8F%E5%AD%A6%E6%A0%A1%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B68-40-13"
          },
          {
            "name": "Ojima Nan'o Elementary School",
            "level": "elementary",
            "jp": "江東区立大島南央小学校",
            "address": "Ojima 4-18-5, Koto-ku, Tokyo 136-0072",
            "phone": "03-3636-2116",
            "note": "Elementary school (public) — Koto City school serving Ojima 4-chome and part of 5-chome, near Ojima station.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E6%B1%9F%E6%9D%B1%E5%8C%BA%E7%AB%8B%E5%A4%A7%E5%B3%B6%E5%8D%97%E5%A4%AE%E5%B0%8F%E5%AD%A6%E6%A0%A1%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B64-18-5"
          },
          {
            "name": "Ojima Junior High School",
            "level": "junior-high",
            "jp": "江東区立大島中学校",
            "address": "Ojima 8-12-22, Koto-ku, Tokyo 136-0072",
            "phone": "03-3684-4321",
            "website": "http://ohjima-chu.koto.ed.jp",
            "note": "Junior high school (public) — Koto City junior high serving Ojima 7–9 chome.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E6%B1%9F%E6%9D%B1%E5%8C%BA%E7%AB%8B%E5%A4%A7%E5%B3%B6%E4%B8%AD%E5%AD%A6%E6%A0%A1%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B68-12-22"
          },
          {
            "name": "No.2 Ojima Junior High School",
            "level": "junior-high",
            "jp": "江東区立第二大島中学校",
            "address": "Ojima 3-27-18, Koto-ku, Tokyo 136-0072",
            "phone": "03-3685-1681",
            "website": "http://2dai-chu.koto.ed.jp",
            "note": "Junior high school (public) — Koto City junior high serving Ojima 3-chome and 6-chome.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E6%B1%9F%E6%9D%B1%E5%8C%BA%E7%AB%8B%E7%AC%AC%E4%BA%8C%E5%A4%A7%E5%B3%B6%E4%B8%AD%E5%AD%A6%E6%A0%A1%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B63-27-18"
          },
          {
            "name": "Ojima Nishi Junior High School",
            "level": "junior-high",
            "jp": "江東区立大島西中学校",
            "address": "Ojima 4-1-23, Koto-ku, Tokyo 136-0072",
            "phone": "03-3636-4591",
            "note": "Junior high school (public) — Koto City junior high serving Ojima 1, 2, 4 and 5 chome (western Ojima).",
            "map": "https://www.google.com/maps/search/?api=1&query=%E6%B1%9F%E6%9D%B1%E5%8C%BA%E7%AB%8B%E5%A4%A7%E5%B3%B6%E8%A5%BF%E4%B8%AD%E5%AD%A6%E6%A0%A1%20%E6%B1%9F%E6%9D%B1%E5%8C%BA%E5%A4%A7%E5%B3%B64-1-23"
          },
          {
            "name": "India International School in Japan (IISJ) — Ojima campus",
            "level": "international",
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
            "level": "international",
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
            "level": "international",
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
            "level": "international",
            "jp": "メイワキッズ",
            "address": "Kameido 6-6-9 (Sun Height 101), Koto-ku, Tokyo",
            "phone": "070-9226-3952",
            "note": "International preschool & afterschool in Kameido (private) — English immersion plus Japanese language lessons and holiday schools, for ages roughly 3–12; walking distance from Kameido and Ojima stations.",
            "map": "https://www.google.com/maps/search/?api=1&query=MeiWa%20Kids%20Kameido%206-6-9%2C%20Koto-ku%2C%20Tokyo"
          }
        ]
      },
      {
        "title": "Restaurants",
        "entries": [
          {
            "name": "Maharani Indian Restaurant",
            "jp": "マハラニ",
            "address": "Ojima 3-15-29, Koto-ku, Tokyo",
            "phone": "03-5875-1564",
            "website": "http://www.maharaniojima.jp/",
            "note": "South Indian restaurant near Nishi-Ojima station — dosa, meals (thali) and biryani; plenty of vegetarian dishes, and an Indian snack shop next door.",
            "map": "https://www.google.com/maps/search/?api=1&query=Maharani%20Indian%20Restaurant%20Ojima%203-15-29%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Veg Kitchen",
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
            "jp": "ナマステヒマール大島店",
            "address": "Ojima 4-2-5, Koto-ku, Tokyo",
            "phone": "03-6909-8252",
            "hours": "11:00–23:00",
            "note": "Indian & Nepali restaurant in Ojima — curry and naan sets served all day; vegetarian dishes available.",
            "map": "https://www.google.com/maps/search/?api=1&query=Namaste%20Himal%20Ojima%204-2-5%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Bombay Cafe Ojima",
            "address": "Ojima 4-8-13, Koto-ku, Tokyo",
            "phone": "03-6681-7711",
            "hours": "Mon–Thu 11:00–15:00 & 17:00–22:30; Fri–Sun 11:00–22:30",
            "note": "Indian restaurant in Ojima — curry, naan and tandoori; vegetarian dishes available.",
            "map": "https://www.google.com/maps/search/?api=1&query=Bombay%20Cafe%20Ojima%204-8-13%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Tandoor Bar Kamal",
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
            "jp": "スパイスマジック カルカッタ本店",
            "address": "Nishikasai 3-13-3, Edogawa-ku, Tokyo",
            "phone": "03-5567-3885",
            "hours": "11:00–14:30 & 17:00–22:00",
            "note": "One of Nishikasai's oldest Indian restaurants — North Indian home-style cooking (the south-exit branch serves South Indian food); vegetarian dishes available.",
            "map": "https://www.google.com/maps/search/?api=1&query=Spice%20Magic%20Calcutta%20Nishikasai%203-13-3%2C%20Edogawa-ku%2C%20Tokyo"
          },
          {
            "name": "OH BHAIYA!",
            "jp": "オー バイヤ",
            "address": "Nishikasai 3-22-6, 1F, Edogawa-ku, Tokyo",
            "phone": "03-5878-1896",
            "website": "https://ohbhaiya.jp/",
            "hours": "11:30–15:00 & 17:00–22:00 (Sat & Sun 11:30–22:00; closed Tue)",
            "note": "Indian street-food restaurant in Nishikasai — chaat, chole bhature, dosa and Indo-Chinese; many vegetarian choices.",
            "map": "https://www.google.com/maps/search/?api=1&query=OH%20BHAIYA%21%20Nishikasai%203-22-6%2C%20Edogawa-ku%2C%20Tokyo"
          },
          {
            "name": "Tokyo Mithai Wala",
            "jp": "東京ミタイワラ",
            "address": "Nishikasai 6-8-5, Edogawa-ku, Tokyo",
            "phone": "03-6808-0777",
            "website": "https://tokyomithaiwala.jp/",
            "note": "Indian sweets & snacks in Nishikasai — mithai, chaat and light meals to eat in or take away.",
            "map": "https://www.google.com/maps/search/?api=1&query=Tokyo%20Mithai%20Wala%20Nishikasai%206-8-5%2C%20Edogawa-ku%2C%20Tokyo"
          }
        ]
      },
      {
        "title": "Groceries & Indian stores",
        "entries": [
          {
            "name": "Sharma's Groceries",
            "address": "Ojima 6-8-16, 1F, Koto-ku, Tokyo",
            "phone": "070-1576-7259",
            "website": "http://www.indojin.com/",
            "hours": "10:00–13:00 & 14:00–20:00 (closed Mon)",
            "note": "Indian grocery in Ojima (the indojin.com / Apna Bazar shop) — spices, atta, rice, dals and ready-to-eat foods; also delivers Japan-wide by online order.",
            "map": "https://www.google.com/maps/search/?api=1&query=Sharma%27s%20Groceries%20Ojima%206-8-16%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Ganesh Mart",
            "address": "Ojima 5-45-2, Koto-ku, Tokyo",
            "phone": "080-7412-1101",
            "website": "https://ganeshmart.jp/",
            "hours": "10:00–20:00",
            "note": "Indian grocery store in Ojima — spices, rice, snacks, frozen foods and puja items.",
            "map": "https://www.google.com/maps/search/?api=1&query=Ganesh%20Mart%20Ojima%205-45-2%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Bombay Bazaar",
            "address": "Ojima 6-12-11, Koto-ku, Tokyo",
            "phone": "03-5858-9595",
            "website": "https://www.facebook.com/bbojima/",
            "hours": "10:00–22:00",
            "note": "Indian grocery in Ojima — spices plus fresh Indian vegetables and fruit imported from India.",
            "map": "https://www.google.com/maps/search/?api=1&query=Bombay%20Bazaar%20Ojima%206-12-11%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Bazar Maharani",
            "address": "Ojima 3-15-29, Koto-ku, Tokyo",
            "phone": "090-1798-1786",
            "website": "http://www.maharaniojima.com/",
            "hours": "9:00–22:00",
            "note": "Indian food shop next to Maharani in Ojima — snacks, spices and sweets that are hard to find elsewhere in Tokyo.",
            "map": "https://www.google.com/maps/search/?api=1&query=Bazar%20Maharani%20Ojima%203-15-29%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Spice Route",
            "address": "Komatsugawa 1-5-2, Edogawa-ku, Tokyo",
            "phone": "070-8994-4359",
            "hours": "10:00–20:30",
            "note": "Indian grocery in Komatsugawa, about 1 minute from Higashi-Ojima station — spices, rice and Indian staples.",
            "map": "https://www.google.com/maps/search/?api=1&query=Spice%20Route%20Komatsugawa%201-5-2%2C%20Edogawa-ku%2C%20Tokyo"
          },
          {
            "name": "Desi Mart",
            "jp": "デシマート",
            "address": "Nishikasai 3-13-5, Edogawa-ku, Tokyo",
            "note": "Indian mini-supermarket in Nishikasai (opened 2023) — Indian vegetables, rice, drinks and snacks imported from India.",
            "map": "https://www.google.com/maps/search/?api=1&query=Desi%20Mart%20Nishikasai%203-13-5%2C%20Edogawa-ku%2C%20Tokyo"
          }
        ]
      },
      {
        "title": "Post office, ward office & official help",
        "entries": [
          {
            "name": "Ojima Post Office",
            "jp": "大島郵便局",
            "address": "Ojima 4-6-8, Koto-ku, Tokyo",
            "phone": "03-3685-5338",
            "website": "https://map.japanpost.jp/p/search/dtl/300101212000/",
            "note": "Mail, parcels and a Japan Post Bank ATM.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E5%A4%A7%E5%B3%B6%E9%83%B5%E4%BE%BF%E5%B1%80%20Ojima%204-6-8%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Koto City Ojima Branch Office",
            "address": "Ojima 4-5-6, Koto-ku, Tokyo",
            "phone": "03-3682-1211",
            "note": "Residence paperwork and administrative services.",
            "map": "https://www.google.com/maps/search/?api=1&query=Koto%20City%20Ojima%20Branch%20Office%20Ojima%204-5-6%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Edogawa City Office",
            "address": "Central 4-1, Edogawa-ku, Tokyo",
            "phone": "03-3652-1151",
            "hours": "Mon–Fri 8:30–17:00",
            "note": "City office for the Nishikasai side.",
            "map": "https://www.google.com/maps/search/?api=1&query=Edogawa%20City%20Office%20Central%204-1%2C%20Edogawa-ku%2C%20Tokyo"
          },
          {
            "name": "Koto-ku Multicultural Center",
            "address": "Toyo 2-2-17, Koto-ku, Tokyo",
            "phone": "03-5602-9628",
            "note": "Japanese/English support for foreign residents.",
            "map": "https://www.google.com/maps/search/?api=1&query=Koto-ku%20Multicultural%20Center%20Toyo%202-2-17%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Tokyo Public Law Office (Koto branch)",
            "address": "Toyo 2-7-7, Koto-ku, Tokyo",
            "phone": "03-5632-6150",
            "website": "https://www.t-pblo.jp/office/koto/",
            "note": "Legal consultation; English available.",
            "map": "https://www.google.com/maps/search/?api=1&query=Tokyo%20Public%20Law%20Office%20%28Koto%20branch%29%20Toyo%202-7-7%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Koto Navi — Koto City official app",
            "note": "City information, alerts and events on your phone."
          },
          {
            "name": "Koto-ku Welfare Center",
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
            "address": "Ojima 2-8-2, Koto-ku, Tokyo",
            "phone": "0570-002211",
            "hours": "Mon–Sat 9:00–19:00",
            "note": "Also for gas emergencies.",
            "map": "https://www.google.com/maps/search/?api=1&query=Tokyo%20Gas%20Customer%20Center%20Ojima%202-8-2%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "TEPCO (electricity)",
            "phone": "0120-995-113",
            "hours": "Mon–Sat 9:00–17:00",
            "note": "Electricity supply."
          },
          {
            "name": "Tokyo Waterworks",
            "phone": "03-5326-1101",
            "hours": "Mon–Fri 8:30–17:00",
            "note": "Water supply."
          },
          {
            "name": "Koto-ku Waste Management",
            "address": "Ojima 2-9-1, Koto-ku, Tokyo",
            "phone": "03-3647-9191",
            "website": "https://www.city.koto.lg.jp/kurashi/gomi/",
            "note": "Garbage separation rules and the collection calendar.",
            "map": "https://www.google.com/maps/search/?api=1&query=Koto-ku%20Waste%20Management%20Ojima%202-9-1%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Koto-ku Disaster Prevention Center",
            "address": "Ojima 2-9-1, Koto-ku, Tokyo",
            "phone": "03-3647-8811",
            "website": "https://www.city.koto.lg.jp/kurashi/bosai/",
            "note": "Disaster information and alerts.",
            "map": "https://www.google.com/maps/search/?api=1&query=Koto-ku%20Disaster%20Prevention%20Center%20Ojima%202-9-1%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Docomo Shop Ojima",
            "address": "Ojima 4-3-4, Koto-ku, Tokyo",
            "phone": "03-5609-0111",
            "website": "https://www.nttdocomo.co.jp/",
            "note": "Phones, SIM cards, support.",
            "map": "https://www.google.com/maps/search/?api=1&query=Docomo%20Shop%20Ojima%20Ojima%204-3-4%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "PC Support Ojima",
            "address": "Ojima 6-10-8, Koto-ku, Tokyo",
            "phone": "03-3681-8899",
            "hours": "Mon–Fri 10:00–18:00",
            "note": "Home visits possible.",
            "map": "https://www.google.com/maps/search/?api=1&query=PC%20Support%20Ojima%20Ojima%206-10-8%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Koto-ku Plumbing Cooperative",
            "address": "Ojima 6-11-2, Koto-ku, Tokyo",
            "phone": "03-3681-1171",
            "note": "Water leaks and plumbing.",
            "map": "https://www.google.com/maps/search/?api=1&query=Koto-ku%20Plumbing%20Cooperative%20Ojima%206-11-2%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Key Station Ojima (locksmith)",
            "address": "Ojima 4-9-9, Koto-ku, Tokyo",
            "phone": "03-3682-6949",
            "note": "Emergency lock opening.",
            "map": "https://www.google.com/maps/search/?api=1&query=Key%20Station%20Ojima%20%28locksmith%29%20Ojima%204-9-9%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Ojima Laundry",
            "address": "Ojima 5-11-6, Koto-ku, Tokyo",
            "phone": "03-3682-3205",
            "note": "Coin laundry & dry cleaning.",
            "map": "https://www.google.com/maps/search/?api=1&query=Ojima%20Laundry%20Ojima%205-11-6%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Yamada Denki, Kameido",
            "address": "Kameido 2-11-1, Koto-ku, Tokyo",
            "phone": "03-5628-5811",
            "hours": "10:00–20:00",
            "note": "Electronics sales and repairs.",
            "map": "https://www.google.com/maps/search/?api=1&query=Yamada%20Denki%2C%20Kameido%20Kameido%202-11-1%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Hard Off, Kameido",
            "address": "Kameido 1-44-8, Koto-ku, Tokyo",
            "phone": "03-5628-0511",
            "website": "https://www.hardoff.co.jp/",
            "note": "Second-hand goods, electronics and furniture.",
            "map": "https://www.google.com/maps/search/?api=1&query=Hard%20Off%2C%20Kameido%20Kameido%201-44-8%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Art Moving Center (Ojima)",
            "address": "Ojima 3-10-11, Koto-ku, Tokyo",
            "phone": "0120-0123-33",
            "website": "https://www.the0123.com/",
            "note": "English support possible.",
            "map": "https://www.google.com/maps/search/?api=1&query=Art%20Moving%20Center%20%28Ojima%29%20Ojima%203-10-11%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Fukuhara Moving",
            "website": "https://fukuhara-move.com/eng/",
            "note": "English support available."
          },
          {
            "name": "Times Parking Ojima 5-chome",
            "address": "Ojima 5-10-11, Koto-ku, Tokyo",
            "phone": "0120-77-8924",
            "website": "https://times-info.net/",
            "note": "Paid parking.",
            "map": "https://www.google.com/maps/search/?api=1&query=Times%20Parking%20Ojima%205-chome%20Ojima%205-10-11%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Tokyo MK Taxi",
            "phone": "03-5547-5551",
            "website": "https://www.tokyomk.com/",
            "note": "English available."
          },
          {
            "name": "AC servicing — Tamano San",
            "phone": "090-4085-5689",
            "note": "Community contact from the Ojima directory."
          },
          {
            "name": "AC servicing — Chris",
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
            "jp": "大島小松川公園",
            "address": "Ojima 9-3, Koto-ku, Tokyo",
            "phone": "03-3636-9365",
            "note": "The big riverside park — the neighbourhood's green heart.",
            "map": "https://www.google.com/maps/search/?api=1&query=%E5%A4%A7%E5%B3%B6%E5%B0%8F%E6%9D%BE%E5%B7%9D%E5%85%AC%E5%9C%92%20Ojima%209-3%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Ojima Library",
            "jp": "大島図書館",
            "address": "Ojima 4-5-6, Koto-ku, Tokyo",
            "phone": "03-3683-6841",
            "website": "https://www.koto-lib.tokyo.jp/",
            "map": "https://www.google.com/maps/search/?api=1&query=%E5%A4%A7%E5%B3%B6%E5%9B%B3%E6%9B%B8%E9%A4%A8%20Ojima%204-5-6%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Ojima Kominkan (community center)",
            "address": "Ojima 4-5-10, Koto-ku, Tokyo",
            "phone": "03-3683-7331",
            "website": "https://www.city.koto.lg.jp/kurashi/kominkan/ojima/",
            "note": "Multipurpose community space.",
            "map": "https://www.google.com/maps/search/?api=1&query=Ojima%20Kominkan%20%28community%20center%29%20Ojima%204-5-10%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Ojima Hachiman Shrine",
            "address": "Ojima 6-7-14, Koto-ku, Tokyo",
            "phone": "03-3681-2595",
            "map": "https://www.google.com/maps/search/?api=1&query=Ojima%20Hachiman%20Shrine%20Ojima%206-7-14%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Koto-ku Tourism Association",
            "address": "Ojima 4-5-18, Koto-ku, Tokyo",
            "phone": "03-3647-4961",
            "website": "https://koto-kanko.jp/",
            "note": "Local events and festivals.",
            "map": "https://www.google.com/maps/search/?api=1&query=Koto-ku%20Tourism%20Association%20Ojima%204-5-18%2C%20Koto-ku%2C%20Tokyo"
          },
          {
            "name": "Tipness Kameido (gym)",
            "address": "Kameido 2-27-7, Koto-ku, Tokyo",
            "phone": "03-5628-3531",
            "website": "https://tip.tipness.co.jp/shop_info/SHP017/",
            "note": "Large fitness center near Ojima.",
            "map": "https://www.google.com/maps/search/?api=1&query=Tipness%20Kameido%20%28gym%29%20Kameido%202-27-7%2C%20Koto-ku%2C%20Tokyo"
          }
        ]
      }
    ]
  }
};
