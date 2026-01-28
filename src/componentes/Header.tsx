import Logo from "../assets/Logo.png"

const Header = () => {
  return (
    <>
      <header className=' flex-1 bg-green-600 px-6 py-4 relative'>
        <div className=" justify-between flex items-center">
          <img src={Logo} alt="Logo" className=" h-24 w-24" />
          <h1 className="text-2xl font-bold text-white">Todo caduca</h1>
          <div className=" flex gap-3">
            <button className=' bg-white text-black px-6 py-2 border-black hover:bg-gray-300 transition-colors rounded-lg'>Registrar</button>
            <button className=' bg-white text-black px-6 py-2 border-black hover:bg-gray-300 transition-colors rounded-lg'>Login</button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header