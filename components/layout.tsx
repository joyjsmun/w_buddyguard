import { useRouter } from "next/router";
import BottomTab from "./BottomTab";
import TopLogo from "./topLogo";

const Layout = (props: { children: React.ReactNode }) => {
  const router = useRouter();
  const { pathname } = router;

  // Determine the location based on the current pathname
  let location;
  if (pathname === "/home") {
    location = "home";
  } else if (pathname === "/hangout") {
    location = "hangout";
  } else if (pathname === "/walkRequestInfo") {
    location = "walkRequestInfo";
  } else if (pathname === "/supportRequestInfo") {
    location = "supportRequestInfo";
  } else if (pathname === "/profile") {
    location = "profile";
  }

  // Check if the current route is either landing or onboarding
  const hideBottomTab = pathname === "/" || pathname === "/onBoarding";

  return (
    <div>
      <TopLogo />
      <main>{props.children}</main>
      <BottomTab location={location} />
    </div>
  );
};

export default Layout;
