
function Buttons({onClick, children}: {onClick: () => void, children: React.ReactNode}) {
  return (
    <button className="bg-blue-800
                hover:bg-blue-500 text-white font-bold py-2 px-4
                 rounded h-10 w-20" onClick={onClick}>
                 {children}
    </button>
  )
}

export default Buttons