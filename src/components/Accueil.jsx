function Accueil(){
    const scrollDown = () =>{
        window.scrollBy({
            top: window.innerHeight, // Défiler de la hauteur de la fenêtre (100vh)
            left: 0,
            behavior: 'smooth', // Défiler de manière fluide
        });    }
 return (
    
    <div className="h-screen w-screen">
        <button onClick={scrollDown} aria-label="scroll down" className=" absolute bottom-2 left-1/2 rounded-full bg-transparent border border-white"></button>
    </div>
 )
}
export default Accueil;