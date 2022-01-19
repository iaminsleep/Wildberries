import React from 'react';

import GoodItem from '../components/goodItem';

function Goods({API, category, goods}) {
  return (
    <section className="long-goods d-block">
      <div className="container">
        <div className="row align-items-center mb-4">
          <div className="col-12">
            <h2 className="section-title">{category}</h2>
          </div>
        </div>
        <div className="row long-goods-list">  
          {goods.map(good => 
            <GoodItem 
              key={good.id} id={good.id} name={good.name} 
              description={good.description} price={good.price} 
              img={good.img} label={good.label} API={API}
            />)}
        </div>
      </div>
    </section>
  );
}

export default Goods;