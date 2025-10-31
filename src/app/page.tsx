import Image from "next/image";
import { Container } from "../components/container";
import Navbar from "../components/navbar";
import Hero from "../components/hero";
import Index from "../components/animation";
import { Animate_curtain } from "../utils/animation";
import Card from "../components/card/card";
import BallBox from "../components/animation/ball";
;
export default function Home() {


  return (
  
  <div className="layout">
    {/* <Container>
      <Navbar/>
      <Hero/>
    </Container> */}
    <BallBox/>
  </div>
  );
}
