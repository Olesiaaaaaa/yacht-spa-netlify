import { useState } from 'react'
import TranslatorWidget from '../components/TranslatorWidget'

// 📅 Компонент календаря
function MiniCalendar() {
  const today = new Date()
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [hoveredDay, setHoveredDay] = useState(null)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const monthName = currentDate.toLocaleString('ru', { month: 'long' })
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const startDay = new Date(year, month, 1).getDay()
  const offset = (startDay + 6) % 7

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
    setSelectedDate(null)
  }
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
    setSelectedDate(null)
  }
  const goToToday = () => {
    setCurrentDate(new Date())
    setSelectedDate(today.getDate())
  }

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '2px',
    width: '100%',
    textAlign: 'center',
    padding: '0',
  }

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div
        style={{
          position: 'absolute',
          top: '-10px',
          left: '-6px',
          fontSize: '1.2rem',
          transform: 'rotate(-15deg)',
          zIndex: 1,
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          top: '-10px',
          right: '-6px',
          fontSize: '1.2rem',
          transform: 'rotate(15deg)',
          zIndex: 1,
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          bottom: '-10px',
          left: '-6px',
          fontSize: '1.2rem',
          transform: 'rotate(15deg)',
          zIndex: 1,
        }}
      ></div>
      <div
        style={{
          position: 'absolute',
          bottom: '-10px',
          right: '-6px',
          fontSize: '1.2rem',
          transform: 'rotate(-15deg)',
          zIndex: 1,
        }}
      ></div>

      <div
        className="card border-0"
        style={{
          width: '100%',
          border: '2px solid #4facfe',
          borderRadius: '14px',
          background: 'linear-gradient(180deg, #ffffff 0%, #e8f4fd 100%)',
          boxShadow: '0 4px 12px rgba(13,110,253,0.1)',
        }}
      >
        <div
          className="card-header py-1 px-2"
          style={{
            background: 'linear-gradient(90deg, #0d6efd, #4facfe)',
            color: '#fff',
            borderRadius: '12px 12px 0 0',
          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <button
              onClick={prevMonth}
              className="btn btn-sm p-0 text-white"
              style={{ fontSize: '0.9rem' }}
            >
              &#9664;
            </button>
            <h6
              className="m-0 text-uppercase"
              style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}
            >
              {monthName} {year}
            </h6>
            <button
              onClick={nextMonth}
              className="btn btn-sm p-0 text-white"
              style={{ fontSize: '0.9rem' }}
            >
              &#9654;
            </button>
          </div>
        </div>
        <div
          className="card-body p-2"
          style={{ borderRadius: '0 0 12px 12px' }}
        >
          <div style={gridStyle}>
            {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((d) => (
              <div
                key={d}
                style={{
                  fontSize: '0.65rem',
                  color: '#0d6efd',
                  fontWeight: '700',
                  lineHeight: '1.2',
                }}
              >
                {d}
              </div>
            ))}
            {Array.from({ length: offset }).map((_, i) => (
              <div key={`e${i}`} style={{ height: '28px' }} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1
              const isToday =
                day === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear()
              const isSelected = day === selectedDate
              const isHovered = day === hoveredDay
              return (
                <div
                  key={day}
                  onMouseEnter={() => setHoveredDay(day)}
                  onMouseLeave={() => setHoveredDay(null)}
                  onClick={() => setSelectedDate(day)}
                  className="d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    height: '28px',
                    width: '28px',
                    margin: '0 auto',
                    cursor: 'pointer',
                    userSelect: 'none',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    background: isHovered
                      ? '#fff3cd'
                      : isSelected
                        ? '#e63946'
                        : isToday
                          ? '#0d6efd'
                          : 'transparent',
                    color:
                      (isSelected || isToday) && !isHovered ? '#fff' : '#333',
                    transform: isHovered ? 'scale(1.25)' : 'scale(1)',
                    fontWeight: isSelected ? 'bold' : 'normal',
                    zIndex: isHovered ? 10 : 1,
                    position: 'relative',
                    boxShadow: isHovered
                      ? '0 4px 10px rgba(0,0,0,0.15)'
                      : 'none',
                  }}
                >
                  <span
                    style={{ fontSize: '0.75rem', lineHeight: '1', zIndex: 1 }}
                  >
                    {day}
                  </span>
                  {isHovered && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '-2px',
                        right: '-2px',
                        fontSize: '0.7rem',
                        zIndex: 2,
                        filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.2))',
                      }}
                    ></span>
                  )}
                </div>
              )
            })}
          </div>
          <div className="text-center mt-2">
            <button
              onClick={goToToday}
              className="btn btn-sm btn-outline-primary w-100"
              style={{
                borderColor: '#4facfe',
                color: '#0d6efd',
                fontSize: '0.7rem',
              }}
            >
              Сегодня
            </button>
            {selectedDate && (
              <div className="mt-2 text-muted" style={{ fontSize: '0.75rem' }}>
                Выбрано:{' '}
                <span className="fw-bold">
                  {selectedDate} {monthName}
                </span>{' '}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// 🏠 Главная страница
export default function HomePage() {
  const initialItems = [
    'Яхты 5000 евро',
    'Яхты 10000 евро',
    'Яхты 13000 евро',
    'Яхты 15000 евро',
  ]
  const [items, setItems] = useState(initialItems)
  const [counter, setCounter] = useState(5000)
  const [highlight, setHighlight] = useState(false)

  const addItem = () => {
    setCounter((c) => c + 1)
    setItems((prev) => [...prev, `Яхты ${counter + 1} евро`])
  }
  const removeLast = () =>
    setItems((prev) => (prev.length > 0 ? prev.slice(0, -1) : prev))
  const highlightItem = () => {
    const el = document.getElementById('itemA')
    if (el) {
      el.textContent = 'Подсвечено! '
      el.className = 'highlight'
    }
  }

  return (
    <div className="container-fluid py-4" style={{ maxWidth: '1200px' }}>
      <div className="row">
        {/* 👈 Левая колонка: календарь + переводчик */}
        <div className="col-lg-3 col-md-4 mb-4">
          <div
            className="d-flex flex-column gap-3"
            style={{ marginTop: '1rem' }}
          >
            {/* Календарь */}
            <MiniCalendar />

            {/* ✅ Переводчик опущен на 2 см */}
            <div style={{ marginTop: '2cm' }}>
              <TranslatorWidget />
            </div>
          </div>
        </div>

        {/* 👉 Правая колонка: основной контент */}
        <div className="col-lg-9 col-md-8">
          <div className="text-center mb-5">
            {/* ✅ НОВЫЙ КОД — вставь вместо старого */}
            <img
              className="rounded-img mb-3"
              src={`${import.meta.env.BASE_URL}yacht-face.jpg`}
              alt="Portrait"
              style={{
                width: '100%',
                maxWidth: '276px', // ← уменьшили с 280px (~1 мм)
                height: '274px', // ← чуть меньше по вертикали = лёгкое «сплющивание»
                borderRadius: '50%', // ← теперь эллипс, а не идеальный круг
                boxShadow: '0 0 10px rgba(0,0,0,0.4)',
                objectFit: 'cover', // ← чтобы фото красиво заполнило форму без искажений
                display: 'block', // ← убирает микро-отступ снизу
                margin: '0 auto', // ← идеальное центрирование
              }}
            />
            <h1 className="fw-light">Hello Yacht Buyers</h1>
            <p className="lead text-muted">
              We have a large selection of yachts in Finland. Welcome to our
              online store. We work Mon-Fri 10:00-17:00.
            </p>
            <a
              href="http://nettivene.com"
              target="_blank"
              className="btn btn-warning me-2"
            >
              Yacht search
            </a>
            <a
              href="http://www.veneporssi.fi"
              target="_blank"
              className="btn btn-primary"
            >
              Additional site
            </a>
          </div>
          <hr className="my-4" />
          <div className="row justify-content-center mb-5">
            <div className="col-md-8">
              <h3 className="text-center mb-3">Our phone number</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  alert('Form submitted!')
                }}
                className="p-4 bg-light rounded shadow-sm"
              >
                <div className="mb-2">
                  <label htmlFor="name" className="form-label">
                    Your name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Typing your name"
                    required
                    className="form-control"
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="email" className="form-label">
                    Your Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Typing your Email"
                    required
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Your message:
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows="3"
                    placeholder="Type your message here..."
                    className="form-control"
                  ></textarea>
                </div>
                <input
                  type="submit"
                  value="Send"
                  className="w-100 btn btn-primary"
                />
              </form>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <span
                id="itemA"
                className={`d-block text-center mb-3 fs-5 ${highlight ? 'text-success fw-bold' : ''}`}
              >
                as
              </span>
              <ol className="list-group mb-3">
                {items.map((item, i) => (
                  <li key={i} className="list-group-item">
                    {item}
                  </li>
                ))}
              </ol>
              <div className="d-flex gap-2 flex-wrap justify-content-center">
                <button className="btn btn-primary" onClick={addItem}>
                  Добавить
                </button>
                <button className="btn btn-danger" onClick={removeLast}>
                  Очистить
                </button>
                <button className="btn btn-secondary" onClick={highlightItem}>
                  Подсветить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
