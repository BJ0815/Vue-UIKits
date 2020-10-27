import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";

const newViewports = {
  mobile: {
    name: "Mobile",
    styles: {
      width: "320px",
      height: "568px"
    }
  },
  tablet: {
    name: "Tablet",
    styles: {
      width: "768px",
      height: "1024px"
    }
  },
  laptop: {
    name: "Laptop",
    styles: {
      width: "1200px",
      height: "1024px"
    }
  },
  desktop: {
    name: "Desktop",
    styles: {
      width: "1366px",
      height: "1024px"
    }
  },
  wide: {
    name: "Wide",
    styles: {
      width: "1920px",
      height: "1080px"
    }
  }
};
export const parameters = {
  layout: "centered",
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewport: {
    viewports: {...MINIMAL_VIEWPORTS, ...newViewports},
    defaultViewport: "iphone6"
  }
};
