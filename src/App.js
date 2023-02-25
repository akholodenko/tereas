import './App.css'

function App() {
  const fun = () => {
    console.log('test' + process.env.REACT_APP_apiKey)
  }

  fun()
  return <div className="App">test</div>
}

export default App
