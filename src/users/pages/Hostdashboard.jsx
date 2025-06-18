import React, { useState } from 'react'
import SpotAdding from './SpotAdding'
import PropertyList from './PropertyList'
import ReservationList from './ReservationList'
import Header from '../components/Header';

function Hostdashboard() {

     const [tab, setTab] = useState("add");
  return (
    <>
    <Header/>
     <div className="p-4 ">
      <div className="flex gap-4  justify-center items-center mb-6 mt-5 md:mt-20">
        <button onClick={() => setTab("add")} className={ tab == 'add' ?"bg-orange-700 px-2 py-1 md:px-4 md:py-2 text-white rounded" :"bg-[white] border border-orange-700 px-2 py-1 md:px-4 md:py-2 text-orange-700 rounded" }>Add Camp</button>
        <button onClick={() => setTab("list")} className={ tab == 'list' ?"bg-orange-700 px-2 py-1 md:px-4 md:py-2 text-white rounded" :"bg-[white] border border-orange-700 px-2 py-1 md:px-4 md:py-2 text-orange-700 rounded" }>Camp List</button>
        <button onClick={() => setTab("reservations")} className={ tab == 'reservations' ?"bg-orange-700 px-2 py-1 md:px-4 md:py-2 text-white rounded" :"bg-[white] border border-orange-700 px-2 py-1 md:px-4 md:py-2 text-orange-700 rounded" }>Reservations</button>
      </div>

      {tab === "add" && (
        <SpotAdding/>
         
        
      )}
      

      {tab === "list" && <PropertyList/>}
      {tab === "reservations" && <ReservationList/>}
    </div>
    
    </>
  )
}

export default Hostdashboard