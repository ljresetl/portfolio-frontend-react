import React from "react";
import Header from '../Header/Header';
import AboutMe from '../About-me/AboutMe';
import Foto from '../Foto/Foto';
import Capabilities from '../Capabilities/Capabilities';
import Experience from '../Experience/Experience';
import Portfolio from '../Portfolio/Portfolio';
import Connect from '../Connect/Connect';
import Footer from '../Footer/Footer';

import '../App/App.module.scss';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <AboutMe />
      <Foto />
      <Capabilities />
      <Experience />
      <Portfolio />
      <Connect />
      <Footer />
    </>
  );
};

export default App;
