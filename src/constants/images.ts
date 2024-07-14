import landing from "@/static/images/landing-page-img.svg";
import welcome from "@/static/images/welcome.svg";
import board from "@/static/images/board.svg";
import NoEasyNote from "@/static/images/no-easy-note.svg";
// study
import studyBg from "@/static/images/study-bg.svg";
import studyTodo from "@/static/images/study-todo.svg";
import studyEasyNote from "@/static/images/study-easy-note.svg";
// service
import serviceBg from "@/static/images/service-bg.svg";
import serviceUtility from "@/static/images/service-utility.svg";
import serviceCard from "@/static/images/service-card.svg";
import serviceFood from "@/static/images/service-food.png";
import serviceLocation from "@/static/images/service-location.svg";
import serviceWater from "@/static/images/service-water.svg";


const images = {
    landing,
    welcome,
    board,
    NoEasyNote,
    study: {
        bg: studyBg,
        todo: studyTodo,
        easyNote: studyEasyNote,
    },
    service: {
        bg: serviceBg,
        utility: serviceUtility,
        card: serviceCard,
        food: serviceFood,
        location: serviceLocation,
        water: serviceWater,
    }
};

export default images;