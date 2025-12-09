import React from "react";
import { LanguageProvider } from "../../LanguageContext"; // шлях до твого провайдера
import Header from "../Header/Header";
import AboutMe from "../About-me/AboutMe";
import Foto from "../Foto/Foto";
import Capabilities from "../Capabilities/Capabilities";
import Experience from "../Experience/Experience";
import Portfolio from "../Portfolio/Portfolio";
import Connect from "../Connect/Connect";
import Footer from "../Footer/Footer";
import "../App/App.module.scss";
import WeatherBlock from "../WeatherBlock/WeatherBlock";
import styles from "../App/App.module.scss";
import CurrencyTicker from "../CurrencyTicker/CurrencyTicker";
// import EditableBlock from "../EditableBlock/EditableBlock";
import StarsSky from "../hvezda/StarsSky";


const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className={styles.appBackground}>
        <Header />
        <StarsSky /> 
        <WeatherBlock />
        {/* <EditableBlock /> */}
        <AboutMe />
        <Foto />
        <CurrencyTicker />
        <Capabilities />
        <Experience />
        <Portfolio />
        <Connect />
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;