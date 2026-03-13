
const BASE = import.meta.env.BASE_URL;
const awardsVideo=[
    'https://res.cloudinary.com/dgj1wlh6b/video/upload/v1773286582/241122_ILLIT_Best_New_Female_Artist_MAMA_Awards_2024_online-video-cutter.com_fuuur4.mp4',
    'https://res.cloudinary.com/dgj1wlh6b/video/upload/v1773287404/241122_ILLIT_Best_New_Female_Artist_MAMA_Awards_2024_online-video-cutter.com_1_rwj5xy.mp4',
    'https://res.cloudinary.com/dgj1wlh6b/video/upload/v1773288519/241122_ILLIT_Best_New_Female_Artist_MAMA_Awards_2024_online-video-cutter.com_2_v0nxvw.mp4',
    'https://res.cloudinary.com/dgj1wlh6b/video/upload/v1773289223/241122_ILLIT_Best_New_Female_Artist_MAMA_Awards_2024_online-video-cutter.com_3_e3njuv.mp4',
    'https://res.cloudinary.com/dgj1wlh6b/video/upload/v1773371401/241122_ILLIT_Best_New_Female_Artist_MAMA_Awards_2024_online-video-cutter.com_bcbcfq.mp4',
    'https://res.cloudinary.com/dgj1wlh6b/video/upload/v1773372352/ILLIT_%EC%95%84%EC%9D%BC%EB%A6%BF_Rookie_of_the_Year_Female_-_T%C3%A2n_binh_n%E1%BB%AF_c%E1%BB%A7a_n%C4%83m_Hanteo_Music_Awards_2024_pd3u1n.mp4',
    'https://res.cloudinary.com/dgj1wlh6b/video/upload/v1773372612/ILLIT_%EC%95%84%EC%9D%BC%EB%A6%BF_Rookie_Artist_The_39th_Golden_Disc_Awards_iwnkkj.mp4',
    'https://res.cloudinary.com/dgj1wlh6b/video/upload/v1773372783/ILLIT_%EC%95%84%EC%9D%BC%EB%A6%BF_Best_Digital_Song_The_39th_Golden_Disc_Awards_y9ip6h.mp4',
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
        hosting:'Hanteo Music Awards 2024',
        awardName:'Rookie of the Year Female',
        awardYear:'2024',
        videoLink: awardsVideo[5],
        
    },
    {
        id: 'AW202501',
        hosting:'34th Seoul Music Awards',
        awardName:'Best group',
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
        hosting:'The 39th Golden Disc Awards',
        awardName:'Rookie Artist',
        awardYear:'2025',
        videoLink: awardsVideo[6],
    },
    {
        id: 'AW202504',
        hosting:'K-World Dream Awards',
        awardName:'Best Music Video Award',
        awardYear:'2025',
        videoLink: awardsVideo[4],
    },
    {
        id: 'AW202505',
        hosting:'The 39th Golden Disc Awards',
        awardName:'Best Digital Song',
        awardYear:'2025',
        videoLink: awardsVideo[7],
    }
]

export default awards;
