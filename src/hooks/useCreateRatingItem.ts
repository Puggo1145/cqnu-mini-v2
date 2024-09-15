import { ref } from "vue";


export default function useCreateRatingItem() {
  const isSubmitting = ref(false);
  const error = ref(false);

  // 选中的图片
  const selectedFoodImage = ref<string>();

  // 选择食堂或商业街
  const selectedCanteenIndex = ref(0);

  // 填写商家名
  const merchantName = ref('');
  const merchantNameRef = ref();

  // 填写美食名
  const foodName = ref('');
  const foodNameRef = ref();

  // 填写价格
  const price = ref('');
  const priceRef = ref();


  return {
    isSubmitting,
    error,
    selectedFoodImage,
    selectedCanteenIndex,
    merchantName,
    merchantNameRef,
    foodName,
    foodNameRef,
    price,
    priceRef,
  }
}
