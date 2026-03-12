
const BASE = import.meta.env.BASE_URL;
const awardsVideo=[
    'https://res.cloudinary.com/dgj1wlh6b/video/upload/v1773286582/241122_ILLIT_Best_New_Female_Artist_MAMA_Awards_2024_online-video-cutter.com_fuuur4.mp4',
    'https://res.cloudinary.com/dgj1wlh6b/video/upload/v1773287404/241122_ILLIT_Best_New_Female_Artist_MAMA_Awards_2024_online-video-cutter.com_1_rwj5xy.mp4',
    'https://res.cloudinary.com/dgj1wlh6b/video/upload/v1773288519/241122_ILLIT_Best_New_Female_Artist_MAMA_Awards_2024_online-video-cutter.com_2_v0nxvw.mp4',
    'https://res.cloudinary.com/dgj1wlh6b/video/upload/v1773289223/241122_ILLIT_Best_New_Female_Artist_MAMA_Awards_2024_online-video-cutter.com_3_e3njuv.mp4',
]

const awards =[
    {
        id: 'AW202401',
        hosting:'Mnet Asian Music Awards',
        awardName:'Best New Female Artist',
        awardYear:'2024',
        videoLink: awardsVideo[0],
        songName:''
    },
    {
        id:'AW202402',
        hosting:'Melon Music Awards',
        awardName:'New Artist of the Year',
        awardYear:'2024',
        videoLink: awardsVideo[1],
        
    },
    {
        id: 'AW202403',
        hosting:'TikTok Awards Korea',
        awardName:'Best Viral Song',
        awardYear:'2024',
        videoLink:'Không kiếm được vid ;-;',
        
    },
    {
        id: 'AW202404',
        hosting:'Japan Record Awards',
        awardName:'New Artist Award',
        awardYear:'2024',
        videoLink:'Không kiếm được vid ;-;',
    },
    {
        id: 'AW202501',
        hosting:'Seoul Music Awards',
        awardName:'34th Seoul Music Awards',
        awardYear:'2025',
        videoLink: awardsVideo[2],
    },
    {
        id: 'AW202502',
        hosting:'TMElive International Music Awards',
        awardName:'International Hit Song of the Year',
        awardYear:'2025',
        videoLink: awardsVideo[3],
    },
    {
        id: 'AW202503',
        hosting:'K-World Dream Awards',
        awardName:'Main Award - Bonsang',
        awardYear:'2025',
        videoLink:'',
    },
    {
        id: 'AW202504',
        hosting:'K-World Dream Awards',
        awardName:'Best Music Video Award',
        awardYear:'2025',
        videoLink:'',
    },
    {
        id: 'AW202505',
        hosting:'Mnet Asian Music Awards',
        awardName:'Fans Choice - Female',
        awardYear:'2025',
        videoLink:'',
    },
    {
        id: 'AW202506',
        hosting:'Seoul Music Awards',
        awardName:'Main Prize (Bonsang)',
        awardYear:'2025',
        videoLink:'',
    },
    {
        id: 'AW202507',
        hosting:'Seoul Music Awards',
        awardName:'Best Group Award',
        awardYear:'2025',
        videoLink:'',
    }
]