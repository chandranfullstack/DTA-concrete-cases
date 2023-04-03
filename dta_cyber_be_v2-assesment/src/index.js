const express = require("express");
const {envVariables} = require("./config");
const {apiRouters} = require('./modules/routes')
const appLogger = require('./modules/common/logger')
const {apiErrorMiddleware} = require("./modules/common/validators");
const {serverErrorMiddleware} = require("./modules/common/middlewares");
const {tokenAuthMiddleware} = require("./modules/auth/middlewares");
const cors = require("cors");
const {adminBro, adminBroRouter} = require("./modules/admin/config");
const path = require("path");
const fileupload = require("express-fileupload");
const adminRouter=require("./modules/admin/routes")
const XLSX = require('xlsx');
const fs = require('fs');
const ejs=require("ejs")
const {Report}=require("./modules/assessment/models")
//const ExcelJs=require("exceljs/dist/es5")


 const bodyParser = require('body-parser');


// app
const app = express()
app.set('view engine', 'ejs');
console.log(path.join(__dirname, '/views'))
app.set('views', path.join(__dirname, '/views'));



// inbound related middlewares
app.use(cors({
    origin: '*'
}));
app.use(tokenAuthMiddleware)
app.use(adminBro.options.rootPath, adminBroRouter)
// app.use(express.json())
app.use(fileupload());

// set maximum size to 10MB
app.use(express.json({limit: "50mb", extended: true}))
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}))

// routes
apiRouters.map(router => app.use("/api/", router))


//const xlsx = require('xlsx');

app.get('/download-excel',async (req, res) => {
    //const data =await Report.findAll({username:"Admin"})
    //data.map((data)=>console.log(data,"data")) 
    //res.send(data)
    const data =[
        ['Title',	'Id',	'Updated At'	,'Created At',	'Wronganswer',	'Correctanswer','	Username',"correctAnsers",'wrongAnswers']
        ,['Phishing and Email Security',
            '1',
            '2023-03-25 09:43',
           '2023-03-25 09:43',
            '5',
            '5',
            'Chandran',
            `\nImplement Multifactor Authentication ,\nOn Your Account In Accordance With Your Organisation's,\n Backup Put Your Login Credentials On An Encrypted Usb Memory Stick And Hand It To Them ,\n False,\n All Of The Above`,
           `\nAll Of The Above,\nPassword Has To Be Stored In Our Human Mind,\nRefuse And Contact Your Manager Or Information Security Team,\nYou Should Regularly Change Your Password,\nRoppongi@123.`],
            [   'The Beginners Cyber Security Quiz',
                '2',
                '2023-03-25 09:43',
                '2023-03-25 09:43',
                '5',
                '6',
                'ravichandran',`
                \nDo Not Use The Usb Stick Request The Supplier To The Send The File Via Email Or Upload It To A Secure File Sharing Service,\nAll Of The Above,\nChange The Password And Enable Two-Factor Authentication On The Email Account,\nTrue,\nChange Any Compromised Passwords`,
               `\nPhishing Happens Exclusively Over Email,\nThe App Might Contain Viruses,\nScams Through Text Messages,\nClick On The Link Anyway And See Where It Takes You,\nYou Need To Update And Run Your Anti-Virus Software`]
    ]
    const workbook = XLSX.utils.book_new();
   
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    
    
    const colw=[
        {hpx:20},
        {hpx:70},
        {hpx:80}
    ]
    worksheet["!rows"]=colw   
    worksheet["!cols"]=[{width:40},{width:10},{width:20},{width:20},{width:20},{width:20},{width:20},{width:60},{width:60}]
    
    const cell = worksheet['H2'];
    const cell2=worksheet['H3']
    const cell3=worksheet['I2']
    const cell4=worksheet['I3']
    console.log(cell,)
    cell.s = { alignment: { wrapText: true } };
    cell2.s = { alignment: { wrapText: true } };
    cell3.s = { alignment: { wrapText: true } };
    cell4.s = { alignment: { wrapText: true } };
    cell4.t = { alignment: { wrapText: true } };

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');  
    const filename = 'report.xlsx';
    XLSX.writeFile(workbook, filename);        
    const fileContents = fs.readFileSync(filename);
     const responseHeaders = {
       'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
       'Content-Disposition': `attachment; filename="${filename}"`,
     };
     res.writeHead(200, responseHeaders);
     res.end(fileContents);
  
});
 //app.get("/download",async(req,res)=>{
 //        const data = [
 //            ['Name', 'Age', 'Country'],
 //            ['Alice', 28, 'USA'],
 //            ['Bob', 35, 'Canada'],
 //            ['Charlie', 42, 'UK'],
 //          ];
 //          const workbook = XLSX.utils.book_new();
 //          console.log(workbook)
 //          const worksheet = XLSX.utils.aoa_to_sheet(data);
 //          XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');        
 //          const filename = 'data.xlsx';
 //          XLSX.writeFile(workbook, filename);        
 //          const fileContents = fs.readFileSync(filename);
 //           const responseHeaders = {
 //             'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
 //             'Content-Disposition': `attachment; filename="${filename}"`,
 //           };
 //           res.writeHead(200, responseHeaders);
 //           res.end(fileContents);
 //    }
 //)

// outbound related middlewares
app.use(apiErrorMiddleware)
app.use(serverErrorMiddleware);


app.listen(envVariables.PORT, () => {
    appLogger.logInfo(`ENV: ${envVariables.NODE_ENV}`)
    appLogger.logInfo(`App is running at https://localhost:${envVariables.PORT}`)
});
