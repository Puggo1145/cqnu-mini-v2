import landing from "@/static/images/landing-page-img.png";
import welcome from "@/static/images/welcome.svg";
import board from "@/static/images/board.svg";
import NoEasyNote from "@/static/images/no-easy-note.svg";
import networkError from "@/static/images/network-error.svg";
import welcomeOnboard from "@/static/images/welcome-onboard.png";
// study
import studyBg from "@/static/images/study-bg.svg";
import studyTodo from "@/static/images/study-todo.svg";
import studyEasyNote from "@/static/images/study-easy-note.svg";
import shareTodoAvatars from '@/static/images/share-todo-avatars.png'
// service
import serviceBg from "@/static/images/service-bg.svg";
import serviceUtility from "@/static/images/service-utility.svg";
import serviceCard from "@/static/images/service-card.svg";
import serviceFood from "@/static/images/service-food.png";
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
        todo: studyTodo,
        easyNote: studyEasyNote,
        shareTodoAvatars: shareTodoAvatars,
    },
    service: {
        bg: serviceBg,
        utility: serviceUtility,
        card: serviceCard,
        food: serviceFood,
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