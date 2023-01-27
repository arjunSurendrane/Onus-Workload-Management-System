import React from "react";
import Features from "../../../Component/User/LandingPage/LandingFeatures";
import Footer from "../../../Component/User/Footer/Footer";
import Hero from "../../../Component/User/LandingPage/Hero";
import LandingNav from "../../../Component/User/LandingPage/LandingNavbar";
import Pricing from "../../../Component/User/LandingPage/Pricing";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const [cookies, setCookie] = useCookies();
  const history = useNavigate();
  console.log({ token: cookies });
  console.log("heey");
  useEffect(() => {
    if (cookies.userJwt) {
      history("/workspace");
    }
  });
  return (
    <div>
      <LandingNav />
      <Hero />
      <Features />
      <Pricing page={"landing"} />
      <Footer />
    </div>
  );
}
