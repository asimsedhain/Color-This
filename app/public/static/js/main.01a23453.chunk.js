(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{17:function(e,t,a){e.exports=a(27)},23:function(e,t,a){},27:function(e,t,a){"use strict";a.r(t);var n=a(1),l=a.n(n),r=a(15),c=a.n(r),i=(a(22),a(23),a(11)),o=a.n(i),s=a(12),m=a(6),u=a(7),p=a(9),d=a(8),h=a(10),g=a(32),f=a(33),I=a(31),b=a(28),E=a(29),v=a(30),O=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(p.a)(this,Object(d.a)(t).call(this,e))).uploadImage=function(e){alert("Hello"),e.preventDefault()},a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return l.a.createElement(b.a,{className:"my-5"},l.a.createElement(E.a,{tag:"h5",className:"text-center"},"Image Submission"),l.a.createElement(v.a,null,l.a.createElement("form",{className:"form-signin",id:"form",action:"/upload",method:"POST",encType:"multipart/form-data"},l.a.createElement("div",{className:"form-group",onSubmit:this.props.uploadImage},l.a.createElement("input",{type:"file",id:"Image",className:"form-control",name:"Original",placeholder:"Submit Image",required:!0,onChange:this.props.handleImageChange,value:this.props.inputValue})),l.a.createElement("button",{className:"btn btn-primary btn-block text-uppercase",value:"Submit",id:"login",type:"submit",onClick:this.props.uploadImage},"Submit"))))}}]),t}(n.Component),j=a(16),y=a.n(j),S=function(e){function t(e){return Object(m.a)(this,t),Object(p.a)(this,Object(d.a)(t).call(this,e))}return Object(h.a)(t,e),Object(u.a)(t,[{key:"renderImage",value:function(){return 2===this.props.imageState?l.a.createElement(l.a.Fragment,null,l.a.createElement(I.a,{className:"d-flex justify-content-center "},l.a.createElement(b.a,null,l.a.createElement(E.a,{className:"text-center"},"Original Image"),l.a.createElement(v.a,null,l.a.createElement("img",{src:"http://localhost:5000/upload/original?id=".concat(this.props.imageId),alt:"",width:"256",height:"256"})))),l.a.createElement(I.a,{className:"d-flex justify-content-center "},l.a.createElement(b.a,null,l.a.createElement(E.a,{className:"text-center"},"Colored Image"),l.a.createElement(v.a,null,"      ",l.a.createElement("img",{src:"http://localhost:5000/upload/color?id=".concat(this.props.imageId),alt:"",width:"256",height:"256"}))))):1===this.props.imageState?l.a.createElement(y.a,{type:"balls",color:"#000",height:"10%",width:"10%",className:"mx-auto"}):l.a.createElement(l.a.Fragment,null)}},{key:"render",value:function(){return this.renderImage()}}]),t}(n.Component),w=function(e){function t(e){var a;return Object(m.a)(this,t),(a=Object(p.a)(this,Object(d.a)(t).call(this,e))).uploadImage=function(){var e=Object(s.a)(o.a.mark((function e(t){var n,l,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),(n=new FormData).append("Original",a.state.selectedFile),e.next=5,fetch("http://localhost:5000/upload",{method:"POST",body:n});case 5:return l=e.sent,e.next=8,l.json();case 8:r=e.sent.imageId,a.loadImageInterval=setInterval(a.loadImage,1e3),a.setState({selectedFile:null,inputValue:"",imageState:1,imageId:r});case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),a.loadImage=Object(s.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("http://localhost:5000/upload/color?id=".concat(a.state.imageId));case 2:200==e.sent.status&&(a.setState({imageState:2}),clearInterval(a.loadImageInterval));case 4:case"end":return e.stop()}}),e)}))),a.handleImageChange=function(e){a.setState({selectedFile:e.target.files[0],inputValue:e.target.value})},a.state={selectedFile:null,inputValue:"",imageState:0,imageId:null},a.loadImageInterval=null,a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return l.a.createElement("div",{className:"App"},l.a.createElement(g.a,{className:"container"},l.a.createElement(f.a,null,l.a.createElement(I.a,{sm:"9",md:"7",lg:"5",className:"mx-auto"},l.a.createElement(O,{uploadImage:this.uploadImage,handleImageChange:this.handleImageChange,inputValue:this.state.inputValue}))),l.a.createElement(f.a,null,l.a.createElement(S,{imageState:this.state.imageState,imageId:this.state.imageId}))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(l.a.createElement(w,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[17,1,2]]]);
//# sourceMappingURL=main.01a23453.chunk.js.map