import React from 'react';
import '../style/featuredproduct.css';
import { Link } from 'react-router-dom';


function Categories() {
    const featuredList = [
      {
        img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx_IUp3XUFcjJtM15SD0YenbMmely5oLLN-A&s',
        title:'Jewelry',
        desc:'Discover our exquisite collection of jewelry with precious elements, where elegance meets craftsmanship.',
        link:'Jewelry'
      }
        ,
        {
          img:'https://cdn.vox-cdn.com/thumbor/3w70tjAjKqJupjMH5cHEQesbD5U=/0x0:2040x1360/2000x1333/filters:focal(1020x680:1021x681)/cdn.vox-cdn.com/uploads/chorus_asset/file/23795434/vpavic_220708_5335_0076.jpg',
          title:'Mobile Phones',
          desc:"Explore our wide range of mobile phones, featuring the latest technology and cutting-edge designs.",
          link:'Smartphone'
        },
        {
          img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStn-MtID2dZPKfdnzZmgF1kzehZSZSyIrXRw&s',
          title:'Clothes',
          desc:'Browse our stylish clothing collection, offering a variety of fashionable pieces for every occasion. ',
          link:'Clothes'
        },
        {
          img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN7k6cmg18_6MEJ8znD1NJig27U-MmgFTaFg&s',
          title:'Laptop',
          desc:'Discover our comprehensive range of laptops, designed to meet all your computing needs. ',
          link:'Laptop'
        },
        {
          img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7aZ1_Q0XYNXUUsVYNEYvhKz5t3i9a5X5rdw&s',
          title:'Shoes',
          desc:'Step into style with our diverse collection of shoes, perfect for every occasion and lifestyle.',
          link:'Shoes'
        },
        {
          img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8kPdqlz2d4dYcKlnzHgxMSxn9dsk8IaUbhA&s',
          title:'Television',
          desc:'Transform your viewing experience with our selection of TVs, crafted to deliver stunning visuals.',
          link:'TV'
        }
    ]
  return (
    <>
    <section className="featured-products">
    <div className='heading-container'>
      <h2 className="heading">Categories
      </h2>
      <hr className='horizontal-rule'/>
      </div>
      <div className="product-carousel">
        {featuredList.map((item, index) => (
            <div className="product-card" key={index}>
              <Link to={`/search/?q=${item.link.toLowerCase()}`}>
                <img style={{objectFit:'cover'}} loading='lazy' src={item.img} alt="" />
                </Link>
                <h4 className='cat-name'>{item.title}</h4>
                <div>{item.desc}</div>
                <Link to={`/search/?q=${item.link.toLowerCase()}`}>
                <button className='shop-now'>SHOP NOW </button>
                </Link>
            </div>
        ))}
      </div>
    </section>
    </>
  )
}

export default Categories