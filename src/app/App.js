import { Routes, Route } from 'react-router-dom';

import { HeaderLoyaut } from '../header-loyaut/header-loyaut';

import { ExchangePage } from '../exchange-page/exchange-page';
import { ExchangeRatesPage } from '../exchange-rates-page/exchange-rates-page';

import { Page404 } from '../page-404/page-404';

function App() {
  return (
      <Routes>
        <Route to='/' element={<HeaderLoyaut/>}>
          <Route index element={<ExchangePage/>}/>
          <Route path='rates' element={<ExchangeRatesPage/>}/>
          <Route path='*' element={<Page404/>}/>
        </Route>  
      </Routes>
  );
}

export default App;
