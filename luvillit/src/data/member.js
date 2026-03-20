// Lấy base path từ cấu hình Vite (sẽ là '/For-gllit/')
const BASE = import.meta.env.BASE_URL;

const introVoice = [
  `${BASE}voice/iroha.mp3`, 
  `${BASE}voice/moka.mp3`, 
  `${BASE}voice/minju.mp3`, 
  `${BASE}voice/yunah.mp3`, 
  `${BASE}voice/wonhee.mp3`
];

const calculateAge = (birthDateStr) => {
  const birth = new Date(birthDateStr)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const hasBirthdayPassed =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate())
  if (!hasBirthdayPassed) age--
  return age
}

const members = [
    {
        id:'IL01',
        stageName:'Wonhee',
        otherName:'',
        birthName:'Lee Won-hee',
        birthDate:'June 26, 2007',
        intro: introVoice[4],
        age: calculateAge('June 26, 2007'),
        homeTown:'Changwon, Gyeongsangnam, South Korea',
        height:162,
        bloodType:'A',
        occupation:'Singer',
        instruments:'Piano',
        groupDebut:'March 25, 2024',
        color:'#FF8A9D',
        pos : 'Center, Lead Vocalist, Face of the Group',
        image: [`${BASE}memberImages/wonhee1.webp`, `${BASE}memberImages/wonhee2.webp`, `${BASE}memberImages/wonhee3.webp`],
        bio : 'Born in 2007, Wonhee is the undeniable center and "stan attractor" of ILLIT. Despite her short training period, her natural talent, distinctively cute visuals, and rapid improvement earned her the top spot on R U Next?. Her bubbly personality and lovely vocal color perfectly embody the group\'s dreamy, youthful identity.'
    }, 
    {
        id:'IL02',
        stageName:'Minju',
        otherName:'',
        birthName:'Park Min-ju',
        birthDate:'May 11, 2004',
        intro: introVoice[2],
        age: calculateAge('May 11, 2004'),
        homeTown:'Deokso-ri, Wabu-eup, Namyangju, Gyeonggi-do, South Korea',
        height:163,
        bloodType:'O',
        occupation:'Singer, MC',
        instruments:'Violin, piano',
        groupDebut:'March 25, 2024',
        color:'#FFFF00',
        pos : 'Main Vocalist, Visual',
        image: [`${BASE}memberImages/minju1.webp`, `${BASE}memberImages/minju2.webp`, `${BASE}memberImages/minju3.webp`],
        bio : 'Born in 2004, Minju is celebrated for her unique, alluring vocal tone and striking visuals. A former YG trainee, she possesses a quiet but deeply captivating aura. She easily draws audiences in with her emotional singing and elegant dance lines, making her a standout performer in every concept.'
    },
    {
        id:'IL03',
        stageName:'Moka',
        otherName:'Kim Mo-ka',
        birthName:'Sakai Moka',
        birthDate:'October 8, 2004',
        intro: introVoice[1],
        age: calculateAge('October 8, 2004'),
        homeTown:'Kitakyushu, Fukuoka, Japan',
        height:162,
        bloodType:'B',
        occupation:'Singer',
        instruments:'Guitar',
        groupDebut:'March 25, 2024',
        color:'#B6B5D8',
        pos : 'Lead Dancer, Sub Vocalist',
        image: [`${BASE}memberImages/moka1.webp`, `${BASE}memberImages/moka2.webp`, `${BASE}memberImages/moka3.webp`],
        bio : 'Born in 2004 in Japan, Moka is known for her incredible stage presence and expressive facial expressions. She excels in executing complex choreography with a charming, fairy-like vibe. Always deeply passionate about her performances, Moka brings a sweet, refreshing energy that instantly melts the hearts of her fans.'
    },
    {
        id:'IL04',
        stageName:'Iroha',
        otherName:'Roha',
        birthName:'Hokazono Iroha',
        birthDate:'February 4, 2008',
        intro: introVoice[0],
        age: calculateAge('February 4, 2008'),
        homeTown:'Koganei, Tokyo, Japan',
        height:158,
        bloodType:'A',
        occupation:'Singer',
        instruments:'Guitar',
        groupDebut:'March 25, 2024',
        color:'#89CFF0',
        pos : 'Main Dancer, Sub Vocalist, Maknae',
        image: [`${BASE}memberImages/iroha1.webp`, `${BASE}memberImages/iroha2.webp`, `${BASE}memberImages/iroha3.webp`],
        bio : 'Born in 2008 in Japan, Iroha is the group\'s talented maknae and main dancer. Having danced since childhood, she boasts incredible rhythm, groove, and technical skill. Despite her young age and soft-spoken nature off-stage, she transforms into a fierce, charismatic performer the moment the music starts playing.'
    },
    {
        id:'IL05',
        stageName:'Yunah',
        otherName:'Annie Noh',
        birthName:'Noh Yun-ah',
        birthDate:'January 15, 2004',
        intro: introVoice[3],
        age: calculateAge('January 15, 2004'),
        homeTown:'Dalcheon-dong, Chungju, Chungcheongbuk-do, South Korea',
        height:168,
        bloodType:'AB',
        occupation:'Singer, songwriter',
        instruments:'Piano',
        groupDebut:'March 25, 2024',
        color:'#7f0000',
        pos : 'Leader, Lead Vocalist, Lead Dancer',
        image: [`${BASE}memberImages/yunah1.webp`, `${BASE}memberImages/yunah2.webp`, `${BASE}memberImages/yunah3.webp`],
        bio : 'Born in 2004, Yunah is the energetic and charismatic older sister of the group. With over 4 years of training, she brings a powerful presence and stable vocals to the stage. Known for her infectious laughter and unofficial leadership qualities, she constantly motivates her teammates and captivates fans with her dynamic performances.'
    }
]

export default members