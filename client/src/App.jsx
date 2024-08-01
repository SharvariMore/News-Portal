import './App.css';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import News from './components/News';
import TopHeadlines from './components/TopHeadlines';
import CountryNews from './components/CountryNews';

export function App() {

  return (
    <>
      <div className='w-full'>
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path="/" element={<News />} />
            <Route path="/top-headlines/:category" element={<TopHeadlines />} />
            <Route path="/country/:iso" element={<CountryNews />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
