const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroSequelize = require('admin-bro-sequelizejs');
const {ActionButton}=require("admin-bro")
const {User} = require("../auth/models");
const { exportToExcel ,down} = require('./customfun')
const {Quiz, QuizGroup, QuizQuestion, QuizOption, QuestionM2MOption,Report,ConcreteCases} = require("../assessment/models");
const express =require("express");

AdminBro.registerAdapter(AdminBroSequelize);
  // Add the button to the resource's actions 
  const options={
    parent:{
        icon:"Report"
    }, actions: {
                 show: {
                     icon: 'View',
                     isVisible: (context) => context.record.param('Username') === 'Username',
                 },
                 edit: {
                     icon: 'edit',
                     isVisible: (context) => context.record.param('Username') === 'Username',
                 },
                 delete: {
                     icon: 'delete',
                     isVisible: (context) => context.record.param('Username') === 'Username',
                 },
                 new: {
                     icon: 'new',
                     isVisible: (context) => false,
                 },
                
                search:{
                    icon:'search',
                    isVisible:(context)=>false
                },
                list:{
                    showFilter:false,
                    component:AdminBro.bundle("./download"),
                },
                
                //   downloadExcel: {
                //      newAction:{
                //       actionType: 'list',
                //       icon: 'Download',
                //       isVisible:true,
                //       path:"/download-excel",
                //       href:"/download-excel",
                //      }, 
                //     component: AdminBro.bundle("./download"), 
                //     },
                    }
  }
  
 const adminBro = new AdminBro({
    databases:[],
    resources:[
        {
            resource:ConcreteCases,
            options:{
                parent:{
                    icon:"paragraph"
                }
            }
           
        }
    ],
//     databases: [],
//     resources: [
//         {
//             resource: User,
//             options: {
//                 parent: {
//                     icon: 'User'
//                 },
//             },
//         },
//         {
//             resource: Quiz,
//             options: {
//                 parent: {
//                     icon: 'ExamMode'
//                 },
//             },
//         },
//         {
//             resource: QuizGroup,
//             options: {
//                 parent: {
//                     icon: 'TagGroup'
//                 },
//             },
//         },
//         {
//             resource: QuizQuestion,
//             options: {
//                 parent: {
//                     icon: 'Help'
//                 },
//             },
//         },
//         {
//             resource: QuizOption,
//             options: {
//                 parent: {
//                     icon: 'Choices'
//                 },
//             },
//         },
//         {
//             resource: QuestionM2MOption,
//             options: {
//                 parent: {
//                     icon: 'TextLink',
//                 },
//             },
//         },
//         {
//             resource:Report,
//              options: {
//                  parent: {
//                      icon: 'Report',
//                  },
//                  actions: {
//                     show: {
//                         icon: 'View',
//                         isVisible: (context) => context.record.param('Username') === 'Username',
//                     },
//                     edit: {
//                         icon: 'edit',
//                         isVisible: (context) => context.record.param('Username') === 'Username',
//                     },
//                     delete: {
//                         icon: 'delete',
//                         isVisible: (context) => context.record.param('Username') === 'Username',
//                     },
//                     new: {
//                         icon: 'new',
//                         isVisible: (context) => false,
//                     },
//                     search:{
//                         icon:'search',
//                         isVisible:(context)=>false
//                     },
//                     downloadFile:downloadAction
//                 //      downloadExcel: {
//                 //         newAction:{
//                 //          actionType: 'download',
//                 //          icon: 'Download',
//                 //          isVisible:true,
//                 //          handler:async(request,response,data)=>{
//                 //             console.log("called")
//                 //             await app.get("http://localhost:3000/admin/resources/Reports/actions/downloadExcel")
//                 //             console.log("called 2")
//                 //              response.redirect("admin/resources/Reports/actions/ReportGenerate")
//                 //         }  
//                 //         }, 
                        
//                 //   } 
//             },
//                 },
//         },
//        
//    ],
    branding: {
        companyName: 'DTA Cyber',
        softwareBrothers: false,
        // TODO: icons & images
        favicon: "https://asia.daimlertruck.com/assets/images/daimler-logo-new.jpg",
        logo: "https://asia.daimlertruck.com/assets/images/daimler-logo-new.jpg",
    },
    rootPath: '/admin',
})

  
  
const adminBroRouter = AdminBroExpress.buildRouter(adminBro)

  
module.exports = {
    adminBroRouter,
    adminBro
}


// REFERENCES:
//  1. https://javascript.plainenglish.io/getting-started-with-adminbro-node-admin-panel-with-react-8552e281b55d
