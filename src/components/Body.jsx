import React from 'react'

export const Body = () => {
    return (
        <div>
           <form>
            <input type="text" className="phone-input" placeholder="Nhập số điện thoại" />
            <input type="text" className="id-input" placeholder="Nhập số CMND/CCCD" />
            <button className="submit-button">Gửi</button>
            </form> 
        </div>
    )
}
