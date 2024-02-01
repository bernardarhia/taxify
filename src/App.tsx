import Footer from "./components/Footer";
import Header from "./components/Header";
import { ThemeProvider } from "./context/themeContext";
import TaxAmountInputForm from "./form/TaxAmountInputForm";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex items-center justify-between flex-col">
        <div className="header h-[70px] w-full mb-10">
          <Header />
        </div>
        <div className="app-content flex-1 h-full w-full flex items-center justify-center">
          <TaxAmountInputForm />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
