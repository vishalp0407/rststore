import Header from "@components/Header";
import Footer from "@components/Footer";
import HomeScreen from "@screens/Home";

const App = () => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      <Header />
      <div className="h-[56px] sm:h-[64] lg:h-[105px]"></div>
      <HomeScreen />
      <div className="flex-grow"></div>
      <Footer />
    </div>
  );
};

export default App;
