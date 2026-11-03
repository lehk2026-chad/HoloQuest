/**
 * HOLOQUEST - Master Talent Database & Path Generator
 */

// Generates paths matching official Hololive asset naming:
// "Airani Iofifteen" -> "images/Airani-Iofifteen_pr-img_01.png"
function getTalentImagePath(talentName) {
  const formattedName = talentName
    .trim()
    .split(/\s+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('-');

  return `images/${formattedName}_pr-img_01.png`;
}
const talents = [
  // ==========================================
  // HOLOLIVE JP (Japan)
  // ==========================================
  // Generation 0
  { name: "Tokino Sora", branch: "JP", generation: "0th Gen", species: "Human", gender: "Female", debutYear: 2017, oshiMark: "🐻", status: "Active" },
  { name: "Roboco", branch: "JP", generation: "0th Gen", species: "Cyborg", gender: "Female", debutYear: 2018, oshiMark: "🤖", status: "Active" },
  { name: "Sakura Miko", branch: "JP", generation: "0th Gen", species: "Human", gender: "Female", debutYear: 2018, oshiMark: "🌸", status: "Active" },
  { name: "Hoshimachi Suisei", branch: "JP", generation: "0th Gen", species: "Human", gender: "Female", debutYear: 2018, oshiMark: "☄️", status: "Active" },
  { name: "AZKi", branch: "JP", generation: "0th Gen", species: "Human", gender: "Female", debutYear: 2018, oshiMark: "⚒️", status: "Active" },

  // Generation 1
  { name: "Yozora Mel", branch: "JP", generation: "1st Gen", species: "Mythological Being", gender: "Female", debutYear: 2018, oshiMark: "🌟", status: "Terminated" },
  { name: "Shirakami Fubuki", branch: "JP", generation: "1st Gen", species: "Demi-Human", gender: "Female", debutYear: 2018, oshiMark: "🌽", status: "Active" },
  { name: "Natsuiro Matsuri", branch: "JP", generation: "1st Gen", species: "Human", gender: "Female", debutYear: 2018, oshiMark: "🏮", status: "Active" },
  { name: "Aki Rosenthal", branch: "JP", generation: "1st Gen", species: "Interdimensional Being", gender: "Female", debutYear: 2018, oshiMark: "🍎", status: "Active" },
  { name: "Akai Haato", branch: "JP", generation: "1st Gen", species: "Human", gender: "Female", debutYear: 2018, oshiMark: "❤️‍🔥", status: "Active" },
  { name: "Hitomi Chris", branch: "JP", generation: "1st Gen", species: "Human", gender: "Female", debutYear: 2018, oshiMark: "🌰", status: "Terminated" },

  // Generation 2
  { name: "Minato Aqua", branch: "JP", generation: "2nd Gen", species: "Human", gender: "Female", debutYear: 2018, oshiMark: "⚓", status: "Graduated" },
  { name: "Murasaki Shion", branch: "JP", generation: "2nd Gen", species: "Sorceress", gender: "Female", debutYear: 2018, oshiMark: "🌙", status: "Active" },
  { name: "Nakiri Ayame", branch: "JP", generation: "2nd Gen", species: "Mythological Being", gender: "Female", debutYear: 2018, oshiMark: "😈", status: "Active" },
  { name: "Yuzuki Choco", branch: "JP", generation: "2nd Gen", species: "Mythological Being", gender: "Female", debutYear: 2018, oshiMark: "💋", status: "Active" },
  { name: "Oozora Subaru", branch: "JP", generation: "2nd Gen", species: "Human", gender: "Female", debutYear: 2018, oshiMark: "🚑", status: "Active" },

  // Hololive Gamers
  { name: "Ookami Mio", branch: "JP", generation: "Gamers", species: "Demi-Human", gender: "Female", debutYear: 2018, oshiMark: "🌲", status: "Active" },
  { name: "Nekomata Okayu", branch: "JP", generation: "Gamers", species: "Demi-Human", gender: "Female", debutYear: 2019, oshiMark: "🍙", status: "Active" },
  { name: "Inugami Korone", branch: "JP", generation: "Gamers", species: "Demi-Human", gender: "Female", debutYear: 2019, oshiMark: "🥐", status: "Active" },

  // Generation 3 (Fantasy)
  { name: "Usada Pekora", branch: "JP", generation: "3rd Gen", species: "Demi-Human", gender: "Female", debutYear: 2019, oshiMark: "👯", status: "Active" },
  { name: "Uruha Rushia", branch: "JP", generation: "3rd Gen", species: "Sorceress", gender: "Female", debutYear: 2019, oshiMark: "🦋", status: "Terminated" },
  { name: "Shiranui Flare", branch: "JP", generation: "3rd Gen", species: "Mythological Being, Human", gender: "Female", debutYear: 2019, oshiMark: "🔥", status: "Active" },
  { name: "Shirogane Noel", branch: "JP", generation: "3rd Gen", species: "Human", gender: "Female", debutYear: 2019, oshiMark: "⚔️", status: "Active" },
  { name: "Houshou Marine", branch: "JP", generation: "3rd Gen", species: "Human", gender: "Female", debutYear: 2019, oshiMark: "🏴‍☠️", status: "Active" },

  // Generation 4 (HoloForce)
  { name: "Amane Kanata", branch: "JP", generation: "4th Gen", species: "Angel", gender: "Mythological Being", debutYear: 2019, oshiMark: "💫", status: "Active" },
  { name: "Kiryu Coco", branch: "JP", generation: "4th Gen", species: "Mythological Being, Interdimensional Being", gender: "Female", debutYear: 2019, oshiMark: "🐉", status: "Graduated" },
  { name: "Tsunomaki Watame", branch: "JP", generation: "4th Gen", species: "Demi-Human", gender: "Female", debutYear: 2019, oshiMark: "🐏", status: "Active" },
  { name: "Tokoyami Towa", branch: "JP", generation: "4th Gen", species: "Mythological Being", gender: "Female", debutYear: 2020, oshiMark: "👾", status: "Active" },
  { name: "Himemori Luna", branch: "JP", generation: "4th Gen", species: "Human", gender: "Female", debutYear: 2020, oshiMark: "🍬", status: "Active" },

  // Generation 5 (NePolabo)
  { name: "Yukihana Lamy", branch: "JP", generation: "5th Gen", species: "Mythological Being, Human", gender: "Female", debutYear: 2020, oshiMark: "☃️", status: "Active" },
  { name: "Momosuzu Nene", branch: "JP", generation: "5th Gen", species: "Interdimensional Being", gender: "Female", debutYear: 2020, oshiMark: "🍑🥟", status: "Active" },
  { name: "Shishiro Botan", branch: "JP", generation: "5th Gen", species: "Demi-Human", gender: "Female", debutYear: 2020, oshiMark: "♌", status: "Active" },
  { name: "Omaru Polka", branch: "JP", generation: "5th Gen", species: "Demi-Human", gender: "Female", debutYear: 2020, oshiMark: "🎪", status: "Active" },
  { name: "Mano Aloe", branch: "JP", generation: "5th Gen", species: "Mythological Being", gender: "Female", debutYear: 2020, oshiMark: "👅", status: "Graduated" },

  // Generation 6 (HoloX)
  { name: "La+ Darknesss", branch: "JP", generation: "HoloX", species: "Mythological Being", gender: "Female", debutYear: 2021, oshiMark: "🛸💜", status: "Active" },
  { name: "Takane Lui", branch: "JP", generation: "HoloX", species: "Demi-Human", gender: "Female", debutYear: 2021, oshiMark: "🥀", status: "Active" },
  { name: "Hakui Koyori", branch: "JP", generation: "HoloX", species: "Demi-Human", gender: "Female", debutYear: 2021, oshiMark: "🧪", status: "Active" },
  { name: "Sakamata Chloe", branch: "JP", generation: "HoloX", species: "Demi-Human", gender: "Female", debutYear: 2021, oshiMark: "🎣", status: "Affiliate" },
  { name: "Kazama Iroha", branch: "JP", generation: "HoloX", species: "Human", gender: "Female", debutYear: 2021, oshiMark: "🍃", status: "Active" },

  // DEV_IS / ReGLOSS
  { name: "Hiodoshi Ao", branch: "JP", generation: "ReGLOSS", species: "Human", gender: "Female", debutYear: 2023, oshiMark: "🖋️", status: "Active" },
  { name: "Otonose Kanade", branch: "JP", generation: "ReGLOSS", species: "Human", gender: "Female", debutYear: 2023, oshiMark: "🎹✨", status: "Active" },
  { name: "Ichijou Ririka", branch: "JP", generation: "ReGLOSS", species: "Human", gender: "Female", debutYear: 2023, oshiMark: "🌃", status: "Active" },
  { name: "Juufuutei Raden", branch: "JP", generation: "ReGLOSS", species: "Human", gender: "Female", debutYear: 2023, oshiMark: "🐚", status: "Active" },
  { name: "Todoroki Hajime", branch: "JP", generation: "ReGLOSS", species: "Human", gender: "Female", debutYear: 2023, oshiMark: "🐧⚡", status: "Active" },

  // DEV_IS / FLOW GLOW
  { name: "Isaki Riona", branch: "JP", generation: "FLOW GLOW", species: "Human", gender: "Female", debutYear: 2024, oshiMark: "🎤👑", status: "Active" },
  { name: "Mizumiya Su", branch: "JP", generation: "FLOW GLOW", species: "Human", gender: "Female", debutYear: 2024, oshiMark: "💬🔁💙", status: "Active" },
  { name: "Koganei Niko", branch: "JP", generation: "FLOW GLOW", species: "Human", gender: "Female", debutYear: 2024, oshiMark: "☺️🐅", status: "Active" },
  { name: "Rindo Chihaya", branch: "JP", generation: "FLOW GLOW", species: "Human", gender: "Female", debutYear: 2024, oshiMark: "🎧🔧", status: "Active" },
  { name: "Kikirara Vivi", branch: "JP", generation: "FLOW GLOW", species: "Human", gender: "Female", debutYear: 2024, oshiMark: "💅✨", status: "Active" },

  // ASOBI★MAWARI-TAI!
  { name: "Achichi Mela", branch: "JP", generation: "ASOBI★MAWARI-TAI!", species: "Demi-Human", gender: "Female", debutYear: 2026, oshiMark: "🧯", status: "Active" },
  { name: "Sorashina Sopia", branch: "JP", generation: "ASOBI★MAWARI-TAI!", species: "Human", gender: "Female", debutYear: 2026, oshiMark: "📡", status: "Active" },
  { name: "Suzuna Tsuzuri", branch: "JP", generation: "ASOBI★MAWARI-TAI!", species: "Demi-Human", gender: "Female", debutYear: 2026, oshiMark: "🐐💌", status: "Active" },
  { name: "Hyakuto Kyoko", branch: "JP", generation: "ASOBI★MAWARI-TAI!", species: "Human", gender: "Female", debutYear: 2026, oshiMark: "👮📢", status: "Active" },

  // ==========================================
  // HOLOLIVE ID (Indonesia)
  // ==========================================
  // ID 1st Gen (Area 15)
  { name: "Ayunda Risu", branch: "ID", generation: "ID 1st Gen", species: "Demi-Human", gender: "Female", debutYear: 2020, oshiMark: "🐿️", status: "Active" },
  { name: "Moona Hoshinova", branch: "ID", generation: "ID 1st Gen", species: "Human", gender: "Female", debutYear: 2020, oshiMark: "🔮", status: "Active" },
  { name: "Airani Iofifteen", branch: "ID", generation: "ID 1st Gen", species: "Interdimensional Being", gender: "Female", debutYear: 2020, oshiMark: "🎨", status: "Active" },

  // ID 2nd Gen (holoro)
  { name: "Kureiji Ollie", branch: "ID", generation: "ID 2nd Gen", species: "Mythological Being", gender: "Female", debutYear: 2020, oshiMark: "🧟‍♀️", status: "Active" },
  { name: "Anya Melfissa", branch: "ID", generation: "ID 2nd Gen", species: "Mythological Being", gender: "Female", debutYear: 2020, oshiMark: "🍂", status: "Active" },
  { name: "Pavolia Reine", branch: "ID", generation: "ID 2nd Gen", species: "Interdimensional Being, Sorceress, Demi-Human", gender: "Female", debutYear: 2020, oshiMark: "🦚", status: "Active" },

  // ID 3rd Gen (holohero)
  { name: "Vestia Zeta", branch: "ID", generation: "ID 3rd Gen", species: "Human", gender: "Female", debutYear: 2022, oshiMark: "📜", status: "Active" },
  { name: "Kaela Kovalskia", branch: "ID", generation: "ID 3rd Gen", species: "Human", gender: "Female", debutYear: 2022, oshiMark: "🔨", status: "Active" },
  { name: "Kobo Kanaeru", branch: "ID", generation: "ID 3rd Gen", species: "Human", gender: "Female", debutYear: 2022, oshiMark: "☔", status: "Active" },


  // ==========================================
  // HOLOLIVE EN (English)
  // ==========================================
  // EN -Myth-
  { name: "Mori Calliope", branch: "EN", generation: "Myth", species: "Mythological Being", gender: "Female", debutYear: 2020, oshiMark: "💀", status: "Active" },
  { name: "Takanashi Kiara", branch: "EN", generation: "Myth", species: "Mythological Being", gender: "Female", debutYear: 2020, oshiMark: "🐔", status: "Active" },
  { name: "Ninomae Ina'nis", branch: "EN", generation: "Myth", species: "Human", gender: "Female", debutYear: 2020, oshiMark: "🐙", status: "Active" },
  { name: "Gawr Gura", branch: "EN", generation: "Myth", species: "Demi-Human", gender: "Female", debutYear: 2020, oshiMark: "🔱", status: "Graduated" },
  { name: "Watson Amelia", branch: "EN", generation: "Myth", species: "Human", gender: "Female", debutYear: 2020, oshiMark: "🔎", status: "Affiliate" },

  // EN -Promise- (Council + HOPE)
  { name: "IRyS", branch: "EN", generation: "Promise", species: "Mythological Being", gender: "Female", debutYear: 2021, oshiMark: "💎", status: "Active" },
  { name: "Tsukumo Sana", branch: "EN", generation: "Promise", species: "Mythological Being", gender: "Female", debutYear: 2021, oshiMark: "🪐", status: "Graduated" },
  { name: "Ceres Fauna", branch: "EN", generation: "Promise", species: "Mythological Being", gender: "Female", debutYear: 2021, oshiMark: "🌿", status: "Graduated" },
  { name: "Ouro Kronii", branch: "EN", generation: "Promise", species: "Mythological Being", gender: "Female", debutYear: 2021, oshiMark: "⏳", status: "Active" },
  { name: "Nanashi Mumei", branch: "EN", generation: "Promise", species: "Mythological Being", gender: "Female", debutYear: 2021, oshiMark: "🪶", status: "Graduated" },
  { name: "Hakos Baelz", branch: "EN", generation: "Promise", species: "Mythological Being", gender: "Female", debutYear: 2021, oshiMark: "🎲", status: "Active" },

  // EN -Advent-
  { name: "Shiori Novella", branch: "EN", generation: "Advent", species: "Human", gender: "Female", debutYear: 2023, oshiMark: "👁️‍🗨️", status: "Active" },
  { name: "Koseki Bijou", branch: "EN", generation: "Advent", species: "Sorceress", gender: "Female", debutYear: 2023, oshiMark: "🗿", status: "Active" },
  { name: "Nerissa Ravencroft", branch: "EN", generation: "Advent", species: "Mythological Being", gender: "Female", debutYear: 2023, oshiMark: "🎼", status: "Active" },
  { name: "Fuwawa Abyssgard", branch: "EN", generation: "Advent", species: "Mythological Being", gender: "Female", debutYear: 2023, oshiMark: "🐾💙", status: "Active" },
  { name: "Mococo Abyssgard", branch: "EN", generation: "Advent", species: "Mythological Being", gender: "Female", debutYear: 2023, oshiMark: "🐾🩷", status: "Active" },

  // EN -Justice-
  { name: "Elizabeth Rose Bloodflame", branch: "EN", generation: "Justice", species: "Scarlet Queen", gender: "Female", debutYear: 2024, oshiMark: "💄", status: "Active" },
  { name: "Gigi Murin", branch: "EN", generation: "Justice", species: "Mythological Being", gender: "Female", debutYear: 2024, oshiMark: "👧", status: "Active" },
  { name: "Cecilia Immergreen", branch: "EN", generation: "Justice", species: "Cyborg", gender: "Female", debutYear: 2024, oshiMark: "🍵", status: "Active" },
  { name: "Raora Panthera", branch: "EN", generation: "Justice", species: "Demi-Human", gender: "Female", debutYear: 2024, oshiMark: "🐱", status: "Active" },

  // ==========================================
  // HOLOLIVE STAFF & ANNOUNCERS (HoloAN)
  // ==========================================
  { name: "Friend A", branch: "JP", generation: "Staff / HoloAN", species: "Human", gender: "Female", debutYear: 2017, oshiMark: "👓", status: "Retired" },
  { name: "Harusaki Nodoka", branch: "JP", generation: "Staff / HoloAN", species: "Human", gender: "Female", debutYear: 2022, oshiMark: "📝", status: "Retired" },
  { name: "YAGOO (Motoaki Tanigo)", branch: "JP", generation: "Staff / HoloAN", species: "Human", gender: "Male", debutYear: 2016, oshiMark: "👔", status: "Active" },

];
// Helper export for ES Module or global browser scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = talents;
}