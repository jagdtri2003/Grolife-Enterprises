import React from 'react';
import '../style/featuredproduct.css';
import { Link } from 'react-router-dom';


function Categories() {
    const featuredList = [
      {
        img:'https://www.jiomart.com/images/product/original/rvva2bsxc3/foodcan-mix-dry-fruits-seeds-and-nuts-fresh-and-healthy-dry-fruits-seeds-nuts-mix-50g-pack-product-images-orvva2bsxc3-p599259561-1-202303120019.jpg?im=Resize=(420,420)',
        title:'Dry Fruit',
        desc:'Fuel your day with the finest selection of premium dry fruits, packed with natural nutrients and rich flavors.',
        link:'Dry Fruit'
      }
        ,
        {
          img:'https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/general-nutrition-wellness/2-2-2-2foodgroups_vegetables_detailfeature.jpg?sfvrsn=226f1bc7_6',
          title:'Vegetable',
          desc:"Discover farm-fresh vegetables bursting with vibrant flavors and essential nutrients.Enjoy the healthiest choices!",
          link:'Vegetable'
        },
        {
          img:'https://www.euroschoolindia.com/wp-content/uploads/2023/04/ways-to-eat-more-fruit.jpg',
          title:'Fruits',
          desc:'Savor the sweetness of nature with our fresh, juicy fruits, picked at peak ripeness for maximum flavor and nutrition!',
          link:'Fruit'
        },
        {
          img:'https://4.imimg.com/data4/IO/YE/MY-19092185/kitchen-gas-lighter-500x500.jpg',
          title:'Kitchen Appliance',
          desc:'Discover our comprehensive range of Kitchen Appliances, designed to meet all your needs. ',
          link:'Kitchen Appliance'
        },
        {
          img:'https://t4.ftcdn.net/jpg/02/17/97/11/360_F_217971177_4mV3Vl6LrIrDCCje2RRAyz4eyPdwrKpl.jpg',
          title:'Disposable Plates',
          desc:'Stay productive and productive with our Disposable Laptops.',
          link:'Disposable Plates'
        },
        {
          img:'https://m.media-amazon.com/images/I/81nUtfk0rtL.jpg',
          title:'Bakery & Cakes',
          desc:'Explore our range of baked goods and cakes, perfect for any occasion.',
          link:'Bakery & Cakes'
        },
        {
          img:"https://www.dairyfoods.com/ext/resources/DF/2020/August/df-100/GettyImages-1194287257.jpg?t=1597726305&width=696",
          title:'Dairy Products',
          desc:'Our range of dairy products offers a wide variety of healthy options.',
          link:'Dairy Products'
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