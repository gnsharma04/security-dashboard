import { Dashboard, Report, WbTwilight } from "@mui/icons-material";
import { MdSettings } from "react-icons/md";
import { atom } from "jotai";

const sidebarConstanst = [
  { icon: Dashboard, text: "Dashboards", path: "/" },
  { icon: WbTwilight, text: "Incidents", path: "/incidents" },
  { icon: Report, text: "Reports", path: "/reports" },
  { icon: MdSettings, text: "Settings", path: "/settings" },
];

export default sidebarConstanst;

export const dateRangeAtom = atom(null);

export const formatDateLocale = (date) => {
  const formattedDate = new Date(date).toLocaleDateString("en-IN");
  return formattedDate;
};
