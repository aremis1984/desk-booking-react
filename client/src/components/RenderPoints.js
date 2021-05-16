import React from "react";
import ReactTooltip from "react-tooltip";

export const isFuture = (date) => {
    const now = new Date()
    return (Math.ceil(Math.abs(new Date(date) - now) / (1000 * 60 * 60 * 24)) >= 0)
}

export const renderPoints = (desks, chooseDesk, users, extraClass) => {
    return desks.map((desk, index) => {
        let deskId = desk.id
        let isTaken = desk.booked_by !== -1 && isFuture(desk.to)
        let takenBy = isTaken && users.find((user, i) => {
            return user.id === desk.booked_by
        })
        let takenUntil = new Date(desk.to)
        let takenByInitials = takenBy && (takenBy.firstname[0] + takenBy.surname[0])
        let deskStatus = 'point'
        if(isTaken) {
            deskStatus += ' taken'
        }
        return (
            <div key={desk.id} className={extraClass}>
                <div
                    key={'desk' + desk.id}
                    id={'d' + desk.id}
                    data-tip=''
                    data-for={'t' + index}
                    className={deskStatus}
                    onClick={()=>chooseDesk(deskId)}>
                    <span>{takenByInitials}</span>
                </div>
                {isTaken && <ReactTooltip key={'tooltip'+desk._id} id={'t'+index} place='top' effect='solid'>
                    Booked by: {(takenBy.firstname)} {(takenBy.surname)} until: {takenUntil.toLocaleDateString()}
                </ReactTooltip>}
            </div>
        )
    })
}