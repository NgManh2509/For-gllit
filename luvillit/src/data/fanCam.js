const BASE = import.meta.env.BASE_URL;
const fanCamData = [
    {
        id: 'fc01',
        name:'Minju',
        img: `${BASE}memberImages/minju1.webp`,
        vid:[
            'https://res.cloudinary.com/dgj1wlh6b/video/upload/v1774195558/minjuFC1_ydsdgf.mp4',
            'https://res.cloudinary.com/dgj1wlh6b/video/upload/v1774195816/minju2_zrdeec.mp4',
            'https://res.cloudinary.com/dgj1wlh6b/video/upload/v1774540167/%EC%95%84%EC%9D%BC%EB%A6%BF_%EB%AF%BC%EC%A3%BC%EA%B0%80_%EB%B3%B4%EC%97%AC%EC%A3%BC%EB%8A%94_%EB%A5%B4%EC%84%B8%EB%9D%BC%ED%95%8C%EC%9D%98_Perfect_Night_%EB%AC%B4%EB%8C%80_%EB%AF%BC%EC%A3%BC_%EC%95%84%EC%9D%BC%EB%A6%BF_%EB%A5%B4%EC%84%B8%EB%9D%BC%ED%95%8C_MINJU_ILLIT_LESSERAFIM_PerfectNight_-_%EB%8F%84%EB%A6%AC_1080p_h264_ivqodh.mp4',
            'https://res.cloudinary.com/dgj1wlh6b/video/upload/v1774714712/%EB%B9%84%ED%83%80%EB%AF%BC%EC%A3%BC%EC%9D%98_%ED%96%89%EB%B3%B5_%EC%97%90%EB%84%88%EC%A7%80_%EC%95%84%EC%9D%BC%EB%A6%BF_%EB%AF%BC%EC%A3%BC%EC%9D%98_%ED%8A%B8%EC%99%80%EC%9D%B4%EC%8A%A4_ONE_SPARK_%EC%B1%8C%EB%A6%B0%EC%A7%80_%EB%AF%BC%EC%A3%BC_%EC%95%84%EC%9D%BC%EB%A6%BF_ILLIT_MINJU_%ED%8A%B8%EC%99%80%EC%9D%B4%EC%8A%A4_TWICE_ONESPARK_-_%EB%8F%84%EB%A6%AC_1080p_h264_zhgyrc.mp4',
        ],
    },
    {
        id: 'fc02',
        name:'Yunah',
        img: `${BASE}memberImages/yunah1.webp`,
        vid:[
            'https://res.cloudinary.com/dgj1wlh6b/video/upload/v1774195560/yunahFC1_pjpgpg.mp4',
            'https://res.cloudinary.com/dgj1wlh6b/video/upload/v1774195817/yunahFC2_1_oxzma3.mp4',
            'https://res.cloudinary.com/dgj1wlh6b/video/upload/v1774540138/%EC%95%84%EC%9D%BC%EB%A6%BF_%EC%9C%A4%EC%95%84%EA%B0%80_%EB%B3%B4%EC%97%AC%EC%A3%BC%EB%8A%94_%EC%A0%84%EC%86%8C%EB%AF%B8%EC%9D%98_Fast_Forward_%EB%AC%B4%EB%8C%80_%EC%9C%A4%EC%95%84_%EC%95%84%EC%9D%BC%EB%A6%BF_%EC%A0%84%EC%86%8C%EB%AF%B8_YUNAH_ILLIT_JEONSOMI_FastForward_-_%EB%8F%84%EB%A6%AC_1080p_h264_rcwmwi.mp4',
            'https://res.cloudinary.com/dgj1wlh6b/video/upload/v1774715275/%EB%A7%88%EB%B2%95_%EC%A3%BC%EB%AC%B8_%EA%B1%B0%EB%8A%94_%EC%9C%A4%EC%95%84_ILLIT_YUNAH_-_%EB%B9%84%EB%AA%BD_1080p_h264_w5cnqg.mp4',
        ],
    },
    {
        id: 'fc03',
        name:'Moka',
        img: `${BASE}memberImages/moka1.webp`,
        vid:[
            'https://res.cloudinary.com/dgj1wlh6b/video/upload/v1774195553/mokaFC2_mkqvn1.mp4',
            'https://res.cloudinary.com/dgj1wlh6b/video/upload/v1774195551/mokaFC1_smaq2z.mp4',
            'https://res.cloudinary.com/dgj1wlh6b/video/upload/v1774714712/%EB%AA%A8%EC%B9%B4%EC%9D%98_%E6%99%82%E3%82%88%E6%AD%A2%E3%81%BE%E3%82%8C_Toki_Yo_Tomare_%EB%AC%B4%EB%8C%80_%EB%AA%A8%EC%B9%B4_%EC%95%84%EC%9D%BC%EB%A6%BF_ILLIT_MOKA_%E6%99%82%E3%82%88%E6%AD%A2%E3%81%BE%E3%82%8C_-_%EB%8F%84%EB%A6%AC_1080p_h264_irxz0v.mp4',
            'https://res.cloudinary.com/dgj1wlh6b/video/upload/v1774714706/%EC%95%84%EC%9D%BC%EB%A6%BF_%EB%AA%A8%EC%B9%B4%EC%9D%98_%EB%A5%B4%EC%84%B8%EB%9D%BC%ED%95%8C_SPAGHETTI_%EC%B1%8C%EB%A6%B0%EC%A7%80_%EB%AA%A8%EC%B9%B4_%EC%95%84%EC%9D%BC%EB%A6%BF_ILLIT_MOKA_%EB%A5%B4%EC%84%B8%EB%9D%BC%ED%95%8C_LESSERAFIM_SPAGHETTI_-_%EB%8F%84%EB%A6%AC_1080p_h264_ykab2j.mp4',
        ],
    },
    {
        id: 'fc04',
        name:'Iroha',
        img: `${BASE}memberImages/iroha1.webp`,
        vid:[
            'https://res.cloudinary.com/dgj1wlh6b/video/upload/v1774195567/irohaFC1_fuxjae.mp4',
            'https://res.cloudinary.com/dgj1wlh6b/video/upload/v1774195551/irohaFC2_lye6np.mp4',
            'https://res.cloudinary.com/dgj1wlh6b/video/upload/v1774714726/%EB%B0%9C%EB%B9%A0%EB%A5%B8_%EC%9D%B4%EB%A1%9C%ED%95%98_ILLIT_IROHA_-_%EB%B9%84%EB%AA%BD_1080p_h264_burcdh.mp4',
            'https://res.cloudinary.com/dgj1wlh6b/video/upload/v1774714734/%EA%B3%B0%EB%8F%8C%EC%9D%B4_%EC%9D%B8%ED%98%95%EA%B3%BC_%EB%85%B8%EB%8A%94_%EC%9D%B4%EB%A1%9C%ED%95%98_%EC%9D%B4%EB%A1%9C%ED%95%98_%EC%95%84%EC%9D%BC%EB%A6%BF_ILLIT_IROHA_-_%EB%8F%84%EB%A6%AC_1080p_h264_jmfjfj.mp4',
        ],
    },
    {
        id: 'fc05',
        name:'Wonhee',
        img: `${BASE}memberImages/wonhee1.webp`,
        vid:[
            'https://res.cloudinary.com/dgj1wlh6b/video/upload/v1774195563/wonheeFC1_bnr2tx.mp4',
            'https://res.cloudinary.com/dgj1wlh6b/video/upload/v1774195556/wonheeFC2_mutzfi.mp4',
            'https://res.cloudinary.com/dgj1wlh6b/video/upload/v1774540004/%EA%B8%B0%EB%8B%88_%EC%9E%90%EB%A7%A4_%EC%95%84%EC%9D%BC%EB%A6%BF_%EC%9B%90%ED%9D%AC%EC%9D%98_%EC%95%84%EC%9D%B4%EB%B8%8C_XOXZ_%EC%B1%8C%EB%A6%B0%EC%A7%80_%EC%9B%90%ED%9D%AC_%EC%95%84%EC%9D%BC%EB%A6%BF_ILLIT_%EC%95%84%EC%9D%B4%EB%B8%8C_IVE_XOXZ_-_%EB%8F%84%EB%A6%AC_1080p_h264_wumbzx.mp4',
            'https://res.cloudinary.com/dgj1wlh6b/video/upload/v1774715136/%ED%96%84%EB%B3%B4%EB%A5%B4%EA%B8%B0%EB%8B%88_%EC%8B%9C%EB%8F%99_%EC%95%84%EC%9D%BC%EB%A6%BF_%EC%9B%90%ED%9D%AC%EC%9D%98_%ED%8A%B8%EC%99%80%EC%9D%B4%EC%8A%A4_ONE_SPARK_%EC%B1%8C%EB%A6%B0%EC%A7%80_%EC%9B%90%ED%9D%AC_%EC%95%84%EC%9D%BC%EB%A6%BF_ILLIT_%ED%8A%B8%EC%99%80%EC%9D%B4%EC%8A%A4_TWICE_ONESPARK_-_%EB%8F%84%EB%A6%AC_1080p_h264_rnbqks.mp4'
        ],
    },
]

export default fanCamData;
