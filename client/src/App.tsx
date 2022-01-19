import './App.css'
import {Innloggingsside} from "./Innlogginsside/Innloggingsside";

function App() {

  return (
    <div className="App">
      <Innloggingsside redirectUrl={window.location.href} />
    </div>
  )
}

export default App
