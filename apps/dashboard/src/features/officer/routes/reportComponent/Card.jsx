import React from 'react'

const Card = ({data, withoutName}) => {
    return (
       <div className={`grid m-2 ${withoutName ? "grid-cols-4" : "grid-cols-5"} text-xs mb-4 text-center divide-y divide-slate-400`} style={{ borderBottom: '1px solid rgb(148,163,184)' }}>
          {withoutName ? null : <div style={{ border: 0 }}></div>}
          <div className={`${withoutName ? "col-span-4 " : "col-span-4 "}`+"bg-slate-400 h-6 leading-6 text-white text-center"}>{data.cardSize}</div>
          {withoutName ? null : <div className="font-semibold h-6 leading-6 " style={{ border: 0 }}>{data.name}</div>}
          <div className="font-semibold h-6 leading-6">Required</div>
          <div className="font-semibold h-6 leading-6">1</div>
          <div className="font-semibold h-6 leading-6">2</div>
          <div className="font-semibold h-6 leading-6">3</div>
          {
            data.specification.map((spe) => (
                <>
                    {withoutName ? null : <div className="font-semibold h-6 leading-6">{spe.name}</div>}
                    <div>{spe.required}</div>
                    <div>{spe.one}</div>
                    <div>{spe.two}</div>
                    <div>{spe.three}</div>
                </>
            ))
          }
       </div>
    )
 }

export default Card