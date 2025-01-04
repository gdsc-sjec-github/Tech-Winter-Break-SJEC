import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const Header = (fileName) => {
  return (
    <nav className="navbar navbar-expand-lg mt-2 pb-0 navbar-light bg-white shadow-sm">
        <p className="navbar-brand fw-bold ms-5">{fileName}</p>
        <ul className = "navbar-nav">
            <li className="nav-item">
                <button className="btn btn-success">
                    <FontAwesomeIcon icon={faSave}/>
                </button>
            </li>
        </ul>
    </nav>
  )
}

export default Header
