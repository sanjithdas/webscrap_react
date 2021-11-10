/**
 * Generating the Line Graph
 */
import React from 'react';
import {Line} from 'react-chartjs-2';

export default class LineGraph extends React.Component {
  /**
   * Class based component
   * initalise the state required to draw the graph
   */

   state = {
    labels: [],
    datasets: [{}],
    yAxisMax: 0,
    apidata: this.props.arrCol
   }

   
  /**
   * called just after the render
   *  the component has already been rendered once by the time it invokes componentDidMount()
   */

 componentDidMount(){   
     this.drawLineGraph();
  }   
  /**
   * drawing graph
   * set all the state / data required to draw the graph
   * 
   */
  drawLineGraph(){
    let data = [];
    let itemLabels = [];  
    let xAxis = [];
    this.state.apidata.map(arcol=>{   
      data.push(arcol.col1) 
      xAxis.push(arcol.col2);   
      itemLabels.push(arcol.col3);     
    })
    this.setState({apidata: this.props.arrCol})
    this.setState({ 
       labels:   xAxis[0],   
        datasets:[
           {
              label: 'World Record Progression',         
              data:  data[0]?? data[0] ,
              backgroundColor:[
               'rgba(255,105,145,0.6)',
               'rgba(155,100,210,0.6)',
               'rgba(90,178,255,0.6)',
               'rgba(240,134,67,0.6)',
               'rgba(120,120,120,0.6)',
               'rgba(250,55,197,0.6)'
            ]
           }
        ]
     
     });
   /**
    *  find the maximum value in the array (using length) 
    *  to draw the Y-axis
    *   
    */
     if (data){ 
      const dataLength = data[0] && data[0].length-1;
      let maxY = data[0] && data[0][dataLength];
      this.setState({yAxisMax:maxY})           
   }  
  }
   
  render() {
     return (
      <div>
        <Line
          data={this.state}       
           options={
             {
               
            title:{
              display:true,
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            },
            scales: {
              y: {
                 max: this.state.yAxisMax,
                 min: 0,
                 ticks: {
                    stepSize: 0.3
                 }
              }
           }
          }
        }
        />
      </div>
    );
  }
}
