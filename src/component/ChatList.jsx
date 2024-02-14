import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

//({name, renameHandler}) => {}
const ChatList = (props) => {
    
    const [menuOpen, setMenuOpen] = useState(false); 
    const [isEditing, setEditing] = useState(false);
    const [label, setLabel] = useState(props.name);

    useEffect(() => {
        setLabel(props.name);
    }, [props]);

    const menuRef = useRef(null)

    const toggleMenu = ()=>{
        setMenuOpen(!menuOpen)
    }

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (<>
            {!isEditing && <span>{label}</span>}
            {isEditing && <input onChange={(e) => {setLabel(e.target.value)}} value={label} onBlur={() => {
                props.renameHandler(props.id, label);
                setEditing(false);
            }}></input>}
                        
            <button onClick={(e) => {
                e.stopPropagation();
                toggleMenu();
            }}>
                <span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12ZM17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12Z" fill="currentColor"></path>
                    </svg>
                </span>
            </button>
            {menuOpen && (
                <div ref={menuRef} className="dropMenu">
                    <ul>
                        <li onClick={() => {
                            // props.renameHandler(1, "새로운 이름");
                            setEditing(true);
                        }}>Rename</li>
                        <li onClick={()=>{
                            props.deleteHandler(props.id)
                        }}>Delete</li>
                    </ul>
                </div>
            )}
    </>         
    );
};
ChatList.defaultProps = {
    
}

ChatList.propTypes = {
    id:PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    renameHandler: PropTypes.func.isRequired,
    deleteHandler: PropTypes.func.isRequired,
}
export default ChatList;