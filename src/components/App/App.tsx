import React, { useEffect } from "react";
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
  // Додаємо title і meta description динамічно
  useEffect(() => {
    // Змінюємо заголовок сторінки
    document.title = "Моє портфоліо FrontEnd розробника";

    // Шукаємо meta description
    const metaDescription = document.querySelector('meta[name="description"]');

    if (metaDescription) {
      // Якщо тег існує — оновлюємо content
      metaDescription.setAttribute("content", "Приклади моїх проектів FrontEnd, портфоліо з React, HTML, CSS, JS та TypeScript.");
    } else {
      // Якщо тегу немає — створюємо його
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = "Приклади моїх проектів FrontEnd, портфоліо з React, HTML, CSS, JS та TypeScript.";
      document.head.appendChild(meta);
    }
  }, []);

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
