(this["webpackJsonpsnap-locator-client"]=this["webpackJsonpsnap-locator-client"]||[]).push([[0],{158:function(e,t,a){e.exports=a(370)},163:function(e,t,a){},164:function(e,t,a){},165:function(e,t,a){},170:function(e,t,a){},171:function(e,t,a){},172:function(e,t,a){},370:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(66),l=a.n(o),i=(a(163),a(12)),s=a(13),c=a(15),u=a(14),m="localhost:3000/api`",d="snap-client-auth-login",h={saveAuthToken:function(e){window.sessionStorage.setItem(d,e)},getAuthToken:function(){return window.sessionStorage.getItem(d)},clearAuthToken:function(){window.sessionStorage.removeItem(d)},hasAuthToken:function(){return!!h.getAuthToken()},makeBasicAuthToken:function(e,t){return window.btoa("".concat(e,":").concat(t))}},p=h,g=a(1),f=(a(164),a(165),a(20)),v=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={clicked:!1},e.handleLogoutClick=function(){p.clearAuthToken(),p.clearUserName()},e.onClick=function(){e.setState({clicked:!e.state.clicked})},e}return Object(s.a)(a,[{key:"renderLogoutLink",value:function(){return r.a.createElement(f.b,{onClick:this.handleLogoutClick,to:"/"},"Logout")}},{key:"renderLoginLink",value:function(){return r.a.createElement(f.b,{to:"/login"},"Log in")}},{key:"render",value:function(){this.state.clicked;return r.a.createElement("div",null,r.a.createElement("ul",{className:"navbar"},r.a.createElement("li",null,r.a.createElement(f.b,{to:"/"},"Home")),r.a.createElement("li",null,r.a.createElement(f.b,{to:"/about"},"About")),r.a.createElement("li",null,r.a.createElement(f.b,{to:"/find"},"Find SNAP retailer")),p.hasAuthToken()?r.a.createElement("li",null,r.a.createElement(f.b,{to:"/account"},"My Account")):null,r.a.createElement("li",null,p.hasAuthToken()?this.renderLogoutLink():this.renderLoginLink()),r.a.createElement(f.b,{to:"/"})))}}]),a}(n.Component),E=(a(170),function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={redirect:!1,where:""},e.switchPage=function(t){"Home"===t&&p.hasAuthToken()&&(t="LandingPage"),e.setState({redirect:!e.state.redirect,where:t})},e}return Object(s.a)(a,[{key:"render",value:function(){var e=this,t=this.state,a=t.redirect,n=t.where;return a?r.a.createElement(g.a,{to:"/".concat(n)}):r.a.createElement("div",null,r.a.createElement(v,null),r.a.createElement("section",{className:"banner"},r.a.createElement("div",{className:"Cover"},r.a.createElement("h2",null,"SNAP Locator"),r.a.createElement("p",null,"Connect with SNAP retailers and locations in your area"),r.a.createElement("button",{onClick:function(){return e.switchPage("Login")}},"Get started"))))}}]),a}(n.Component)),b={postLogin:function(e){var t=e.user_name,a=e.password;return fetch("".concat(m,"/auth/login"),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({user_name:t,password:a})}).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))}))},postUser:function(e){return fetch("".concat(m,"/users"),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(e)}).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))}))}},y=(a(171),function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).handleJwtLoginAuth=function(e){e.preventDefault();var t=e.target,a=t.return_user,r=t.return_pass;n.setState({error:null}),b.postLogin({user_name:a.value,password:r.value}).then((function(e){a.value="",r.value="",p.saveAuthToken(e.authToken),n.props.onValidLogin()})).then((function(){window.location="/my-account"})).catch((function(e){n.setState({error:alert("Invalid username or password. Please double-check your credentials.")})}))},n.state={newUser:!0,right:0,emailAddress:"",password:""},n}return Object(s.a)(a,[{key:"handleClick",value:function(e){this.state.newUser&&"signUp"!=e?this.setState({newUser:!1}):this.state.newUser||"signIn"==e||this.setState({newUser:!0})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"formContainer"},r.a.createElement("div",{className:"formHeader"},r.a.createElement("div",{className:this.state.newUser?"headerActive":"headerInActive",onClick:function(){return e.handleClick("signUp")}},r.a.createElement("button",{className:"headerButton"}," Sign Up ")),r.a.createElement("div",{className:this.state.newUser?"headerInActive":"headerActive",onClick:function(){return e.handleClick("signIn")}},r.a.createElement("button",{className:"headerButton"}," Sign In "))),r.a.createElement("div",{className:"formBody"},this.state.newUser?r.a.createElement(k,null):r.a.createElement(w,null)),r.a.createElement("div",{className:"formFooter"},r.a.createElement("button",{className:"saveForm"}," ",this.state.newUser?"Submit":"Login"," ")))}}]),a}(n.Component));y.defaultProps={onValidSignUp:function(){},onValidLogin:function(){}};var k=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"signUpContainer"},r.a.createElement("h4",{className:"headerText"},"Join Us Today"),r.a.createElement("div",{className:"inputSectionSplit"},r.a.createElement("input",{type:"text",className:"firstName",required:!0}),r.a.createElement("label",{className:"inputLabel"},"First Name")),r.a.createElement("div",{className:"inputSectionSplit"},r.a.createElement("input",{type:"text",className:"lastName",required:!0}),r.a.createElement("label",{className:"inputLabel"},"Last Name")),r.a.createElement("div",{className:"inputSection"},r.a.createElement("input",{type:"text",className:"emailAddress",required:!0}),r.a.createElement("label",{className:"inputLabel"},"Email Address")),r.a.createElement("div",{className:"inputSection"},r.a.createElement("input",{type:"password",className:"password",required:!0}),r.a.createElement("label",{className:"inputLabel"},"Password")))}}]),a}(n.Component),w=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"signInContainer"},r.a.createElement("h4",{className:"headerText"},"Welcome Back"),r.a.createElement("div",{className:"inputSection"},r.a.createElement("input",{type:"text",className:"userName",required:!0}),r.a.createElement("label",{className:"inputLabel"},"User Name")),r.a.createElement("div",{className:"inputSection"},r.a.createElement("input",{type:"text",className:"password",required:!0}),r.a.createElement("label",{className:"inputLabel"},"Password")))}}]),a}(n.Component),N=y,S=(a(172),function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){return Object(i.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(v,null),r.a.createElement("section",{className:"banner"},r.a.createElement("div",{className:"Cover"},r.a.createElement("h2",null,"SNAP Locator"),r.a.createElement("p",null,"Connect with SNAP retailers and locations in your area"),r.a.createElement("p",null,"SNAP Store locator is an application that helps users find access to SNAP retailers and grocers."),r.a.createElement("p",null," communities suffer disproportionately from illness related to lack of access to fresh and healthy foods."),r.a.createElement("p",null,"SNAP Store Locator will allow the user to search for retailers and grocers nearby that accept SNAP benefits and also provide a list of food items that are sold."),r.a.createElement("p",null," SNAP stands for the Supplemental Nutrition Assistance Program mandated by the Federal Government and supervised by states to help millions of individuals and families who need financial assistance to buy food. Formerly known as the Food Stamp Program, SNAP provides an economic benefit as well as serving to eliminate hunger. "))))}}]),a}(n.Component)),j=a(154),A=a(32),P=a(46),O=a.n(P),L=a(157),C=a.n(L);O.a.setApiKey("AIzaSyDPpPhiwe2nBilWB_ihli85BlyRID4DnpU"),O.a.enableDebug();var _=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={address:"",city:"",area:"",state:"",zoom:15,height:400,mapPosition:{lat:0,lng:0},markerPosition:{lat:0,lng:0}},e.getCity=function(e){for(var t=0;t<e.length;t++)if(e[t].types[0]&&"administrative_area_level_2"===e[t].types[0])return e[t].long_name},e.getArea=function(e){for(var t=0;t<e.length;t++)if(e[t].types[0])for(var a=0;a<e[t].types.length;a++)if("sublocality_level_1"===e[t].types[a]||"locality"===e[t].types[a])return e[t].long_name},e.getState=function(e){for(var t=0;t<e.length;t++)for(var a=0;a<e.length;a++)if(e[a].types[0]&&"administrative_area_level_1"===e[a].types[0])return e[a].long_name},e.onChange=function(t){e.setState(Object(j.a)({},t.target.name,t.target.value))},e.onInfoWindowClose=function(e){},e.onMarkerDragEnd=function(t){var a=t.latLng.lat(),n=t.latLng.lng();O.a.fromLatLng(a,n).then((function(t){var r=t.results[0].formatted_address,o=t.results[0].address_components,l=e.getCity(o),i=e.getArea(o),s=e.getState(o);e.setState({address:r||"",area:i||"",city:l||"",state:s||"",markerPosition:{lat:a,lng:n},mapPosition:{lat:a,lng:n}})}),(function(e){console.error(e)}))},e.onPlaceSelected=function(t){console.log("plc",t);var a=t.formatted_address,n=t.address_components,r=e.getCity(n),o=e.getArea(n),l=e.getState(n),i=t.geometry.location.lat(),s=t.geometry.location.lng();console.log("latvalue",i),console.log("lngValue",s),e.setState({address:a||"",area:o||"",city:r||"",state:l||"",markerPosition:{lat:i,lng:s},mapPosition:{lat:i,lng:s}})},e}return Object(s.a)(a,[{key:"componentDidMount",value:function(){var e=this;navigator.geolocation?navigator.geolocation.getCurrentPosition((function(t){e.setState({mapPosition:{lat:t.coords.latitude,lng:t.coords.longitude},markerPosition:{lat:t.coords.latitude,lng:t.coords.longitude}},(function(){O.a.fromLatLng(t.coords.latitude,t.coords.longitude).then((function(t){console.log(t);var a=t.results[0].formatted_address,n=t.results[0].address_components,r=e.getCity(n),o=e.getArea(n),l=e.getState(n);console.log("city",r,o,l),e.setState({address:a||"",area:o||"",city:r||"",state:l||""})}),(function(e){console.error(e)}))}))})):console.error("Geolocation is not supported by this browser!")}},{key:"render",value:function(){var e=this,t=Object(A.withScriptjs)(Object(A.withGoogleMap)((function(t){return r.a.createElement(A.GoogleMap,{defaultZoom:e.state.zoom,defaultCenter:{lat:e.state.mapPosition.lat,lng:e.state.mapPosition.lng}},r.a.createElement(A.Marker,{google:e.props.google,name:"Dolores park",draggable:!0,onDragEnd:e.onMarkerDragEnd,position:{lat:e.state.markerPosition.lat,lng:e.state.markerPosition.lng}}),r.a.createElement(A.InfoWindow,{onClose:e.onInfoWindowClose,position:{lat:e.state.markerPosition.lat+.0018,lng:e.state.markerPosition.lng}},r.a.createElement("div",null,r.a.createElement("span",{style:{padding:0,margin:0}},e.state.address))),r.a.createElement(A.Marker,null),r.a.createElement(C.a,{style:{width:"100%",height:"40px",paddingLeft:"16px",marginTop:"2px",marginBottom:"2rem"},onPlaceSelected:e.onPlaceSelected,types:["(regions)"]}))})));return r.a.createElement("div",{style:{padding:"1rem",margin:"0 auto",maxWidth:1e3}},r.a.createElement(v,null),r.a.createElement(t,{googleMapURL:"https://maps.googleapis.com/maps/api/js?key=AIzaSyDPpPhiwe2nBilWB_ihli85BlyRID4DnpU&libraries=places",loadingElement:r.a.createElement("div",{style:{height:"100%"}}),containerElement:r.a.createElement("div",{style:{height:this.state.height}}),mapElement:r.a.createElement("div",{style:{height:"100%"}})}))}}]),a}(r.a.Component),U=function(e){Object(c.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={stores:[]},e}return Object(s.a)(a,[{key:"componentDidMount",value:function(){var e=this;p.getAuthToken()&&fetch("".concat(m,"/stores"),{headers:{authorization:"bearer ".concat(p.getAuthToken())}}).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))})).then((function(t){e.setState({stores:t})})).catch((function(e){console.error({error:e})}))}},{key:"render",value:function(){return r.a.createElement("main",{className:"App"},r.a.createElement(g.d,null,r.a.createElement(g.b,{path:"/NavBar",component:v}),r.a.createElement(g.b,{exact:!0,path:"/",component:E}),r.a.createElement(g.b,{exact:!0,path:"/about",component:S}),r.a.createElement(g.b,{path:"/login",component:N}),r.a.createElement(g.b,{path:"/find",component:_})))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(f.a,null,r.a.createElement(U,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[158,1,2]]]);
//# sourceMappingURL=main.14ae5747.chunk.js.map