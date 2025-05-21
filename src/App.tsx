import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import { Header } from "./components/layout/Header";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { Sidebar } from "./components/layout/Sidebar";

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-colors duration-200">
            <Header />
            <div className="container mx-auto px-4 pt-16 flex">
              <Sidebar />
              <main className="flex-1 p-4">
                <AppRoutes />
              </main>
            </div>
          </div>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;