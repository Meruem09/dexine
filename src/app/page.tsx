import Image from "next/image";
import { Container } from "../components/container";
import Navbar from "../components/navbar";
import Hero from "../components/hero";
import Index from "../components/animation";
export default function Home() {
  return (
  
  <div className="layout">
    {/* <Container>
      <Navbar/>
      <Hero/>
    </Container> */}
    <Index/>
  </div>
  );
}
