import React from 'react'

const CardWeight = ({data, withoutName}) => {
    return (
       <div className={`flex-1 grid m-2 ${withoutName ? "grid-cols-4" : "grid-cols-5"} text-xs mb-4 text-center divide-y divide-slate-400 auto-cols-auto`} style={{ borderBottom: '1px solid rgb(148,163,184)' }}>
          {withoutName ? null : <div style={{ border: 0 }}></div>}
          <div className="col-start-3 h-6 leading-6 col-span-3 bg-slate-400 text-white text-center">{data.cardSize}</div>
          {withoutName ? null :  <div className="col-span-2 text-left font-semibold h-6 leading-6 " style={{ border: 0 }}>{data.name}</div>}
          <div className="font-semibold h-6 leading-6">Req.</div>
          <div className="font-semibold h-6 leading-6">1</div>
          <div className="font-semibold h-6 leading-6">2</div>
          {
            data.specification.map((spe) => (
                <>
                    {withoutName ? null : <div className="col-span-2 text-left font-semibold h-6 leading-6">{spe.name}</div>}
                    <div>{spe.required}</div>
                    <div>{spe.one}</div>
                    <div>{spe.two}</div>
                </>
            ))
          }
       </div>
    )
 }

export default CardWeight