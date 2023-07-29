// onClick is passed through as a prop, allowing the component to be reused for different use-cases.

export default function CloseButton({onClick}) {
    return (
        <button className='close-btn' type='button' onClick={onClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                <path fill="currentColor" d="M9 6 6 9l16 16L6 41l3 3 16-16 16 16 3-3-16-16L44 9l-3-3-16 16Z"/>
            </svg>
        </button>
    )
}