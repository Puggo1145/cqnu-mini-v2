import landing from "@/static/images/landing-page-img.png";
import welcome from "@/static/images/welcome.svg";
import board from "@/static/images/board.svg";
import NoEasyNote from "@/static/images/no-easy-note.svg";
import networkError from "@/static/images/network-error.svg";
import welcomeOnboard from "@/static/images/welcome-onboard.png";
// study
import studyBg from "@/static/images/study-bg.svg";
// service
import serviceBg from "@/static/images/service-bg.svg";
import serviceLocation from "@/static/images/service-location.svg";
import serviceWater from "@/static/images/service-water.svg";
import serviceNavBuilding from "@/static/images/service-nav-building.png";
import serviceNavExpress from "@/static/images/service-nav-express.png";
import serviceNavShop from "@/static/images/service-nav-shop.png";
import serviceNavScenery from "@/static/images/service-nav-scenery.png";


const images = {
    landing,
    welcome,
    board,
    NoEasyNote,
    networkError,
    welcomeOnboard,
    study: {
        bg: studyBg,
    },
    service: {
        bg: serviceBg,
        location: serviceLocation,
        water: serviceWater,
        nav: {
            building: serviceNavBuilding,
            express: serviceNavExpress,
            shop: serviceNavShop,
            scenery: serviceNavScenery,
        }
    },
};

export default images;