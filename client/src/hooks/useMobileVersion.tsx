import { useWindowSize } from "./useWindowSize";
import styles from "../komponenter/Infographic/Infographic.module.scss";

export const useMobileVersion = () => {
  const windowSize = useWindowSize();
  const screenSmAsNumeric = parseInt(styles.screenSm.replace(/\D/g, ""));
  return windowSize.width === undefined || windowSize.width < screenSmAsNumeric;
};
