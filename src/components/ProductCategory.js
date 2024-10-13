import React from 'react'
import { Link } from 'react-router-dom'

function ProductCategory({category,items}) {
  return (
    <section className="featured-products">
    <div className='heading-container'>
      <h2 className="heading">{category[0].toUpperCase()+category.slice(1)}
      </h2>
      <hr className='horizontal-rule'/>
      </div>
      <div className="product-carousel">
        {items && items.map((item,index) => (
            <Link to={`/item/${item.id}`} className="product-card" key={`${item.id}-${index}`}>
                <img style={{height:'80%'}} loading='lazy' src={item.Image} alt={item.Name} />
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',color:'black',marginTop:'5px'}}>
                  <div style={{marginLeft:'15px',fontWeight:'bold'}}>{item.Name[0].toUpperCase()+item.Name.slice(1)}</div>
                  <div style={{marginRight:'15px'}}>₹{item.Price}</div>
                </div>
            </Link>
        ))}
      </div>
    </section>
  )
}

export default ProductCategory