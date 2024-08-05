import landing from "@/static/images/landing-page-img.svg";
import welcome from "@/static/images/welcome.svg";
import board from "@/static/images/board.svg";
import NoEasyNote from "@/static/images/no-easy-note.svg";
import networkError from "@/static/images/network-error.svg";
// study
import studyBg from "@/static/images/study-bg.svg";
import studyTodo from "@/static/images/study-todo.svg";
import studyEasyNote from "@/static/images/study-easy-note.svg";
import shareTodoAvatars from '@/static/images/share-todo-avatars.svg'
// service
import serviceBg from "@/static/images/service-bg.svg";
import serviceUtility from "@/static/images/service-utility.svg";
import serviceCard from "@/static/images/service-card.svg";
import serviceFood from "@/static/images/service-food.png";
import serviceLocation from "@/static/images/service-location.svg";
import serviceWater from "@/static/images/service-water.svg";
import serviceSchoolNav from '@/static/images/school-nav.svg'
import serviceExpressNav from '@/static/images/express-nav.svg'
import serviceShopNav from '@/static/images/shop-nav.svg'
import serviceSceneryNav from '@/static/images/scenery-nav.svg'
import serviceNeedFunction from '@/static/images/need-function.svg'




const images = {
    landing,
    welcome,
    board,
    NoEasyNote,
    networkError,
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
        serviceSchoolNav: serviceSchoolNav,
        serviceExpressNav: serviceExpressNav,
        serviceShopNav: serviceShopNav,
        serviceSceneryNav: serviceSceneryNav,
        serviceNeedFunction: serviceNeedFunction,
    },
};

export default images;