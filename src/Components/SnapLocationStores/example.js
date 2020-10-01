class SnapLocationsList extends Component {
     constructor(props) {
          super(props);
           this.state = {snapLocationLists: []}; 
        } 
    render() {
         console.log(typeof this.props.snapLocationsList);
         return (
              <React.Fragment>
                   <div className="snaplocationslist"> {
          this.props.snapLocationsList.map(SLL => { 
             if (this.props.snapLocationList)  {
             this.props.snapLocationList.map(SLL => {
                  return (
                       <div key={SLL._ObjectId} className="placename"> 
            <h1 to={`/snaplocations/${SLL._ObjectId}`}>
                 <h2>{SLL.name}</h2> 
                 <p></p> 
                 </h1> 
                 </div>
                  ); } )}
                  </div> 
                  <div className="snapmap"> 
                  <MapContainer snapLocationsList={this.props.snapLocationsList} />
                   </div> 
                  </React.Fragment>
                  
                  );
                 } 
                } 
                  
                  
                  
                  export default SnapLocationsList;

