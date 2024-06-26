export const LOGO = "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";
export const USER_AVTAR = "https://avatars.githubusercontent.com/u/76692909?v=4";

export const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + process.env.REACT_APP_TMDB_KEY
    }
};


export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500"
export const BACKGROUND_IMG = "https://assets.nflxext.com/ffe/siteui/vlv3/563192ea-ac0e-4906-a865-ba9899ffafad/6b2842d1-2339-4f08-84f6-148e9fcbe01b/IN-en-20231218-popsignuptwoweeks-perspective_alpha_website_medium.jpg"

export const SUPPORTED_LANGUAGES = [
    { identifier: "en", name: "English" }, 
    { identifier: "hindi", name: "Hindi" }, 
    { identifier: "spanish", name: "Spanish" }]

export const OPENAI_KEY = process.env.REACT_APP_OPENAI_KEY

export const TRAILER_VIDEO = 'https://www.youtube.com/embed/'