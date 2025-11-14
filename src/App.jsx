import { ScrollTrigger, SplitText } from 'gsap/all';
import gsap from 'gsap';
gsap.registerPlugin(ScrollTrigger, SplitText);

function App() {
  return (
    <div className='flex-center h-[100vh]'>
      <h1 className='text-3xl text-amber-300'>dsad</h1>
    </div>
  );
}

export default App;
