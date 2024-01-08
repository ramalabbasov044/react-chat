import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App'
import Provider from './provider/provider'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
       <Provider>
           <App />
       </Provider>
    </BrowserRouter>
)