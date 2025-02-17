import './App.css'
import EGAForm from './EGA_Form'

function App() {
  return (
    <div className="h-screen w-screen m-0 p-0 text-blue-50 bg-[#101217] relative flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('./assets/golf-bg.jpg')] bg-center bg-cover bg-no-repeat filter blur-xs bg-black bg-opacity-50 z-0"></div>
      <main className="relative z-10 p-10 bg-white/10 backdrop-blur-lg rounded-4xl shadow-lg max-w-screen-md w-full text-center">
        <h1 className="text-2xl font-extrabold mb-6">HANDICALC</h1>
        <EGAForm />
      </main>
    </div>
  )
}

export default App
