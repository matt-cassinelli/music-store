import { useDispatch } from "react-redux";
import { toggleMenu } from "../../redux/menuSlice";

export default function MenuButton() {

  const dispatch = useDispatch();

  return (
    <button type='button' className='show-under-width-breakpoint' onClick={() => dispatch(toggleMenu())}>
      <svg className='menu-icon-svg' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92.8 92.8">
        <path d="M90 2H3C1 2 0 3 0 5v13c0 2 1 3 3 3h87c1 0 3-1 3-3V5c0-2-2-3-3-3z"/>
        <path d="M90 37H3c-2 0-3 1-3 3v13c0 2 1 3 3 3h87c1 0 3-1 3-3V40c0-2-2-3-3-3z"/>
        <path d="M90 72H3c-2 0-3 1-3 3v13c0 2 1 3 3 3h87c1 0 3-1 3-3V75c0-2-2-3-3-3z"/>
      </svg>
    </button>
  );
}