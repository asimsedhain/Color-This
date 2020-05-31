(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{16:function(e,t,a){e.exports=a.p+"static/media/model.e7ac9218.svg"},17:function(e,t,a){e.exports=a.p+"static/media/limit.10657ebf.svg"},18:function(e,t,a){e.exports=a.p+"static/media/future.66e87870.svg"},21:function(e,t,a){e.exports=a(32)},27:function(e,t,a){},31:function(e,t,a){},32:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(10),c=a.n(l),i=(a(26),a(27),a(6)),o=a.n(i),s=a(11),m=a(8),u=a(12),d=a(13),g=a(19),p=a(14),h=a(20),b=a(40),f=a(41),x=a(39),y=a(33),E=a(34),v=a(35),I=a(36),w=a(37),N=a(38);var O=function(e){var t=this;return r.a.createElement(y.a,null,r.a.createElement(E.a,{sm:"9",md:"7",lg:"5",className:"mx-auto"},r.a.createElement(v.a,{className:"my-3",style:{borderRadius:0}},r.a.createElement(I.a,{tag:"h5",className:"text-center bg-light text-dark"},"Colorize Your Image"),r.a.createElement(w.a,null,r.a.createElement(N.a,{tag:"h5",className:"text-secondary"},"Submit Your Image"),r.a.createElement("form",{className:"form-signin",id:"form",action:"/upload",method:"POST",encType:"multipart/form-data"},r.a.createElement("div",{className:"form-group",onSubmit:e.uploadImage},r.a.createElement("input",{type:"file",id:"Image",className:"form-control",style:{borderRadius:0},name:"Original",placeholder:"Submit Image",required:!0,onChange:e.handleImageChange,value:e.inputValue})),r.a.createElement("button",{className:"btn yellow btn-block text-uppercase text-light",value:"Submit",id:"login",type:"submit",onClick:e.uploadImage,style:{borderRadius:0}},"Submit")),r.a.createElement("div",{className:"mt-3"},r.a.createElement(N.a,{tag:"h5",className:"text-secondary"},"Or, Try a Sample Image"),r.a.createElement("div",{className:"d-flex",style:{borderRadius:0}},r.a.createElement(y.a,null,e.exampleImages.map((function(a){return r.a.createElement(E.a,{key:a.id},r.a.createElement("img",{src:a.src,alt:"Sample",style:a.selected?{borderRadius:0}:{filter:"grayscale(100%)",borderRadius:0},className:"img-thumbnail",onClick:e.handleExampleImageClick.bind(t,a.id)}))})))))))))},k=a(15),j=a.n(k);var S=function(e){return r.a.createElement(y.a,null,2===e.imageState?r.a.createElement(r.a.Fragment,null,r.a.createElement(E.a,{className:"d-flex justify-content-xl-center justify-content-lg-center justify-content-md-between justify-content-sm-between flex-wrap"},r.a.createElement("div",{className:"mx-auto mx-md-auto mx-sm-auto mx-lg-5 mx-xl-5 my-2"},r.a.createElement("h5",{className:"text-center text-secondary"},"Original Image"),r.a.createElement(w.a,null,r.a.createElement("img",{src:e.originalURL,alt:"",width:"256",height:"256"}))),r.a.createElement("div",{className:"mx-auto mx-sm-auto mx-md-auto mx-lg-5 mx-xl-5 my-2"},r.a.createElement("h5",{className:"text-center text-secondary"},"Colored Image"),r.a.createElement(w.a,null,r.a.createElement("img",{src:e.colorURL,alt:"",width:"256",height:"256"}))))):1===e.imageState?r.a.createElement("div",{className:"mx-auto"},r.a.createElement("div",{className:"text-uppercase font-weight-light"},"coloring at the speed of light"),r.a.createElement(j.a,{type:"balls",color:"#427AA1",height:"30%",width:"30%",className:"mx-auto"})):r.a.createElement(r.a.Fragment,null))};var R=function(e){var t,a,n,l=function(e){switch(e){case"light":return{bg:"bg-light",text:"text-secondary"};case"dark":return{bg:"bg-dark",text:"text-light"};case"secondary":return{bg:"bg-secondary",text:"text-light"};case"yellow":return{bg:"yellow",text:"text-light"};case"green":return{bg:"green",text:"text-light"};default:return{bg:"bg-white",text:"text-secondary"}}};return r.a.createElement(x.a,{fluid:!0,className:"".concat(l(e.sty).bg," py-5")},r.a.createElement(x.a,null,r.a.createElement(y.a,{className:"align-items-center"},e.icon?(a=e.icon,n=1===(n=e.iconOrder)?"pb-5 order-sm-1":"pb-5 order-sm-0",r.a.createElement(E.a,{className:"col-12 col-sm-4 col-md-3 col-lg-2 col-xl-2 pb-sm-0 ".concat(n," order-0")},r.a.createElement("div",{className:"d-flex justify-content-center"},r.a.createElement("img",{src:a,height:"100%",width:"100%",className:"col-6 col-sm-12"})))):r.a.createElement(r.a.Fragment,null),r.a.createElement(E.a,null,r.a.createElement("div",null,r.a.createElement("h2",{className:"".concat(l(e.sty).text)},e.content.heading)),r.a.createElement("div",null,r.a.createElement("h3",{className:"font-weight-light ".concat(l(e.sty).text)},e.content.subheading)),e.content.text.map((function(t,a){return r.a.createElement("div",{key:a,className:"font-weight-light  ".concat(l(e.sty).text)},t)})),(t=e.content.points)?r.a.createElement("ul",{className:"mt-2"},t.map((function(t,a){return r.a.createElement("li",{key:a,className:"font-weight-light  ".concat(l(e.sty).text)},t)}))):r.a.createElement(r.a.Fragment,null)))))},C={heading:"How it works",subheading:"Colorization Using Deep Learning",text:["Submit your image below and using our deep learning state of the art model, we will produce a realistic colorization.","Make your old pictures come back to life with the power of deep learning."]},L={heading:"Our Model",subheading:"Deep Generative Adversarial Network",text:["Our model is based on the paper by Richard Zhang. It has been trained on one million images from the ImageNet dataset running on sixteen Nvidia 1080 ti.","You can learn more about the training process over here."]},U={heading:"Current Limitation",subheading:"Deep Learning is Hard",text:["Due to constraints on resources, we are not able to deliver the best possible results.","The following is a list of limitation of our current model.\t"],points:["256 X 256 image size.","Only 1:1 ratio supported. Crop/edit before hand for improved performance.","Discolored skin.","No user interaction."]},F={heading:"Planned Features",subheading:"The Future Man!",text:["It might seem doom and gloom, friends. But worry not our slaves *ahem ahem* I mean, our engineers are working hard to bring the best experience.","The following is a list of features planned to released soon."],points:["Increased image resolution.","User Interaction.","Support for videos.","Variable Image ratios."]},D=(a(31),a(16)),P=a.n(D),T=a(17),V=a.n(T),A=a(18),_=a.n(A);function z(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function B(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?z(a,!0).forEach((function(t){Object(s.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):z(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var M="/upload",Y=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(g.a)(this,Object(p.a)(t).call(this,e))).uploadImage=function(){var e=Object(m.a)(o.a.mark((function e(t){var n,r,l;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),!a.state.selectedFile){e.next=13;break}return a.setState({inputValue:"",imageState:1,exampleImages:a.state.exampleImages.map((function(e){return B({},e,{selected:!1})}))}),(n=new FormData).append("Original",a.state.selectedFile),e.next=7,fetch(M,{method:"POST",body:n});case 7:return r=e.sent,e.next=10,r.json();case 10:l=e.sent.imageId,a.setState({selectedFile:null,imageId:l}),a.loadImageInterval=setInterval(a.loadImage,1e3);case 13:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),a.loadImage=function(){var e=Object(m.a)(o.a.mark((function e(t){var n,r,l;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t?"true":"",e.next=3,fetch("".concat(M,"/color?id=").concat(a.state.imageId,"&skipDictionary=").concat(n));case 3:if(200!==(r=e.sent).status){e.next=22;break}return e.next=7,fetch("".concat(M,"/original?id=").concat(a.state.imageId,"&skipDictionary=").concat(n));case 7:return l=e.sent,e.t0=a,e.t1=URL,e.next=12,r.blob();case 12:return e.t2=e.sent,e.t3=e.t1.createObjectURL.call(e.t1,e.t2),e.t4=URL,e.next=17,l.blob();case 17:e.t5=e.sent,e.t6=e.t4.createObjectURL.call(e.t4,e.t5),e.t7={imageState:2,colorURL:e.t3,originalURL:e.t6},e.t0.setState.call(e.t0,e.t7),clearInterval(a.loadImageInterval);case 22:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),a.handleImageChange=function(e){a.setState({selectedFile:e.target.files[0],inputValue:e.target.value})},a.handleExampleImageClick=function(e){e!==a.state.imageId&&(a.setState({imageId:e,imageState:1,exampleImages:a.state.exampleImages.map((function(t){return e===t.id?B({},t,{selected:!0}):B({},t,{selected:!1})}))}),clearInterval(a.loadImageInterval),a.loadImageInterval=setInterval((function(){return a.loadImage(!0)}),1e3))},a.state={selectedFile:null,inputValue:"",imageState:0,imageId:null,colorURL:null,originalURL:null,exampleImages:[{id:"5ec14ad608db08b724a2b4e0",src:" ../sample_image_0.jpg",selected:!1},{id:"5ec14be608db082acaa2b4e1",src:" ../sample_image_1.jpg",selected:!1},{id:"5ec14c1608db080a3ca2b4e3",src:" ../sample_image_2.jpg",selected:!1}]},a.loadImageInterval=null,a}return Object(h.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement(b.a,{className:"yellow"},r.a.createElement(f.a,{className:"text-white mx-auto navbar-brand text-uppercase font-weight-bold"},r.a.createElement("h1",null,"Color This"))),r.a.createElement("div",null),r.a.createElement(R,{sty:"light",content:C}),r.a.createElement(x.a,{className:"my-5"},r.a.createElement(O,{uploadImage:this.uploadImage,handleImageChange:this.handleImageChange,inputValue:this.state.inputValue,exampleImages:this.state.exampleImages,handleExampleImageClick:this.handleExampleImageClick}),r.a.createElement(S,{imageState:this.state.imageState,colorURL:this.state.colorURL,originalURL:this.state.originalURL})),r.a.createElement(R,{sty:"yellow",content:L,style:{backgroundColor:"#EBF2FA"},icon:P.a}),r.a.createElement(R,{sty:"white",content:U,icon:V.a,iconOrder:1}),r.a.createElement(R,{sty:"light",content:F,icon:_.a}),r.a.createElement("footer",null,r.a.createElement("div",{className:"container-fluid yellow text-center text-light p-4"},"Copyright \xa9 Ashim Sedhain")))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(Y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[21,1,2]]]);
//# sourceMappingURL=main.1401775d.chunk.js.map