import { Dashboard, Report, WbTwilight } from "@mui/icons-material";
import { MdSettings } from "react-icons/md";

const sidebarConstanst = [
  { icon: Dashboard, text: "Dashboards", path: "/" },
  { icon: WbTwilight, text: "Incidents", path: "/incidents" },
  { icon: Report, text: "Reports", path: "/reports" },
  { icon: MdSettings, text: "Settings", path: "/settings" },
];

export default sidebarConstanst;
