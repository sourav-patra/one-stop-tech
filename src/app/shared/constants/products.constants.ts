export enum PRODUCT_CATEGORIES_ENUM {
  laptop = "Laptops",
  mobile = "Mobiles",
  tablet = "Tablets",
  allDevices = "All Devices",
}

export const PRODUCT_CATEGORIES_CONST = [
  {
    label: PRODUCT_CATEGORIES_ENUM.allDevices,
    icon: "devices_other",
  },
  {
    label: PRODUCT_CATEGORIES_ENUM.laptop,
    icon: "laptop",
  },
  {
    label: PRODUCT_CATEGORIES_ENUM.mobile,
    icon: "smartphone",
  },
  {
    label: PRODUCT_CATEGORIES_ENUM.tablet,
    icon: "tablet",
  },
];
