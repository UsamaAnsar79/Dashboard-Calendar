import React from 'react'

export default function DetailsBoxComponent({icon,boxHeading1,boxHeading2,footerIcon,footerText}) {
  return (
    <div className='box'>
        <div className='box-header'>
        <div className='chat-icon'>
        <i className={icon}></i>
            </div>
        <div className='box-content'>
        <h4 className='boxHeading1'>{boxHeading1}</h4>
        <h3 className='boxHeading2'>{boxHeading2}</h3>
        </div>
        </div>
        <div className='box-footer'>
        <i className={footerIcon}></i>
        <h6>{footerText}</h6>
        </div>
    </div>
  )
}
