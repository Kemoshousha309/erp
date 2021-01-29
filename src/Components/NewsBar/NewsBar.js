import React, { Component } from 'react';
import style from "./NewsBar.module.scss";

class NewsBar extends Component {
    state={
        newsContentArr: [
            "Nobody can make you feel inferior without your permission.",
            "It is the province of knowledge to speak, and it is the privilege of wisdom to listen",
            "He who has a why to live can bear almost any how.",
            "Take into account that great love and great achievements involve great risk.",
            "In three words I can sum up everything I’ve learned about life: it goes on."
        ],
    }
    componentDidUpdate(){
        console.log("Navigation newBar")
    }
    render(){
        return(
            <div style={{fontSize: "1.8rem"}} className={style.newsBar}>
                <div id="newsBar" className="carousel slide w-100" data-bs-ride="carousel">
                <div className="carousel-inner  w-100 text-center">
                     
                    {
                        this.state.newsContentArr.map((ele, index) => {
                            if(index === 0){
                                return (
                                    <div key={ele} className="carousel-item active">
                                        <div>{ele}</div>
                                    </div>
                                )
                            }else{
                                return (
                                    <div key={ele} className="carousel-item">
                                        <div >{ele}</div>
                                    </div>
                                )
                            }
                        })
                    }
                  
                </div>
                </div>
                <a style={{width:"4%"}} className="carousel-control-next" href="#newsBar" role="button" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </a>    
                <a style={{width:"4%"}} className="carousel-control-prev" href="#newsBar" role="button" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </a>
            </div>
           
        )   
    }
} 

export default NewsBar;