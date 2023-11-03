'use client'
import React from 'react'; 
import { Avatar } from 'primereact/avatar';


const IconPhoto = () => {
    return (
        <div className="card">
            <div className="flex flex-wrap gap-5"> 
                <div className="flex-auto">
                  
                <Avatar  size="large" style={{ backgroundColor: '#151357', color: '#ffffff' }} shape="circle" image='https://i.pinimg.com/originals/12/ed/03/12ed03a7b8fcd3d46cb384b41ff44135.png' />
                </div>
            </div>
        </div>
    )
}
        
export default IconPhoto