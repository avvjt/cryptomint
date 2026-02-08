/* Core concept: styling with utilty classes */

function styling() {
    return (
        <div className="flex bg-amber-950 p-6 justify-center">
            <div className="flex bg-white border-2 rounded-xl items-center justify-center p-2">
                <img 
                src="./src/assets/logo.png"
                className="h-10 w-auto "/>
                <p className="text-black">Thats a paragraph tag!</p>
            </div>
        </div>

    );
}
export default styling;