import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import ContactPage from './pages/ContactPage.jsx'

// 🔹 Базовый путь для GitHub Pages
const basename = '/yacht-spa/'

function Navbar() {
  const loc = useLocation()

  // 🔹 Функция стилей — одинаковая для всех кнопок
  const btn = (path) => ({
    padding: '8px 16px',
    borderRadius: '6px',
    color: '#fff',
    textDecoration: 'none',
    background: loc.pathname === path ? '#0d6efd' : 'rgba(255,255,255,0.15)',
    border: '1px solid rgba(255,255,255,0.3)',
    fontWeight: loc.pathname === path ? 'bold' : 'normal',
  })

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand p-0" to="/">
          <img
            src={`${import.meta.env.BASE_URL}OR (1).png`}
            alt="Logo"
            width="40"
            style={{ borderRadius: '50%' }}
          />
        </Link>
        <div className="ms-auto d-flex gap-2">
          {/* Home */}
          <Link to="/" style={btn('/')}>
            Home
          </Link>

          {/* ✅ Contact — теперь точно такие же стили, как у Home */}
          <Link to="/contact" style={btn('/contact')}>
            Contact
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  )
}
