import './App.scss'
import { Route, Routes, useLocation } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useEffect, useRef } from 'react'

import Nav from './components/Nav'
import Main from './pages/Main'
import DashboardPage from './pages/Dashboard'
import ScrollRouter from './layout/ScrollRouter'
import './styles/route-slide.css'
import ScrollToTop from './components/ScrollToTop'
import DataBoardPage from './pages/DataBoard'
import { connectMDb, connectPDb, getHealth } from './api/health'
import { useAppDispatch } from './app/hook'
import { loadLatestExchange } from './features/exchange.slice'
import { Gold, IEPriceIndex, InterestRate, NewsSentiment, Oil, SAndP500 } from './pages/VisDetail'
import NotFound from './pages/NotFound'
import VisualizationBoardPage from './pages/VisualizationBoard'

function App() {
  const location = useLocation();
  const nodeRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadLatestExchange())
  }, [dispatch]);

  useEffect(() => {
    getHealth()
      .then((d) => console.log(`Server is connected. ${d.status} ${d.data}`))
      .catch(() => console.log("error"))
    connectPDb()
      .then((d) => console.log(`Postgresql is connected. ${d.status}`))
      .catch((e) => console.log(`error ${e}`))
    connectMDb()
      .then((d) => console.log(`MongoDB is connected. ${d.status}`))
      .catch((e) => console.log(`error ${e}`))
  })

  const hideNav = location.pathname === '/';

  return (
    <div className="app">
      {!hideNav && <Nav />}

      <div className="content">
        <ScrollRouter>
          <ScrollToTop />
          <TransitionGroup component={null}>
            <CSSTransition
              key={location.pathname}
              classNames="slide"
              timeout={500}
              nodeRef={nodeRef}
              unmountOnExit
            >
              <div ref={nodeRef} className="route-wrapper">
                <Routes location={location}>
                  <Route path="/" element={<Main />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/databoard" element={<DataBoardPage />} />
                  <Route path="/visualizationboard" element={<VisualizationBoardPage />} />
                  <Route path="/visualizationboard/S&P500" element={<SAndP500 />} />
                  <Route path="/visualizationboard/Oil" element={<Oil />} />
                  <Route path="/visualizationboard/interestrate" element={<InterestRate />} />
                  <Route path="/visualizationboard/ieprice" element={<IEPriceIndex />} />
                  <Route path="/visualizationboard/gold" element={<Gold />} />
                  <Route path="/visualizationboard/newssentiment" element={<NewsSentiment />} />
                  {/* <Route path="/insightsboard" element={<InsightBoardPage />} /> */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </CSSTransition>
          </TransitionGroup>
        </ScrollRouter>
      </div>
    </div>
  )
}

export default App
