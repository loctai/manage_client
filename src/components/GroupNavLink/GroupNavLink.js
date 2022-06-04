import React from 'react'
import NavLink from '../NavLink/NavLink'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function GroupNavLink(prop) {
    const navLinkElements = prop.navLinks.map((navLink) => {
        return <NavLink key={navLink.name} link={navLink.link} icon={navLink.icon} name={navLink.name}></NavLink>
    })
    return (
        <div className="accordion" >
            <div className="accordion-item mb-2">
                <h2 className="accordion-header" id={`heading${prop.groupId}`}>
                    <button className="accordion-button collapsed p-3" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${prop.groupId}`} aria-expanded="false" aria-controls={`collapse${prop.groupId}`}>
                        <span><FontAwesomeIcon icon={prop.icon} />  {prop.title}</span>
                    </button>
                </h2>
                <div id={`collapse${prop.groupId}`} className="accordion-collapse collapse" aria-labelledby={`heading${prop.groupId}`}>
                    <div className="accordion-body">
                        {navLinkElements}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default GroupNavLink